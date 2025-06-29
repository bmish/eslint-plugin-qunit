/**
 * @fileoverview Ensure async hooks are resolved in QUnit tests.
 * @author Kevin Partington
 */

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

import {
    getAssertionNames,
    isAsyncCallExpression,
    isStop,
    isStart,
    isTest,
    isModule,
    isModuleHookPropertyKey,
    isAsyncTest,
    isOnly,
    isSkip,
    getAssertContextNameForTest,
    getAssertContextName,
    isAssertion,
    getAllowedArities,
    isComparativeAssertion,
    shouldCompareActualFirst,
    createAssertionCheck,
} from "../utils.js";

/** @typedef {{
 *   stopSemaphoreCount: number,
 *   asyncCallbackVars: Record<string, boolean>,
 *   assertContextVar: string | null,
 * }} AsyncState */

/** @type {import('eslint').Rule.RuleModule} */
const rule = {
    meta: {
        type: "problem",
        docs: {
            description: "require that async calls are resolved",
            category: "Possible Errors",
            url: "https://github.com/platinumazure/eslint-plugin-qunit/blob/main/docs/rules/resolve-async.md",
        },
        messages: {
            needMoreStartCalls:
                "Need {{semaphore}} more start() {{callOrCalls}}.",
            asyncCallbackNotCalled:
                'Async callback "{{asyncVar}}" is not called.',
        },
        schema: [],
    },

    create: function (context) {
        /*
         * Declare a stack in case of nested test cases (not currently supported
         * in QUnit).
         */
        /** @type {Array<AsyncState>} */
        const asyncStateStack = [];

        /**
         * @param {import('estree').Node} callExpressionNode
         * @returns {boolean}
         */
        function isAsyncCallExpressionLocal(callExpressionNode) {
            const asyncState = asyncStateStack[asyncStateStack.length - 1];
            const assertContextVar = asyncState && asyncState.assertContextVar;
            if (!assertContextVar) {
                return false;
            }

            return isAsyncCallExpression(callExpressionNode, assertContextVar);
        }

        /**
         * @param {import('estree').Node} calleeNode
         * @returns {string | null}
         */
        function getAsyncCallbackVarOrNull(calleeNode) {
            const asyncState = asyncStateStack[asyncStateStack.length - 1];
            let result = null;

            if (asyncState) {
                if (
                    calleeNode.type === "Identifier" &&
                    calleeNode.name in asyncState.asyncCallbackVars
                ) {
                    result = calleeNode.name;
                } else if (calleeNode.type === "MemberExpression") {
                    const isCallOrApply =
                        calleeNode.property.type === "Identifier" &&
                        ["call", "apply"].includes(calleeNode.property.name);

                    if (calleeNode.object.type !== "Identifier") {
                        return null;
                    }

                    const isCallbackVar =
                        calleeNode.object.name in asyncState.asyncCallbackVars;

                    if (isCallOrApply && isCallbackVar) {
                        result = calleeNode.object.name;
                    }
                }
            }

            return result;
        }

        /**
         * @param {number} amount
         */
        function incrementSemaphoreCount(amount) {
            const asyncState = asyncStateStack[asyncStateStack.length - 1];
            if (asyncState) {
                asyncState.stopSemaphoreCount += amount;
            }
        }

        /**
         * @param {import('estree').Node} lhsNode
         */
        function addAsyncCallbackVar(lhsNode) {
            const asyncState = asyncStateStack[asyncStateStack.length - 1];

            /* istanbul ignore else: will correctly do nothing */
            if (asyncState && lhsNode.type === "Identifier") {
                asyncState.asyncCallbackVars[lhsNode.name] = false;
            }
        }

        /**
         * @param {string} name
         */
        function markAsyncCallbackVarCalled(name) {
            const asyncState = asyncStateStack[asyncStateStack.length - 1];

            /* istanbul ignore else: will correctly do nothing */
            if (asyncState) {
                asyncState.asyncCallbackVars[name] = true;
            }
        }

        /**
         * @param {AsyncState} asyncState
         * @param {import('eslint').Rule.Node} node
         */
        function verifyAsyncState(asyncState, node) {
            if (asyncState.stopSemaphoreCount > 0) {
                const singular = asyncState.stopSemaphoreCount === 1;

                context.report({
                    node: node,
                    messageId: "needMoreStartCalls",
                    data: {
                        semaphore: asyncState.stopSemaphoreCount.toString(),
                        callOrCalls: singular ? "call" : "calls",
                    },
                });
            }

            for (const callbackVar in asyncState.asyncCallbackVars) {
                if (asyncState.asyncCallbackVars[callbackVar] === false) {
                    context.report({
                        node: node,
                        messageId: "asyncCallbackNotCalled",
                        data: {
                            asyncVar: callbackVar,
                        },
                    });
                }
            }
        }

        /**
         * @param {import('eslint').Rule.Node} propertyNode
         * @returns {boolean}
         */
        function isInModule(propertyNode) {
            return (
                propertyNode &&
                propertyNode.parent && // ObjectExpression
                propertyNode.parent.parent && // CallExpression?
                propertyNode.parent.parent.type === "CallExpression" &&
                isModule(propertyNode.parent.parent.callee)
            );
        }

        return {
            CallExpression: function (node) {
                const callbackVar = getAsyncCallbackVarOrNull(node.callee);
                let delta;

                if (isTest(node.callee)) {
                    const assertContextVar = getAssertContextNameForTest(
                        node.arguments,
                    );
                    asyncStateStack.push({
                        stopSemaphoreCount: isAsyncTest(node.callee) ? 1 : 0,
                        asyncCallbackVars: {},
                        assertContextVar: assertContextVar,
                    });
                } else if (callbackVar) {
                    markAsyncCallbackVarCalled(callbackVar);
                } else if (isStop(node.callee)) {
                    delta = node.arguments.length > 0 ? +node.arguments[0] : 1;
                    incrementSemaphoreCount(delta);
                } else if (isStart(node.callee)) {
                    delta = node.arguments.length > 0 ? +node.arguments[0] : 1;
                    incrementSemaphoreCount(-delta);
                }
            },

            "CallExpression:exit": function (node) {
                if (isTest(node.callee)) {
                    const asyncState = asyncStateStack.pop();
                    if (!asyncState) {
                        return;
                    }
                    verifyAsyncState(asyncState, node);
                }
            },

            Property: function (node) {
                if (isModuleHookPropertyKey(node.key) && isInModule(node)) {
                    asyncStateStack.push({
                        stopSemaphoreCount: 0,
                        asyncCallbackVars: {},
                        assertContextVar: getAssertContextName(node.value),
                    });
                }
            },

            "Property:exit": function (node) {
                if (isModuleHookPropertyKey(node.key) && isInModule(node)) {
                    const asyncState = asyncStateStack.pop();
                    if (!asyncState) {
                        return;
                    }
                    verifyAsyncState(asyncState, node);
                }
            },

            AssignmentExpression: function (node) {
                if (isAsyncCallExpressionLocal(node.right)) {
                    if (node.left.type !== "Identifier") {
                        return;
                    }
                    addAsyncCallbackVar(node.left);
                }
            },

            VariableDeclarator: function (node) {
                if (node.init && isAsyncCallExpressionLocal(node.init)) {
                    if (node.id.type !== "Identifier") {
                        return;
                    }
                    addAsyncCallbackVar(node.id);
                }
            },
        };
    },
};
export default rule;

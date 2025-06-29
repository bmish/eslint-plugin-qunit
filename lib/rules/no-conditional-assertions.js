/**
 * @fileoverview forbid assertions within if statements or conditional expressions
 * @author Kevin Partington
 */

//------------------------------------------------------------------------------
// Requirements
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
} from "../utils";

//------------------------------------------------------------------------------
// Constants
//------------------------------------------------------------------------------

const CONDITIONAL_NODE_TYPES = new Set([
    "IfStatement",
    "ConditionalExpression",
]);

const STOP_NODE_TYPES = new Set([
    "FunctionExpression",
    "FunctionDeclaration",
    "ArrowFunctionExpression",
]);

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
const rule = {
    meta: {
        type: "suggestion",
        docs: {
            description:
                "disallow assertions within if statements or conditional expressions",
            category: "Best Practices",
            recommended: false,
            url: "https://github.com/platinumazure/eslint-plugin-qunit/blob/main/docs/rules/no-conditional-assertions.md",
        },
        fixable: undefined, // or "code" or "whitespace"
        messages: {
            noAssertionInsideConditional:
                "Do not place an assertion inside a conditional.",
        },
        schema: [],
    },

    create: function (context) {
        /** @type {Array<{assertContextVar: string | null}>} */
        const testStack = [];

        //----------------------------------------------------------------------
        // Helper functions
        //----------------------------------------------------------------------

        /**
         * @param {import('estree').Node} node
         * @returns {boolean}
         */
        function isConditionalNode(node) {
            return CONDITIONAL_NODE_TYPES.has(node.type);
        }

        /**
         * @param {import('estree').Node} node
         * @returns {boolean}
         */
        function isStopNode(node) {
            return STOP_NODE_TYPES.has(node.type);
        }

        /**
         * @param {import('eslint').Rule.Node} assertNode
         */
        function checkAndReport(assertNode) {
            let currentNode = assertNode;

            while (
                currentNode &&
                !isStopNode(currentNode) &&
                !isConditionalNode(currentNode)
            ) {
                currentNode = currentNode.parent;
            }

            if (CONDITIONAL_NODE_TYPES.has(currentNode.type)) {
                context.report({
                    node: assertNode,
                    messageId: "noAssertionInsideConditional",
                });
            }
        }

        /**
         * @param {import('estree').Node} calleeNode
         * @returns {boolean}
         */
        function isAssertionLocal(calleeNode) {
            const assertContextVar =
                testStack[testStack.length - 1].assertContextVar;
            if (!assertContextVar) {
                return false;
            }
            return isAssertion(calleeNode, assertContextVar);
        }

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {
            CallExpression: function (node) {
                if (isTest(node.callee)) {
                    testStack.push({
                        assertContextVar: getAssertContextNameForTest(
                            node.arguments,
                        ),
                    });
                } else if (
                    testStack.length > 0 &&
                    isAssertionLocal(node.callee)
                ) {
                    checkAndReport(node);
                }
            },

            "CallExpression:exit": function (node) {
                if (isTest(node.callee)) {
                    testStack.pop();
                }
            },
        };
    },
};
export default rule;

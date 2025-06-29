/**
 * @fileoverview Check the location of literals in arguments to QUnit's assertion functions.
 * @author Kevin Partington
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import assert from "node:assert";
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
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
const rule = {
    meta: {
        type: "suggestion",
        docs: {
            description:
                "enforce comparison assertions have arguments in the right order",
            category: "Possible Errors",
            url: "https://github.com/platinumazure/eslint-plugin-qunit/blob/main/docs/rules/literal-compare-order.md",
        },
        fixable: "code",
        messages: {
            actualFirst:
                "Expected value {{expected}} should be specified after actual value {{actual}}.",
            expectedFirst:
                "Actual value {{actual}} should be specified after expected value {{expected}}.",
        },
        schema: [],
    },

    create: function (context) {
        /** @type {Array<{assertContextVar: string | null}>} */
        const testStack = [],
            sourceCode = context.getSourceCode();

        function getAssertContext() {
            assert.ok(testStack.length);

            return testStack[testStack.length - 1].assertContextVar;
        }

        /**
         * @param {any} fixer
         * @param {import('estree').Node[]} list
         * @returns {import('eslint').Rule.Fix[]}
         */
        function swapFirstTwoNodesInList(fixer, list) {
            const node0Text = sourceCode.getText(list[0]);
            const node1Text = sourceCode.getText(list[1]);
            return [
                fixer.replaceText(list[0], node1Text),
                fixer.replaceText(list[1], node0Text),
            ];
        }

        /**
         * @param {import('estree').Node[]} args
         * @param {boolean} compareActualFirst
         */
        function checkLiteralCompareOrder(args, compareActualFirst) {
            if (args.length < 2) {
                return;
            }

            /* istanbul ignore else: no assertions compare expected first */
            if (
                compareActualFirst &&
                args[0].type === "Literal" &&
                args[1].type !== "Literal"
            ) {
                context.report({
                    node: args[0],
                    messageId: "actualFirst",
                    data: {
                        expected: sourceCode.getText(args[0]),
                        actual: sourceCode.getText(args[1]),
                    },
                    fix(fixer) {
                        return swapFirstTwoNodesInList(fixer, args);
                    },
                });
            } else if (
                !compareActualFirst &&
                args[0].type !== "Literal" &&
                args[1].type === "Literal"
            ) {
                context.report({
                    node: args[0],
                    messageId: "expectedFirst",
                    data: {
                        expected: sourceCode.getText(args[0]),
                        actual: sourceCode.getText(args[1]),
                    },
                    fix(fixer) {
                        return swapFirstTwoNodesInList(fixer, args);
                    },
                });
            }
        }

        /**
         * @param {import('eslint').Rule.Node} node
         * @param {string | null} assertVar
         */
        function processAssertion(node, assertVar) {
            if (node.type !== "CallExpression") {
                return;
            }

            /* istanbul ignore else: correctly does nothing */
            if (!assertVar || isComparativeAssertion(node.callee, assertVar)) {
                const compareActualFirst =
                    !assertVar ||
                    shouldCompareActualFirst(node.callee, assertVar);
                checkLiteralCompareOrder(node.arguments, compareActualFirst);
            }
        }

        return {
            CallExpression: function (node) {
                /* istanbul ignore else: correctly does nothing */
                if (isTest(node.callee)) {
                    testStack.push({
                        assertContextVar: getAssertContextNameForTest(
                            node.arguments,
                        ),
                    });
                } else if (testStack.length > 0) {
                    const assertVar = getAssertContext();
                    if (!assertVar || isAssertion(node.callee, assertVar)) {
                        processAssertion(node, assertVar);
                    }
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

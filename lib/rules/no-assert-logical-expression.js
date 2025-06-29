/**
 * @fileoverview forbid binary logical expressions in assert arguments
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
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
const rule = {
    meta: {
        type: "suggestion",
        docs: {
            description:
                "disallow binary logical expressions in assert arguments",
            category: "Best Practices",
            recommended: false,
            url: "https://github.com/platinumazure/eslint-plugin-qunit/blob/main/docs/rules/no-assert-logical-expression.md",
        },
        fixable: undefined,
        messages: {
            noLogicalOperator:
                "Do not use '{{operator}}' in assertion arguments.",
        },
        schema: [],
    },

    create: function (context) {
        /** @type {Array<{assertContextVar: string}>} */
        const testStack = [];

        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------

        /**
         * @param {import('estree').Node[]} argNodes
         */
        function checkAndReport(argNodes) {
            for (const arg of argNodes) {
                if (arg.type === "LogicalExpression") {
                    context.report({
                        node: arg,
                        messageId: "noLogicalOperator",
                        data: {
                            operator: arg.operator,
                        },
                    });
                }
            }
        }

        function getAssertVar() {
            let result = null;

            if (testStack.length > 0) {
                result = testStack[testStack.length - 1].assertContextVar;
            }

            return result;
        }

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {
            CallExpression: function (node) {
                if (isTest(node.callee)) {
                    const assertContextVar = getAssertContextNameForTest(
                        node.arguments,
                    );
                    if (!assertContextVar) {
                        return;
                    }
                    testStack.push({
                        assertContextVar,
                    });
                } else {
                    const assertVar = getAssertVar();
                    if (assertVar && isAssertion(node.callee, assertVar)) {
                        const countNonMessageArgs = Math.max(
                            ...getAllowedArities(node.callee, assertVar),
                        );
                        checkAndReport(
                            node.arguments.slice(0, countNonMessageArgs),
                        );
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

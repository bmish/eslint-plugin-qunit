/**
 * @fileoverview Forbid expect argument in QUnit.test
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
} from "../utils.js";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
const rule = {
    meta: {
        type: "suggestion",
        docs: {
            description: "disallow the expect argument in QUnit.test",
            category: "Possible Errors",
            url: "https://github.com/platinumazure/eslint-plugin-qunit/blob/main/docs/rules/no-test-expect-argument.md",
        },
        messages: {
            noExpectArgument: "Do not use expect argument in {{callee}}().",
        },
        schema: [],
    },

    create: function (context) {
        const sourceCode = context.getSourceCode();

        return {
            CallExpression: function (node) {
                if (isTest(node.callee) && node.arguments.length > 2) {
                    context.report({
                        node: node,
                        messageId: "noExpectArgument",
                        data: {
                            callee: sourceCode.getText(node.callee),
                        },
                    });
                }
            },
        };
    },
};
export default rule;

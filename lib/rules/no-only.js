/**
 * @fileoverview Forbid the use of QUnit.only.
 * @author Kevin Partington
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { isOnly } from "../utils";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
const rule = {
    meta: {
        type: "suggestion",
        docs: {
            description: "disallow QUnit.only",
            category: "Best Practices",
            url: "https://github.com/platinumazure/eslint-plugin-qunit/blob/main/docs/rules/no-only.md",
        },
        messages: {
            noQUnitOnly: "Unexpected only() call.",
        },
        schema: [],
    },

    create: function (context) {
        return {
            CallExpression: function (node) {
                if (isOnly(node.callee)) {
                    context.report({
                        node: node,
                        messageId: "noQUnitOnly",
                    });
                }
            },
        };
    },
};
export default rule;

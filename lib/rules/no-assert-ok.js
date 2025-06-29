/**
 * @fileoverview Forbid the use of assert.ok/assert.notOk and suggest other assertions.
 * @author ventuno
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

const GLOBAL_ERROR_MESSAGE_ID = "unexpectedGlobalOkNotOk";
const LOCAL_ERROR_MESSAGE_ID = "unexpectedLocalOkNotOk";
const assertions = ["ok", "notOk"];
const ERROR_MESSAGE_CONFIG = {
    ok: {
        unexpectedGlobalAssertionMessageId: GLOBAL_ERROR_MESSAGE_ID,
        unexpectedLocalAssertionMessageId: LOCAL_ERROR_MESSAGE_ID,
    },
    notOk: {
        unexpectedGlobalAssertionMessageId: GLOBAL_ERROR_MESSAGE_ID,
        unexpectedLocalAssertionMessageId: LOCAL_ERROR_MESSAGE_ID,
    },
};

/** @type {import('eslint').Rule.RuleModule} */
const rule = {
    meta: {
        type: "suggestion",
        docs: {
            description: "disallow the use of assert.ok/assert.notOk",
            category: "Best Practices",
        },
        messages: {
            [GLOBAL_ERROR_MESSAGE_ID]:
                "Unexpected {{assertion}}. Use strictEqual, deepEqual, or propEqual.",
            [LOCAL_ERROR_MESSAGE_ID]:
                "Unexpected {{assertVar}}.{{assertion}}. Use {{assertVar}}.strictEqual, {{assertVar}}.deepEqual, or {{assertVar}}.propEqual.",
        },
        schema: [],
    },

    create: createAssertionCheck(assertions, ERROR_MESSAGE_CONFIG),
};
export default rule;

/**
 * @fileoverview Forbid the use of global QUnit assertions.
 * @author Kevin Partington
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import rule from "../../../lib/rules/no-global-assertions";
import { RuleTester } from "eslint";
import { wrapInTest } from "../../testUtils";

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

/**
 * @param {string} assertion
 * @returns {{messageId: string, data: Record<string, string>}}
 */
function createError(assertion) {
    return {
        messageId: "unexpectedGlobalAssertion",
        data: {
            assertion,
        },
    };
}

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

ruleTester.run("no-global-assertions", rule, {
    valid: [
        wrapInTest("assert.ok(true);"),
        wrapInTest("assert.equal(a, b);"),
        wrapInTest("assert.false(foo);"),
        wrapInTest("assert.strictEqual(a, b);"),
        wrapInTest("assert.deepEqual(a, b);"),
        wrapInTest("assert.propEqual(a, b);"),
        wrapInTest("assert.notEqual(a, b);"),
        wrapInTest("assert.notStrictEqual(a, b);"),
        wrapInTest("assert.notDeepEqual(a, b);"),
        wrapInTest("assert.notPropEqual(a, b);"),
        wrapInTest("assert.raises(function () {}, TypeError);"),
        wrapInTest("assert.throws(function () {}, TypeError);"),
        wrapInTest("assert.true(foo);"),
        wrapInTest("assert.expect(1);"),

        // Global overridden by local import/declaration.
        {
            code: "var strictEqual = require('foo'); strictEqual();",
            languageOptions: { globals: { strictEqual: true } },
        },

        // Intentionally not covered by this rule
        wrapInTest("expect(1);"),
    ],

    invalid: [
        {
            code: wrapInTest("ok(true);"),
            languageOptions: { globals: { ok: true } },
            errors: [createError("ok")],
        },
        {
            code: wrapInTest("equal(a, b);"),
            languageOptions: { globals: { equal: true } },
            errors: [createError("equal")],
        },
        {
            code: wrapInTest("strictEqual(a, b);"),
            languageOptions: { globals: { strictEqual: true } },
            errors: [createError("strictEqual")],
        },
        {
            code: wrapInTest("deepEqual(a, b);"),
            languageOptions: { globals: { deepEqual: true } },
            errors: [createError("deepEqual")],
        },
        {
            code: wrapInTest("propEqual(a, b);"),
            languageOptions: { globals: { propEqual: true } },
            errors: [createError("propEqual")],
        },
        {
            code: wrapInTest("notEqual(a, b);"),
            languageOptions: { globals: { notEqual: true } },
            errors: [createError("notEqual")],
        },
        {
            code: wrapInTest("notStrictEqual(a, b);"),
            languageOptions: { globals: { notStrictEqual: true } },
            errors: [createError("notStrictEqual")],
        },
        {
            code: wrapInTest("notDeepEqual(a, b);"),
            languageOptions: { globals: { notDeepEqual: true } },
            errors: [createError("notDeepEqual")],
        },
        {
            code: wrapInTest("notPropEqual(a, b);"),
            languageOptions: { globals: { notPropEqual: true } },
            errors: [createError("notPropEqual")],
        },
        {
            code: wrapInTest("raises(function () {}, TypeError);"),
            languageOptions: { globals: { raises: true } },
            errors: [createError("raises")],
        },
        {
            code: wrapInTest("throws(function () {}, TypeError);"),
            languageOptions: { globals: { throws: true } },
            errors: [createError("throws")],
        },
    ],
});

/**
 * @fileoverview Forbid the use of negations in assert.ok/notOk.
 * @author Kevin Partington
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import rule from "../../../lib/rules/no-negated-ok";
import { RuleTester } from "eslint";
import { wrapInTest, wrapInArrowTest } from "../../testUtils";

//------------------------------------------------------------------------------
// Helper functions
//------------------------------------------------------------------------------

/**
 * @param {string} callee
 * @returns {{messageId: string, data: Record<string, string>}}
 */
function createError(callee) {
    return {
        messageId: "noNegationInOk",
        data: {
            callee,
        },
    };
}

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

ruleTester.run("no-negated-ok", rule, {
    valid: [
        // ok
        wrapInTest("ok(foo)"),
        wrapInTest("ok(foo, 'message')"),
        wrapInTest("assert.ok(foo)"),
        wrapInTest("assert.ok(foo, 'message')"),

        // notOk
        wrapInTest("assert.notOk(foo)"),
        wrapInTest("assert.notOk(foo, 'message')"),

        // double negation is allowed
        wrapInTest("ok(!!foo)"),
        wrapInTest("ok(!!foo, 'message')"),
        wrapInTest("assert.ok(!!foo)"),
        wrapInTest("assert.ok(!!foo, 'message')"),
        wrapInTest("assert.notOk(!!foo)"),
        wrapInTest("assert.notOk(!!foo, 'message')"),

        // quadruple negation is allowed (but seriously?)
        wrapInTest("ok(!!!!foo)"),
        wrapInTest("ok(!!!!foo, 'message')"),
        wrapInTest("assert.ok(!!!!foo)"),
        wrapInTest("assert.ok(!!!!foo, 'message')"),
        wrapInTest("assert.notOk(!!!!foo)"),
        wrapInTest("assert.notOk(!!!!foo, 'message')"),

        // global ok with negation is accepted since there is no notOk
        wrapInTest("ok(!foo)"),
        wrapInTest("ok(!foo, 'message')"),

        // no such thing as global notOk, but want to make sure we don't flag
        wrapInTest("notOk(!foo)"),
        wrapInTest("notOk(!foo, 'message')"),

        // only logical negation should be reported
        wrapInTest("ok(-foo)"),
        wrapInTest("ok(~foo)"),
        wrapInTest("assert.ok(-foo)"),
        wrapInTest("assert.ok(~foo)"),
        wrapInTest("assert.notOk(-foo)"),
        wrapInTest("assert.notOk(~foo)"),

        // no arguments
        wrapInTest("ok()"),
        wrapInTest("assert.ok()"),
        wrapInTest("assert.notOk()"),

        // different assertions can have negation
        wrapInTest("equal(!a, true)"),

        // unknown objects in path
        wrapInTest("assert.ok.foo(!a)"),
        wrapInTest("foo.assert.ok(!a)"),
        wrapInTest("foo.assert.bar.ok(!a)"),
        wrapInTest("foo.assert.bar.ok.baz(!a)"),

        // Boolean assertions, no negation
        wrapInTest("assert.true(foo)"),
        wrapInTest("assert.true(foo, 'message')"),
        wrapInTest("assert.false(foo)"),
        wrapInTest("assert.false(foo, 'message')"),
    ],

    invalid: [
        // ok
        {
            code: wrapInTest("assert.ok(!foo)"),
            output: wrapInTest("assert.notOk(foo)"),
            errors: [createError("assert.ok")],
        },
        {
            // TypeScript: test callback is adding a type to `this`
            code: "QUnit.test('test', (this: LocalTestContext, assert) => { assert.ok(!foo); });",
            output: "QUnit.test('test', (this: LocalTestContext, assert) => { assert.notOk(foo); });",
            languageOptions: { parser: require("@typescript-eslint/parser") },
            errors: [createError("assert.ok")],
        },
        {
            code: wrapInArrowTest("assert.ok(!foo)"),
            output: wrapInArrowTest("assert.notOk(foo)"),
            errors: [createError("assert.ok")],
        },

        // ok (with message)
        {
            code: wrapInTest("assert.ok(!foo, 'message')"),
            output: wrapInTest("assert.notOk(foo, 'message')"),
            errors: [createError("assert.ok")],
        },

        // notOk
        {
            code: wrapInTest("assert.notOk(!foo)"),
            output: wrapInTest("assert.ok(foo)"),
            errors: [createError("assert.notOk")],
        },
        {
            code: wrapInTest("assert.notOk(!foo, 'message')"),
            output: wrapInTest("assert.ok(foo, 'message')"),
            errors: [createError("assert.notOk")],
        },

        // triple negation is not allowed
        {
            code: wrapInTest("assert.ok(!!!foo)"),
            output: wrapInTest("assert.notOk(foo)"),
            errors: [createError("assert.ok")],
        },

        // triple negation is not allowed (with message)
        {
            code: wrapInTest("assert.notOk(!!!foo)"),
            output: wrapInTest("assert.ok(foo)"),
            errors: [createError("assert.notOk")],
        },

        // triple negation is not allowed (with notOk)
        {
            code: wrapInTest("assert.notOk(!!!foo, 'message')"),
            output: wrapInTest("assert.ok(foo, 'message')"),
            errors: [createError("assert.notOk")],
        },

        // true
        {
            code: wrapInTest("assert.true(!foo)"),
            output: wrapInTest("assert.false(foo)"),
            errors: [createError("assert.true")],
        },

        // false
        {
            code: wrapInTest("assert.false(!foo)"),
            output: wrapInTest("assert.true(foo)"),
            errors: [createError("assert.false")],
        },
    ],
});

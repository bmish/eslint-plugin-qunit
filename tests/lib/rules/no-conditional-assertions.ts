/**
 * @fileoverview forbid assertions within if statements or conditional expressions
 * @author Kevin Partington
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import rule from "../../../lib/rules/no-conditional-assertions.js";
import { RuleTester } from "eslint";
import { wrapInTest, wrapInArrowTest } from "../../testUtils.js";

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

/**
 * @param {string} code
 * @returns {{code: string, errors: {messageId: string, type: string}[]}}
 */
function wrapInInvalidTestObject(code) {
    return {
        code: code,
        errors: [
            {
                messageId: "noAssertionInsideConditional",
                type: "CallExpression",
            },
        ],
    };
}

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("no-conditional-assertions", rule, {
    valid: [
        ...[
            // Unconditional assertions are good
            "assert.ok(true);",

            // Conditions in parent scope are okay
            "if (foo) (function() { assert.ok(true); });",
            "if (foo) { (function() { assert.ok(true); }); }",
            "if (foo) {} else if (bar) { (function() { assert.ok(true); }); }",
            "if (foo) {} else { (function() { assert.ok(true); }); }",
            "if (foo) { function bar() { assert.ok(true); } }",
            "if (foo) {} else if (bar) { function bar() { assert.ok(true); } }",
            "if (foo) {} else { function bar() { assert.ok(true); }; }",
            "foo ? (function() { assert.ok(true); }) : false;",
            "foo ? false : (function() { assert.ok(true); });",
            "if (foo) (() => { assert.ok(true); });",
            "if (foo) { (() => { assert.ok(true); }); }",
            "if (foo) {} else if (bar) { (() => { assert.ok(true); }); }",
            "if (foo) {} else { (() => { assert.ok(true); }); }",
            "foo ? (() => { assert.ok(true); }) : false;",
            "foo ? false : (() => { assert.ok(true); });",

            // Conditions around non-assertions are okay
            "if (foo) doSomething();",
            "foo ? doSomething() : false;",
            "foo ? false : doSomething();",
        ].map((code) => wrapInTest(code)),

        // Conditional tests are okay
        "if (foo) QUnit.test('test', function (assert) { assert.ok(true); });",
    ],

    invalid: [
        wrapInTest("if (foo) assert.ok(true);"),
        wrapInArrowTest("if (foo) assert.ok(true);"),
        wrapInTest("if (foo) { assert.ok(true); }"),
        wrapInTest("if (foo) { assert.true(true); }"),
        wrapInTest("if (foo) {} else if (bar) assert.ok(true);"),
        wrapInTest("if (foo) {} else assert.ok(true);"),
        wrapInTest("foo ? assert.ok(true) : false"),
        wrapInTest("foo ? false : assert.ok(true)"),
    ].map((code) => wrapInInvalidTestObject(code)),
});

/**
 * @fileoverview forbid comparing relational expression to boolean in assertions
 * @author Kevin Partington
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import rule from "../../../lib/rules/no-compare-relation-boolean.js";
import { RuleTester } from "eslint";
import { wrapInTest, wrapInArrowTest } from "../../testUtils.js";
import typescriptEslintParser from "@typescript-eslint/parser";

//------------------------------------------------------------------------------
// Helper Functions
//------------------------------------------------------------------------------

/**
 * @param {{code: string, output:string}} testCase
 * @returns {{code: string, errors: {messageId: string, type: string}[]}}
 */
function addErrors(testCase) {
    return Object.assign(
        {
            errors: [
                {
                    messageId: "redundantComparison",
                    type: "CallExpression",
                },
            ],
        },
        testCase,
    );
}

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

ruleTester.run("no-compare-relation-boolean", rule, {
    valid: [
        "assert.strictEqual(a, b);",
        "assert.ok(a === b);",
        "assert.ok(a > b);",

        // Non-relational operators should not trigger the rule
        "assert.equal(a >> 1, true);",

        // Logical operators should not be flagged because they return the operand
        "assert.equal(a && b, true);",

        // Comparing against something that isn't a boolean literal is fine
        "assert.equal(a > b, 1);",
        "assert.equal(a > b, c);",

        // Not enough arguments
        "assert.strictEqual();",
        "assert.strictEqual(a);",
    ].map((code) => wrapInTest(code)),

    invalid: [
        {
            code: wrapInTest("assert.equal(a === b, true);"),
            output: wrapInTest("assert.ok(a === b);"),
        },
        {
            // TypeScript: test callback is adding a type to `this`
            code: "QUnit.test('test', (this: LocalTestContext, assert) => { assert.equal(a === b, true); });",
            output: "QUnit.test('test', (this: LocalTestContext, assert) => { assert.ok(a === b); });",
            languageOptions: { parser: typescriptEslintParser },
        },
        {
            code: wrapInArrowTest("assert.equal(a === b, true);"),
            output: wrapInArrowTest("assert.ok(a === b);"),
        },
        {
            code: wrapInTest("assert.equal(a === b, false);"),
            output: wrapInTest("assert.notOk(a === b);"),
        },

        {
            code: wrapInTest("assert.equal(a === b, true, 'message');"), // With message
            output: wrapInTest("assert.ok(a === b, 'message');"),
        },
        {
            code: wrapInTest("assert.equal(a === b, false, 'message');"), // With message
            output: wrapInTest("assert.notOk(a === b, 'message');"),
        },

        {
            code: wrapInTest("assert.strictEqual(a === b, true);"),
            output: wrapInTest("assert.ok(a === b);"),
        },
        {
            code: wrapInTest("assert.strictEqual(a === b, false);"),
            output: wrapInTest("assert.notOk(a === b);"),
        },

        {
            code: wrapInTest("assert.deepEqual(a === b, true);"),
            output: wrapInTest("assert.ok(a === b);"),
        },
        {
            code: wrapInTest("assert.deepEqual(a === b, false);"),
            output: wrapInTest("assert.notOk(a === b);"),
        },

        {
            code: wrapInTest("assert.propEqual(a === b, true);"),
            output: wrapInTest("assert.ok(a === b);"),
        },
        {
            code: wrapInTest("assert.propEqual(a === b, false);"),
            output: wrapInTest("assert.notOk(a === b);"),
        },

        {
            code: wrapInTest("assert.notEqual(a === b, true);"),
            output: wrapInTest("assert.notOk(a === b);"),
        },
        {
            code: wrapInTest("assert.notEqual(a === b, false);"),
            output: wrapInTest("assert.ok(a === b);"),
        },

        {
            code: wrapInTest("assert.notStrictEqual(a === b, true);"),
            output: wrapInTest("assert.notOk(a === b);"),
        },
        {
            code: wrapInTest("assert.notStrictEqual(a === b, false);"),
            output: wrapInTest("assert.ok(a === b);"),
        },

        {
            code: wrapInTest("assert.notDeepEqual(a === b, true);"),
            output: wrapInTest("assert.notOk(a === b);"),
        },
        {
            code: wrapInTest("assert.notDeepEqual(a === b, false);"),
            output: wrapInTest("assert.ok(a === b);"),
        },

        {
            code: wrapInTest("assert.notPropEqual(a === b, true);"),
            output: wrapInTest("assert.notOk(a === b);"),
        },
        {
            code: wrapInTest("assert.notPropEqual(a === b, false);"),
            output: wrapInTest("assert.ok(a === b);"),
        },

        // Argument order does not matter for this rule
        {
            code: wrapInTest("assert.equal(true, a === b);"),
            output: wrapInTest("assert.ok(a === b);"),
        },
        {
            code: wrapInTest("assert.equal(false, a === b);"),
            output: wrapInTest("assert.notOk(a === b);"),
        },

        {
            code: wrapInTest("assert.equal(true, a === b, 'message');"), // With message
            output: wrapInTest("assert.ok(a === b, 'message');"),
        },
        {
            code: wrapInTest("assert.equal(false, a === b, 'message');"), // With message
            output: wrapInTest("assert.notOk(a === b, 'message');"),
        },

        {
            code: wrapInTest("assert.strictEqual(true, a === b);"),
            output: wrapInTest("assert.ok(a === b);"),
        },
        {
            code: wrapInTest("assert.strictEqual(false, a === b);"),
            output: wrapInTest("assert.notOk(a === b);"),
        },

        {
            code: wrapInTest("assert.deepEqual(true, a === b);"),
            output: wrapInTest("assert.ok(a === b);"),
        },
        {
            code: wrapInTest("assert.deepEqual(false, a === b);"),
            output: wrapInTest("assert.notOk(a === b);"),
        },

        {
            code: wrapInTest("assert.propEqual(true, a === b);"),
            output: wrapInTest("assert.ok(a === b);"),
        },
        {
            code: wrapInTest("assert.propEqual(false, a === b);"),
            output: wrapInTest("assert.notOk(a === b);"),
        },

        {
            code: wrapInTest("assert.notEqual(true, a === b);"),
            output: wrapInTest("assert.notOk(a === b);"),
        },
        {
            code: wrapInTest("assert.notEqual(false, a === b);"),
            output: wrapInTest("assert.ok(a === b);"),
        },

        {
            code: wrapInTest("assert.notStrictEqual(true, a === b);"),
            output: wrapInTest("assert.notOk(a === b);"),
        },
        {
            code: wrapInTest("assert.notStrictEqual(false, a === b);"),
            output: wrapInTest("assert.ok(a === b);"),
        },

        {
            code: wrapInTest("assert.notDeepEqual(true, a === b);"),
            output: wrapInTest("assert.notOk(a === b);"),
        },
        {
            code: wrapInTest("assert.notDeepEqual(false, a === b);"),
            output: wrapInTest("assert.ok(a === b);"),
        },

        {
            code: wrapInTest("assert.notPropEqual(true, a === b);"),
            output: wrapInTest("assert.notOk(a === b);"),
        },
        {
            code: wrapInTest("assert.notPropEqual(false, a === b);"),
            output: wrapInTest("assert.ok(a === b);"),
        },
    ].map((testCase) => addErrors(testCase)),
});

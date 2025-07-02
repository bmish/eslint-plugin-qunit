/**
 * @fileoverview forbid assert.throws() with block, string, and message
 * @author Kevin Partington
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import rule from "../../../lib/rules/no-throws-string.js";
import { RuleTester } from "eslint";
import typescriptEslintParser from "@typescript-eslint/parser";

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

ruleTester.run("no-throws-string", rule, {
    valid: [
        // No qualification
        "QUnit.test('a test', function (assert) { assert.throws(function () { }, 'Error should have been thrown'); });",
        "QUnit.test('a test', function () { throws(function () { }, 'Error should have been thrown'); });",
        "QUnit.test('a test', function (assert) { assert.raises(function () { }, 'Error should have been thrown'); });",

        // Regexp qualification
        "QUnit.test('a test', function (assert) { assert.throws(function () { }, /regexp/, 'Error should have been thrown'); });",
        "QUnit.test('a test', function () { throws(function () { }, /regexp/, 'Error should have been thrown'); });",
        "QUnit.test('a test', function (assert) { assert.raises(function () { }, /regexp/, 'Error should have been thrown'); });",

        // Function qualification
        "QUnit.test('a test', function (assert) { assert.throws(function () { }, function (err) { return true; }, 'Error should have been thrown'); });",
        "QUnit.test('a test', function () { throws(function () { }, function (err) { return true; }, 'Error should have been thrown'); });",
        "QUnit.test('a test', function (assert) { assert.raises(function () { }, function (err) { return true; }, 'Error should have been thrown'); });",

        // Not throws/raises
        "QUnit.test('a test', function (assert) { assert.foo(function () { }, 'string', 'Error should have been thrown'); });",

        // Not inside a test
        "someFunction();",
    ],

    invalid: [
        {
            code: "QUnit.test('a test', function (assert) { assert.throws(function () { }, 'Error message', 'Error should have been thrown'); });",
            errors: [
                {
                    messageId: "noThrowsWithString",
                    data: {
                        callee: "assert.throws",
                    },
                    type: "CallExpression",
                },
            ],
        },
        {
            // TypeScript: test callback is adding a type to `this`
            code: "QUnit.test('a test', function (this: LocalTestContext, assert) { assert.throws(function () { }, 'Error message', 'Error should have been thrown'); });",
            languageOptions: { parser: typescriptEslintParser },
            errors: [
                {
                    messageId: "noThrowsWithString",
                    data: {
                        callee: "assert.throws",
                    },
                    type: "CallExpression",
                },
            ],
        },
        {
            code: "QUnit.test('a test', (assert) => { assert.throws(function () { }, 'Error message', 'Error should have been thrown'); });",
            errors: [
                {
                    messageId: "noThrowsWithString",
                    data: {
                        callee: "assert.throws",
                    },
                    type: "CallExpression",
                },
            ],
        },
        {
            code: "QUnit.test('a test', function (assert) { assert.raises(function () { }, 'Error message', 'Error should have been thrown'); });",
            errors: [
                {
                    messageId: "noThrowsWithString",
                    data: {
                        callee: "assert.raises",
                    },
                    type: "CallExpression",
                },
            ],
        },
        {
            code: "QUnit.test('a test', function () { throws(function () { }, 'Error message', 'Error should have been thrown'); });",
            errors: [
                {
                    messageId: "noThrowsWithString",
                    data: {
                        callee: "throws",
                    },
                    type: "CallExpression",
                },
            ],
        },
    ],
});

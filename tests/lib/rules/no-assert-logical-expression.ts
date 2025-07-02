/**
 * @fileoverview forbid binary logical expressions in assert arguments
 * @author Kevin Partington
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import rule from "../../../lib/rules/no-assert-logical-expression.js";
import { RuleTester } from "eslint";
import { wrapInTest, wrapInArrowTest } from "../../testUtils.js";
import typescriptParser from "@typescript-eslint/parser";

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("no-assert-logical-expression", rule, {
    valid: [
        // Simple assertions
        wrapInTest("assert.ok(foo);"),
        wrapInTest("assert.equal(foo, bar);"),
        wrapInTest("assert.false(foo);"),
        wrapInTest("assert.strictEqual(foo, bar);"),
        wrapInTest("assert.deepEqual(foo, bar);"),
        wrapInTest("assert.propEqual(foo, bar);"),
        wrapInTest("assert.notOk(foo);"),
        wrapInTest("assert.notEqual(foo, bar);"),
        wrapInTest("assert.notStrictEqual(foo, bar);"),
        wrapInTest("assert.notDeepEqual(foo, bar);"),
        wrapInTest("assert.notPropEqual(foo, bar);"),
        wrapInTest("assert.raises(function () {}, /Message/);"),
        wrapInTest("assert.throws(function () {}, /Message/);"),
        wrapInTest("assert.true(foo);"),

        // Logical expressions inside raises/throw blocks are fine
        wrapInTest("assert.raises(function () { throw (foo || bar); });"),
        wrapInTest("assert.throws(function () { throw (foo || bar); });"),

        // Messages can have logical expressions.
        wrapInTest("assert.ok(foo, message || 'alternative message');"),
        wrapInTest("assert.equal(foo, bar, message || 'alternative message');"),

        // Not an assertion, not in a test
        "doSomething(foo && bar);",
    ],

    invalid: [
        {
            code: wrapInTest("assert.ok(foo && bar);"),
            errors: [
                {
                    messageId: "noLogicalOperator",
                    data: {
                        operator: "&&",
                    },
                    type: "LogicalExpression",
                    line: 1,
                    column: 50,
                },
            ],
        },
        {
            // TypeScript: test callback is adding a type to `this`
            code: "QUnit.test('test', (this: LocalTestContext, assert) => { assert.ok(foo && bar); });",
            languageOptions: { parser: typescriptParser },
            errors: [
                {
                    messageId: "noLogicalOperator",
                    data: {
                        operator: "&&",
                    },
                    type: "LogicalExpression",
                    line: 1,
                    column: 68,
                },
            ],
        },
        {
            code: wrapInArrowTest("assert.ok(foo && bar);"),
            errors: [
                {
                    messageId: "noLogicalOperator",
                    data: {
                        operator: "&&",
                    },
                    type: "LogicalExpression",
                    line: 1,
                    column: 44,
                },
            ],
        },
        {
            code: wrapInTest("assert.ok(foo || bar);"),
            errors: [
                {
                    messageId: "noLogicalOperator",
                    data: {
                        operator: "||",
                    },
                    type: "LogicalExpression",
                    line: 1,
                    column: 50,
                },
            ],
        },
        {
            code: wrapInTest("assert.notOk(foo && bar);"),
            errors: [
                {
                    messageId: "noLogicalOperator",
                    data: {
                        operator: "&&",
                    },
                    type: "LogicalExpression",
                    line: 1,
                    column: 53,
                },
            ],
        },
        {
            code: wrapInTest("assert.notOk(foo || bar);"),
            errors: [
                {
                    messageId: "noLogicalOperator",
                    data: {
                        operator: "||",
                    },
                    type: "LogicalExpression",
                    line: 1,
                    column: 53,
                },
            ],
        },
        {
            code: wrapInTest("assert.equal(foo && bar, baz && lol);"),
            errors: [
                {
                    messageId: "noLogicalOperator",
                    data: {
                        operator: "&&",
                    },
                    type: "LogicalExpression",
                    line: 1,
                    column: 53,
                },
                {
                    messageId: "noLogicalOperator",
                    data: {
                        operator: "&&",
                    },
                    type: "LogicalExpression",
                    line: 1,
                    column: 65,
                },
            ],
        },
        {
            code: wrapInTest("assert.equal(foo || bar, baz || lol);"),
            errors: [
                {
                    messageId: "noLogicalOperator",
                    data: {
                        operator: "||",
                    },
                    type: "LogicalExpression",
                    line: 1,
                    column: 53,
                },
                {
                    messageId: "noLogicalOperator",
                    data: {
                        operator: "||",
                    },
                    type: "LogicalExpression",
                    line: 1,
                    column: 65,
                },
            ],
        },
        {
            code: wrapInTest("assert.strictEqual(foo && bar, baz && lol);"),
            errors: [
                {
                    messageId: "noLogicalOperator",
                    data: {
                        operator: "&&",
                    },
                    type: "LogicalExpression",
                    line: 1,
                    column: 59,
                },
                {
                    messageId: "noLogicalOperator",
                    data: {
                        operator: "&&",
                    },
                    type: "LogicalExpression",
                    line: 1,
                    column: 71,
                },
            ],
        },
        {
            code: wrapInTest("assert.strictEqual(foo || bar, baz || lol);"),
            errors: [
                {
                    messageId: "noLogicalOperator",
                    data: {
                        operator: "||",
                    },
                    type: "LogicalExpression",
                    line: 1,
                    column: 59,
                },
                {
                    messageId: "noLogicalOperator",
                    data: {
                        operator: "||",
                    },
                    type: "LogicalExpression",
                    line: 1,
                    column: 71,
                },
            ],
        },
        {
            code: wrapInTest("assert.deepEqual(foo && bar, baz && lol);"),
            errors: [
                {
                    messageId: "noLogicalOperator",
                    data: {
                        operator: "&&",
                    },
                    type: "LogicalExpression",
                    line: 1,
                    column: 57,
                },
                {
                    messageId: "noLogicalOperator",
                    data: {
                        operator: "&&",
                    },
                    type: "LogicalExpression",
                    line: 1,
                    column: 69,
                },
            ],
        },
        {
            code: wrapInTest("assert.deepEqual(foo || bar, baz || lol);"),
            errors: [
                {
                    messageId: "noLogicalOperator",
                    data: {
                        operator: "||",
                    },
                    type: "LogicalExpression",
                    line: 1,
                    column: 57,
                },
                {
                    messageId: "noLogicalOperator",
                    data: {
                        operator: "||",
                    },
                    type: "LogicalExpression",
                    line: 1,
                    column: 69,
                },
            ],
        },
        {
            code: wrapInTest("assert.propEqual(foo && bar, baz && lol);"),
            errors: [
                {
                    messageId: "noLogicalOperator",
                    data: {
                        operator: "&&",
                    },
                    type: "LogicalExpression",
                    line: 1,
                    column: 57,
                },
                {
                    messageId: "noLogicalOperator",
                    data: {
                        operator: "&&",
                    },
                    type: "LogicalExpression",
                    line: 1,
                    column: 69,
                },
            ],
        },
        {
            code: wrapInTest("assert.propEqual(foo || bar, baz || lol);"),
            errors: [
                {
                    messageId: "noLogicalOperator",
                    data: {
                        operator: "||",
                    },
                    type: "LogicalExpression",
                    line: 1,
                    column: 57,
                },
                {
                    messageId: "noLogicalOperator",
                    data: {
                        operator: "||",
                    },
                    type: "LogicalExpression",
                    line: 1,
                    column: 69,
                },
            ],
        },
        {
            code: wrapInTest("assert.notEqual(foo && bar, baz && lol);"),
            errors: [
                {
                    messageId: "noLogicalOperator",
                    data: {
                        operator: "&&",
                    },
                    type: "LogicalExpression",
                    line: 1,
                    column: 56,
                },
                {
                    messageId: "noLogicalOperator",
                    data: {
                        operator: "&&",
                    },
                    type: "LogicalExpression",
                    line: 1,
                    column: 68,
                },
            ],
        },
        {
            code: wrapInTest("assert.notEqual(foo || bar, baz || lol);"),
            errors: [
                {
                    messageId: "noLogicalOperator",
                    data: {
                        operator: "||",
                    },
                    type: "LogicalExpression",
                    line: 1,
                    column: 56,
                },
                {
                    messageId: "noLogicalOperator",
                    data: {
                        operator: "||",
                    },
                    type: "LogicalExpression",
                    line: 1,
                    column: 68,
                },
            ],
        },
        {
            code: wrapInTest("assert.notStrictEqual(foo && bar, baz && lol);"),
            errors: [
                {
                    messageId: "noLogicalOperator",
                    data: {
                        operator: "&&",
                    },
                    type: "LogicalExpression",
                    line: 1,
                    column: 62,
                },
                {
                    messageId: "noLogicalOperator",
                    data: {
                        operator: "&&",
                    },
                    type: "LogicalExpression",
                    line: 1,
                    column: 74,
                },
            ],
        },
        {
            code: wrapInTest("assert.notStrictEqual(foo || bar, baz || lol);"),
            errors: [
                {
                    messageId: "noLogicalOperator",
                    data: {
                        operator: "||",
                    },
                    type: "LogicalExpression",
                    line: 1,
                    column: 62,
                },
                {
                    messageId: "noLogicalOperator",
                    data: {
                        operator: "||",
                    },
                    type: "LogicalExpression",
                    line: 1,
                    column: 74,
                },
            ],
        },
        {
            code: wrapInTest("assert.notDeepEqual(foo && bar, baz && lol);"),
            errors: [
                {
                    messageId: "noLogicalOperator",
                    data: {
                        operator: "&&",
                    },
                    type: "LogicalExpression",
                    line: 1,
                    column: 60,
                },
                {
                    messageId: "noLogicalOperator",
                    data: {
                        operator: "&&",
                    },
                    type: "LogicalExpression",
                    line: 1,
                    column: 72,
                },
            ],
        },
        {
            code: wrapInTest("assert.notDeepEqual(foo || bar, baz || lol);"),
            errors: [
                {
                    messageId: "noLogicalOperator",
                    data: {
                        operator: "||",
                    },
                    type: "LogicalExpression",
                    line: 1,
                    column: 60,
                },
                {
                    messageId: "noLogicalOperator",
                    data: {
                        operator: "||",
                    },
                    type: "LogicalExpression",
                    line: 1,
                    column: 72,
                },
            ],
        },
        {
            code: wrapInTest("assert.notPropEqual(foo && bar, baz && lol);"),
            errors: [
                {
                    messageId: "noLogicalOperator",
                    data: {
                        operator: "&&",
                    },
                    type: "LogicalExpression",
                    line: 1,
                    column: 60,
                },
                {
                    messageId: "noLogicalOperator",
                    data: {
                        operator: "&&",
                    },
                    type: "LogicalExpression",
                    line: 1,
                    column: 72,
                },
            ],
        },
        {
            code: wrapInTest("assert.notPropEqual(foo || bar, baz || lol);"),
            errors: [
                {
                    messageId: "noLogicalOperator",
                    data: {
                        operator: "||",
                    },
                    type: "LogicalExpression",
                    line: 1,
                    column: 60,
                },
                {
                    messageId: "noLogicalOperator",
                    data: {
                        operator: "||",
                    },
                    type: "LogicalExpression",
                    line: 1,
                    column: 72,
                },
            ],
        },

        // Boolean assertions
        {
            code: wrapInTest("assert.true(foo && bar);"),
            errors: [
                {
                    messageId: "noLogicalOperator",
                    data: {
                        operator: "&&",
                    },
                    type: "LogicalExpression",
                    line: 1,
                    column: 52,
                },
            ],
        },
        {
            code: wrapInTest("assert.false(foo && bar);"),
            errors: [
                {
                    messageId: "noLogicalOperator",
                    data: {
                        operator: "&&",
                    },
                    type: "LogicalExpression",
                    line: 1,
                    column: 53,
                },
            ],
        },
    ],
});

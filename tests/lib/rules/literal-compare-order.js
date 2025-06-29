/**
 * @fileoverview Check the location of literals in arguments to QUnit's assertion functions.
 * @author Kevin Partington
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import rule from "../../../lib/rules/literal-compare-order";
import { RuleTester } from "eslint";
import { wrapInTest, wrapInArrowTest } from "../../testUtils";

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

ruleTester.run("literal-compare-order", rule, {
    valid: [
        // equal
        wrapInTest("equal(variable, 'Literal');"),
        wrapInTest("equal(variable, 'Literal', 'Message');"),
        wrapInTest("assert.equal(variable, 'Literal');"),
        wrapInTest("assert.equal(variable, 'Literal', 'Message');"),
        wrapInTest("equal();"), // avoid crash with missing arguments
        wrapInTest("equal(variable);"), // avoid crash with missing arguments

        // strictEqual
        wrapInTest("strictEqual(variable, 'Literal');"),
        wrapInTest("strictEqual(variable, 'Literal', 'Message');"),
        wrapInTest("assert.strictEqual(variable, 'Literal');"),
        wrapInTest("assert.strictEqual(variable, 'Literal', 'Message');"),

        // deepEqual
        wrapInTest("deepEqual(variable, 'Literal');"),
        wrapInTest("deepEqual(variable, 'Literal', 'Message');"),
        wrapInTest("assert.deepEqual(variable, 'Literal');"),
        wrapInTest("assert.deepEqual(variable, 'Literal', 'Message');"),

        // propEqual
        wrapInTest("propEqual(variable, 'Literal');"),
        wrapInTest("propEqual(variable, 'Literal', 'Message');"),
        wrapInTest("assert.propEqual(variable, 'Literal');"),
        wrapInTest("assert.propEqual(variable, 'Literal', 'Message');"),

        // notEqual
        wrapInTest("notEqual(variable, 'Literal');"),
        wrapInTest("notEqual(variable, 'Literal', 'Message');"),
        wrapInTest("assert.notEqual(variable, 'Literal');"),
        wrapInTest("assert.notEqual(variable, 'Literal', 'Message');"),

        // notStrictEqual
        wrapInTest("notStrictEqual(variable, 'Literal');"),
        wrapInTest("notStrictEqual(variable, 'Literal', 'Message');"),
        wrapInTest("assert.notStrictEqual(variable, 'Literal');"),
        wrapInTest("assert.notStrictEqual(variable, 'Literal', 'Message');"),

        // notDeepEqual
        wrapInTest("notDeepEqual(variable, 'Literal');"),
        wrapInTest("notDeepEqual(variable, 'Literal', 'Message');"),
        wrapInTest("assert.notDeepEqual(variable, 'Literal');"),
        wrapInTest("assert.notDeepEqual(variable, 'Literal', 'Message');"),

        // notPropEqual
        wrapInTest("notPropEqual(variable, 'Literal');"),
        wrapInTest("notPropEqual(variable, 'Literal', 'Message');"),
        wrapInTest("assert.notPropEqual(variable, 'Literal');"),
        wrapInTest("assert.notPropEqual(variable, 'Literal', 'Message');"),

        // avoid crash in BDD-style assertions
        "QUnit.test('Name', function() { expect(variable).to.equal('Literal'); });",
    ],
    invalid: [
        // equal
        {
            code: wrapInTest("equal('Literal', variable);"),
            output: wrapInTest("equal(variable, 'Literal');"),
            errors: [
                {
                    messageId: "actualFirst",
                    data: {
                        expected: "'Literal'",
                        actual: "variable",
                    },
                },
            ],
        },
        {
            // TypeScript: test callback is adding a type to `this`
            code: wrapInTest(
                "QUnit.test('test', (this: LocalTestContext) => { equal('Literal', variable); });",
            ),
            output: wrapInTest(
                "QUnit.test('test', (this: LocalTestContext) => { equal(variable, 'Literal'); });",
            ),
            languageOptions: { parser: require("@typescript-eslint/parser") },
            errors: [
                {
                    messageId: "actualFirst",
                    data: {
                        expected: "'Literal'",
                        actual: "variable",
                    },
                },
            ],
        },
        {
            code: wrapInTest("equal('Literal', variable, 'message');"),
            output: wrapInTest("equal(variable, 'Literal', 'message');"),
            errors: [
                {
                    messageId: "actualFirst",
                    data: {
                        expected: "'Literal'",
                        actual: "variable",
                    },
                },
            ],
        },
        {
            code: wrapInTest("assert.equal('Literal', variable);"),
            output: wrapInTest("assert.equal(variable, 'Literal');"),
            errors: [
                {
                    messageId: "actualFirst",
                    data: {
                        expected: "'Literal'",
                        actual: "variable",
                    },
                },
            ],
        },
        {
            code: wrapInArrowTest("assert.equal('Literal', variable);"),
            output: wrapInArrowTest("assert.equal(variable, 'Literal');"),
            errors: [
                {
                    messageId: "actualFirst",
                    data: {
                        expected: "'Literal'",
                        actual: "variable",
                    },
                },
            ],
        },
        {
            code: wrapInTest("assert.equal('Literal', variable, 'message');"),
            output: wrapInTest("assert.equal(variable, 'Literal', 'message');"),
            errors: [
                {
                    messageId: "actualFirst",
                    data: {
                        expected: "'Literal'",
                        actual: "variable",
                    },
                },
            ],
        },

        // strictEqual
        {
            code: wrapInTest("strictEqual('Literal', variable);"),
            output: wrapInTest("strictEqual(variable, 'Literal');"),
            errors: [
                {
                    messageId: "actualFirst",
                    data: {
                        expected: "'Literal'",
                        actual: "variable",
                    },
                },
            ],
        },
        {
            code: wrapInTest("strictEqual('Literal', variable, 'message');"),
            output: wrapInTest("strictEqual(variable, 'Literal', 'message');"),
            errors: [
                {
                    messageId: "actualFirst",
                    data: {
                        expected: "'Literal'",
                        actual: "variable",
                    },
                },
            ],
        },
        {
            code: wrapInTest("assert.strictEqual('Literal', variable);"),
            output: wrapInTest("assert.strictEqual(variable, 'Literal');"),
            errors: [
                {
                    messageId: "actualFirst",
                    data: {
                        expected: "'Literal'",
                        actual: "variable",
                    },
                },
            ],
        },
        {
            code: wrapInTest(
                "assert.strictEqual('Literal', variable, 'message');",
            ),
            output: wrapInTest(
                "assert.strictEqual(variable, 'Literal', 'message');",
            ),
            errors: [
                {
                    messageId: "actualFirst",
                    data: {
                        expected: "'Literal'",
                        actual: "variable",
                    },
                },
            ],
        },

        // deepEqual
        {
            code: wrapInTest("deepEqual('Literal', variable);"),
            output: wrapInTest("deepEqual(variable, 'Literal');"),
            errors: [
                {
                    messageId: "actualFirst",
                    data: {
                        expected: "'Literal'",
                        actual: "variable",
                    },
                },
            ],
        },
        {
            code: wrapInTest("deepEqual('Literal', variable, 'message');"),
            output: wrapInTest("deepEqual(variable, 'Literal', 'message');"),
            errors: [
                {
                    messageId: "actualFirst",
                    data: {
                        expected: "'Literal'",
                        actual: "variable",
                    },
                },
            ],
        },
        {
            code: wrapInTest("assert.deepEqual('Literal', variable);"),
            output: wrapInTest("assert.deepEqual(variable, 'Literal');"),
            errors: [
                {
                    messageId: "actualFirst",
                    data: {
                        expected: "'Literal'",
                        actual: "variable",
                    },
                },
            ],
        },
        {
            code: wrapInTest(
                "assert.deepEqual('Literal', variable, 'message');",
            ),
            output: wrapInTest(
                "assert.deepEqual(variable, 'Literal', 'message');",
            ),
            errors: [
                {
                    messageId: "actualFirst",
                    data: {
                        expected: "'Literal'",
                        actual: "variable",
                    },
                },
            ],
        },

        // propEqual
        {
            code: wrapInTest("propEqual('Literal', variable);"),
            output: wrapInTest("propEqual(variable, 'Literal');"),
            errors: [
                {
                    messageId: "actualFirst",
                    data: {
                        expected: "'Literal'",
                        actual: "variable",
                    },
                },
            ],
        },
        {
            code: wrapInTest("propEqual('Literal', variable, 'message');"),
            output: wrapInTest("propEqual(variable, 'Literal', 'message');"),
            errors: [
                {
                    messageId: "actualFirst",
                    data: {
                        expected: "'Literal'",
                        actual: "variable",
                    },
                },
            ],
        },
        {
            code: wrapInTest("assert.propEqual('Literal', variable);"),
            output: wrapInTest("assert.propEqual(variable, 'Literal');"),
            errors: [
                {
                    messageId: "actualFirst",
                    data: {
                        expected: "'Literal'",
                        actual: "variable",
                    },
                },
            ],
        },
        {
            code: wrapInTest(
                "assert.propEqual('Literal', variable, 'message');",
            ),
            output: wrapInTest(
                "assert.propEqual(variable, 'Literal', 'message');",
            ),
            errors: [
                {
                    messageId: "actualFirst",
                    data: {
                        expected: "'Literal'",
                        actual: "variable",
                    },
                },
            ],
        },

        // notEqual
        {
            code: wrapInTest("notEqual('Literal', variable);"),
            output: wrapInTest("notEqual(variable, 'Literal');"),
            errors: [
                {
                    messageId: "actualFirst",
                    data: {
                        expected: "'Literal'",
                        actual: "variable",
                    },
                },
            ],
        },
        {
            code: wrapInTest("notEqual('Literal', variable, 'message');"),
            output: wrapInTest("notEqual(variable, 'Literal', 'message');"),
            errors: [
                {
                    messageId: "actualFirst",
                    data: {
                        expected: "'Literal'",
                        actual: "variable",
                    },
                },
            ],
        },
        {
            code: wrapInTest("assert.notEqual('Literal', variable);"),
            output: wrapInTest("assert.notEqual(variable, 'Literal');"),
            errors: [
                {
                    messageId: "actualFirst",
                    data: {
                        expected: "'Literal'",
                        actual: "variable",
                    },
                },
            ],
        },
        {
            code: wrapInTest(
                "assert.notEqual('Literal', variable, 'message');",
            ),
            output: wrapInTest(
                "assert.notEqual(variable, 'Literal', 'message');",
            ),
            errors: [
                {
                    messageId: "actualFirst",
                    data: {
                        expected: "'Literal'",
                        actual: "variable",
                    },
                },
            ],
        },

        // notStrictEqual
        {
            code: wrapInTest("notStrictEqual('Literal', variable);"),
            output: wrapInTest("notStrictEqual(variable, 'Literal');"),
            errors: [
                {
                    messageId: "actualFirst",
                    data: {
                        expected: "'Literal'",
                        actual: "variable",
                    },
                },
            ],
        },
        {
            code: wrapInTest("notStrictEqual('Literal', variable, 'message');"),
            output: wrapInTest(
                "notStrictEqual(variable, 'Literal', 'message');",
            ),
            errors: [
                {
                    messageId: "actualFirst",
                    data: {
                        expected: "'Literal'",
                        actual: "variable",
                    },
                },
            ],
        },
        {
            code: wrapInTest("assert.notStrictEqual('Literal', variable);"),
            output: wrapInTest("assert.notStrictEqual(variable, 'Literal');"),
            errors: [
                {
                    messageId: "actualFirst",
                    data: {
                        expected: "'Literal'",
                        actual: "variable",
                    },
                },
            ],
        },
        {
            code: wrapInTest(
                "assert.notStrictEqual('Literal', variable, 'message');",
            ),
            output: wrapInTest(
                "assert.notStrictEqual(variable, 'Literal', 'message');",
            ),
            errors: [
                {
                    messageId: "actualFirst",
                    data: {
                        expected: "'Literal'",
                        actual: "variable",
                    },
                },
            ],
        },

        // notDeepEqual
        {
            code: wrapInTest("notDeepEqual('Literal', variable);"),
            output: wrapInTest("notDeepEqual(variable, 'Literal');"),
            errors: [
                {
                    messageId: "actualFirst",
                    data: {
                        expected: "'Literal'",
                        actual: "variable",
                    },
                },
            ],
        },
        {
            code: wrapInTest("notDeepEqual('Literal', variable, 'message');"),
            output: wrapInTest("notDeepEqual(variable, 'Literal', 'message');"),
            errors: [
                {
                    messageId: "actualFirst",
                    data: {
                        expected: "'Literal'",
                        actual: "variable",
                    },
                },
            ],
        },
        {
            code: wrapInTest("assert.notDeepEqual('Literal', variable);"),
            output: wrapInTest("assert.notDeepEqual(variable, 'Literal');"),
            errors: [
                {
                    messageId: "actualFirst",
                    data: {
                        expected: "'Literal'",
                        actual: "variable",
                    },
                },
            ],
        },
        {
            code: wrapInTest(
                "assert.notDeepEqual('Literal', variable, 'message');",
            ),
            output: wrapInTest(
                "assert.notDeepEqual(variable, 'Literal', 'message');",
            ),
            errors: [
                {
                    messageId: "actualFirst",
                    data: {
                        expected: "'Literal'",
                        actual: "variable",
                    },
                },
            ],
        },

        // notPropEqual
        {
            code: wrapInTest("notPropEqual('Literal', variable);"),
            output: wrapInTest("notPropEqual(variable, 'Literal');"),
            errors: [
                {
                    messageId: "actualFirst",
                    data: {
                        expected: "'Literal'",
                        actual: "variable",
                    },
                },
            ],
        },
        {
            code: wrapInTest("notPropEqual('Literal', variable, 'message');"),
            output: wrapInTest("notPropEqual(variable, 'Literal', 'message');"),
            errors: [
                {
                    messageId: "actualFirst",
                    data: {
                        expected: "'Literal'",
                        actual: "variable",
                    },
                },
            ],
        },
        {
            code: wrapInTest("assert.notPropEqual('Literal', variable);"),
            output: wrapInTest("assert.notPropEqual(variable, 'Literal');"),
            errors: [
                {
                    messageId: "actualFirst",
                    data: {
                        expected: "'Literal'",
                        actual: "variable",
                    },
                },
            ],
        },
        {
            code: wrapInTest(
                "assert.notPropEqual('Literal', variable, 'message');",
            ),
            output: wrapInTest(
                "assert.notPropEqual(variable, 'Literal', 'message');",
            ),
            errors: [
                {
                    messageId: "actualFirst",
                    data: {
                        expected: "'Literal'",
                        actual: "variable",
                    },
                },
            ],
        },
    ],
});

/**
 * @fileoverview Check the number of arguments to QUnit's assertion functions.
 * @author Kevin Partington
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import rule from "../../../lib/rules/assert-args.js";
import { RuleTester } from "eslint";
import { wrapInTest, wrapInArrowTest } from "../../testUtils.js";
import typescriptEslintParser from "@typescript-eslint/parser";

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

ruleTester.run("assert-args", rule, {
    valid: [
        // ok
        wrapInTest("ok(result);"),
        wrapInTest("ok(result, 'Result is true');"),
        wrapInTest("ok(obj[key], key + ' value is true');"),
        wrapInTest("assert.ok(result);"),
        wrapInTest("assert.ok(result, 'Result is true');"),
        wrapInTest("assert.ok(obj[key], key + ' value is true');"),

        // equal
        wrapInTest("equal(result, expected);"),
        wrapInTest("equal(result, expected, 'Message');"),
        wrapInTest("equal(obj[key], expected, key + ' value is true');"),
        wrapInTest("assert.equal(result, expected);"),
        wrapInTest("assert.equal(result, expected, 'Message');"),
        wrapInTest("assert.equal(obj[key], expected, key + ' value is true');"),

        // false
        wrapInTest("assert.false(result);"),
        wrapInTest("assert.false(result, 'Message');"),

        // strictEqual
        wrapInTest("strictEqual(result, expected);"),
        wrapInTest("strictEqual(result, expected, 'Message');"),
        wrapInTest("strictEqual(obj[key], expected, key + ' value is true');"),
        wrapInTest("assert.strictEqual(result, expected);"),
        wrapInTest("assert.strictEqual(result, expected, 'Message');"),
        wrapInTest(
            "assert.strictEqual(obj[key], expected, key + ' value is true');",
        ),

        // deepEqual
        wrapInTest("deepEqual(result, expected);"),
        wrapInTest("deepEqual(result, expected, 'Message');"),
        wrapInTest("deepEqual(obj[key], expected, key + ' value is true');"),
        wrapInTest("assert.deepEqual(result, expected);"),
        wrapInTest("assert.deepEqual(result, expected, 'Message');"),
        wrapInTest(
            "assert.deepEqual(obj[key], expected, key + ' value is true');",
        ),

        // propEqual
        wrapInTest("propEqual(result, expected);"),
        wrapInTest("propEqual(result, expected, 'Message');"),
        wrapInTest("propEqual(obj[key], expected, key + ' value is true');"),
        wrapInTest("assert.propEqual(result, expected);"),
        wrapInTest("assert.propEqual(result, expected, 'Message');"),
        wrapInTest(
            "assert.propEqual(obj[key], expected, key + ' value is true');",
        ),

        // raises
        wrapInTest("raises(function () {});"),
        wrapInTest("raises(function () {}, 'Message');"),
        wrapInTest("raises(function () {}, expectedMessage);"),
        wrapInTest("raises(function () {}, TypeError, 'Message');"),
        wrapInTest("raises(function () {}, /error/, 'Message');"),
        wrapInTest("raises(function () {}, 'Error', 'Message');"),
        wrapInTest("raises(function () {}, TypeError, expectedMessage);"),
        wrapInTest("assert.raises(function () {}, 'Message');"),
        wrapInTest("assert.raises(function () {}, TypeError, 'Message');"),
        wrapInTest("assert.raises(function () {}, expectedMessage);"),
        wrapInTest("assert.raises(function () {}, /error/, 'Message');"),
        wrapInTest("assert.raises(function () {}, 'Error', 'Message');"),
        wrapInTest(
            "assert.raises(function () {}, TypeError, expectedMessage);",
        ),

        // throws
        wrapInTest("throws(function () {});"),
        wrapInTest("throws(function () {}, 'Message');"),
        wrapInTest("throws(function () {}, expectedMessage);"),
        wrapInTest("throws(function () {}, TypeError, 'Message');"),
        wrapInTest("throws(function () {}, /error/, 'Message');"),
        wrapInTest("throws(function () {}, 'Error', 'Message');"),
        wrapInTest("throws(function () {}, TypeError, expectedMessage);"),
        wrapInTest("assert.throws(function () {}, 'Message');"),
        wrapInTest("assert.throws(function () {}, TypeError, 'Message');"),
        wrapInTest("assert.throws(function () {}, expectedMessage);"),
        wrapInTest("assert.throws(function () {}, /error/, 'Message');"),
        wrapInTest("assert.throws(function () {}, 'Error', 'Message');"),
        wrapInTest(
            "assert.throws(function () {}, TypeError, expectedMessage);",
        ),

        // true
        wrapInTest("assert.true(result);"),
        wrapInTest("assert.true(result, 'Message');"),

        // notOk
        wrapInTest("notOk(result);"),
        wrapInTest("notOk(result, 'Result is true');"),
        wrapInTest("notOk(obj[key], key + ' value is true');"),
        wrapInTest("assert.notOk(result);"),
        wrapInTest("assert.notOk(result, 'Result is true');"),
        wrapInTest("assert.notOk(obj[key], key + ' value is true');"),

        // notEqual
        wrapInTest("notEqual(result, expected);"),
        wrapInTest("notEqual(result, expected, 'Message');"),
        wrapInTest("notEqual(obj[key], expected, key + ' value is true');"),
        wrapInTest("assert.notEqual(result, expected);"),
        wrapInTest("assert.notEqual(result, expected, 'Message');"),
        wrapInTest(
            "assert.notEqual(obj[key], expected, key + ' value is true');",
        ),

        // notStrictEqual
        wrapInTest("notStrictEqual(result, expected);"),
        wrapInTest("notStrictEqual(result, expected, 'Message');"),
        wrapInTest(
            "notStrictEqual(obj[key], expected, key + ' value is true');",
        ),
        wrapInTest("assert.notStrictEqual(result, expected);"),
        wrapInTest("assert.notStrictEqual(result, expected, 'Message');"),
        wrapInTest(
            "assert.notStrictEqual(obj[key], expected, key + ' value is true');",
        ),

        // notDeepEqual
        wrapInTest("notDeepEqual(result, expected);"),
        wrapInTest("notDeepEqual(result, expected, 'Message');"),
        wrapInTest("notDeepEqual(obj[key], expected, key + ' value is true');"),
        wrapInTest("assert.notDeepEqual(result, expected);"),
        wrapInTest("assert.notDeepEqual(result, expected, 'Message');"),
        wrapInTest(
            "assert.notDeepEqual(obj[key], expected, key + ' value is true');",
        ),

        // notPropEqual
        wrapInTest("notPropEqual(result, expected);"),
        wrapInTest("notPropEqual(result, expected, 'Message');"),
        wrapInTest("notPropEqual(obj[key], expected, key + ' value is true');"),
        wrapInTest("assert.notPropEqual(result, expected);"),
        wrapInTest("assert.notPropEqual(result, expected, 'Message');"),
        wrapInTest(
            "assert.notPropEqual(obj[key], expected, key + ' value is true');",
        ),

        // not actually assertions
        wrapInTest("notAnAssertion(result, expected);"),
        wrapInTest("getAssertion()(result, expected);"),

        // Object prototype properties (also not actually assertions)
        wrapInTest("hasOwnProperty('prop');"),
        wrapInTest("assert.hasOwnProperty('prop');"),

        // unwrapped
        "notAnAssertion(result, expected);",
    ],

    invalid: [
        // ok
        {
            code: wrapInTest("ok();"),
            errors: [
                {
                    messageId: "unexpectedArgCountNoMessage",
                    data: {
                        callee: "ok",
                        argCount: 0,
                    },
                },
            ],
        },
        /* Allowed for now.
        {
            code: wrapInTest("ok(a, b);"),
            errors: ["Unexpected call to ok with 2 arguments and no error message."]
        },
        */
        {
            code: wrapInTest("ok(a, b, 'Message');"),
            errors: [
                {
                    messageId: "unexpectedArgCount",
                    data: {
                        callee: "ok",
                        argCount: 3,
                    },
                },
            ],
        },
        {
            code: wrapInTest("assert.ok();"),
            errors: [
                {
                    messageId: "unexpectedArgCountNoMessage",
                    data: {
                        callee: "assert.ok",
                        argCount: 0,
                    },
                },
            ],
        },
        {
            // TypeScript: test callback is adding a type to `this`
            code: "QUnit.test('test', (this: LocalTestContext, assert) => { assert.ok(); });",
            languageOptions: { parser: typescriptEslintParser },
            errors: [
                {
                    messageId: "unexpectedArgCountNoMessage",
                    data: {
                        callee: "assert.ok",
                        argCount: 0,
                    },
                },
            ],
        },
        /* Allowed for now.
        {
            code: wrapInTest("assert.ok(a, b);"),
            errors: ["Unexpected call to assert.ok with 2 arguments and no error message."]
        },
        */
        {
            code: wrapInTest("assert.ok(a, b, 'Message');"),
            errors: [
                {
                    messageId: "unexpectedArgCount",
                    data: {
                        callee: "assert.ok",
                        argCount: 3,
                    },
                },
            ],
        },

        // equal
        {
            code: wrapInTest("equal();"),
            errors: [
                {
                    messageId: "unexpectedArgCountNoMessage",
                    data: {
                        callee: "equal",
                        argCount: 0,
                    },
                },
            ],
        },
        {
            code: wrapInTest("equal(a);"),
            errors: [
                {
                    messageId: "unexpectedArgCountNoMessage",
                    data: {
                        callee: "equal",
                        argCount: 1,
                    },
                },
            ],
        },
        /* Allowed for now.
        {
            code: wrapInTest("equal(a, b, c);"),
            errors: ["Unexpected call to equal with 3 arguments and no error message."]
        },
        */
        {
            code: wrapInTest("equal(a, b, c, 'Message');"),
            errors: [
                {
                    messageId: "unexpectedArgCount",
                    data: {
                        callee: "equal",
                        argCount: 4,
                    },
                },
            ],
        },
        {
            code: wrapInTest("assert.equal();"),
            errors: [
                {
                    messageId: "unexpectedArgCountNoMessage",
                    data: {
                        callee: "assert.equal",
                        argCount: 0,
                    },
                },
            ],
        },
        {
            code: wrapInTest("assert.equal(a);"),
            errors: [
                {
                    messageId: "unexpectedArgCountNoMessage",
                    data: {
                        callee: "assert.equal",
                        argCount: 1,
                    },
                },
            ],
        },
        /* Allowed for now.
        {
            code: wrapInTest("assert.equal(a, b, c);"),
            errors: ["Unexpected call to assert.equal with 3 arguments and no error message."]
        },
        */
        {
            code: wrapInTest("assert.equal(a, b, c, 'Message');"),
            errors: [
                {
                    messageId: "unexpectedArgCount",
                    data: {
                        callee: "assert.equal",
                        argCount: 4,
                    },
                },
            ],
        },

        // false
        {
            code: wrapInTest("assert.false();"),
            errors: [
                {
                    messageId: "unexpectedArgCountNoMessage",
                    data: {
                        callee: "assert.false",
                        argCount: 0,
                    },
                },
            ],
        },
        {
            code: wrapInTest("assert.false(a, b, 'Message');"),
            errors: [
                {
                    messageId: "unexpectedArgCount",
                    data: {
                        callee: "assert.false",
                        argCount: 3,
                    },
                },
            ],
        },

        // true
        {
            code: wrapInTest("assert.true();"),
            errors: [
                {
                    messageId: "unexpectedArgCountNoMessage",
                    data: {
                        callee: "assert.true",
                        argCount: 0,
                    },
                },
            ],
        },
        {
            code: wrapInTest("assert.true(a, b, 'Message');"),
            errors: [
                {
                    messageId: "unexpectedArgCount",
                    data: {
                        callee: "assert.true",
                        argCount: 3,
                    },
                },
            ],
        },

        // strictEqual
        {
            code: wrapInTest("strictEqual();"),
            errors: [
                {
                    messageId: "unexpectedArgCountNoMessage",
                    data: {
                        callee: "strictEqual",
                        argCount: 0,
                    },
                },
            ],
        },
        {
            code: wrapInTest("strictEqual(a);"),
            errors: [
                {
                    messageId: "unexpectedArgCountNoMessage",
                    data: {
                        callee: "strictEqual",
                        argCount: 1,
                    },
                },
            ],
        },
        /* Allowed for now.
        {
            code: wrapInTest("strictEqual(a, b, c);"),
            errors: ["Unexpected call to strictEqual with 3 arguments and no error message."]
        },
        */
        {
            code: wrapInTest("strictEqual(a, b, c, 'Message');"),
            errors: [
                {
                    messageId: "unexpectedArgCount",
                    data: {
                        callee: "strictEqual",
                        argCount: 4,
                    },
                },
            ],
        },
        {
            code: wrapInTest("assert.strictEqual();"),
            errors: [
                {
                    messageId: "unexpectedArgCountNoMessage",
                    data: {
                        callee: "assert.strictEqual",
                        argCount: 0,
                    },
                },
            ],
        },
        {
            code: wrapInArrowTest("assert.strictEqual();"),
            errors: [
                {
                    messageId: "unexpectedArgCountNoMessage",
                    data: {
                        callee: "assert.strictEqual",
                        argCount: 0,
                    },
                },
            ],
        },
        {
            code: wrapInTest("assert.strictEqual(a);"),
            errors: [
                {
                    messageId: "unexpectedArgCountNoMessage",
                    data: {
                        callee: "assert.strictEqual",
                        argCount: 1,
                    },
                },
            ],
        },
        /* Allowed for now.
        {
            code: wrapInTest("assert.strictEqual(a, b, c);"),
            errors: ["Unexpected call to assert.strictEqual with 3 arguments and no error message."]
        },
        */
        {
            code: wrapInTest("assert.strictEqual(a, b, c, 'Message');"),
            errors: [
                {
                    messageId: "unexpectedArgCount",
                    data: {
                        callee: "assert.strictEqual",
                        argCount: 4,
                    },
                },
            ],
        },

        // deepEqual
        {
            code: wrapInTest("deepEqual();"),
            errors: [
                {
                    messageId: "unexpectedArgCountNoMessage",
                    data: {
                        callee: "deepEqual",
                        argCount: 0,
                    },
                },
            ],
        },
        {
            code: wrapInTest("deepEqual(a);"),
            errors: [
                {
                    messageId: "unexpectedArgCountNoMessage",
                    data: {
                        callee: "deepEqual",
                        argCount: 1,
                    },
                },
            ],
        },
        /* Allowed for now.
        {
            code: wrapInTest("deepEqual(a, b, c);"),
            errors: ["Unexpected call to deepEqual with 3 arguments and no error message."]
        },
        */
        {
            code: wrapInTest("deepEqual(a, b, c, 'Message');"),
            errors: [
                {
                    messageId: "unexpectedArgCount",
                    data: {
                        callee: "deepEqual",
                        argCount: 4,
                    },
                },
            ],
        },
        {
            code: wrapInTest("assert.deepEqual();"),
            errors: [
                {
                    messageId: "unexpectedArgCountNoMessage",
                    data: {
                        callee: "assert.deepEqual",
                        argCount: 0,
                    },
                },
            ],
        },
        {
            code: wrapInTest("assert.deepEqual(a);"),
            errors: [
                {
                    messageId: "unexpectedArgCountNoMessage",
                    data: {
                        callee: "assert.deepEqual",
                        argCount: 1,
                    },
                },
            ],
        },
        /* Allowed for now.
        {
            code: wrapInTest("assert.deepEqual(a, b, c);"),
            errors: ["Unexpected call to assert.deepEqual with 3 arguments and no error message."]
        },
        */
        {
            code: wrapInTest("assert.deepEqual(a, b, c, 'Message');"),
            errors: [
                {
                    messageId: "unexpectedArgCount",
                    data: {
                        callee: "assert.deepEqual",
                        argCount: 4,
                    },
                },
            ],
        },

        // propEqual
        {
            code: wrapInTest("propEqual();"),
            errors: [
                {
                    messageId: "unexpectedArgCountNoMessage",
                    data: {
                        callee: "propEqual",
                        argCount: 0,
                    },
                },
            ],
        },
        {
            code: wrapInTest("propEqual(a);"),
            errors: [
                {
                    messageId: "unexpectedArgCountNoMessage",
                    data: {
                        callee: "propEqual",
                        argCount: 1,
                    },
                },
            ],
        },
        /* Allowed for now.
        {
            code: wrapInTest("propEqual(a, b, c);"),
            errors: ["Unexpected call to propEqual with 3 arguments and no error message."]
        },
        */
        {
            code: wrapInTest("propEqual(a, b, c, 'Message');"),
            errors: [
                {
                    messageId: "unexpectedArgCount",
                    data: {
                        callee: "propEqual",
                        argCount: 4,
                    },
                },
            ],
        },
        {
            code: wrapInTest("assert.propEqual();"),
            errors: [
                {
                    messageId: "unexpectedArgCountNoMessage",
                    data: {
                        callee: "assert.propEqual",
                        argCount: 0,
                    },
                },
            ],
        },
        {
            code: wrapInTest("assert.propEqual(a);"),
            errors: [
                {
                    messageId: "unexpectedArgCountNoMessage",
                    data: {
                        callee: "assert.propEqual",
                        argCount: 1,
                    },
                },
            ],
        },
        /* Allowed for now.
        {
            code: wrapInTest("assert.propEqual(a, b, c);"),
            errors: ["Unexpected call to assert.propEqual with 3 arguments and no error message."]
        },
        */
        {
            code: wrapInTest("assert.propEqual(a, b, c, 'Message');"),
            errors: [
                {
                    messageId: "unexpectedArgCount",
                    data: {
                        callee: "assert.propEqual",
                        argCount: 4,
                    },
                },
            ],
        },

        // raises
        {
            code: wrapInTest("raises();"),
            errors: [
                {
                    messageId: "unexpectedArgCountNoMessage",
                    data: {
                        callee: "raises",
                        argCount: 0,
                    },
                },
            ],
        },
        /* Allowed for now.
        {
            code: wrapInTest("raises(function () {}, TypeError, blah);"),
            errors: ["Unexpected call to raises with 3 arguments and no error message."]
        },
        */
        {
            code: wrapInTest(
                "raises(function () {}, TypeError, blah, 'Message');",
            ),
            errors: [
                {
                    messageId: "unexpectedArgCount",
                    data: {
                        callee: "raises",
                        argCount: 4,
                    },
                },
            ],
        },
        {
            code: wrapInTest("assert.raises();"),
            errors: [
                {
                    messageId: "unexpectedArgCountNoMessage",
                    data: {
                        callee: "assert.raises",
                        argCount: 0,
                    },
                },
            ],
        },
        /* Allowed for now.
        {
            code: wrapInTest("assert.raises(function () {}, TypeError, blah);"),
            errors: ["Unexpected call to assert.raises with 3 arguments and no error message."]
        },
        */
        {
            code: wrapInTest(
                "assert.raises(function () {}, TypeError, blah, 'Message');",
            ),
            errors: [
                {
                    messageId: "unexpectedArgCount",
                    data: {
                        callee: "assert.raises",
                        argCount: 4,
                    },
                },
            ],
        },

        // throws
        {
            code: wrapInTest("throws();"),
            errors: [
                {
                    messageId: "unexpectedArgCountNoMessage",
                    data: {
                        callee: "throws",
                        argCount: 0,
                    },
                },
            ],
        },
        /* Allowed for now.
        {
            code: wrapInTest("throws(function () {}, TypeError, blah);"),
            errors: ["Unexpected call to throws with 3 arguments and no error message."]
        },
        */
        {
            code: wrapInTest(
                "throws(function () {}, TypeError, blah, 'Message');",
            ),
            errors: [
                {
                    messageId: "unexpectedArgCount",
                    data: {
                        callee: "throws",
                        argCount: 4,
                    },
                },
            ],
        },
        {
            code: wrapInTest("assert.throws();"),
            errors: [
                {
                    messageId: "unexpectedArgCountNoMessage",
                    data: {
                        callee: "assert.throws",
                        argCount: 0,
                    },
                },
            ],
        },
        /* Allowed for now.
        {
            code: wrapInTest("assert.throws(function () {}, TypeError, blah);"),
            errors: ["Unexpected call to assert.throws with 3 arguments and no error message."]
        },
        */
        {
            code: wrapInTest(
                "assert.throws(function () {}, TypeError, blah, 'Message');",
            ),
            errors: [
                {
                    messageId: "unexpectedArgCount",
                    data: {
                        callee: "assert.throws",
                        argCount: 4,
                    },
                },
            ],
        },

        // notOk
        {
            code: wrapInTest("notOk();"),
            errors: [
                {
                    messageId: "unexpectedArgCountNoMessage",
                    data: {
                        callee: "notOk",
                        argCount: 0,
                    },
                },
            ],
        },
        /* Allowed for now.
        {
            code: wrapInTest("notOk(a, b);"),
            errors: ["Unexpected call to notOk with 2 arguments and no error message."]
        },
        */
        {
            code: wrapInTest("notOk(a, b, 'Message');"),
            errors: [
                {
                    messageId: "unexpectedArgCount",
                    data: {
                        callee: "notOk",
                        argCount: 3,
                    },
                },
            ],
        },
        {
            code: wrapInTest("assert.notOk();"),
            errors: [
                {
                    messageId: "unexpectedArgCountNoMessage",
                    data: {
                        callee: "assert.notOk",
                        argCount: 0,
                    },
                },
            ],
        },
        /* Allowed for now.
        {
            code: wrapInTest("assert.notOk(a, b);"),
            errors: ["Unexpected call to assert.notOk with 2 arguments and no error message."]
        },
        */
        {
            code: wrapInTest("assert.notOk(a, b, 'Message');"),
            errors: [
                {
                    messageId: "unexpectedArgCount",
                    data: {
                        callee: "assert.notOk",
                        argCount: 3,
                    },
                },
            ],
        },

        // notEqual
        {
            code: wrapInTest("notEqual();"),
            errors: [
                {
                    messageId: "unexpectedArgCountNoMessage",
                    data: {
                        callee: "notEqual",
                        argCount: 0,
                    },
                },
            ],
        },
        {
            code: wrapInTest("notEqual(a);"),
            errors: [
                {
                    messageId: "unexpectedArgCountNoMessage",
                    data: {
                        callee: "notEqual",
                        argCount: 1,
                    },
                },
            ],
        },
        /* Allowed for now.
        {
            code: wrapInTest("notEqual(a, b, c);"),
            errors: ["Unexpected call to notEqual with 3 arguments and no error message."]
        },
        */
        {
            code: wrapInTest("notEqual(a, b, c, 'Message');"),
            errors: [
                {
                    messageId: "unexpectedArgCount",
                    data: {
                        callee: "notEqual",
                        argCount: 4,
                    },
                },
            ],
        },
        {
            code: wrapInTest("assert.notEqual();"),
            errors: [
                {
                    messageId: "unexpectedArgCountNoMessage",
                    data: {
                        callee: "assert.notEqual",
                        argCount: 0,
                    },
                },
            ],
        },
        {
            code: wrapInTest("assert.notEqual(a);"),
            errors: [
                {
                    messageId: "unexpectedArgCountNoMessage",
                    data: {
                        callee: "assert.notEqual",
                        argCount: 1,
                    },
                },
            ],
        },
        /* Allowed for now.
        {
            code: wrapInTest("assert.notEqual(a, b, c);"),
            errors: ["Unexpected call to assert.notEqual with 3 arguments and no error message."]
        },
        */
        {
            code: wrapInTest("assert.notEqual(a, b, c, 'Message');"),
            errors: [
                {
                    messageId: "unexpectedArgCount",
                    data: {
                        callee: "assert.notEqual",
                        argCount: 4,
                    },
                },
            ],
        },

        // notStrictEqual
        {
            code: wrapInTest("notStrictEqual();"),
            errors: [
                {
                    messageId: "unexpectedArgCountNoMessage",
                    data: {
                        callee: "notStrictEqual",
                        argCount: 0,
                    },
                },
            ],
        },
        {
            code: wrapInTest("notStrictEqual(a);"),
            errors: [
                {
                    messageId: "unexpectedArgCountNoMessage",
                    data: {
                        callee: "notStrictEqual",
                        argCount: 1,
                    },
                },
            ],
        },
        /* Allowed for now.
        {
            code: wrapInTest("notStrictEqual(a, b, c);"),
            errors: ["Unexpected call to notStrictEqual with 3 arguments and no error message."]
        },
        */
        {
            code: wrapInTest("notStrictEqual(a, b, c, 'Message');"),
            errors: [
                {
                    messageId: "unexpectedArgCount",
                    data: {
                        callee: "notStrictEqual",
                        argCount: 4,
                    },
                },
            ],
        },
        {
            code: wrapInTest("assert.notStrictEqual();"),
            errors: [
                {
                    messageId: "unexpectedArgCountNoMessage",
                    data: {
                        callee: "assert.notStrictEqual",
                        argCount: 0,
                    },
                },
            ],
        },
        {
            code: wrapInTest("assert.notStrictEqual(a);"),
            errors: [
                {
                    messageId: "unexpectedArgCountNoMessage",
                    data: {
                        callee: "assert.notStrictEqual",
                        argCount: 1,
                    },
                },
            ],
        },
        /* Allowed for now.
        {
            code: wrapInTest("assert.notStrictEqual(a, b, c);"),
            errors: ["Unexpected call to assert.notStrictEqual with 3 arguments and no error message."]
        },
        */
        {
            code: wrapInTest("assert.notStrictEqual(a, b, c, 'Message');"),
            errors: [
                {
                    messageId: "unexpectedArgCount",
                    data: {
                        callee: "assert.notStrictEqual",
                        argCount: 4,
                    },
                },
            ],
        },

        // notDeepEqual
        {
            code: wrapInTest("notDeepEqual();"),
            errors: [
                {
                    messageId: "unexpectedArgCountNoMessage",
                    data: {
                        callee: "notDeepEqual",
                        argCount: 0,
                    },
                },
            ],
        },
        {
            code: wrapInTest("notDeepEqual(a);"),
            errors: [
                {
                    messageId: "unexpectedArgCountNoMessage",
                    data: {
                        callee: "notDeepEqual",
                        argCount: 1,
                    },
                },
            ],
        },
        /* Allowed for now.
        {
            code: wrapInTest("notDeepEqual(a, b, c);"),
            errors: ["Unexpected call to notDeepEqual with 3 arguments and no error message."]
        },
        */
        {
            code: wrapInTest("notDeepEqual(a, b, c, 'Message');"),
            errors: [
                {
                    messageId: "unexpectedArgCount",
                    data: {
                        callee: "notDeepEqual",
                        argCount: 4,
                    },
                },
            ],
        },
        {
            code: wrapInTest("assert.notDeepEqual();"),
            errors: [
                {
                    messageId: "unexpectedArgCountNoMessage",
                    data: {
                        callee: "assert.notDeepEqual",
                        argCount: 0,
                    },
                },
            ],
        },
        {
            code: wrapInTest("assert.notDeepEqual(a);"),
            errors: [
                {
                    messageId: "unexpectedArgCountNoMessage",
                    data: {
                        callee: "assert.notDeepEqual",
                        argCount: 1,
                    },
                },
            ],
        },
        /* Allowed for now.
        {
            code: wrapInTest("assert.notDeepEqual(a, b, c);"),
            errors: ["Unexpected call to assert.notDeepEqual with 3 arguments and no error message."]
        },
        */
        {
            code: wrapInTest("assert.notDeepEqual(a, b, c, 'Message');"),
            errors: [
                {
                    messageId: "unexpectedArgCount",
                    data: {
                        callee: "assert.notDeepEqual",
                        argCount: 4,
                    },
                },
            ],
        },

        // notPropEqual
        {
            code: wrapInTest("notPropEqual();"),
            errors: [
                {
                    messageId: "unexpectedArgCountNoMessage",
                    data: {
                        callee: "notPropEqual",
                        argCount: 0,
                    },
                },
            ],
        },
        {
            code: wrapInTest("notPropEqual(a);"),
            errors: [
                {
                    messageId: "unexpectedArgCountNoMessage",
                    data: {
                        callee: "notPropEqual",
                        argCount: 1,
                    },
                },
            ],
        },
        /* Allowed for now.
        {
            code: wrapInTest("notPropEqual(a, b, c);"),
            errors: ["Unexpected call to notPropEqual with 3 arguments and no error message."]
        },
        */
        {
            code: wrapInTest("notPropEqual(a, b, c, 'Message');"),
            errors: [
                {
                    messageId: "unexpectedArgCount",
                    data: {
                        callee: "notPropEqual",
                        argCount: 4,
                    },
                },
            ],
        },
        {
            code: wrapInTest("assert.notPropEqual();"),
            errors: [
                {
                    messageId: "unexpectedArgCountNoMessage",
                    data: {
                        callee: "assert.notPropEqual",
                        argCount: 0,
                    },
                },
            ],
        },
        {
            code: wrapInTest("assert.notPropEqual(a);"),
            errors: [
                {
                    messageId: "unexpectedArgCountNoMessage",
                    data: {
                        callee: "assert.notPropEqual",
                        argCount: 1,
                    },
                },
            ],
        },
        /* Allowed for now.
        {
            code: wrapInTest("assert.notPropEqual(a, b, c);"),
            errors: ["Unexpected call to assert.notPropEqual with 3 arguments and no error message."]
        },
        */
        {
            code: wrapInTest("assert.notPropEqual(a, b, c, 'Message');"),
            errors: [
                {
                    messageId: "unexpectedArgCount",
                    data: {
                        callee: "assert.notPropEqual",
                        argCount: 4,
                    },
                },
            ],
        },
    ],
});

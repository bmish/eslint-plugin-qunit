/**
 * @fileoverview Enforce use of objects as expected values in `assert.propEqual`
 * @author Kevin Partington
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import rule from "../../../lib/rules/require-object-in-propequal";
import { RuleTester } from "eslint";
import { wrapInTest, wrapInArrowTest } from "../../testUtils";

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

/**
 * @param {string} assertionCode
 * @param {string} invalidValue
 * @returns {{code: string, errors: {messageId: string, data: Record<string, string>}[]}}
 */
function createInvalid(assertionCode, invalidValue) {
    return {
        code: wrapInTest(assertionCode),
        errors: [
            {
                messageId: "useObject",
                data: {
                    value: invalidValue,
                },
            },
        ],
    };
}

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
    languageOptions: {
        parserOptions: {
            ecmaFeatures: {
                jsx: true,
            },
        },
    },
});

ruleTester.run("require-object-in-propequal", rule, {
    valid: [
        // Object expressions/array expressions
        wrapInTest("assert.propEqual(actual, { foo: 'bar' });"),
        wrapInTest("assert.propEqual(actual, ['string']);"),

        // Identifiers, member expressions, calls, and new expressions are fine
        wrapInTest("assert.propEqual(actual, someVar);"),
        wrapInTest("assert.propEqual(actual, obj.prop);"),
        wrapInTest("assert.propEqual(actual, func());"),
        wrapInTest("assert.propEqual(actual, new Foo());"),

        // this is fine
        wrapInTest("assert.propEqual(actual, this);"),

        // Global assertion
        wrapInTest("propEqual(actual, { foo: 'bar' });"),

        // Not propEqual
        wrapInTest("assert.deepEqual(actual, { foo: 'bar' });"),
        wrapInTest("assert.deepEqual(actual, 0);"),
        wrapInTest("assert.deepEqual(actual, -1);"),
        wrapInTest("assert.deepEqual(actual, 'string');"),
        wrapInTest("assert.deepEqual(actual, `template`);"),
        wrapInTest("assert.deepEqual(actual, true);"),
        wrapInTest("assert.deepEqual(actual, false);"),
        wrapInTest("assert.deepEqual(actual, null);"),
        wrapInTest("assert.deepEqual(actual, /regex/);"),
        wrapInTest("assert.deepEqual(actual, ++foo);"),
        wrapInTest("assert.deepEqual(actual, foo++);"),
        wrapInTest("assert.deepEqual(actual, --foo);"),
        wrapInTest("assert.deepEqual(actual, foo--);"),
        wrapInTest("assert.deepEqual(actual, <JSX />);"),

        wrapInTest("assert.deepEqual(actual, 0n);"),

        wrapInTest("assert.propEqual(actual, foo?.bar);"),
        wrapInTest("assert.propEqual(actual, foo?.bar?.());"),
    ],

    invalid: [
        createInvalid(wrapInTest("assert.propEqual(actual, 0);"), "0"),
        createInvalid(wrapInArrowTest("assert.propEqual(actual, 0);"), "0"),
        createInvalid(wrapInTest("assert.propEqual(actual, -1);"), "-1"),
        createInvalid(
            wrapInTest("assert.propEqual(actual, 'string');"),
            "'string'",
        ),
        createInvalid(
            wrapInTest("assert.propEqual(actual, `template`);"),
            "`template`",
        ),
        createInvalid(wrapInTest("assert.propEqual(actual, true);"), "true"),
        createInvalid(wrapInTest("assert.propEqual(actual, false);"), "false"),
        createInvalid(wrapInTest("assert.propEqual(actual, null);"), "null"),
        createInvalid(
            wrapInTest("assert.propEqual(actual, /regex/);"),
            "/regex/",
        ),
        createInvalid(wrapInTest("assert.propEqual(actual, ++foo);"), "++foo"),
        createInvalid(wrapInTest("assert.propEqual(actual, foo++);"), "foo++"),
        createInvalid(wrapInTest("assert.propEqual(actual, --foo);"), "--foo"),
        createInvalid(wrapInTest("assert.propEqual(actual, foo--);"), "foo--"),
        createInvalid(
            wrapInTest("assert.propEqual(actual, <JSX />)"),
            "<JSX />",
        ),
        createInvalid(wrapInTest("assert.propEqual(actual, 0n);"), "0n"),
    ],
});

/**
 * @fileoverview Forbid the use of QUnit.only.
 * @author Kevin Partington
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import rule from "../../../lib/rules/no-only";
import { RuleTester } from "eslint";

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

ruleTester.run("no-only", rule, {
    valid: [
        "QUnit.module.test('Name', function() { });",
        "QUnit.test('Name', function() { });",
        "module.test('Name', function() { });",
        "test('Name', function() { });",
    ],

    invalid: [
        {
            code: "QUnit.module.only('Name', function() { });",
            errors: [
                {
                    messageId: "noQUnitOnly",
                },
            ],
        },
        {
            code: "QUnit.only('Name', function() { });",
            errors: [
                {
                    messageId: "noQUnitOnly",
                },
            ],
        },
        {
            code: "module.only('Name', function() { });",
            errors: [
                {
                    messageId: "noQUnitOnly",
                },
            ],
        },
        {
            code: "only('Name', function() { });",
            errors: [
                {
                    messageId: "noQUnitOnly",
                },
            ],
        },
        {
            code: "test.only('Name', function() { });",
            errors: [
                {
                    messageId: "noQUnitOnly",
                },
            ],
        },
    ],
});

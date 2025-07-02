/**
 * @fileoverview Forbid the use of QUnit.skip
 * @author Steve Calvert
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import rule from "../../../lib/rules/no-skip.js";
import { RuleTester } from "eslint";

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

ruleTester.run("no-skip", rule, {
    valid: [
        "QUnit.module.test('Name', function() { });",
        "QUnit.test('Name', function() { });",
        "module.test('Name', function() { });",
        "test('Name', function() { });",
    ],

    invalid: [
        {
            code: "QUnit.module.skip('Name', function() { });",
            errors: [{ messageId: "noQUnitSkip" }],
        },
        {
            code: "QUnit.skip('Name', function() { });",
            errors: [{ messageId: "noQUnitSkip" }],
        },
        {
            code: "module.skip('Name', function() { });",
            errors: [{ messageId: "noQUnitSkip" }],
        },
        {
            code: "skip('Name', function() { });",
            errors: [{ messageId: "noQUnitSkip" }],
        },
        {
            code: "test.skip('Name', function() { });",
            errors: [{ messageId: "noQUnitSkip" }],
        },
    ],
});

/**
 * @fileoverview Forbid the use of QUnit.stop.
 * @author Kevin Partington
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import rule from "../../../lib/rules/no-qunit-stop.js";
import { RuleTester } from "eslint";

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("no-qunit-stop", rule, {
    valid: ["var done = assert.async();"],

    invalid: [
        {
            code: "QUnit.stop();",
            errors: [
                {
                    messageId: "noQUnitStop",
                    type: "CallExpression",
                },
            ],
        },
        {
            code: "QUnit.stop(2);",
            errors: [
                {
                    messageId: "noQUnitStop",
                    type: "CallExpression",
                },
            ],
        },
    ],
});

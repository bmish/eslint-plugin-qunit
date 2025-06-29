/**
 * @fileoverview Forbid the use of QUnit.push.
 * @author Kevin Partington
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import rule from "../../../lib/rules/no-qunit-push";
import { RuleTester } from "eslint";

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("no-qunit-push", rule, {
    valid: [
        "this.pushResult({ result: result, actual: actual, expected: expected, message: message });",
    ],

    invalid: [
        {
            code: "QUnit.push(result, actual, expected, message);",
            errors: [
                {
                    messageId: "noQUnitPush",
                    type: "CallExpression",
                },
            ],
        },
    ],
});

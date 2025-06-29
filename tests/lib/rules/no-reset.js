/**
 * @fileoverview Forbids use of QUnit.reset.
 * @author Kevin Partington
 * @copyright 2016 Kevin Partington. All rights reserved.
 * See LICENSE file in root directory for full license.
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import rule from "../../../lib/rules/no-reset";
import { RuleTester } from "eslint";

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("no-reset", rule, {
    valid: [
        // Only invocations are reported
        "QUnit.reset",

        // Only QUnit.reset() is reported
        "QUnit.init()",
    ],

    invalid: [
        {
            code: "QUnit.reset();",
            errors: [
                {
                    messageId: "noReset",
                    type: "CallExpression",
                },
            ],
        },
    ],
});

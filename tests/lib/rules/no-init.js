/**
 * @fileoverview Forbids use of QUnit.init.
 * @author Kevin Partington
 * @copyright 2016 Kevin Partington. All rights reserved.
 * See LICENSE file in root directory for full license.
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import rule from "../../../lib/rules/no-init";
import { RuleTester } from "eslint";

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("no-init", rule, {
    valid: [
        // Only invocations are reported
        "QUnit.init",

        // Only QUnit.init() is reported
        "QUnit.reset()",
    ],

    invalid: [
        {
            code: "QUnit.init();",
            errors: [
                {
                    messageId: "noInit",
                    type: "CallExpression",
                },
            ],
        },
    ],
});

/**
 * @fileoverview Forbid use of QUnit.jsDump().
 * @author Kevin Partington
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import rule from "../../../lib/rules/no-jsdump.js";
import { RuleTester } from "eslint";

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("no-jsdump", rule, {
    valid: ["QUnit.dump(obj);"],

    invalid: [
        {
            code: "QUnit.jsDump(obj);",
            errors: [
                {
                    messageId: "noJsDump",
                    type: "CallExpression",
                },
            ],
        },
    ],
});

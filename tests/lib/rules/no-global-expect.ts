/**
 * @fileoverview Forbid the use of global expect.
 * @author Kevin Partington
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import rule from "../../../lib/rules/no-global-expect.js";
import { RuleTester } from "eslint";
import { wrapInTest } from "../../testUtils.js";

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

ruleTester.run("no-global-expect", rule, {
    valid: [
        wrapInTest("assert.expect(1);"),
        {
            code: wrapInTest("assert.expect(1);"),
            languageOptions: { globals: { expect: true } },
        },

        // Global overridden by local import/declaration.
        {
            code: `import expect from 'foo'; ${wrapInTest("expect(1);")}`,
            languageOptions: { globals: { expect: true } },
        },
        {
            code: `import { expect } from 'foo'; ${wrapInTest("expect(1);")}`,
            languageOptions: { globals: { expect: true } },
        },
        {
            code: `var expect = require('foo'); ${wrapInTest("expect(1);")}`,
            languageOptions: { globals: { expect: true } },
        },
        {
            code: `var expect = () => {}; ${wrapInTest("expect(1);")}`,
            languageOptions: { globals: { expect: true } },
        },
        {
            code: `function expect() {}; ${wrapInTest("expect(1);")}`,
            languageOptions: { globals: { expect: true } },
        },
    ],

    invalid: [
        {
            code: wrapInTest("expect(1)"),
            languageOptions: { globals: { expect: true } },
            errors: [
                {
                    messageId: "unexpectedGlobalExpect",
                    type: "CallExpression",
                },
            ],
        },
    ],
});

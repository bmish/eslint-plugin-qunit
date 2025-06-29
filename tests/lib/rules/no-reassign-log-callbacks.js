/**
 * @fileoverview Forbid overwriting of QUnit logging callbacks.
 * @author Kevin Partington
 * @copyright 2016 Kevin Partington. All rights reserved.
 * See LICENSE file in root directory for full license.
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import rule from "../../../lib/rules/no-reassign-log-callbacks";
import { RuleTester } from "eslint";

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("no-reassign-log-callbacks", rule, {
    valid: [
        "QUnit.begin(function () { });",
        "QUnit.done(function () { });",
        "QUnit.log(function () { });",
        "QUnit.moduleDone(function () { });",
        "QUnit.moduleStart(function () { });",
        "QUnit.testDone(function () { });",
        "QUnit.testStart(function () { });",

        // Assigning to other QUnit properties is okay
        "QUnit.blah = function () { };",
    ],

    invalid: [
        {
            code: "QUnit.begin = function () { };",
            errors: [
                {
                    messageId: "noReassignLogCallbacks",
                    type: "AssignmentExpression",
                },
            ],
        },
        {
            code: "QUnit.done = function () { };",
            errors: [
                {
                    messageId: "noReassignLogCallbacks",
                    type: "AssignmentExpression",
                },
            ],
        },
        {
            code: "QUnit.log = function () { };",
            errors: [
                {
                    messageId: "noReassignLogCallbacks",
                    type: "AssignmentExpression",
                },
            ],
        },
        {
            code: "QUnit.moduleDone = function () { };",
            errors: [
                {
                    messageId: "noReassignLogCallbacks",
                    type: "AssignmentExpression",
                },
            ],
        },
        {
            code: "QUnit.moduleStart = function () { };",
            errors: [
                {
                    messageId: "noReassignLogCallbacks",
                    type: "AssignmentExpression",
                },
            ],
        },
        {
            code: "QUnit.testDone = function () { };",
            errors: [
                {
                    messageId: "noReassignLogCallbacks",
                    type: "AssignmentExpression",
                },
            ],
        },
        {
            code: "QUnit.testStart = function () { };",
            errors: [
                {
                    messageId: "noReassignLogCallbacks",
                    type: "AssignmentExpression",
                },
            ],
        },
    ],
});

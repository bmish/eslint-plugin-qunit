/**
 * @fileoverview Utility functions used by one or more rules.
 * @author Ed Sanders
 */

/**
 * @param {string} assertionCode
 * @returns {string}
 */
export function wrapInTest(assertionCode) {
    return `QUnit.test('test', function (assert) { ${assertionCode} });`;
}

/**
 * @param {string} assertionCode
 * @returns {string}
 */
export function wrapInArrowTest(assertionCode) {
    return `QUnit.test('test', (assert) => { ${assertionCode} });`;
}

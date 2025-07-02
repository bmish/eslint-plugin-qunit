/**
 * @fileoverview Utility functions used by one or more rules.
 * @author Ed Sanders
 */

export function wrapInTest(assertionCode: string): string {
    return `QUnit.test('test', function (assert) { ${assertionCode} });`;
}

export function wrapInArrowTest(assertionCode: string): string {
    return `QUnit.test('test', (assert) => { ${assertionCode} });`;
}

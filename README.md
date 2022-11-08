# eslint-plugin-qunit

[![NPM version](https://img.shields.io/npm/v/eslint-plugin-qunit.svg?style=flat)](https://npmjs.org/package/eslint-plugin-qunit)
![CI](https://github.com/platinumazure/eslint-plugin-qunit/workflows/CI/badge.svg)
[![Coverage Status](https://coveralls.io/repos/platinumazure/eslint-plugin-qunit/badge.svg?branch=master&service=github)](https://coveralls.io/github/platinumazure/eslint-plugin-qunit?branch=master)
[![Join the chat at https://gitter.im/platinumazure/eslint-plugin-qunit](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/platinumazure/eslint-plugin-qunit?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

ESLint plugin containing rules useful for QUnit tests.

## Configurations

You can extend from a configuration in order to simplify manual configuration of plugin rules in your project.

For more details on how to extend your configuration from a plugin configuration, please see the [ESLint plugin configuration documentation](https://eslint.org/docs/user-guide/configuring#using-the-configuration-from-a-plugin).

|     | Name | Description |
| :-- | :--- | :---------- |
| ✅ | recommended | This configuration includes rules which I recommend to avoid QUnit runtime errors or incorrect behavior, some of which can be difficult to debug. Some of these rules also encourage best practices that help QUnit work better for you. You can use this configuration by extending from `"plugin:qunit/recommended"` in your configuration file. |

## Rules

<!-- begin auto-generated rules list -->

💼 [Configurations](https://github.com/platinumazure/eslint-plugin-qunit/blob/master/README.md#configurations) enabled in.\
✅ Set in the `recommended` [configuration](https://github.com/platinumazure/eslint-plugin-qunit/blob/master/README.md#configurations).\
🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).\
❌ Deprecated.

| Name                                                                                                     | Description                                                  | 💼 | 🔧 | ❌  |
| :------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------- | :- | :- | :- |
| [nested/assert-args](docs/rules/nested/assert-args.md)                                                   | enforce that the correct number of assert arguments are used |    |    | ❌  |
| [nested/nested2/no-assert-logical-expression](docs/rules/nested/nested2/no-assert-logical-expression.md) | disallow binary logical expressions in assert arguments      |    |    | ❌  |
| [no-jsdump](docs/rules/no-jsdump.md)                                                                     | disallow use of QUnit.jsDump                                 | ✅  |    | ❌  |
| [no-negated-ok](docs/rules/no-negated-ok.md)                                                             | disallow negation in assert.ok/assert.notOk                  | ✅  | 🔧 | ❌  |

<!-- end auto-generated rules list -->

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/platinumazure"><img src="https://avatars.githubusercontent.com/u/284282?v=3?s=100" width="100px;" alt=""/><br /><sub><b>Kevin Partington</b></sub></a><br /><a href="https://github.com/platinumazure/eslint-plugin-qunit/commits?author=platinumazure" title="Code">💻</a> <a href="https://github.com/platinumazure/eslint-plugin-qunit/commits?author=platinumazure" title="Documentation">📖</a> <a href="https://github.com/platinumazure/eslint-plugin-qunit/commits?author=platinumazure" title="Tests">⚠️</a> <a href="https://github.com/platinumazure/eslint-plugin-qunit/issues?q=author%3Aplatinumazure" title="Bug reports">🐛</a> <a href="#example-platinumazure" title="Examples">💡</a> <a href="https://github.com/platinumazure/eslint-plugin-qunit/pulls?q=is%3Apr+reviewed-by%3Aplatinumazure" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://jordaneldredge.com"><img src="https://avatars.githubusercontent.com/u/162735?v=3?s=100" width="100px;" alt=""/><br /><sub><b>Jordan Eldredge</b></sub></a><br /><a href="https://github.com/platinumazure/eslint-plugin-qunit/commits?author=captbaritone" title="Tests">⚠️</a> <a href="#question-captbaritone" title="Answering Questions">💬</a></td>
    <td align="center"><a href="https://github.com/mitchlloyd"><img src="https://avatars.githubusercontent.com/u/15169?v=3?s=100" width="100px;" alt=""/><br /><sub><b>Mitch Lloyd</b></sub></a><br /><a href="https://github.com/platinumazure/eslint-plugin-qunit/commits?author=mitchlloyd" title="Code">💻</a> <a href="https://github.com/platinumazure/eslint-plugin-qunit/commits?author=mitchlloyd" title="Documentation">📖</a> <a href="https://github.com/platinumazure/eslint-plugin-qunit/commits?author=mitchlloyd" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/jmainz"><img src="https://avatars.githubusercontent.com/u/6665906?v=3?s=100" width="100px;" alt=""/><br /><sub><b>John Mainz</b></sub></a><br /><a href="https://github.com/platinumazure/eslint-plugin-qunit/commits?author=jmainz" title="Tests">⚠️</a> <a href="https://github.com/platinumazure/eslint-plugin-qunit/issues?q=author%3Ajmainz" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/Turbo87"><img src="https://avatars1.githubusercontent.com/u/141300?v=3?s=100" width="100px;" alt=""/><br /><sub><b>Tobias Bieniek</b></sub></a><br /><a href="https://github.com/platinumazure/eslint-plugin-qunit/commits?author=Turbo87" title="Code">💻</a> <a href="https://github.com/platinumazure/eslint-plugin-qunit/commits?author=Turbo87" title="Documentation">📖</a> <a href="https://github.com/platinumazure/eslint-plugin-qunit/commits?author=Turbo87" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://twitter.com/netweb"><img src="https://avatars1.githubusercontent.com/u/1016458?v=3?s=100" width="100px;" alt=""/><br /><sub><b>Stephen Edgar</b></sub></a><br /><a href="https://github.com/platinumazure/eslint-plugin-qunit/issues?q=author%3Antwb" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://timotijhof.net"><img src="https://avatars3.githubusercontent.com/u/156867?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Timo Tijhof</b></sub></a><br /><a href="https://github.com/platinumazure/eslint-plugin-qunit/commits?author=Krinkle" title="Documentation">📖</a> <a href="#ideas-Krinkle" title="Ideas, Planning, & Feedback">🤔</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/edg2s"><img src="https://avatars3.githubusercontent.com/u/180672?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Ed S</b></sub></a><br /><a href="https://github.com/platinumazure/eslint-plugin-qunit/issues?q=author%3Aedg2s" title="Bug reports">🐛</a> <a href="https://github.com/platinumazure/eslint-plugin-qunit/commits?author=edg2s" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Techn1x"><img src="https://avatars1.githubusercontent.com/u/1049837?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Brad Overton</b></sub></a><br /><a href="https://github.com/platinumazure/eslint-plugin-qunit/issues?q=author%3ATechn1x" title="Bug reports">🐛</a> <a href="https://github.com/platinumazure/eslint-plugin-qunit/commits?author=Techn1x" title="Code">💻</a></td>
    <td align="center"><a href="https://sha.nemart.in"><img src="https://avatars3.githubusercontent.com/u/95600?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Shane Martin</b></sub></a><br /><a href="https://github.com/platinumazure/eslint-plugin-qunit/issues?q=author%3Ashamrt" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/ventuno"><img src="https://avatars3.githubusercontent.com/u/5890858?v=4?s=100" width="100px;" alt=""/><br /><sub><b>ventuno</b></sub></a><br /><a href="https://github.com/platinumazure/eslint-plugin-qunit/commits?author=ventuno" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Krysthalia"><img src="https://avatars0.githubusercontent.com/u/38167520?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Anne-Gaëlle Schall</b></sub></a><br /><a href="https://github.com/platinumazure/eslint-plugin-qunit/issues?q=author%3AKrysthalia" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://www.linkedin.com"><img src="https://avatars2.githubusercontent.com/u/180990?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Steve Calvert</b></sub></a><br /><a href="https://github.com/platinumazure/eslint-plugin-qunit/commits?author=scalvert" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/aliaksandr-yermalayeu"><img src="https://avatars3.githubusercontent.com/u/14282348?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Aliaksandr Yermalayeu</b></sub></a><br /><a href="https://github.com/platinumazure/eslint-plugin-qunit/commits?author=aliaksandr-yermalayeu" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://www.linkedin.com/in/bmish"><img src="https://avatars3.githubusercontent.com/u/698306?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Bryan Mishkin</b></sub></a><br /><a href="https://github.com/platinumazure/eslint-plugin-qunit/issues?q=author%3Abmish" title="Bug reports">🐛</a> <a href="https://github.com/platinumazure/eslint-plugin-qunit/commits?author=bmish" title="Code">💻</a> <a href="https://github.com/platinumazure/eslint-plugin-qunit/commits?author=bmish" title="Documentation">📖</a> <a href="#ideas-bmish" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://xhmikosr.io/"><img src="https://avatars2.githubusercontent.com/u/349621?v=4?s=100" width="100px;" alt=""/><br /><sub><b>XhmikosR</b></sub></a><br /><a href="https://github.com/platinumazure/eslint-plugin-qunit/issues?q=author%3AXhmikosR" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/andreyfel"><img src="https://avatars2.githubusercontent.com/u/9370878?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Andrey Fel</b></sub></a><br /><a href="https://github.com/platinumazure/eslint-plugin-qunit/issues?q=author%3Aandreyfel" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/raycohen"><img src="https://avatars.githubusercontent.com/u/20404?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Ray Cohen</b></sub></a><br /><a href="https://github.com/platinumazure/eslint-plugin-qunit/issues?q=author%3Araycohen" title="Bug reports">🐛</a> <a href="https://github.com/platinumazure/eslint-plugin-qunit/commits?author=raycohen" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/DBattou"><img src="https://avatars.githubusercontent.com/u/16645938?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Baptiste Doucerain</b></sub></a><br /><a href="https://github.com/platinumazure/eslint-plugin-qunit/commits?author=DBattou" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/ddzz"><img src="https://avatars.githubusercontent.com/u/3535749?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Darius Dzien</b></sub></a><br /><a href="#maintenance-ddzz" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://github.com/dwickern"><img src="https://avatars.githubusercontent.com/u/752885?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Derek Wickern</b></sub></a><br /><a href="https://github.com/platinumazure/eslint-plugin-qunit/issues?q=author%3Adwickern" title="Bug reports">🐛</a> <a href="https://github.com/platinumazure/eslint-plugin-qunit/commits?author=dwickern" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

<!-- markdownlint-disable line-length -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!

## Semantic Versioning Policy

Like ESLint itself, this ESLint plugin follows [semantic versioning](https://semver.org). However, due to the nature of ESLint as a code quality tool, it's not always clear when a minor or major version bump occurs. To help clarify this for everyone, we've defined the following semantic versioning policy, based on the policy used by ESLint:

* Patch release (intended not to break your lint build)
  * A bug fix in a plugin rule that results in ESLint reporting fewer errors.
  * Improvements to documentation.
  * Non-user-facing changes such as refactoring code; adding, deleting, or modifying tests; and increasing test coverage.
  * Re-releasing after a failed release (i.e., after having published a release that doesn't work for anyone).
* Minor release (might break your lint build)
  * A bug fix in a rule that results in ESLint reporting more errors.
  * A new rule is created (without being added to plugin configuration).
  * A new option to an existing rule is created (without any default options changing).
  * A new plugin configuration is created.
  * An existing rule is deprecated.
* Major release (likely to break your lint build)
  * An existing plugin configuration is changed in any way, including but not limited to:
    * A new rule is added to the configuration.
    * A rule is removed from the configuration.
    * The options used in configuration for a rule are changed
  * An existing rule is removed.
  * A backward-incompatible change is made to the options of a rule.

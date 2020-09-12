# Difference between eslint-config and eslint-plugin

- A plugin is a superset of a sharable config.
- A plugin can contain and export all of the following:

  - custom rules
  - configurations that can be extended in rules
  - processors
  - parsers (?)

- A sharable configuration can only export configurations
- If you want to extend a configuration, the syntax is different depending on if it's a config package or a plugin.

  - Config package: `"extends": ["foo"]` (extends eslint-config-foo)
  - Plugin: `"extends": ["plugin:foo/bar"]` (extends the bar configuration from eslint-plugin-foo)

- And as for which to use... If you're consuming a config in your own project, that just depends on what the config author published it as.
- If you're creating your own config for others to use, then I always ask myself this question: Is there any chance I might need to create a custom rule or a processor which would make sense with this configuration? If the answer is yes-- even 1% chance-- it's better to create a plugin.

# Configuration

- There are two ways to use configuration files.
- The first way to use configuration files is via `.eslintrc.*` and `package.json` files.
- ESLint will automatically look for them in the directory of the file to be linted, and in successive parent directories all the way up to the root directory of the filesystem (unless `root: true` is specified).
- The second is to save the file wherever you would like and pass its location to the CLI using the `-c` option,
- If you wish to use only 1 configuration file and want ESLint to ignore any `.eslintrc.*` files, make sure to use `--no-eslintrc` along with the `-c` flag.

## Configuration hierarchy

The configuration cascade works by using the closest .eslintrc file to the file being linted as the highest priority, then any configuration files in the parent directory, and so on.

```
your-project
├── .eslintrc
├── lib
│ └── source.js
└─┬ tests
  ├── .eslintrc
  └── test.js
```

- When you run ESLint on this project, all files in `lib/` will use the `.eslintrc` file at the root of the project as their configuration.
- When ESLint traverses into the `tests/` directory, it will then use `your-project/tests/.eslintrc` in addition to `your-project/.eslintrc`. So `your-project/tests/test.js` is linted based on the combination of the two `.eslintrc` files in its directory hierarchy, with the closest one taking priority.
- In this way, you can have project-level ESLint settings and also have directory-specific overrides.

- By default, ESLint will look for configuration files in all parent folders up to the root directory.

  - To limit ESLint to a specific project, place `"root": true` inside the eslintConfig field of the `package.json` file or in the `.eslintrc.*` file at your project's root level. ESLint will stop looking in parent folders once it finds a configuration with `"root": true`.

- If there is an `.eslintrc` and a `package.json` file found in the same directory, `.eslintrc` will take a priority and `package.json` file will not be used. (configuration file type precedence)

## ESLint supports configuration files in several formats

- JavaScript - use .eslintrc.js and export an object containing your configuration.
- JavaScript (ESM) - use .eslintrc.cjs when running ESLint in JavaScript packages that - specify "type":"module" in their package.json. Note that ESLint does not support ESM - configuration at this time.
- YAML - use .eslintrc.yaml or .eslintrc.yml to define the configuration structure.
- JSON - use .eslintrc.json to define the configuration structure. ESLint's JSON files - also allow JavaScript-style comments.
- Deprecated - use .eslintrc, which can be either JSON or YAML.
- package.json - create an eslintConfig property in your package.json file and define - your configuration there.
- If there are multiple configuration files in the same directory, ESLint will only use one. The priority order is:

1. .eslintrc.js
2. .eslintrc.cjs
3. .eslintrc.yaml
4. .eslintrc.yml
5. .eslintrc.json
6. .eslintrc
7. package.json

## The complete configuration hierarchy, from highest precedence to lowest precedence, is as follows:

1. Inline configuration (via comments)
2. CLI options
3. Project level configurations

# Configuring plugins

- ESLint supports the use of third-party plugins. Before using the plugin, you have to install it using npm.
- The eslint-plugin- prefix can be omitted from the plugin name.
- To configure plugins inside of a configuration file, use the plugins key

```
{
    "plugins": [
        "plugin1",
        "eslint-plugin-plugin2"
    ]
}
```

- **Plugins are resolved relative to the config file**. In other words, ESLint will load the plugin as a user would obtain by running `require('eslint-plugin-pluginname')` in the config file.
- Plugins in the base configuration (loaded by extends setting) are relative to the derived config file.

For example, if `./.eslintrc` has `extends: ["foo"]` and the `eslint-config-foo has plugins: ["bar"]`, ESLint finds the `eslint-plugin-bar` from `./node_modules/` (rather than `./node_modules/eslint-config-foo/node_modules/`) or ancestor directories. Thus every plugin in the config file and base configurations is resolved uniquely.

- Plugins have a naming convention of `eslint-plugin-` prefix
  - The `eslint-plugin-` prefix can be omitted for non-scoped packages

```
{
  // ...
  "plugins": [
      "jquery", // means eslint-plugin-jquery
      "@jquery/jquery", // means @jquery/eslint-plugin-jquery
      "@foobar" // means @foobar/eslint-plugin
  ]
  // ...
}
```

- When using rules, environments or configs defined by plugins, they must be referenced following the convention:

- `eslint-plugin-foo` → `foo/a-rule`
- `@foo/eslint-plugin` → `@foo/a-config`
- `@foo/eslint-plugin-bar` → `@foo/bar/a-environment`

```
{
  // ...
  "plugins": [
      "jquery",   // eslint-plugin-jquery
      "@foo/foo", // @foo/eslint-plugin-foo
      "@bar"      // @bar/eslint-plugin
  ],
  "extends": [
      "plugin:@foo/foo/recommended",
      "plugin:@bar/recommended"
  ],
  "rules": {
      "jquery/a-rule": "error",
      "@foo/foo/some-rule": "error",
      "@bar/another-rule": "error"
  },
  "env": {
      "jquery/jquery": true,
      "@foo/foo/env-foo": true,
      "@bar/env-bar": true,
  }
  // ...
}
```

# Shared data

- ESLint supports adding shared settings into configuration file.
- You can add settings object to ESLint configuration file and it will be supplied to every rule that will be executed.

# Configuring rules

To change a rule setting, you must set the rule ID equal to one of these values:

- "off" or 0 - turn the rule off
- "warn" or 1 - turn the rule on as a warning (doesn't affect exit code)
- "error" or 2 - turn the rule on as an error (exit code is 1 when triggered)

- To configure rules inside of a file using configuration comments, use a comment in the following format

```
/* eslint eqeqeq: "off", curly: "error" */
/* eslint eqeqeq: 0, curly: 2 */
```

- If a rule has additional options, you can specify them using array literal syntax

```
/* eslint quotes: ["error", "double"], curly: 2 */
```

- To disable all inline config comments, use `noInlineConfig` setting.
  - This setting is similar to `--no-inline-config` CLI option.
- To report unused `eslint-disable` comments, use `reportUnusedDisableDirectives` setting.
  - This setting is similar to `--report-unused-disable-directives` CLI option, but doesn't fail linting (reports as "warn" severity).

```
{
  "rules": {...},
  "noInlineConfig": true
  "reportUnusedDisableDirectives": true
}
```

- To disable rules inside of a configuration file for a group of files, use the overrides key along with a files key.

```
{
  "rules": {...},
  "overrides": [
    {
      "files": ["*-test.js","*.spec.js"],
      "rules": {
        "no-unused-expressions": "off"
      }
    }
  ]
}
```

- to disable plugin rules, for example, to disable `eslint-plugin-example`'s `rule-name` rule, combine the plugin's name (example) and the rule's name (rule-name) into `example/rule-name`:

```
foo(); // eslint-disable-line example/rule-name
foo(); /* eslint-disable-line example/rule-name */
```

- Configuration comments can include descriptions to explain why the comment is necessary. The description must occur after the configuration and is separated from the configuration by two or more consecutive `-` characters

```
// eslint-disable-next-line no-console -- Here's a description about why this configuration is necessary.

/* eslint eqeqeq: "off", curly: "error"
 * --------
 * This will not work due to the line above starting with a '*' character.
 */
```

# Extending configuration files

- A config provides preconfigured rules. These rules can consist of ESLint rules, third party plugin rules or other configurations such as the parser (babel, esprima, ...), options (sourceType, ...), env (ES6, ...), and so on.
- The `extends` property value can omit the `eslint-config-` prefix of the package name.
- The `extends` property is either
  - a string; specifies a path to a config file, the name of a sharable config, "eslint:recommend" or "eslint:all"
    - using "eslint:recommended" enables a subset of core rules that report common problems, which have a check mark on the rules page.
      - The recommended subset can change only at major versions of ESLint.
    - using "eslint:all" enable all core rules in the currently installed version of ESLint
      - The set of core rules can change at any minor or major version of ESLint.
      - This configuration is not recommended for production use because it changes with every minor and major version of ESLint.
  - an array of strings; each additional configuration extends the preceding configurations
- relative paths and sharable config names in an `extends` property are resolved from the location of the config file
- the configs are extended recursively
- the following can cause `rule` properties to extend or override the current set of rules
  - change an **inherited** rule's severity without changing its options:
    - Base config: "eqeqeq": ["error", "allow-null"]
    - Derived config: "eqeqeq": "warn"
    - Resulting actual config: "eqeqeq": ["warn", "allow-null"]
  - override options for rules
    - Base config: "quotes": ["error", "single", "avoid-escape"]
    - Derived config: "quotes": ["error", "single"]
    - Resulting actual config: "quotes": ["error", "single"]
- if the config is provided via CLI option, the glob patterns in the config are relative the the current working directory rather than the base directory of the given config.

## Sharable config package

- A sharable configuration is an npm package that exports a configuration object

## Using configurations from plugins

- some plugins export one or more named configurations
- the extends property can consist of `<plugin-name>:<package-name>[/][config-name]`
  - where `<>` is required and `[]` is optional
  - you can omit the prefix for package name

```
{
    "plugins": [
        "react"
    ],
    "extends": [
        "plugin:react/recommended"
    ]
}
```

## Specifying with Glob patterns

- Glob pattern overrides have higher precedence than the regular configuration in the same config file.
- Multiple overrides within the same config are applied in order; The last override block in a config file always has the highest precedence.
- A glob specific configuration works almost the same as any other ESLint config. Override blocks can contain any configuration options that are valid in a regular config, with the exception of `root` and `ignorePatterns`.
- Multiple glob patterns can be provided within a single override block. A file must match at least one of the supplied patterns for the configuration to apply.
- Override blocks can also specify patterns to exclude from matches. If a file matches any of the excluded patterns, the configuration won't apply.

# ignorePatterns

- You can tell ESLint to ignore specific files and directories by `ignorePatterns` in your config files
- The `ignorePatterns` property affects only the directory that the config file placed.
- You cannot write `ignorePatterns` property under `overrides` property.
- `.eslintignore` can override `ignorePatterns` property of config files.

# .eslintignore

- The .eslintignore file is a plain text file where each line is a glob pattern indicating which paths should be omitted from linting.
- When ESLint is run, it looks in the current working directory to find an .eslintignore file before determining which files to lint. **If this file is found, then those preferences are applied when traversing directories**
- Only one .eslintignore file can be used at a time, so .eslintignore files other than the one in the current working directory will not be used.
- follows .gitignore syntax
- ESLint always follows a couple implicit ignore rules even if the --no-ignore flag is passed. The implicit rules are as follows:
  - `node_modules/` is ignored.
  - Dotfiles (except for `.eslintrc.*`) as well as Dotfolders and their contents are ignored.
- Exceptions to this rule are:
  - if the path **to lint** is a glob pattern or directory path and contains a Dotfolder (e.g. `eslint .config/` will lint all Dotfolders and Dotfiles in the .config directory), all Dotfiles and Dotfolders will be linted. This includes sub-dotfiles and sub-dotfolders that are buried deeper in the directory structure.
  - if the path to lint is a specific file path and `--no-ignore` flag is passed, ESLint will still lint the file regardless of implicit ignore rules
  - Allowlist and denylist rules specified via `--ignore-pattern` or `.eslintignore` are prioritized above implicit ignore rules.

# Specify Parser and Parser options

- By default, ESLint uses Espree as its parser.
- Parser options are set in your `.eslintrc.*` file by using the `parserOptions` property.
- ESLint allows you to specify the JavaScript language options you want to support
- By default, ESLint expects ECMAScript 5 syntax.
- supporting JSX syntax is not the same as supporting React. React applies specific semantics to JSX syntax that ESLint doesn't recognize.
- supporting ES6 syntax is not the same as supporting new ES6 globals
- For ES6 syntax, use `{ "parserOptions": { "ecmaVersion": 6 } };`
- for new ES6 global variables use `{ "env": { "es6": true } }`.
  - `{ "env": { "es6": true } }` enables ES6 syntax automatically, but `{ "parserOptions": { "ecmaVersion": 6 } }` does not enable ES6 globals automatically.

# Specify Processor

- Processors can extract JavaScript code from another kind of files, then lets ESLint lint the JavaScript code
- processors can convert JavaScript code in preprocessing for some purpose.
- Plugins may provide processors.
- the following enables the processor `a-processor` that the plugin `a-plugin` provided:

```
{
    "plugins": ["a-plugin"],
    "processor": "a-plugin/a-processor"
}
```

- To specify processors for specific kinds of files, use the combination of the `overrides` key and the `processor` key.

```
{
    "plugins": ["a-plugin"],
    "overrides": [
        {
            "files": ["*.md"],
            "processor": "a-plugin/markdown"
        }
    ]
}
```

# using eslint-plugin-prettier

- These plugins were especially useful when Prettier was new. By running Prettier inside your linters, you didn’t have to set up any new infrastructure and you could re-use your editor integrations for the linters. But these days you can run `prettier --check` . and most editors have Prettier support.

The downsides of those plugins are:

- You end up with a lot of red squiggly lines in your editor, which gets annoying. Prettier is supposed to make you forget about formatting – and not be in your face about it!
- They are slower than running Prettier directly.
- They’re yet one layer of indirection where things may break.

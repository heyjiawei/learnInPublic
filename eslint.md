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
- Plugins in the base configuration (loaded by extends setting) are relative to the derived config file. For example, if `./.eslintrc` has `extends: ["foo"]` and the `eslint-config-foo has plugins: ["bar"]`, ESLint finds the `eslint-plugin-bar` from `./node_modules/` (rather than `./node_modules/eslint-config-foo/node_modules/`) or ancestor directories. Thus every plugin in the config file and base configurations is resolved uniquely.

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

// TODO

# Specify Envirionment

// TODO

# Specify Parser and Parser options

// TODO

# Specify Processor

// TODO

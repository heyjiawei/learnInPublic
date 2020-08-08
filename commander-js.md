Goal: How does commander work with Node? Does the syntax follow POSIX?

Requirements:

- option can have a short flag or a long name
- options are separated by comma, space or |
- multiple short flags can be combined into a single argument following the dash. The last flag may take a value.

`-a -b -p 80` === `-ab -p80` and `-abp80`

- use `--` to indicate the end of options. Arguments after that will be used without being interpreted.

`do -- git --version` is the same passing `git --version`

- options on the command line are not positional. They can be added before or after other command arguments.

  - if it has a flag `-` it is an option

- options can be accessed as properties on the Command object.
- multi-word options are camel-cased on the object. `--template-engine` becomes `program.templateEngine`

## Option types

- boolean options
- option which takes in a value. value is declared by <placeholder>

- if you are using long name, you need to add an equal? `--pizza-type=cheese`

- `program.parse(process.argv)` processes the arguments.
- any args not consumed by program options will remain in the program.args array.

## default option value

`program .option('-c, --cheese <type>', 'add the specified type of cheese', 'blue');`
where blue is the default option value.

## Negatable boolean option

- prepending -no will set the option value to false when used.
- if you define -no without any option, it will be true by default. so --foo and --no-foo. but if you define only --no-foo, then -no-foo will work like a normal option.

## option that functions as a flag and can also take a value

- This is a 'mixed' option in that it can be both boolean and take in an argument.

```
program
  .option('-c, --cheese [type]', 'Add cheese with optional type');
```

## Processing options

- You can add a function to process option values. The callback has the following signature:
  (userSpecifiedValue, prevValue) => new option value

- you can add default value after this callback.

## Required option

- Specify mandatory option with `.requiredOption`
- A mandatory option must have a value after parsing. It can be specified on the command line or from a default value (from the environment)
- has the same signature as `.option`

## options that accept indefinite number of arguments

```
program
  .option('-n, --number <numbers...>', 'specify numbers')
```

- To specify multiple optoin argumnets, append ... to the value placeholder when declaring the option. The parsed option value will be an array.
- extra arguments are read until the a `-`
- `--` stops option processing entirely
- If a value is specified together with an option, e.g. `-n80` instead of `-n 80`, then no further values are read.

## Subcommands

- `.command()`
- Using an action handler or a stand-alone executable file will return the new command for configuring.

- first param of `.command()` holds the command name and command arguments.
  `<required> [optional] and the last argument may take in infinite arguments`

- `.addCommand()` is used to add an already configured subcommand to the program.
- command() takes in an options object in its second param. The option object has the following properties:
  - hidden: boolean. On true, will remove the command from the generated help output.
  - isDefault: boolean. On true, will run the subcommand if no other subcommand is specified.

## Action handler of subcommands

- You can add options to a command that uses an action handler.
- the action handler gets passed a parameter for each argument you declare. The last argument is the command object itself.
- the command object has properties declared with .options()
- You can use an async action handler. If you do, you will have to use .parseAsync rather than .parse

## standalone executable subcommands

- when .command() is invoked with a description and no .action(callback) to handle sub-commands, it directs the program to use stand-alone executables for subcommands.
- Commander will search executables in the directory of the entry script
- it will search for for the program with `pm` prepended to it. E.g. for the above command, it will search for `pm-install`
- you can specify a custom name with `{ executableFile: 'customName'}`

## listening to options

- this must be added before parse
- `program.on`

```
program.on('--help', () => {
  console.log('');
  console.log('Example call:');
  console.log('  $ custom-help --help');
});
```

- This also allows you to create custom actions.

```
program.on('option:verbose', function () {
  process.env.VERBOSE = this.verbose;
});

program.on('command:*', function (operands) {
  console.error(`error: unknown command '${operands[0]}'`);
  const availableCommands = program.commands.map(cmd => cmd.name());
  mySuggestBestMatch(operands[0], availableCommands);
  process.exitCode = 1;
});
```

## .parse and .parseAsync

- if you omit the first parameter, it will implicitly use process.argv
- the first argument takes in an array of strings
- if you are parsing arguments from a different convention (the default is node), you have to pass { from: 'electron' | 'user' } as the second argument.

In node:

- argv[0] is the application and argv[1] is the script being ran. User parameters after that

In user:

- all arguments are user parameters

node --harmony app.js

- the --harmony flag is a shortcut to enable all the harmony features. harmony enables new ECMAScript 6 features in the language.
- if you want to run ECMAScript 6 features in older version of nodejs, use this flag. Latest version of node supports ES6 so there is no need for --harmony flag
- --harmony flag enables the non stable but soon stable features of ES6

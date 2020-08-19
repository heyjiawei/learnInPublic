- this.\_parseCommand called by this.parse()
- this.parseOptions called by this.\_parseCommand([], userArgs)

  - userArgs is the arguments intended to be passed to commander
  - operands = []

- this.parseOptions(userArgs)

  - userArgs is termed unknown in \_parseCommand()

- In parseOptions(argv)
  -consumes args array one by one, from the first element

  - check if '--' because '--' indicate the end of the options, and any remaining arguments will be used without being interpreted.

    - push the rest of args into dest (array. Also operands array)
    - break loop

  - (2.) check if its an activeVariadicOption (multiple arguments) AND not a maybe option
    - this.emits()
    - end the loop and start again
  - if it's not, set activeVariadicOption to null again (reset it ; so as to speak)

  - if it is a maybe option (maybe option is defined by a string starting with '-')

    - this.\_findOption(arg) Return an option matching `arg` if any.

      - if there is an option and the option is a REQUIRED option, it reads the next arg as value.

        - if there is no 'value' passed in, returns the error message Option`is missing an argument, but received`flag` or nothing.
          and exist the program with exit code 1. When it exits, it calls process.exit, and \_exitCallback if defined.
        - if there is a 'value' passed in, emits the event `option:${option.name()}` and pass the supplied `value` as argument

      - if there is an option and the option is OPTIONAL and the next arg is not a maybe option, then that is the `value`. Emits the event `option:${option.name()}` and pass the supplied `value` as argument. The `value` passed in could be `null`

      - if there is an option and the option is NOT OPTIONAL and NOT REQUIRED; it is a boolean option. Emits the event `option:${option.name()}`

      - after emitting event, if option is variadic. set activeVariadicOption as the option, otherwise, set activeVariadicOption to null. Continue to next while loop cycle. When activeVariadicOption is set as the option, it will be consumed at (2.)

  - if option is '-ab' kind (Multiple short flags combined in a single argument following the dash)

    - find an option matching `-${arg[1]}` (what about arg[2] ?).
      - if option `-a` of `-ab` exist, and is REQUIRED or OPTIONAL, emit the event `option:${option.name()}` and pass the remaining string of arg as `value`. In this case, `b` will be passed as the value
      - if the option is NOT REQUIRED or OPTIONAL, it is a BOOLEAN option. Emits the event `option:${option.name()}`. Then adds the next option `b` to the front of args
      - continue to next while loop cycle

  - if option is a long name option `--foo` kind

    - find the option name (the name would be before `=`). If the option exist and its a REQUIRED or OPTIONAL option, emit the event `option:${option.name()}` and pass that behind the `=` as the value. Then continue to next while loop cycle

  - if there is an option (starts with `-`), set `dest` to unknown. unknown are unknown options.

  - add option to `dest`

- returns { operands, unknown }
  - operands are not options or values
  - unknown are unknown options, or remaining unknown args

# Option class

- a REQUIRED option includes `<`
- an OPTIONAL option includes `[`
- a VARIADIC option looks for `word...>` or `word...]`
- how is mandatory different from required(??)

# \_parseCommand(operands, unknown)

- parse options and set this.args to operands.concat(unknown).
- if there are operands and there is a command a operands[0], \_dispatchSubcommand, passing operands[0] as commandName, operands[1] as operands of subcommand and unknown as unknown
- if there is implicit help command and the first operand is a help command
  - if there is only 1 operand, the help operand, call this.help()
  - otherwise, dispatchSubCommand for operands[0] and pass help flag to unknown
- if there is a default command name

  - output help information if help flags are specified in unknown. Exit the program with exit code 0 after that.
  - if there is no help flags specified in unknown, \_dispatchSubcommand with defaultCommandName, operands as operands, unknown as unknown

- Miss subcommand and no handler, tries to help user by displaying help.
- check if there is an action Handler for subcommands
- check if there is a custom event listener

# \_dispatchSubcommand(commandName, operands, unknown)

- findCommand.
  - If command doesn't exist, output help information for this command with outputHelp. Then exit the program with exit code 1, code `commander.help` and message `(outputHelp)`
  - if command is executable (\_executableHandler), \_executeSubCommand with command object and pass operands.concat(unknown) as the commands arguments.
  - if command is not executable, run \_parseCommand(operands, unknown)

# \_executeSubCommand(subcommand, args)

- create a new shallow copy of args
- \_checkForMissingMandatoryOptions. It walks up the hierarchy of commands and for each option of a command, if the option is mandatory but it does not have a value provided to it, call missingMandatoryOptionValue. It does not tell you which command's required option is not specified. It just tells you that the required option is not specified. It then proceeds to exit the program with exit code 1

- otherwise, finds the executable file, spawn a child process and run the executable on child process. Handles child process termination when parent process is terminated too. Need to look into this further(??)

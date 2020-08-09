- Node.js runs the V8 JavaScript engine, the core of Google Chrome, outside of the browser
- A Node.js app is run in a single process, without creating a new thread for every request.
- generally, libraries in Node.js are written using non-blocking paradigms, making blocking behavior the exception rather than the norm.
- In Node.js the new ECMAScript standards can be used without problems as you don't have to wait for all your users to update their browsers
- you can also enable specific experimental features by running Node.js with flags.
- Node.js is only ten years old. In comparison, JavaScript is 24 years old and the Web is 30 years old.

## Installing Node.js

- One very convenient way to install Node.js is through a package manager. In this case, every operating system has its own.
- `nvm` is a popular way to run Node.js. It allows you to easily switch the Node.js version, and install new versions to try and easily rollback if something breaks
- when Node.js is installed you'll have access to the node executable program in the command line.

## DIfference between Node.js and the browser

- In the browser, most of the time what you are doing is interacting with the DOM, or other Web Platform APIs like Cookies. Those do not exist in Node.js, of course. You don't have the document, window and all the other objects that are provided by the browser.
- And in the browser, we don't have all the nice APIs that Node.js provides through its modules, like the filesystem access functionality.
- you control the environment; you know which version of Node.js you will run the application on. Compared to the browser environment, where you don't get the luxury to choose what browser your visitors will use
- Another difference is that Node.js uses the CommonJS module system, while in the browser we are starting to see the ES Modules standard being implemented. In practice, this means that for the time being you use require() in Node.js and import in the browser.

## V8 JavaScript Engine

- It's the thing that takes our JavaScript and executes it while browsing with Chrome.
- V8 provides the runtime environment in which JavaScript executes.
  - The DOM, and the other Web Platform APIs are provided by the browser.
  - the JavaScript engine is independent of the browser in which it's hosted
- V8 also powers desktop apps, with projects like Electron.
- V8 is written in C++. It is portable and runs on Mac, Windows, Linux and several other systems

- V8 implementation details can be found on more authoritative sites (e.g. the [V8 official site](https://v8.dev/)), and they change over time, often radically.

## Other JavaScript engines:

Other browsers have their own JavaScript engine:

- Firefox has SpiderMonkey
- Safari has JavaScriptCore (also called Nitro)
- Edge has Chakra
  and many others exist as well.

All those engines implement the ECMA ES-262 standard, also called ECMAScript, the standard used by JavaScript.

- JavaScript is considered an interpreted language
  - Interpreters run through a program line by line and execute each command. Here, if the author decides he wants to use a different kind of olive oil, he could scratch the old one out and add the new one. Your translator friend can then convey that change to you as it happens.
  - Interpreted languages were once significantly slower than compiled languages. But, with the development of just-in-time compilation, that gap is shrinking.
- it will compile the bytecode into machine code instructions of the running machine.
  - resulting machine code is optimized for the running machine’s CPU architecture.
- The intermediate code is converted into machine language only when the application needs it; That is. code in its run path is converted into machine language.
- Ideally the efficiency of running object code will overcome the inefficiency of recompiling the program every time it runs.
- compiling JavaScript makes perfect sense because while it might take a little bit more to have the JavaScript ready, once done it's going to be much more performant than purely interpreted code.

## Just In time compilation

- While the interpreted program is being run, the JIT compiler determines the most frequently used code and compiles it to machine code. Depending on the compiler, this can be done on a method or smaller section of code.

## How to exit from Node.js program

- the `process` core module is how you programmatically handle exits from node.js programs.
- process does not require a "require", it's automatically available.
- `process.exit()` forces a process to terminate
  - This means that any callback that's pending, any network request still being sent, any filesystem access, or processes writing to stdout or stderr - all is going to be ungracefully terminated right away.
  - you can pass an integer that signals the operating system the exit code
- By default the exit code is 0, which means success. Different exit codes have different meaning, which you might want to use in your own system to have the program communicate to other programs.
- You can also set the process.exitCode property and when the program will later end, Node.js will return that exit code.

`process.exitCode = 1`

Here is a typical HTTP server and this program is never going to end.

```
const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Hi!')
})

app.listen(3000, () => console.log('Server ready'))
```

- If you call process.exit(), any currently pending or running request is going to be aborted. This is not nice.
- you need to send the command a SIGTERM signal, and handle that with the process signal handler

```
process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Process terminated')
  })
})
```

- Signals are a POSIX intercommunication system: a notification sent to a process in order to notify it of an event that occurred.
- SIGKILL is the signal that tells a process to immediately terminate, and would ideally act like process.exit().
- SIGTERM is the signal that tells a process to gracefully terminate. It is the signal that's sent from process managers like upstart or supervisord and many others.
- This signal can be sent from within the program, or from another Node.js running program, or any other app running in your system that knows the PID of the process you want to terminate.
  `process.kill(process.pid, 'SIGTERM')`

## Reading environment variables from Node.js

- `process` module also provides `env` property which hosts all the environment variables that were set **at the moment the process was started.**

## Node.js REPL

- You can explore the name of a JavaScript class like Number, add a dot and press tab. REPL will print all the properties and methods you can access on that class
- You can inspect the globals you have access to by typing global. and pressing tab
- \_, is going to print the result of the last operation.

The REPL has some special commands, all starting with a dot .. They are

.help: shows the dot commands help
.editor: enables editor mode, to write multiline JavaScript code with ease. Once you are in this mode, enter ctrl-D to run the code you wrote.
.break: when inputting a multi-line expression, entering the .break command will abort further input. Same as pressing ctrl-C.
.clear: resets the REPL context to an empty object and clears any multi-line expression currently being input.
.load: loads a JavaScript file, relative to the current working directory
.save: saves all you entered in the REPL session to a file (specify the filename)
.exit: exits the repl (same as pressing ctrl-C two times)

- REPL knows when you are typing a multi-line statement without the need to invoke .editor.

For example if you start typing an iteration like this:

`[1, 2, 3].forEach(num => {`
and you press enter, the REPL will go to a new line that starts with 3 dots, indicating you can now continue to work on that block.

```
... console.log(num)
... })
```

If you type .break at the end of a line, the multiline mode will stop and the statement will not be executed.

## Passing arguments to Node.js

- Arguments can be standalone or have a key and a value.
  `node app.js joe`
  `node app.js name=joe`

- process object built into Node.js exposes an argv property which is an array that contains all the command line invocation arguments.
- The first argument is the full path of the node command. The second element is the full path of the file being executed. All the additional arguments are present from the third position going forward.
- for `node app.js name=joe`, `process.argv.slice(2)[0]` is name=joe, and you need to parse it. The best way to do so is by using the minimist library, which helps dealing with arguments.

## Output to Node.js

## Http request and response

- uses the `http` module
- When a new request is received, the request event is called, providing two objects: a request (an http.IncomingMessage object) and a response (an http.ServerResponse object).

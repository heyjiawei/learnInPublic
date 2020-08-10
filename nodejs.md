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

- node.js has a console module. It is basically the same as the console object in browser.
- If you pass an object, it will render it as a string.
- We can also format pretty phrases by passing variables and a format specifier.
  - %s format a variable as a string
  - %d format a variable as a number
  - %i format a variable as its integer part only
  - %o format a variable as an object
  - `console.log('My %s has %d years', 'cat', 2)`
- `console.trace()` prints the stack trace
- You can calculate how much time a function takes to run, using `time()` and `timeEnd()`
- You can color the output of your text in the console by using [escape sequences](https://gist.github.com/iamnewton/8754917). However, this is the low-level way to do this. The simplest way to go about coloring the console output is by using a library like Chalk.
- You can create a progress bar in the console with [Progress](https://www.npmjs.com/package/progress)

## Make Node.js CLI program interactive

- use readline module to perform this.
- get input from a readable stream like `process.stdin` stream

  - during execution, it reads the terminal input one line at a time

```
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

readline.question(`What's your name?`, name => {
  console.log(`Hi ${name}!`)
  readline.close()
})
```

- The question() method shows the first parameter (a question) and waits for the user input. It calls the callback function once enter is pressed.
- If you need to require a password, it's best not to echo it back, but instead show a \* symbol.
- The simplest way is to use the readline-sync package which is very similar in terms of the API and handles this out of the box.
- A more complete and abstract solution is provided by the Inquirer.js package.

## Node.js exports

- to import a functionality, the functionality must be exposed before it can be imported by other files

  - Any other object or variable defined in the file by default is private and not exposed to the outer world.

- the `module.exports` API from module allows this
- exposing objects/functions as new exports can be done in 2 ways

1. The first is to assign an object to module.exports, which is an object provided out of the box by the module system, and this will make your file export just that object. This is `module.exports` and it exposes the object it points to.

```
const car = {
  brand: 'Ford',
  model: 'Fiesta'
}

module.exports = car

//..in the other file

const car = require('./car')
```

2. The second way is to add the exported object as a property of exports. This way allows you to export multiple objects, functions or data. This is `exports` and it exposes the properties of the object it points to.

```
exports.car = {
  brand: 'Ford',
  model: 'Fiesta'
}
```

and the importing file you can reference it with
`const items = require('./items') items.car` or `const car = require('./items').car`

## npm package manager

- yarn is an alternative to npm. npm is the standard package manager for Node.js
- npm manages downloads of dependencies of your project.
- if a project has package.json, running `npm install` will install everything the project needs and the node_modules folder will be created if it does not already exist.
- devDependencies `--save-dev` are usually development tools. While dependecies `--save` are bundled with the app in production.
- `npm update` - npm will check all packages for a newer version that satisfies your versioning constraints.
- You can specify a single package to update as well with `npm update <package-name>`

## Where does npm install the packages?

- npm can install a package globally or locally. By default, the package is installed in the current file tree, in a node_modules subfolder.
- a global package is installed with `-g` flag and installed in `npm root -g`
- if you use `nvm` to manage node.js versions, this global location will differ

## Using a package

- You can import a package into your program using require. Packages are looked up with an algorithm
- if your package is an executable, the executable file will be placed in `node_modules/.bin/` folder.
- to execute executables, you can of course type `./node_modules/.bin/cowsay` to run it, and it works, but npx, included in the recent versions of npm (since 5.2), is a much better option. `npx cowsay` will have npx find the package location

## package.json guide

- The package.json file is kind of a manifest for your project.
- It's a central repository of configuration for tools, for example. It's also where npm and yarn store the names and versions for all the installed packages.
- There are no fixed requirements of what should be in a package.json file, for an application. The only requirement is that it respects the JSON format, otherwise it cannot be read by programs that try to access its properties programmatically.
- if you wish to build a Node.js package and distribute it on npm, you must have a set of properties that will help other people use it.
- The package.json file can also host command-specific configuration, for example for Babel, ESLint, and more.
  - Each has a specific property, like eslintConfig, babel and others. Those are command-specific, and you can find how to use those in the respective command/project documentation.

## package-lock.json file

- The goal of the file is to keep track of the exact version of every package that is installed so that a product is 100% reproducible in the same way even if packages are updated by their maintainers.
- The dependencies versions will be updated in the package-lock.json file when you run npm update.

## Find the installed version of an npm package

- `npm list` shows the latest version of all installed npm packages, including their dependencies
- `npm list -g` is the same, but for globally installed packages.
- To get only your top-level packages (basically, the ones you told npm to install and you listed in the package.json), run `npm list --depth=0`
- You can get the version of a specific package by specifying its name `npm list cowsay`
- to check the latest available version of the package on the npm repository, run `npm view [package-name] version` e.g. `npm view cowsay version`
- to list all the previous version of a package, `npm view <package> versions`. **Note the s in versions**
- to install a specific version: `npm install cowsay@1.2.0`

## Update packages

- If there is a new minor or patch release and we type `npm update`, the installed version is updated, and the package-lock.json file diligently filled with the new version; package.json remains unchanged.
- To discover new releases of the packages, you run npm outdated
- Running `npm update` won't update the version to that of major releases. Major releases are never updated in this way because they (by definition) introduce breaking changes.
- To update to a new major version for all the packages, install the `npm-check-updates`

## Uninstalling packages

- To uninstall a package you have previously installed locally (using npm install <package-name> in the node_modules folder, run `npm uninstall <package-name>` from the project root folder (the folder that contains the node_modules folder).
- the -S flag, or --save, this operation will also remove the reference in the package.json file.
- use the -D / --save-dev flag to remove the listed devDependencies on package.json
- If the package is installed globally, you need to add the -g / --global flag:
  - you can run this command from anywhere you want on your system because the folder where you currently are does not matter.

## Installing production dependencies

- When you go in production, if you type npm install and the folder contains a package.json file, they are installed, as npm assumes this is a development deploy.
- You need to set the --production flag (`npm install --production`) to avoid installing those development dependencies.

## npx, Node.js Package runner

- npx lets you run code built with Node.js and published through the npm registry.
- Node.js developers used to publish most of the executable commands as global packages, in order for them to be in the path and executable immediately. As such, different versions of the same command cannot be used.
- `npx commandname` automatically finds the correct reference of the command inside the node_modules folder of a project, without needing to know the exact path, and without requiring the package to be installed globally and in the user's path.
- npx also allows us to run commands without installing them. It does this by downloading the code, and wiping the downloaded code when its done.
- You can use `@` to specify the version. When paired with node.js (combine with npm node package), this can avoid tools like nvm or other node.js version management tools
- npx is not limited to packages published on the npm registry. You can run code directly from a URL. This also means you have to be careful when you run with this.

## Node.js event loop

- The Node.js JavaScript code runs on a single thread. There is just one thing happening at a time.
- it simplifies a lot how you program without worrying about concurrency issues.
- In actuality, in most browsers there is an event loop for every browser tab, to make every process isolated and avoid a web page with infinite loops or heavy processing to block your entire browser.
- The environment manages multiple concurrent event loops, to handle API calls for example. Web Workers run in their own event loop as well.

- The call stack is a LIFO queue (Last In, First Out).
- The event loop continuously checks the call stack to see if there's any function that needs to run. It keeps checking the call stack until the stack is empty.

### The message Queue

- When setTimeout() is called, the Browser or Node.js start the timer. Once the timer expires, in this case immediately as we put 0 as the timeout, the callback function is put in the Message Queue.
- The Message Queue is also where user-initiated events like click or keyboard events, or fetch responses are queued before your code has the opportunity to react to them. Or also DOM events like onLoad.

- **The loop gives priority to the call stack, and it first processes everything it finds in the call stack, and once there's nothing in there, it goes to pick up things in the message queue.**

- We don't have to wait for functions like setTimeout, fetch or other things to do their own work, because they are provided by the browser, and they live on their own threads.
  - For example, if you set the setTimeout timeout to 2 seconds, you don't have to wait 2 seconds - the wait happens elsewhere.

### Job Queue

- ECMAScript 2015 introduced the concept of the Job Queue, which is used by Promises (also introduced in ES6/ES2015).
- It's a way to execute the result of an async function as soon as possible, rather than being put at the end of the call stack.
- Promises that resolve before the current function ends will be executed right after the current function.

### process.nextTick()

- Every time the event loop takes a full trip, we call it a tick.
- When we pass a function to process.nextTick(), we instruct the engine to invoke this function at the end of the current operation, before the next event loop tick starts

```
process.nextTick(() => {

})
```

- It's the way we can tell the JS engine to process a function asynchronously (after the current function), but as soon as possible, not queue it.

- `setTimeout(() => {}, 0)` will execute the function at the end of next tick;
  `nextTick()` will executes it just before the beginning of the next tick.
- Use `nextTick()` when you want to make sure that in the next event loop iteration that code is already executed.

### setImmediate()

- Any function passed as the setImmediate() argument is a callback that's executed in the next iteration of the event loop.
- A function passed to `process.nextTick()` is going to be executed on the current iteration of the event loop, after the current operation ends. This means it will always execute before `setTimeout` and `setImmediate`.
- A `setTimeout()` callback with a 0ms delay is very similar to `setImmediate()`. The execution order will depend on various factors, but they will be both run in the next iteration of the event loop. Basically `setImmediate()`, is equivalent to using `setTimeout(() => {}, 0)`

## Timers; setInterval()

- setInterval and setTimeout are available in Node.js timers module
- setInterval starts a function every n milliseconds, without any consideration about when a function finished its execution.
  - This means a long execution can overlap the next one
  - To avoid this, you can schedule a recursive setTimeout to be called when the callback function finishes

## Node.js Event emitter

- on the browser, the user interactions are handled through events. on Node.js, its handled with events module.
- The `EventEmitter` class handles our event.
- eventEmitter object exposes a few methods. The notable ones being `emit` - used to trigger an event; `on` - used to add a callback

```
eventEmitter.on('start', () => {
  console.log('started')
})

eventEmitter.emit('start')
```

- You can pass arguments to the event handler by passing them as additional arguments to emit()

## Http module

- uses the `http` module
- We use the module to create an HTTP server.
- The server is set to listen on the specified port, 3000.
- When the server is ready, the listen callback function is called.

```
const http = require('http')

const port = process.env.PORT

const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html')
  res.end('<h1>Hello, World!</h1>')
})

server.listen(port, () => {
  console.log(`Server running at port ${port}`)
})
```

- The callback function we pass to `http.createServer` is the one that's going to be executed upon every request that comes in
- Whenever a new request is received, the `request` event is called
- When a new request is received, the request event is called, providing two objects: a request (an http.IncomingMessage object) and a response (an http.ServerResponse object).
- when you initialize the HTTP server using http.createServer(), the callback is called when the server got all the HTTP headers, but not the request body.
- The request object passed in the connection callback is a stream. This means we have to listen for the body content
- We first get the data by listening to the stream data events, and when the data ends, the stream end event is called
- to access the data, assuming we expect to receive a string, we must put it into an array

```
const server = http.createServer((req, res) => {
  let data = []
  req.on('data', chunk => {
    data.push(chunk)
  })
  req.on('end', () => {
    JSON.parse(data).todo // 'Buy the milk'
  })
})
```

The HTTP module provides 5 classes:

1. http.Agent
2. http.ClientRequest
3. http.Server
4. http.ServerResponse
5. http.IncomingMessage

### http.Agent

- Node.js creates a global instance of the http.Agent class to manage connections persistence and reuse for HTTP clients, a key component of Node.js HTTP networking.
- This object makes sure that every request made to a server is queued and a single socket is reused.
- It also maintains a pool of sockets. This is key for performance reasons

### http.ClientRequest

- An http.ClientRequest object is created when http.request() or http.get() is called.
- When a response is received, the response event is called with the response, with an http.IncomingMessage instance as argument.
- The returned data of a response can be read in 2 ways:
  1. you can call the response.read() method
  2. in the response event handler you can setup an event listener for the data event, so you can listen for the data streamed into.

### http.IncomingMessage

- An http.IncomingMessage object is created by:

  1. http.Server when listening to the request event
  2. http.ClientRequest when listening to the response event

- It can be used to access the response
- The data is accessed using streams, since http.IncomingMessage implements the Readable Stream interface.

### http.Server

- This class is commonly instantiated and returned when creating a new server using http.createServer().
- Once you have a server object, you have access to its methods:
  - close() stops the server from accepting new connections
  - listen() starts the HTTP server and listens for connections

### http.ServerResponse

- Created by an http.Server and passed as the second parameter to the request event it fires. Commonly known and used in code as res.
- The method you'll always call in the handler is `end()`, which closes the response, the message is complete and the server can send it to the client. It must be called on each response.
- After processing the headers you can send them to the client by calling `response.writeHead()`, which accepts the statusCode as the first parameter, the optional status message, and the headers object.
- To send data to the client in the response body, you use `write()`. It will send buffered data to the HTTP response stream.

## File descriptors

- A file descriptor is what's returned by opening the file using the open() method offered by the fs module

```
const fs = require('fs')

fs.open('/Users/joe/test.txt', 'r', (err, fd) => {
  //fd is our file descriptor
})
```

- Every file comes with a set of details that we can inspect; we can inspect using the stat() method provided by the fs module
- Information in file stats:

  - if the file is a directory or a file, using stats.isFile() and stats.isDirectory()
  - if the file is a symbolic link using stats.isSymbolicLink()
  - the file size in bytes using stats.size.

### Reading and writing files

- Read file with `fs.readFile()`
- Both `fs.readFile()` and `fs.readFileSync()` read the full content of the file in memory before returning the data. This means that big files are going to have a major impact on your memory consumption and speed of execution of the program. In this case, a better option is to read the file content using streams.
- other fs operations (like writeFile) works similarly. They write the full content to the file before returning the control back to your program. In this case, a better option is to read the file content using streams.

### Working with folders

- Use `fs.access()` to check if the folder exists and Node.js can access it with its permissions.
- Removing a folder that has content can be more complicated. It is recommended to install the `fs-extra` module, which is very popular and well maintained. It's a drop-in replacement of the fs module, which provides more features on top of it.

## File path

- This is the path module
- Every file in the system has a path. Linux and macOS file path is different from Windows.
- Given a path, you can extract information out of it using those methods:
  - dirname: get the parent folder of a file
  - basename: get the filename part
  - extname: get the file extension
- You can get the file name without the extension by specifying a second argument to basename
  `path.basename(notes, path.extname(notes))`
- join two or more parts of a path by using `path.join()`; `path.join('/', 'users', name, 'notes.txt')`
- get the absolute path calculation of a relative path using `path.resolve()`;
  `path.resolve('joe.txt') //'/Users/joe/joe.txt' if run from my home folder`
- If you specify a second parameter folder, resolve will use the first as a base for the second:`path.resolve('tmp', 'joe.txt') //'/Users/joe/tmp/joe.txt' if run from my home folder`
- If the first parameter starts with a slash, that means it's an absolute path; `path.resolve('/etc', 'joe.txt') //'/etc/joe.txt'`
- use `path.normalize()` to calculate the actual path, when it contains relative specifiers like . or .., or double slashes; `path.normalize('/users/joe/..//test.txt') ///users/test.txt`
- Both resolve and normalize will not check if the path exists. They just calculate a path based on the information they got

## os Module

- the os module is a built-in core module. This module provides many functions that you can use to retrieve information from the underlying operating system and the computer the program runs on, and interact with it.
- `os.EOL` gives the line delimiter sequence. It's \n on Linux and macOS, and \r\n on Windows.
- `os.constants.signals` tells us all the constants related to handling process signals, like SIGHUP, SIGKILL and so on.
- `os.constants.errno` sets the constants for error reporting, like EADDRINUSE, EOVERFLOW and more.
- `os.arch()` Return the string that identifies the underlying architecture, like arm, x64, arm64.
- `os.cpus()` Return information on the CPUs available on your system.

## Buffers

- implemented by Buffer class
- Buffers were introduced to help developers deal with binary data, in an ecosystem that traditionally only dealt with strings rather than binaries.
- It represents a fixed-size chunk of memory (can't be resized) allocated outside of the V8 JavaScript engine.
- You can think of a buffer like an array of integers, which each represent a byte of data.

## Streams

- They are a way to handle reading/writing files, network communications, or any kind of end-to-end information exchange in an efficient way.
- Streams are not a concept unique to Node.js. They were introduced in the Unix operating system decades ago, and programs can interact with each other passing streams through the pipe operator
- Using streams you process its content without keeping it all in memory.
- The Node.js stream module provides the foundation upon which all streaming APIs are built.
- All streams are instances of EventEmitter

There are four classes of streams:

- Readable: a stream you can pipe from, but not pipe into (you can receive data, but not send data to it). When you push data into a readable stream, it is buffered, until a consumer starts to read the data.
- Writable: a stream you can pipe into, but not pipe from (you can send data, but not receive from it)
- Duplex: a stream you can both pipe into and pipe from, basically a combination of a Readable and Writable stream
- Transform: a Transform stream is similar to a Duplex, but the output is a transform of its input

- We get the Readable stream from the stream module. Then we initialize it and implement the readable.\_read() method.

First create a stream object:

```
const Stream = require('stream')
const readableStream = new Stream.Readable()
```

then implement \_read:

```
readableStream._read = () => {}
```

You can also implement \_read using the read option:

```
const readableStream = new Stream.Readable({
  read() {}
})
```

Now that the stream is initialized, we can send data to it:

```
readableStream.push('hi!')
readableStream.push('ho!')
```

### Read data from a readable stream

- To read data from a readable stream, you need to use a writable stream:

```
const Stream = require('stream')

const readableStream = new Stream.Readable({
  read() {}
})
const writableStream = new Stream.Writable()

writableStream._write = (chunk, encoding, next) => {
  console.log(chunk.toString())
  next()
}

readableStream.pipe(writableStream)

readableStream.push('hi!')
readableStream.push('ho!')
```

- You can also consume a readable stream directly, using the readable event:

```
readableStream.on('readable', () => {
  console.log(readableStream.read())
})
```

### Signal to a writable stream that you have ended writing

- use `end()` method

```
const Stream = require('stream')

const readableStream = new Stream.Readable({
  read() {}
})
const writableStream = new Stream.Writable()

writableStream._write = (chunk, encoding, next) => {
  console.log(chunk.toString())
  next()
}

readableStream.pipe(writableStream)

readableStream.push('hi!')
readableStream.push('ho!')

writableStream.end()
```

## Node.js difference between development and production

- Node.js assumes it's always running in a development environment.
- You can signal Node.js that you are running in production by setting the `NODE_ENV=production`s environment variable.
- in your production server, it's better to put it in your shell configuration file (e.g. .bash_profile with the Bash shell) because otherwise the setting does not persist in case of a system restart.
- You can also apply the environment variable by prepending it to your application initialization command:

```
NODE_ENV=production node app.js
```

- Setting the environment to production generally ensures that logging is kept to a minimum, essential level; more caching levels take place to optimize performance

## Error handling

- An exception is created using the throw keyword: `throw value`
- As soon as JavaScript executes this line, the normal program flow is halted and the control is held back to the nearest exception handler.
- Usually in client-side code value can be any JavaScript value including a string, a number or an object; in Node.js, we don't throw strings, we just throw Error objects.
- An error object is an object that is either an instance of the Error object, or extends the Error class, provided in the Error core module

```
throw new Error('Ran out of coffee')
```

or

```
class NotEnoughCoffeeError extends Error {
  //...
}
throw new NotEnoughCoffeeError()
```

- If an uncaught exception gets thrown during the execution of your program, your program will crash.
- To solve this, you listen for the uncaughtException event on the process object:

```
process.on('uncaughtException', err => {
  console.error('There was an uncaught error', err)
  process.exit(1) //mandatory (as per the Node.js docs)
})
```

## logging

- In Node.js, printing a JSON object to terminal is fine until a certain level of nesting. After two levels of nesting, Node.js gives up and prints [Object] as a placeholder
- To preserve and print the whole object, use pretty print: `console.log(JSON.stringify(obj, null, 2))`

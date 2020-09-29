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
- When the EventEmitter object emits an event, all of the functions attached to that specific event are called synchronously
- Any values returned by the called listeners are ignored and will be discarded

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

- All streams created by Node.js APIs operate exclusively on strings and Buffer (or Uint8Array) objects.
- It is possible for stream implementations to work with other types of JavaScript values (with the exception of null, which serves a special purpose within streams). Such streams are considered to operate in "object mode".
  - Stream instances are switched into object mode using the objectMode option when the stream is created.
  - Attempting to switch an existing stream into object mode is not safe.
- Duplex and Transform streams are both Readable and Writable and hence, each maintains two separate internal buffers used for reading and writing, allowing each side to operate independently of the other while maintaining an appropriate and efficient flow of data.

### Readable streams

- Readable streams effectively operate in one of two modes: flowing and paused.

  - In flowing mode, data is read from the underlying system automatically and provided to an application as quickly as possible using events via the EventEmitter interface.
  - In paused mode, the stream.read() method must be called explicitly to read chunks of data from the stream.
  - If a Readable is switched into flowing mode and there are no consumers available to handle the data, that data will be lost.

- All Readable streams begin in paused mode but can be switched to flowing mode in one of the following ways

  - Adding a 'data' event handler.
  - Calling the stream.resume() method.
  - Calling the stream.pipe() method to send the data to a Writable.

- The Readable can switch back to paused mode using one of the following:

  - If there are no pipe destinations, by calling the stream.pause() method.
  - If there are pipe destinations, switch back to paused mode by removing all pipe destinations. Multiple pipe destinations may be removed by calling the stream.unpipe() method.

**The Readable Stream API provides multiple methods of consuming stream data. In general, developers should choose one of the methods of consuming data and should never use multiple methods to consume data from a single stream. Specifically, using a combination of on('data'), on('readable'), pipe(), or async iterators could lead to unintuitive behavior.**

- Use of the readable.pipe() method is recommended for most users as it has been implemented to provide the easiest way of consuming stream data.
- Developers that require more fine-grained control over the transfer and generation of data can use the EventEmitter and readable.on('readable')/readable.read() or the readable.pause()/readable.resume() APIs.

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

### Error category in Node.js applications

Applications running in Node.js will generally experience four categories of errors:

1. Standard JavaScript errors such as <EvalError>, <SyntaxError>, <RangeError>, <ReferenceError>, <TypeError>, and <URIError>.
2. System errors triggered by underlying operating system constraints such as attempting to open a file that does not exist or attempting to send data over a closed socket.
3. User-specified errors triggered by application code.
4. AssertionErrors are a special class of error that can be triggered when Node.js detects an exceptional logic violation that should never occur. These are raised typically by the assert module.

All JavaScript and system errors raised by Node.js inherit from, or are instances of, the standard JavaScript <Error> class and are guaranteed to provide at least the properties available on that class.

### Synchronous and Asynchronous errors in Node.js

- synchronous errors can be caught with try-catch
- asynchronous errors may be reported in caught in multiple ways:

  - Most asynchronous methods that accept a callback function will accept an Error object passed as the first argument to that function. This is an idiomatic pattern referred to as _error-first callback_. When the operation either completes or an error is raised, the callback function is called with the `Error` object (if any) passed as the first argument. If no error was raised, the first argument will be passed as `null`

    - If that first argument is not null and is an instance of Error, then an error occurred that should be handled.

  - When an asynchronous method is called on an object that is an EventEmitter, errors can be routed to that object's 'error' event.

    - The use of the 'error' event mechanism is most common for **stream-based** and **event emitter-based** APIs, which themselves represent a series of asynchronous operations over time (as opposed to a single operation that may pass or fail).

    - For all EventEmitter objects, if an 'error' event handler is not provided, the error will be thrown, causing the Node.js process to report an uncaught exception and crash unless a handler has been registered for the 'uncaughtException' event.

    - Errors generated in this way (error event mechanism) cannot be intercepted using try…catch as they are thrown after the calling code has already exited.

    The following example won't work:

    ```
    const fs = require('fs');

    try {
      fs.readFile('/some/file/that/does-not-exist', (err, data) => {
        // Mistaken assumption: throwing here...
        if (err) {
          throw err;
        }
      });
    } catch (err) {
      // This will not catch the throw!
      console.error(err);
    }

    ```

  - A handful of typically asynchronous methods in the Node.js API may still use the throw mechanism to raise exceptions that must be handled using try…catch. There is no comprehensive list of such methods;

### Error class/object

- A generic JavaScript <Error> object that does not denote any specific circumstance of why the error occurred.
- All errors generated by Node.js, including all system and JavaScript errors, will either be instances of, or inherit from, the Error class.
- The `Error` objects capture a "stack trace" detailing the point in the code at which the `Error` was instantiated, and may provide a text description of the error.
- stack traces are dependent on V8's stack trace API

`error.stack`

- is a string describing the point in the code at which the Error was instantiated.
- The string representing the stack trace is lazily generated when the error.stack property is accessed.
- Stack traces extend only to either (a) the beginning of synchronous code execution, or (b) the number of frames given by the property Error.stackTraceLimit, whichever is smaller.
- The number of frames captured by the stack trace is bounded by the smaller of Error.stackTraceLimit or the number of available frames on the current event loop tick.
- The first line is formatted as <error class name>: <error message>, and is followed by a series of stack frames (each line beginning with "at ").
- Each frame describes a call site within the code that lead to the error being generated
- V8 attempts to display a name for each function (by variable name, function name, or object method name), but occasionally it will not be able to find a suitable name. **If V8 cannot determine a name for the function, only location information will be displayed for that frame.** Otherwise, the determined function name will be displayed with _location information appended in parentheses._

  - The frames are only generated for JavaScript functions. C++ addon functions will not be present in the stack trace.

  - The location information will be one of:

    - native, if the frame represents a call internal to V8 (as in [].forEach).
    - plain-filename.js:line:column, if the frame represents a call internal to Node.js.
    - /absolute/path/to/file.js:line:column, if the frame represents a call in a user program, or its dependencies.

`error.stackTraceLimit`

- specifies the number of stack frames collected by a stack tree (whether generated by `new Error().stack` or `Error.captureStackTrace(obj))`.
- The default value is 10 but may be set to any valid JavaScript number.
- Changes will affect any stack trace captured after the value has been changed.
- If set to a non-number value, or set to a negative number, stack traces will not capture any frames.

`error.captureStackTrace(targetObject[, constructorOpt])`

- creates a `.stack` property on targetObject, which when accessed returns a string representing the location in the code at which Error.captureStackTrace() was called.

```
const myObject = {};
Error.captureStackTrace(myObject);
myObject.stack;  // Similar to `new Error().stack`
```

- The first line of the trace will be prefixed with `${myObject.name}: ${myObject.message}`.
- The optional constructorOpt argument accepts a function
  - If provided, all frames above constructorOpt, including constructorOpt, will be omitted from the generated stack trace.
  - This is useful for hiding implementation details of error generation from an end user.

### Exceptions vs Errors

A JavaScript **exception** is a value that is thrown as a result of an invalid operation or as the target of a throw statement.

While it is not required that these values are instances of Error or classes which inherit from Error, **all exceptions thrown by Node.js or the JavaScript runtime will be instances of Error.**

### System Errors (extends Error class)

Node.js generates system errors when exceptions occur within its runtime environment. These usually occur when an application violates an operating system constraint. For example, a system error will occur if an application attempts to read a file that does not exist.

## logging

- In Node.js, printing a JSON object to terminal is fine until a certain level of nesting. After two levels of nesting, Node.js gives up and prints [Object] as a placeholder
- To preserve and print the whole object, use pretty print: `console.log(JSON.stringify(obj, null, 2))`

## child processes

- child_process module provides the ability to spawn child processes in a manner that is similar, but not identical, to popen(3).

  - popen: on success, returns a pointer to an open stream that can be used to read or write to the pipe;
  - This capability is primarily provided by the `child_process.spawn()` function

- A “process” is what we call a program that has been loaded into memory along with all the resources it needs to operate.
- Those processes can easily communicate with each other using a built-in messaging system.
- When a user executes a single Node.js program, it runs as a single OS process that represents the instance of the program running. Within that process, Node.js executes programes on a single thread. Because only one thread can run on one process, operations that a long time to execute in JavaScript can block the Node.js thread.

  - To work around this problem, we launch a child process; a process created by another process.
  - When a new process is launched, the OS employs multiprocessing techniques to ensure that the main Node.js process and the additional child process runs concurrently (that is, at the same time)

- Aside from dealing with long-running takss, child processes also interface with the OS and can run shell commands.

  - This means system administrators can use Node.js to run shell commands to structure and maintain their operations as a Node.js module instead of shell scripts.

- By default, pipes for stdin, stdout, and stderr are established between the parent Node.js process and the spawned child.

  - If the child process writes to stdout in excess of that limit without the output being captured, the child process will block waiting for the pipe buffer to accept more data. ??

- (shell?) command lookup will be performed with `options.env.PATH environment` variable if passed in options object. otherwise `process.env.PATH` will be used.

- The `child_process.spawn()` method spawns the child process asynchronously, without blocking the Node.js event loop. The `child_process.spawnSync()` function provides equivalent functionality in a synchronous manner that blocks the event loop until the spawned process either exits or is terminated.

- The following alternatives of spawning child processes are implemented on top of `child_process.spawn()` and `child_process.spawnSync()`

  - child_process.exec()
    - Spawns a shell then executes the command within that shell, buffering any generated output
    - pass stdout and stderr to a callback function when complete
  - child_process.execFile()
    - spawns the command directly without first spawning a shell by default.
    - pass stdout and stderr to a callback function when complete.
  - child_process.fork()
    - spawns a new Node.js process and the returned ChildProcess will have an additional communication channel built-in that allows messages to be passed back and forth between the parent and child.

- The main difference is the spawn is more suitable for long-running process with huge output. spawn streams input/output with child process. exec buffered output in a small (by default 200K) buffer.

  - use spawn in case you need a lot of data streamed from child process
  - use exec if you need such features as shell pipes, redirects or even you need exec more than one program in one time.

- For certain use cases, such as automating shell scripts, the synchronous counterparts may be more convenient. In many cases, however, the synchronous methods can have significant impact on performance due to stalling the event loop while spawned processes complete.

- Keep in mind that spawned Node.js child processes are independent of the parent with exception of the IPC communication channel that is established between the two. Each process has its own memory, with their own V8 instances.

  - Because of the additional resource allocations required, spawning a large number of child Node.js processes is not recommended.

- child_process.spawn(), child_process.fork(), child_process.exec(), and child_process.execFile() methods returns a ChildProcess instance. These objects implement the Node.js EventEmitter API
  - This means parent process can register listener functions that are called when certain events occur during the life cycle of the child process.
- The child_process.exec() and child_process.execFile() methods additionally allow for an optional callback function to be specified that is invoked when the child process terminates.
- Child processes have three standard IO streams available: stdin (writeable), stdout (readable) and stderr (readable).
  - Streams also inherit from EventEmitter

## process node.js

- the process object is a global; it is always available to Node.js apps without the use of require()
- it provides information about the current Node.js. It also controls the current Node.js process.

- `process.mainModule` is an alternative way of retrieving `require.main`
  - if the main module changes at runtime, `require.main` may still refer to the original main module in modules that were required before the change occur.
  - Generally, it's safe to assume that the two refer to the same module.
- As with require.main, process.mainModule will be undefined if there is no entry script.

### process I/O

- `process.stdout` and `process.stderr` differ from other Node.js streams in important ways:

1. They are used internally by console.log() and console.error(), respectively.
2. Writes may be synchronous depending on what the stream is connected to and whether the system is Windows or POSIX:

- Files: synchronous on Windows and POSIX
- TTYs (Terminals): asynchronous on Windows, synchronous on POSIX
- Pipes (and sockets): synchronous on Windows, asynchronous on POSIX

- These behaviors are partly for historical reasons, as changing them would create backwards incompatibility, but they are also expected by some users.

- Asynchronous writes might not be desired all the time as creates problems such as output written with console.log() or console.error() being unexpectedly interleaved.
- Asynchronous writes also has the problem of not written to logs at all if process.exit() is called before an asynchronous write completes

## modules node.js

- each file is treated as a separate module.
- Variables local to the module will be private, because the of commonjs module wrapper.

- when a file is run directly from Node.js, `require.main` is set to its module.
  - it is possible to determine whether a file has been run directly by testing `require.main === module`.
  - That means, for a file foo.js, this will be true if run via `node foo.js`, but false if run by `require('./foo')`.
  - the entry point of the current application can be obtained by checking `require.main.filename`.

### module wrapper

- Before a module's code is executed, Node.js will wrap it with a function wrapper that looks like the following:

```
(function(exports, require, module, __filename, __dirname) {
// Module code actually lives in here
});
```

When a module is wrapped,

1. It keeps top-level variables (defined with var, const or let) scoped to the module rather than the global object.
2. It helps to provide some global-looking variables that are actually specific to the module, such as:

- The module and exports objects that the implementor can use to export values from the module.
- The convenience variables `__filename` and `__dirname`, containing the module's absolute filename and directory path.

### module caching

- Modules are cached after the first time they are loaded.
  - This means (among other things) that every call to require('foo') will get exactly the same object returned, **if it would resolve to the same file.**
  - Multiple calls to require('foo') may not cause the module code to be executed multiple times. This is an important feature. With it, "partially done" objects can be returned, thus allowing transitive dependencies to be loaded even when they would cause cycles.
- To have a module execute code multiple times, export a function, and call that function.

- Modules are cached based on their resolved filename. Since modules may resolve to a different filename based on the location of the calling module (loading from node_modules folders), it is not a guarantee that require('foo') will always return the exact same object, if it would resolve to different files.

- Additionally, on case-insensitive file systems or operating systems, different resolved filenames can point to the same file, but the cache will still treat them as different modules and will reload the file multiple times.

### core modules

- core modules are defined within Node.js's source; they are located in `lib/` folder
- Core modules are always preferentially loaded if their identifier is passed to require(). For instance, require('http') will always return the built in HTTP module, even if there is a file by that name.

### Cycles

- When there are circular require() calls, a module might not have finished executing when it is returned.
- When main.js loads a.js, then a.js in turn loads b.js. At that point, b.js tries to load a.js.
  - In order to prevent an infinite loop, an unfinished copy of the a.js exports object is returned to the b.js module. b.js then finishes loading, and its exports object is provided to the a.js module.
- Careful planning is required to allow cyclic module dependencies to work correctly within an application.

### File modules

- If the exact filename is not found, then Node.js will attempt to load the required filename with the added extensions: .js, .json, and finally .node.

  - `.node` files are interpreted as compiled addon modules loaded with `dlopen`.

- A required module prefixed with '/' is an absolute path to the file. For example, `require('/home/marco/foo.js')` will load the file at `/home/marco/foo.js`.

- A required module prefixed with './' is relative to the file calling `require()`. That is, circle.js must be in the same directory as foo.js for `require('./circle')` to find it.

- Without a leading '/', './', or '../' to indicate a file, the module must either be a core module or is loaded from a node_modules folder.

- If the given path does not exist, require() will throw an Error with its code property set to 'MODULE_NOT_FOUND'.

## Make our JavaScript file executable by the locally installed node program

- We do that adding a shebang character sequence at the very top of our JavaScript file that look as follow:
  `#!/usr/bin/env node`

  - That way, we are telling \*nix systems that the interpreter of our JavaScript file should be /usr/bin/env node which looks up for the locally-installed node executable.
  - In Windows, that line will just be ignored because it will be interpreted as a comment, **but** it has to be there because npm will read it on a Windows machine when the NodeJS command-line package is being installed.

- In most cases, new files are not allowed to be executed. As we are creating a NodeJS command-line script that will be executed, we need to modify its file permissions. In a \*nix system you can do that as follows:
  `chmod +x <filename>.js # Make the file executable`

- map a command-line script to a command name with package.json `bin` field (supply a bin field in your package.json which is a map of command name to local file name.)

Let say we want our cli.js command-line file to be mapped to say-hello. We can do that by modifying our package.json and adding a bin field as follows:

```
//package.json
{
  "bin": {
    "say-hello": "./cli.js"
  }
}
```

- the keys become the command names, and the values are the NodeJS command-line script files mapped. That format allows us as developers to provide more than one script mapping.
- However, if we want to provide a single NodeJS command-line script with the same name as its file, we could just set a string instead of an object where the string would be the local file path.

  - We can choose any name for a command, but we do not want it to clash with existing popular command names such as ls, cd, dir and so on. If we use one existing name chances are it will not be executed, but instead the already installed one (results may vary).

- Then use `npm link` command to locally symlink a package folder. It will locally install any command listed in the bin field of our package.json
- Once executed, we will see our command being symlinked globally. Now, we can execute our NodeJS command-line script with its own "command name" `say-hello`

### More on npm link

- Under the hood, `npm link` (also applies to `npm install`) symlink all files specified in the `bin` field of package.json

  - according to npm docs:

    > On install, npm will symlink […] file[s] into prefix/bin for global installs, or ./node_modules/.bin/ for local installs.

  - On \*nix systems, the npm linking process is like creating a shortcut to our specified command file, which will be executed by the shell and then by node as specified with the shebang (#!/usr/bin/env node).
  - While on Windows, npm will do the same (only if the shebang is specified) but will also create a {command-name}.cmd that calls node to execute our specified command file.

- When we finish to test our symlinked command, we may want to remove it. We can achieve that by running the following code from inside the package directory.
  `npm unlink`

## ECMAScript Modules

- Experimental support for ECMAScript modules is enabled by default.
- Node.js will treat the following as ES modules:
  - files ending with .mjs
  - Files ending in .js when the nearest parent package.json file contains a top-level field "type" with a value of "module".
  - Strings passed in as an argument to `--eval`, or piped to node via STDIN, with the flag `--input-type=module`.
- Node.js will treat all other forms of input as CommonJS as well as the following:
  - Files ending in .cjs.
  - Files ending in .js when the nearest parent package.json file contains a top-level field "type" with a value of "commonjs".
  - Strings passed in as an argument to `--eval` or `--print`, or piped to node via STDIN, with the flag `--input-type=commonjs`.

### Package scope

- A folder containing a package.json file, and all subfolders below that folder until the next folder containing another package.json, are a **package scope**.
  - The "type" field defines how to treat .js files within the package scope.

### Difference between loaded as ES module vs loaded as CommonJs

- ES6 modules are pre-parsed in order to resolve further imports before code is executed.
- CommonJS modules load dependencies on demand while executing the code.
- CommonJS implementation allows for a defined structure in how files are loaded. Hence, code required from other files are loaded or parsed synchronously. For this reason, catching and detecting failure points or debugging code are easier and less tedious.

Here is code where the execution order differs:

```js
// ES2015 modules

// ---------------------------------
// one.js
console.log("running one.js");
import { hello } from "./two.js";
console.log(hello);

// ---------------------------------
// two.js
console.log("running two.js");
export const hello = "Hello from two.js";

// ---------------------------------
// output
// running two.js
// running one.js <<<<<<<
// hello from two.js
```

```js
// CommonJS modules

// ---------------------------------
// one.js
console.log("running one.js");
const hello = require("./two.js");
console.log(hello);

// ---------------------------------
// two.js
console.log("running two.js");
module.exports = "Hello from two.js";

// ---------------------------------
// output
// running one.js <<<<<<<
// running two.js
// hello from two.js
```

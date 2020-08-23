# chalk

beautiful console log messages

# chokidar

file watcher; written from Node.js fs API

# nodemon

nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.

nodemon does not require any additional changes to your code or method of development. nodemon is a replacement wrapper for node. To use nodemon, replace the word node on the command line when executing your script.

# cross-env

Most Windows command prompts will choke when you set environment variables with `NODE_ENV=production` like that. (The exception is Bash on Windows, which uses native Bash.) Similarly, there's a difference in how windows and POSIX commands utilize environment variables. With POSIX, you use: `$ENV_VAR` and on windows you use `%ENV_VAR%`. This library makes it so you can have a single command just set it like you would if it's running on a POSIX system, and cross-env will take care of setting it properly.

- danger: runs after CI; This library functions like a CI utility that lets you build out the rules specific to your team's culture, offering useful metadata and a comprehensive plugin system to share common issues.

# date-fns

date-fns provides the most comprehensive, yet simple and consistent toolset for manipulating JavaScript dates in a browser & Node.js.

# fs-extra

fs-extra adds file system methods that aren't included in the native fs module and adds promise support to the fs methods. It also uses graceful-fs to prevent EMFILE errors. It should be a drop in replacement for fs.

# ncp

Think cp -r, but pure node, and asynchronous. ncp can be used both as a CLI tool and programmatically.

# rimraf

The UNIX command rm -rf for node.

# glob

Match files using the patterns the shell uses, like stars and stuff.

# minimatch

This is the matching library used internally by npm.

It works by converting glob expressions into JavaScript RegExp objects.

# ignore

a manager, filter and parser which implemented in pure JavaScript according to the .gitignore spec 2.22.1.

To filter filenames according to a .gitignore file, I recommend this npm package, ignore.

To parse an .npmignore file, you should use minimatch, because an .npmignore file is parsed by npm using minimatch and it does not work in the .gitignore way.

# jsdom

jsdom is a pure-JavaScript implementation of many web standards, notably the WHATWG DOM and HTML Standards, for use with Node.js. In general, the goal of the project is to emulate enough of a subset of a web browser to be useful for testing and scraping real-world web applications.

# jest-silent-reporter

Custom reporter for Jest that only prints failed tests.

# joi

The most powerful schema description language and data validator for JavaScript.
For example, using to parse/check GraphQL schema

# js-yaml

This is an implementation of YAML. It can parse your YAML file to JSON.

YAML Ain't Markup Language, it is a human friendly data serialization standard for all programming languages. That means all programs can read it.

# lerna

Lerna is a tool that optimizes the workflow around managing multi-package repositories with git and npm. Internally it uses Yarn or the npm CLI to bootstrap (i.e. install all third party dependencies for each package) a project. In a nutshell, Lerna calls yarn/npm install for each package inside the project and then creates symlinks between the packages that refer each other.

# lint-staged

Run linters against staged git files

# markdown-magic

uses comment blocks in markdown files to automatically sync or transform its contents.

- Automatically keep markdown files up to date from local or remote code sources
- Transform markdown content with custom transform functions
- Render markdown with any template engine
- Automatically generate a table of contents
  ... etc

# concurrently

Run multiple commands concurrently. Like npm run watch-js & npm run watch-less but better.

usual way to run multiple commands concurrently is npm run watch-js & npm run watch-css. That's fine but it's hard to keep on track of different outputs. Also if one process fails, others still keep running and you won't even notice the difference.

Another option would be to just run all commands in separate terminals. I got tired of opening terminals and made concurrently.

# npm-run-all

better than concurrently.

it boasts three different commands, based on your needs:

1. npm-run-all (the main command, which has documentation on all of the flags and additions you can pass in via the command line)
2. run-s (run sequential — for when you need one command to finish before the next one starts)
3. run-p (run parallel — like when both the UI and server pieces of the application need to run side by side).

- Simplify. The official npm run-script command cannot run multiple scripts, so if we want to run multiple scripts, it's redundant a bit. Let's shorten it by glob-like patterns.
  Before: npm run clean && npm run build:css && npm run build:js && npm run build:html

- Cross platform. We sometimes use & to run multiple command in parallel, but cmd.exe (npm run-script uses it by default) does not support the &. Half of Node.js users are using it on Windows, so the use of & might block contributions. npm-run-all --parallel works well on Windows as well.

# plop

A generator framework that helps you create and hence enforce patterns in your code (routes, controllers, components, helpers, etc).

If you boil plop down to its core, it is basically glue code between inquirer prompts and handlebar templates.

# Inquirer

Helps create an interactive command line user interfaces.

# Handlerbars

Helps you build templates

```
var source = "<p>Hello, my name is {{name}}. I am from {{hometown}}. I have " +
             "{{kids.length}} kids:</p>" +
             "<ul>{{#kids}}<li>{{name}} is {{age}}</li>{{/kids}}</ul>";
var template = Handlebars.compile(source);

var data = { "name": "Alan", "hometown": "Somewhere, TX",
             "kids": [{"name": "Jimmy", "age": "12"}, {"name": "Sally", "age": "4"}]};
var result = template(data);

```

Would render:

<p>Hello, my name is Alan. I am from Somewhere, TX. I have 2 kids:</p>
<ul>
  <li>Jimmy is 12</li>
  <li>Sally is 4</li>
</ul>

# unified

unified is an interface for processing text using syntax trees. It’s what powers remark (Markdown), retext (natural language), and rehype (HTML), and allows for processing between formats.

unified enables new exciting projects like Gatsby to pull in Markdown, MDX to embed JSX, and Prettier to format it.

unified is an interface for processing text using syntax trees. Syntax trees are a representation of text understandable to programs. Those programs, called plugins, take these trees and inspect and modify them. To get to the syntax tree from text, there is a parser. To get from that back to text, there is a compiler. This is the process of a processor.

Every processor implements another processor. To create a processor, call another processor. The new processor is configured to work the same as its ancestor. But when the descendant processor is configured in the future it does not affect the ancestral processor.

When processors are exposed from a module (for example, unified itself) they should not be configured directly, as that would change their behavior for all module users. Those processors are frozen and they should be called to create a new processor before they are used.

# remark

unified processor to parse and serialize Markdown.

- API by unified
- Parses Markdown to a syntax tree with remark-parse
- mdast syntax tree
- Plugins transform the tree
- Serializes syntax trees to Markdown with remark-stringify

Don’t need the parser? Or compiler? That’s OK: use unified directly.

Remark is one of those plugins that will parse the markdown text into an AST that will let us apply other plugins and create an output

# rehype

transform remark to Rehype which turns that AST into HTML.

# svgo

SVG Optimizer is a Nodejs-based tool for optimizing SVG vector graphics files.

SVG files, especially those exported from various editors, usually contain a lot of redundant and useless information. This can include editor metadata, comments, hidden elements, default or non-optimal values and other stuff that can be safely removed or converted without affecting the SVG rendering result.

SVGO has a plugin-based architecture, so almost every optimization is a separate plugin.

# ts-jest

ts-jest is a TypeScript preprocessor with source map support for Jest that lets you use Jest to test projects written in TypeScript.

It supports all features of TypeScript including type-checking. Read more about Babel7 + preset-typescript vs TypeScript (and ts-jest).

# yargs

Yargs helps you build interactive command line tools, by parsing arguments and generating an elegant user interface. Similar to commander.js but with more utilities

# dictionary-en

English spelling dictionary in UTF-8.

Useful with hunspell, nodehun, nspell, Open Office, LibreOffice, Firefox and Thunderbird, or macOS.

Generated by dictionaries from wordlist.aspell.net.

# Nodehun

Nodehun aims to expose as much of hunspell's functionality as possible in an easy to understand and maintainable way, while also maintaining the performance characteristics expected of a responsible node module.

Hunspell is a free spell checker and morphological analyzer library and command-line tool, licensed under LGPL/GPL/MPL tri-license.

Hunspell is used by LibreOffice office suite, free browsers, like Mozilla Firefox and Google Chrome, and other tools and OSes, like Linux distributions and macOS. It is also a command-line tool for Linux, Unix-like and other OSes.

It is designed for quick and high quality spell checking and correcting for languages with word-level writing system, including languages with rich morphology, complex word compounding and character encoding.

# nspell

Hunspell compatible spell-checker in plain-vanilla JavaScript.

nspell contains most of the essential core of Hunspell. It does not contain a tokeniser but leaves many details up to implementors. The main difference, conceptually, is that Hunspell is based on the user and their preferences, whereas nspell is based on explicitly passed in options, thus producing the same results regardless of OS, file-system, or environment.

# jest-matchmedia-mock

This implementation of the window.matchMedia method allows you to control your media queries and their listening functions. You can update the media query that is currently applied to the document by simply calling one function.

# @babel/code-frame

Gives you this nice formatted error output:

```
  1 | class Foo {
> 2 |   constructor() {
    |                 ^
> 3 |     console.log("hello");
    | ^^^^^^^^^^^^^^^^^^^^^^^^^
> 4 |   }
    | ^^^
  5 | };
```

# better-opn

Reuse the same tab on Chromium-based browsers on macOS

# clipboardy

Access the system clipboard (copy/paste)
Cross-platform. Supports: macOS, Windows, Linux, OpenBSD, FreeBSD, Android with Termux, modern browsers.

# common-tags

-A set of well-tested, commonly used template literal tag functions for use in ES2015+.

Plus some extra goodies for easily making your own tags.

Tagged templates in ES2015 are a welcome feature. But, they have their downsides. One such downside is that they preserve all whitespace by default - which makes multiline strings in source code look terrible.

common-tags also exposes a means of composing pipelines of dynamic transformer plugins. As someone with a little experience writing tagged templates, I can admit that it is often the case that one tag might need to do the same thing as another tag before doing any further processing; for example - a typical tag that renders out HTML could strip initial indents first, then worry about handling character escapes. Both steps could easily be useful as their own separate template tags, but there isn't an immediately obvious way of composing the two together for maximum re-use. common-tags offers not one, but two ways of doing this.

# configstore

Easily load and persist config without having to think about where and how

# conf

Simple config handling for your app or module
All you have to care about is what to persist. This module will handle all the dull details like where and how.

# convert-hrtime

Convert the result of process.hrtime() to seconds, milliseconds, nanoseconds

# envinfo

envinfo generates a report of the common details needed when troubleshooting software issues, such as your operating system, binary versions, browsers, installed languages, and more

It aims to provide information to solve these problems by gathering all of this information in one spot, quickly, and painlessly:

It works on my computer
"command not found"
what version of "command" are you running?
what version of "different command" are you running?
do you have "insert obscure android sdk version"?
every github issue reporting template ever:

# execa

This package improves child_process methods with:

- Promise interface.
- Strips the final newline from the output so you don't have to do stdout.trim().
- Supports shebang binaries cross-platform.
- Improved Windows support.
- Higher max buffer. 100 MB instead of 200 KB.
- Executes locally installed binaries by name.
- Cleans up spawned processes when the parent process dies.
- Get interleaved output from stdout and stderr similar to what is printed on the terminal. (Async only)
- Can specify file and arguments as a single string without a shell
- More descriptive errors.

# is-ci-cli

Run different npm scripts in a CI environment

# hosted-git-info

This will let you identify and transform various git hosts URLs between protocols. It also can tell you what the URL is for the raw path for particular file for direct access without git.

Currently this supports Github, Bitbucket and Gitlab

# Ink

Ink provides the same component-based UI building experience that React offers in the browser, but for command-line apps. It uses Yoga to build Flexbox layouts in the terminal, so most CSS-like props are available in Ink as well. If you are already familiar with React, you already know Ink.

# ink-spinner

Spinner component for Ink. Uses cli-spinners for the collection of spinners.

# cli-spinners

The list of spinners is just a JSON file and can be used wherever.

# meant

Like the Did you mean? in git for npm

# node-fetch

A light-weight module that brings window.fetch to Node.js

Instead of implementing XMLHttpRequest in Node.js to run browser-specific Fetch polyfill, why not go from native http to fetch API directly? Hence node-fetch, minimal code for a window.fetch compatible API on Node.js runtime.

# opentracing

This library is a JavaScript implementation of Open Tracing API. It is intended for use both on the server and in the browser.

To fully understand this platform API, it's helpful to be familiar with the OpenTracing project and terminology more specifically.

## What is OpenTracing

OpenTracing is comprised of an API specification, frameworks and libraries that have implemented the specification, and documentation for the project. OpenTracing allows developers to add instrumentation to their application code using APIs that do not lock them into any one particular product or vendor.

It is probably easier to start with what OpenTracing is NOT.

- OpenTracing is not a download or a program. Distributed tracing requires that software developers add instrumentation to the code of an application, or to the frameworks used in the application.

- OpenTracing is not a standard. The Cloud Native Computing Foundation (CNCF) is not an official standards body. The OpenTracing API project is working towards creating more standardized APIs and instrumentation for distributed tracing.

OpenTracing aids Distributed Tracing

## What is Distributed Tracing

Distributed tracing, also called distributed request tracing, is a method used to profile and monitor applications, especially those built using a microservices architecture. Distributed tracing helps pinpoint where failures occur and what causes poor performance.

# pretty-error

A small tool to see node.js errors with less clutter which is more readable compared to node's unformatted errors

# progress

Flexible ascii cli progress bar.

# prompts

Lightweight, beautiful and user-friendly interactive prompts.

# resolve-cwd

Resolve the path of a module like require.resolve() but from the current working directory

# signal-exit

When you want to fire an event no matter how a process exits:

- reaching the end of execution.
- explicitly having process.exit(code) called.
- having process.kill(pid, sig) called.
- receiving a fatal signal from outside the process

# source-map

This is a library to generate and consume the source map format from Source Map Revision 3 Proposal

# stack-trace

Get v8 stack traces as an array of CallSite objects.

# strip-ansi

strip ANSI escape codes from a string

# update-notifier

Update notifications (UI) for your CLI app

# yurnalist

An elegant console reporter, borrowed from Yarn.
Pretty console output makes developers happy and Yarn is doing a nice job. Yurnalist takes the internal console reporter code from Yarn and makes it available for use in other Node.js applications.

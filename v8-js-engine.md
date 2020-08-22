# V8 stack trace API

- All internal errors thrown in V8 capture a stack trace when they are created.
- This stack trace can be accessed from JavaScript through the non-standard `error.stack` property.

  - By default, almost all errors thrown by V8 have a stack property that holds the topmost 10 stack frames
  - You can control how many stack frames are collected by setting the variable `Error.stackTraceLimit`
  - Setting it to 0 disables stack trace collection.
  - Setting it to Infinity means that all frames get collected.
  - This variable only affects the current context; it has to be set explicitly for each context that needs a different value. (Note that what is known as a “context” in V8 terminology corresponds to a page or `<iframe>` in Google Chrome)

- To set a default value that affects all contexts, `--stack-trace-limit <value>`

  - To pass this flag to V8 when running Google Chrome, use `--js-flags='--stack-trace-limit <value>'`

- The `--async-stack-trace` flag enables the new zero-cost async stack traces.
  - it enriches the stack property of Error instances with async stack frames, i.e. await locations in the code. These async frames are marked with `async` in the stack string
  - At the time of this writing, this functionality is limited to await locations and Promise.all(), since for those cases the engine can reconstruct the necessary information without any additional overhead

## Customize stack trace

- The `stack` property in V8 just holds a flat string containing the formatted stack trace. This is for no other reason than compatibility with other browsers. However, this is not hardcoded but only the default behavior and can be overridden by user scripts.

- For efficiency stack traces are not formatted when they are captured but on demand, the first time the stack property is accessed. A stack trace is formatted by calling `Error.prepareStackTrace(error, structuredStackTrace)` and using whatever this call returns as the value of the `stack` property.

- If you assign a different function value to `Error.prepareStackTrace` that function is used to format stack traces. It gets passed the error object that it is preparing a stack trace for, as well as a structured representation of the stack. **User stack trace formatters are free to format the stack trace however they want and even return non-string values**

  - It is safe to retain references to the structured stack trace object after a call to prepareStackTrace completes so that it is also a valid return value.

- Note that the custom `prepareStackTrace` function is only called once the stack property of Error object is accessed.

- The structured stack trace is an array of CallSite objects, each of which represents a stack frame. You can find its object methods in https://v8.dev/docs/stack-trace-api
  - The default stack trace is created using the CallSite API so any information that is available there is also available through this API.

> API described here is specific to V8 and is not supported by any other JavaScript implementations. Most implementations do provide an error.stack property but the format of the stack trace is likely to be different from the format described here.

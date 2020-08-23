# npm-link (or yarn link)

alias: npm ln

- useful when you are simultaneously working on an Application and the Dependency used by the Application.

## How to link

- its a 2 step process:

1. Create a global symlink for a dependency with npm link.

- first, run `npm link` in a package directory.
- This creates a symlink in the global folder (specifically, the global node_modules directory. This is a special directory where all modules installed with `npm install -g` are stored) `{prefix}/lib/node_modules/<package>` that links to the package where `npm link` was ran. It will also link any bins in the package to `{prefix}/bin/{name}`
  - see `npm-config` for the value of `prefix`
  - you can find the path to your global node_modules directory by running `npm root -g`

2. Tell the application to use the global symlink with `npm link <dependency-package-name>`

- This will create a symbolic link from globally-installed `<dependency-package-name>` to `node_modules/` of application

## Unlinking or turning it back to normal

- `npm unlink` is an alias for `npm uninstall`.

1. Run in the application `npm unlink --no-save <dependency-package-name>`
2. Then run `npm unlink`

- This cleans up the global link

- If you switch branches, you will need to link your packages again

# package.json files property

- The optional files field is an array of file patterns
- It describes the entries to be included when your package is installed as a dependency.
- File patterns follow a similar syntax to .gitignore, but reversed in the sense that

  - including a file, directory, or glob pattern (\_, `**`, and such) will make it so that file is included in the tarball when it’s packed
  - Omitting the field will make it default to ["*"], which means it will include all files.

- You can also provide a .npmignore file in the root of your package or in subdirectories, which will keep files from being included.
- Files included with the “package.json#files” field cannot be excluded through .npmignore or .gitignore.
- At the root of your package it will not override the “files” field, but in subdirectories it will.

- The .npmignore file works just like a .gitignore. If there is a .gitignore file, and .npmignore is missing, .gitignore’s contents will be used instead.

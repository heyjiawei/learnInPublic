# yarn workspace

Why Lerna is insufficient?
In a nutshell, Lerna calls yarn/npm install for each package inside the project and then creates symlinks between the packages that refer each other.

But being a wrapper of a package manager, Lerna can’t manipulate the contents of node_modules efficiently:

1. Lerna calls yarn install multiple times for each package. This creates overhead because each package.json is considered independent and they can’t share dependencies with each other. This causes a lot of duplication for each node_modules folder which quite often use the same third-party packages.

2. Lerna manually creates links between packages that refer each other after installation has finished. This introduces inconsistency inside node_modules that a package manager may not be aware of. And so running yarn install from within a package may break the meta structure that Lerna manages.

Issues such as these convinced us, as package manager developers, that we should support multi-package repositories directly in Yarn

Yarn Workspaces is a feature that allows users to install dependencies from multiple package.json files in subfolders of a single root package.json file, all in one go.

Making Workspaces native to Yarn enables faster, lighter installation by preventing package duplication across Workspaces. Yarn can also create symlinks between Workspaces that depend on each other, and will ensure the consistency and correctness of all directories. \

Only the dependencies depended upon by a workspace can be accessed. Said another way, we strictly enforce your workspaces dependencies.

- Doing this allows us to cleanly decouple projects from one another, since you don't have to merge all their dependencies in one huge unmaintainable list. We still provide tools to manage dependencies from multiple workspaces at once, but they need to be explicitly used and offer a better integration (for example yarn add can make suggestions for your new dependencies based on what other workspaces use, but you can override them).

- If the package manager was to resolve a range that a workspace could satisfy, it will prefer the workspace resolution over the remote resolution if possible. This is the pillar of the monorepo approach: rather than using the remote packages from the registry, your project packages will be interconnected and will use the code stored within your repository.

Workspaces are a new way to set up your package architecture that’s available by default starting from Yarn 1.0. It allows you to setup multiple packages in such a way that you only need to run yarn install once to install all of them in a single pass.

When you use yarn workspace, Yarn will use a single lockfile rather than a different one for each project, which means fewer conflicts and easier reviews.

The workspaces field is an array containing the paths to each workspace. Since it might be tedious to keep track of each of them, this field also accepts glob patterns! For example, Babel reference all of their packages through a single packages/\* directive.

If you’re only making changes to a single workspace, use `–focus` to quickly install sibling dependencies from the registry rather than building all of them from scratch.

## How to use yarn workspace

Add the following in a package.json file. Starting from now on, we’ll call this directory the “workspace root”:

In workspace root directory's package.json

```
{
  "private": true,
  "workspaces": ["workspace-a", "workspace-b"]
}
```

> Note that the private: true is required! Workspaces are not meant to be published, so we’ve added this safety measure to make sure that nothing can accidentally expose them.

After this file has been created, create two new subfolders named workspace-a and workspace-b. In each of them, create another package.json file with the following content:

workspace-a/package.json:

```
{
  "name": "workspace-a",
  "version": "1.0.0",

  "dependencies": {
    "cross-env": "5.0.5"
  }
}
```

workspace-b/package.json:

```
{
  "name": "workspace-b",
  "version": "1.0.0",

  "dependencies": {
    "cross-env": "5.0.5",
    "workspace-a": "1.0.0"
  }
}
```

Finally, run yarn install somewhere, ideally inside the workspace root.
You should see the following file structure:

```
/package.json
/yarn.lock

/node_modules
/node_modules/cross-env
/node_modules/workspace-a -> /workspace-a

/workspace-a/package.json
/workspace-b/package.json
```

- Requiring workspace-a from a file located in workspace-b will now use the exact code currently located inside your project rather than what is published on npm
- the cross-env package has been correctly deduped and put at the root of your project to be used by both workspace-a and workspace-b.
- /workspace-a is aliased as /node_modules/workspace-a via a symlink.
- the /workspace-a/package.json `name` field is used and not the folder name.

  - that if the /workspace-a/package.json name field was "pkg-a", the alias will be the following: /node_modules/pkg-a -> /workspace-a and you will be able to import code from /workspace-a with const pkgA = require("pkg-a"); (or maybe import pkgA from "pkg-a";).

- In the example above, if workspace-b depends on a different version than the one referenced in workspace-a’s package.json, the dependency will be installed from npm rather than linked from your local filesystem. This is because some packages actually need to use the previous versions in order to build the new ones (Babel is one of them).

- Be careful when publishing packages in a workspace. If you are preparing your next release and you decided to use a new dependency but forgot to declare it in the package.json file, your tests might still pass locally if another package already downloaded that dependency into the workspace root. However, it will be broken for consumers that pull it from a registry, since the dependency list is now incomplete so they have no way to download the new dependency. Currently there is no way to throw a warning in this scenario.

- Workspaces must be descendants of the workspace root in terms of folder hierarchy.

- You cannot and must not reference a workspace that is located outside of this filesystem hierarchy.

- if you try to setup nested workspaces then you must make sure that the nested worktree is defined as a valid workspace of its parent worktree (otherwise Yarn won't find its correct parent folder).

- Note that because worktrees are defined with an otherwise regular package.json file, they also are valid workspaces themselves. If they're named, other workspaces will be able to properly cross-reference them.

## How does yarn workspace compare to lerna?

Yarn’s workspaces are the low-level primitives that tools like Lerna can (and do!) use. Yarn workspace will never try to support the high-level feature that Lerna offers, but by implementing the core logic of the resolution and linking steps inside Yarn itself we hope to enable new usages and improve performance.

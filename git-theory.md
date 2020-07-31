- commits are snapshots with meta data.
- git uses a Directed Acyclic Graph (DAG) to model history instead of a linear line.
- every commit points back to it's parent commit
- a merge commit has multiple parents

Object structure in git:

- folders == tree
- files == blobs
- objects == a mapping of an SHA hash to the commit

How commits are stored into disk:

1. The hash is generated from with SHA hashing algo on the content of the object. The hash is thus determinisitc based on their content.
2. There exist an objects map that maps the SHA hash to the object.

How to make commits human-readable?

- Git has _references_ that maps human readable name to SHA string

How to use git cli?

- run `git init` in the folder you wish to track files with git

`git cat-file` looks into objects

`git commit -a` only adds tracked files. Tracked files are files that exist in git. This means new files are not under tracked files.

`git add :/` add everything to staging (including non-tracked files)

`git log --all --graph --decorate`

HEAD == where you are currently looking at right now.

`git checkout <file>` revert changes in <file> at the snapshot where HEAD points to.

Tool for merging git merge conflict on cli: `git mergetool`

`git remote` lists all the remotes that git is aware of in the current repository.

You can add a relative folder as remote with `git remote add origin ../remote`.
origin is the default name if you are only referring to 1 single remote

Push to the remote branch with the name specified here:
`git push <remote> <local branch>:<remote branch>`

branches in local git repository will not have <remote> name prepended.

`git clone --shallow` clones the repository latest snapshot. It is fast and does not contain any history.

`git add -p <file>` lets you interactively stage pieces within a file for commit

`git bisect` to manually search history. At what commit did it break. Uses binary search. Can pass in a test case and check at which commit did the test break.

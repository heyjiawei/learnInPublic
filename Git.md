Git

On Unix
/etc/gitconfig file: Contains values applied to every user on the system and all their repositories. If you pass the option --system to git config, it reads and writes from this file specifically. (Because this is a system configuration file, you would need administrative or superuser privilege to make changes to it.)

~/.gitconfig or ~/.config/git/config file: Values specific personally to you, the user. You can make Git read and write to this file specifically by passing the --global option, and this affects all of the repositories you work with on your system.

config file in the Git directory (that is, .git/config) of whatever repository you’re currently using: Specific to that single repository. You can force Git to read from and write to this file with the --local option, but that is in fact the default. (Unsurprisingly, you need to be located somewhere in a Git repository for this option to work properly.)

The more specific config level will override the previous level

On Windows systems, Git looks for the .gitconfig file in the $HOME directory (C:\Users\$USER for most people). It also still looks for /etc/gitconfig, although it’s relative to the MSys root, which is wherever you decide to install Git on your Windows system when you run the installer. If you are using version 2.x or later of Git for Windows, there is also a system-level config file at C:\Documents and Settings\All Users\Application Data\Git\config on Windows XP, and in C:\ProgramData\Git\config on Windows Vista and newer. This config file can only be changed by git config -f <file> as an admin.
	
	
Configure your
1. Identity
$ git config --global user.name "John Doe"
$ git config --global user.email johndoe@example.com
	
2. Your Editor
$ git config --global core.editor emacs

On a Windows system, if you want to use a different text editor, you must specify the full path to its executable file. This can be different depending on how your editor is packaged.	
	
3. Checking your settings	
$ git config --list
user.name=John Doe
user.email=johndoe@example.com
color.status=auto
color.branch=auto
color.interactive=auto
color.diff=auto
...	
	
You may see keys more than once, because Git reads the same key from different files (/etc/gitconfig and ~/.gitconfig, for example). In this case, Git uses the last value for each unique key it sees.	
	
Since Git might read the same configuration variable value from more than one file, it’s possible that you have an unexpected value for one of these values and you don’t know why. In cases like that, you can query Git as to the origin for that value, and it will tell you which configuration file had the final say in setting that value:
$ git config --show-origin rerere.autoUpdate
file:/home/johndoe/.gitconfig	false	
	
5. Getting help
If you ever need help while using Git, there are two equivalent ways to get the comprehensive manual page (manpage) help for any of the Git commands:
$ git help <verb>
$ man git-<verb>
For example, you can get the manpage help for the git config command by running
$ git help config
	
6. Quick refresher
$ git <verb> -h

Basic git commands:
Initialize repository. Must be at repository root folder first
git init

Cloning an existing repository (or checkour for other VCS)
git clone https://github.com/libgit2/libgit2 directoryname

"Add precisely this content to the next commit." Used for tracking new files to stage files, and do many other things like merge conflicted files as resolved. Also Git stages a file exactly as it is when you run the git add command. If you commit now, the version of CONTRIBUTING.md as it was when you last ran the git add command is how it will go into the commit, not the version of the file as it looks in your working directory when you run git commit. If you modify a file after you run git add, you have to run git add again to stage the latest version of the file
git add *

Commit files with a message
git commit -m 'your msg here'
git commit -a -m 'your msg here' 		#makes Git automatically stage every file that is already tracked before doing the commit, letting you skip the git add part
	
Checking the status of your file. Git also has a short status flag so you can see your changes in a more compact way.
git status
git status -s	

Removing files (remove from your staging area and then commit).
If you modified the file and added it to the staging area already, you must force the removal with the -f option. This is a safety feature to prevent accidental removal of data that hasn’t yet been recorded in a snapshot and that can’t be recovered from Git.
git rm <filename>	
	
you may want to do is to keep the file in your working tree but remove it from your staging area. In other words, you may want to keep the file on your hard drive but not have Git track it anymore. 
git rm --cached README
	
Update renamed files
If you rename a file in Git, no metadata is stored in Git that tells it you renamed the file. 
Git has a mv command. If you want to rename a file in Git
git mv file_from file_to

Viewing the commit history
By default, with no arguments, git log lists the commits made in that repository in reverse chronological order — that is, the most recent commits show up first. As you can see, this command lists each commit with its SHA-1 checksum, the author’s name and email, the date written, and the commit message.
git log

One of the more helpful options is -p or --patch, which shows the difference (the patch output) introduced in each commit. You can also limit the number of log entries displayed, such as using -2 to show only the last two entries.
git log -p -2
git log --pretty=format:"%h %s" --graph 		#This option adds a nice little ASCII graph showing your branch and merge history

Prevent displaying merge commits
git log --no-merges

Undo commits. 
If you’ve made no changes since your last commit (for instance, you run this command immediately after your previous commit), then your snapshot will look exactly the same, and all you’ll change is your commit message. This command takes your staging area and uses it for the commit.
git commit --amend

Unstaging a staged file
git reset <filename>

revert a modified file. Any changes you made to that file are gone as Git copied another file over it
git checkout -- README.md 

What have you changed but not yet staged? And what have you staged that you are about to commit? git diff by itself doesn’t show all changes made since your last commit — only changes that are still unstaged. If you’ve staged all of your changes, git diff will give you no output.
git diff
git diff --staged. This command compares your staged changes to your last commit	
	
Working with remotes
origin is the default name Git gives to the server you cloned from
git remote
git remote -v 	# shows the shortname (the contributer's name, shortened) Git have given to the URL

There can be multiple remotes for a repository. This means there are several collaborators working on it. This also means we can pull contributions from any of these users

Adding remote repositories
git remote add <shortname> <url>

$ git remote add pb https://github.com/paulboone/ticgit
$ git remote -v
origin	https://github.com/schacon/ticgit (fetch)
origin	https://github.com/schacon/ticgit (push)
pb	https://github.com/paulboone/ticgit (fetch)
pb	https://github.com/paulboone/ticgit (push)

Fetching all information that another contributer has but you don't have yet in your repository. The command goes out to that remote project and pulls down all the data from that remote project that you don’t have yet. After you do this, you should have references to all the branches from that remote, which you can merge in or inspect at any time.
note that the git fetch command only downloads the data to your local repository — it doesn’t automatically merge it with any of your work or modify what you’re currently working on. You have to merge it manually into your work when you’re ready
git fetch <shortname>
git fetch <remote-url>

Automatically fetch and merge that remote branch into your current branch. If your current branch is set up to track a remote branch, you can use the git pull command to automatically fetch and merge that remote branch into your current branch.
By default, the git clone command automatically sets you your local master branch to track the remote master branch
git pull

Pushing to remote
git push <remote> <branch>

Only works if you have cloned from a server to which you have write access AND if nobody has pushed in the meantime
git push origin master
	
Inspecting a remote.
This command shows which branch is automatically pushed to when you run git push while on certain branches. It also shows you which remote branches on the server you don’t yet have, which remote branches you have that have been removed from the server, and multiple local branches that are able to merge automatically with their remote-tracking branch when you run git pull.
git remote show origin

Renaming and remove Remotes. What used to be referenced at pb/master is now at paul/master.
$ git remote rename pb paul
$ git remote
origin
paul

$ git remote remove paul
$ git remote
origin

.gitignore commands	 https://github.com/github/gitignore 
- tilde (~), which is used by many text editors such as Emacs to mark temporary files
The rules for the patterns you can put in the .gitignore file are as follows:
Blank lines or lines starting with # are ignored.
Standard glob patterns work, and will be applied recursively throughout the entire working tree.
You can start patterns with a forward slash (/) to avoid recursivity.
You can end patterns with a forward slash (/) to specify a directory.
You can negate a pattern by starting it with an exclamation point (!).	

Here is another example .gitignore file:
```
# ignore all .a files
*.a

# but do track lib.a, even though you're ignoring .a files above
!lib.a

# only ignore the TODO file in the current directory, not subdir/TODO
/TODO

# ignore all files in the build/ directory
build/

# ignore doc/notes.txt, but not doc/server/arch.txt
doc/*.txt

# ignore all .pdf files in the doc/ directory and any of its subdirectories
doc/**/*.pdf
```	

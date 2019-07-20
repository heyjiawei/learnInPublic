git push
Encountered error:
```
! [rejected]        master -> master (non-fast-forward)
error: failed to push some refs to 'https://github.com/heyjiawei/creditCardSavings.git'
hint: Updates were rejected because the tip of your current branch is behind
hint: its remote counterpart. Integrate the remote changes (e.g.
hint: 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
```

### What are fast-forwards?
When a reference that is pointing at commit A is pointed to another commit B WHERE B is a descendant of A (i.e. B branched from A or a child of A).

In a fast-forward update from A to B, the new set of commit is built on top of A. Hence, it does not lose any history.

### What are non-fast-forwards update?
Basically, conflicting changes.
When there are 2 references stemming from the same parent branch, and one of them has its changes pushed to the branch. IF the other reference were to attemp to update the branch (that is currently pointing at the parent and not the new update), it would be attempting to update the branch with the latter reference. This means removing the changes introduced by the first reference. This is a non-fast-forward update.

- non-fast-forward updates will lose history

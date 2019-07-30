Frontend Website code organization
- no correct answer!

There are a few patterns:
handlers - what to do after calling a url/ a url is hit
URL mapping - maps a URL to a handler
DB models - the objects we are working on. ORM (object relational mapping)
static content - CSS, Javascript, Images
templates
Utils

If you notice cyclic dependecy, its time to pull out something so the dependency is tree like
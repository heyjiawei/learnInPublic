# Difference between Test Runner, Testing Framework, Assertion Library and a Testing plugin
Karma is an example of a test runner
Mocha is an example of a testing framework
Chai is an example of an assertion library
Sinon is an example of a testing plugin

## Karma is a Test Runner
Karma is a type of test runner which creates a fake server, and then spins up tests in various browsers using data derived from that fake server. Karma is only a test runner, and requires a testing framework such as Mocha to plug into it in order to actually run tests.

Test Runners work on the highest level of abstraction out of all testing software. All the other testing software takes place within the test runner. As a result, it is necessary to configure the test runner to work with the other testing software which plug into it. In our example of using Karma as a test runner, karma init is the command which creates the karma.conf.js file. This file is where all our test runner configurations will be.

The header of each karma configuration file follows this structure:
```
module.exports = function(config) {
  config.set({
    basePath: '../..',
    frameworks: ['mocha']
```
As you can see, this configuration file offers us a hook to include our testing framework, which exist on a lower level of abstraction than our test runner.

## Mocha is a Testing Framework and Chai is an assertion library
We can distinguish between framework (Mocha) methods and assertion library (Chai) methods by looking at the contents of the it block. 

Methods outside the it block are generally derived from the testing framework. Everything within the it block is code coming from the assertion library. ```beforeEach, describe, context, it```, are all methods extending from Mocha.``` expect, equal, and exist```, are all methods extending from Chai.

All the methods concerned with the testing framework are occurring outside the it block, and all methods concerned with the assertion library are occurring inside the it block. Therefore we can conclude that anything occurring inside the it block is indeed occurring on a lower level of abstraction than the testing framework. 

Or in terms of our classification schema, everything occurring inside the it blocks is either part of an assertion library or a part of a testing plugin. 

The notion that anything inside the it block is occurring on a lower level of abstraction than the testing framework is only a heuristic, that is- it is merely a rule of thumb.

The assertion library is what actually runs the specs and determines whether any given condition is valid or not. Ultimately, every test is ran by methods which are derived from our assertion library. It is worth mentioning though, not every framework needs an external assertion library. Jasmine for example, has it's own assertion library builtin. Mocha is just structured in such a way where it does need an external assertion library. This makes Mocha more difficult to setup initially, but offers much greater flexibility than frameworks which use a builtin assertion library such as Jasmine.

## Sinon Testing Plugin
Sinon is a plugin which hooks into Chai and gives us the ability to perform a more diverse set of tests. Through the Sinon plugin we can create mocks, stubs, and fake servers:
```
describe('API integration', function(){
  var server, setupStub, JSONresponse;

  beforeEach(function() {
    setupStub = sinon.stub(todo, 'setup');
    server = sinon.fakeServer.create();
  });

  it('todo.setup receives an array of todos when todo.init is called', function () {
  });

  afterEach(function() {
    server.restore();
    setupStub.restore();
  });
});
```
Sinon has a bunch of cool features that allow you to really get into the nooks and crannies of your source code and see what is really going on under the hood.
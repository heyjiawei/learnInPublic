In the past few months, when we all had to stay home due to the Covid situation, Shopee, the company I work at encouraged us to upskill ourselves; even giving us subsidies for it. I took this opportunity and bought the course TestingJavaScript by Kent C. Dodds. If you don't already know, Kent C. Dodds is a well known figure in the JavaScript and React community and his articles are always so helpful. I have tried writing tests for frontend and I stumbled on a few problems that were difficult to Google.

How do you write tests so that they do not contain implementation details? After all, isn't the DOM structure an implementation detail as well? How do you test features that uses, rely or includes users using the browser features, like the browser back button? How do you test features that heavily rely on JavaScript browser API, like a virtual list component? Is there anyway to test for memory leak? How do you maintain tests?

I should preface that this course assumes you have the knowledge of what to test and it focuses on supplementing the "how" part of this question. If you are unsure of what to test or have questions regarding testing frontend, I recommend you check out The Testing Garden of Kent C. Dodds https://kentcdodds.com/testing/

The course was split into 8 sections.

Section 1 was learning how Jest works. It's useful if you wish to write or customise your own testing framework. The section summaries the main details of how and why things work in a testing framework. If you are interested in this topic, you can check out Jest codebase on Github.

Section 2 was on configurations. Not Jest configurations; that's section 4. It shows you how to configure prettier, husky, ESLint rules, lint-stage. These were things I was familiar with so I skipped it :p

Section 3 was on how to Mock with Jest. This section wasn't much different from Jest's mocking documentation.

Section 4 was on how to configure Jest and this section surprised me. You can configure your test runner to run watch mode on 2 projects instead of 1, making it easy to test as you switch between backend and frontend. You can also use Jest as a task runner. Kent demonstrated using Jest to run ESLint and this made me wonder if you can run your CSS visual regression tests this way too. If this is possible, we would be able to refactor existing UI components without the need to verify visually on every change!

Section 5 is the part I have been waiting for. It's probably also the only section I would pay for. In this section, Kent demonstrates how to not test implementation details - you check the DOM structure hahaha. And he uses react testing library to do so. This section heavily uses React testing library. React testing library has similar API methods as Selenium but seems to be easier to work with. If you have tried Selenium's DOM querying methods, you may notice that sometimes return false negatives. I haven't tried react testing library out yet so I can't comment on how well it would work. He also demonstrateed how he uses snapshot testing; Use snapshots for capturing data that changes, and for data you deem important but have no or little control over. Kent gave the example of error messages, logs but I think this could be extended to API responses as well.

You want to stick to small, inline snapshots as much as possible so people reading your tests would be able to see what is being serialised rather than going to an external file to view it. Doing so would have the additional effect of making your test maintainable.

You can also pair snapshot with jest-emotion-serializer. Doing so would enable you to check if a CSS class is actually being applied to the component, which is helpful if your component behaviour is coupled with CSS. Kent also covers the ground of how to resolve the issue around testing with dynamic imports and timers.

Section 6 was on Cypress. This sections covers how to create E2E tests. While Kent doesn't answer how to test features that rely on browser actions, I think this would be how to test those kinds of features.

Section 7 was on using DOM testing library to test an JS framework. Since I only use React, I skipped it but if you use Svelte or other JS framework, this section could be useful for you.

Section 8 was on testing Node.js backend. Sadly I am not well versed with Node.js so I don't have much takeaway here.

Some learning points I would highlight:

- When dealing with CSS animation/transition/timeouts, you can mock the implementation of these to remove the wait time and brittleness, and then continue to check if your component prop is set.

- You can hide console error message by mocking console with jest.spyon. You can then Snapshot the text content of the error message. This will allow you to check against the error message whenever your test runs and give you the ease of updating it when the error message changes.

- If you have got lots of test cases that are basically the same test over and over with different values, you would do better with jest-in-case https://github.com/atlassian/jest-in-case

- When you are creating tests, be intentional. Keep intentions explicit. Your test data created should explicitly show what is the difference between each test data; Your test data generator functions should communicate what is important to the people reading the test later. If you created testing utils, focus on providing good API so its easy for others to use it. And if you have created testing utils, make them available everywhere in testing folders.

Conclusion
I think the biggest takeaway for me is the new perspective of viewing testing frontend as the problem to solved. See it like how we do our development. Instead of getting the code to work, the goal of testing is to ensure that the code does do what you expect it to do.

As Kent has stated in his testing blog articles, you don't need to test everything, and you can't test everything. But you should test your user workflow (i.e. how the application is suppose to behave) and make the trade offs you feel comfortable with; Testing is a logical evaluation of what should be tested and why.

Perhaps also a lack of effort on my part, on writing this article, I found a trove of resources that are helpful on finding the solution to my questions above. You can start with https://github.com/jest-community/awesome-jest if you have no know knowledge of Jest ecosystem. I also realise I could have also looked into how library creators (like react virtual list) tested their library to get some inspiration on how to test features that uses JavaScript browser API. Also, if you like a peek into what the course offers, here is a Github repository that contains notes of the course https://github.com/larrybotha/testing-javascript . P.S. It's not up to date though.

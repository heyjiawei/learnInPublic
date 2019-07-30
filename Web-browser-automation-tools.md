Web browser automation tools
Simulate Web Browsers
Some tools like CasperJS simulate browser behaviour (aka headless). This means they use a web browser engine to simulate certain test cases
Simulate browser behaviour are more productive
They may generate different results than those in the real browser
Support Cross browsers
Some work with different browsers without significant deviation or trouble to provide high performance
Selenium is that it’s primarily designed for Firefox
On the other hand, Casperjs is headless and is Webkit based, so it will across sites
These tools can differ not only in terms of functionality, but that they also behave differently in different conditions (depending on OS, browser type, multithread or singlethread). 
Working with different transaction scenarios simultaneously is much more productive with the headless tools since they consume less time

WebDriver
To run a test case on a particular browser you have to have its respective programs on your system. These programs are called Driver Servers.
A language helps in making your system understand that you wish to communicate with a browser. Webdriver is a set of APIs responsible for establishing that communication with the browser.
WebDriver is a set of APIs for testing web applications across different browsers.
WebDriver is a web automation framewrok that allows you to execute your tests against different browsers, not just FireFox (unlike Selenium IDE)
What happens is your frontend application code interacts withs WebDriver to manipulate the DOM elements on a page and control the behaviour of these containers on the browser
WebDriver controls the browser from the Operating System level. All you need are you programming language IDE (which contains your Selenium commands) and a browser
WebDriver is fast as it speaks directly to the browser using the browser's own engine to control it
WebDriver interacts with page elements in a more realistic way. For example, if you disabled a text box on a page you were testing, WebDriver cannot enter any value in it just as how a real person can't
WebDriver can support the headless HTMLUnit browser
HTMLUnit is termed headless because it is an invisible browser - it is GUI-less
Because it is GUI-less/ headless, it can only be controlled through automated means
You need a Driver Server for the browser you wish to test/automate in.
HTMLUnit and Firefox browsers allow WebDriver to access them directly. Other browsers require their own driver servers
Similarities between Selenium RC and WebDriver
They both allow you to use a programming language to design your test scripts
They both allow you to run your tests against different browsers

Limitations of WebDriver
WebDriver cannot readily support new browsers
Different browsers communicate with the OS in different ways. If a new browser comes out, it may have a different process of communicating with the OS as compared to other browsers.
You have to give the WebDriver team quite some time to figure that new process out before they can implement it on the next WebDriver release

Setting up WebDriver
You will need to download the Driver Server of the browser you wish to test. e.g. If you are testing on Google Chrome, you need ChromeDriver
After downloading, place your driver servers in a folder. You will need the file location for the next step
In your code, set webdriver path to the file location in the previous step

Do not mix implicit and explicit waits. Doing so can cause unpredictable wait times. 

Explicit Wait
You can define the amount of time to wait after an action is taken.
For the amount of time stated, Selenium will call the expected condition every 500 milliseconds until it returns successfully
A successful return value for the ExpectedCondition function type is a Boolean value of true, or a non-null object.
Otherwise, it will throw a timeout exception

Implicit Wait
Define the amount of time to allow checking of the DOM to find the presence of an element or elements
Once implicit wait is set, it is set for the life of the WebDriver object instance.

Test Design Considerations, Types of Tests
Testing Static Content
Testing for the existance of a static, non-changing UI element
If your page content is not likely to be affected then it may be more efficient to test page content manually. If, for example, your application involves files being moved to different locations, content tests may prove valuable.

Testing Links
Testing involves clicking each link and verifying the expected page. 
If static links are infrequently changed then manual testing may be sufficient. 
However if your web designers frequently alter links, or if files are occasionally relocated, link tests should be automated.

Function Tests
tests of a specific function within your application, requiring some type of user input, and returning some type of results. 
Often a function test can involve multiple pages with a form-based input page containing a collection of input fields, Submit and Cancel operations, and one or more response pages. User input can be via text-input fields, check boxes, drop-down lists, or any other browser-supported input.
Function tests are often the most complex tests you’ll automate, but are usually the most important. 
Typical tests can be for login, registration to the site, user account operations, account settings changes, complex data retrieval operations, among others. 
Function tests typically mirror the user-scenarios used to specify the features and design or your application.

Testing Dynamic Elements
A test script verifying that a document exists may not have a consistent identifier to use for locating that document. 
Often, dynamic elements with varying identifiers are on some type of result page based on a user action. This though certainly depends on the function of the web application.

Ajax Tests
data can be retrieved from the application server and then displayed on the page without reloading the entire page. 
Only a portion of the page, or strictly the element itself is reloaded.

Validating Results
Assert VS Verify
For Assert, when tests fail, assert will stop the following test cases from being executed
It is preferred over Verify
Verify will show that the test failed and continue executing the following test cases

Location Strategies
Locating the elements in the following order is recommended
the element’s ID
the element’s name attribute
an XPath statement
by a link’s text
document object model (DOM)

When locating dynamic elements, you can use the element's XPath statement
If however, you do need to use the ID to locate the element, a different solution is needed. You can capture this ID from the website before you use it in a Selenium command. It can be done like this.
click       //input
click       //div/p[2]/input[3]

OR
String[] checkboxids  = selenium.getAllFields(); // Collect all input IDs on page.

for(String checkboxid:checkboxids) {
    if(checkboxid.contains("addForm")) {
        selenium.click(checkboxid);
    }
}

Wrapping Selenium Calls
you will want to use utility functions to handle code that would otherwise be duplicated throughout your tests. 
One way to prevent this is to wrap frequently used selenium calls with functions or class methods of your own design. For example, many tests will frequently click on a page element and wait for page to load multiple times within a test.

selenium.click(elementLocator);
selenium.waitForPageToLoad(waitPeriod);

To

/**
 * Clicks and Waits for page to load.
 *
 * param elementLocator
 * param waitPeriod
 */
public void clickAndWait(String elementLocator, String waitPeriod) {
        selenium.click(elementLocator);
        selenium.waitForPageToLoad(waitPeriod);
}

‘Safe Operations’ for Element Presence
This is the wrapping of Selenium methods to check for the presence of an element on a page before carrying out some operation
It is used to implement an operation that depends on an expected element being present
If test execution is to be continued, even in the wake of missing elements on the page, then safe methods could be used, while posting a message to a log about the missing element. 
This, essentially, implements a ‘verify’ with a reporting mechanism as opposed to an abortive assert. 
But if an element must be available on a page in order to be able to carry out further operations (i.e. login button on home page of a portal) then this safe method technique should not be used.



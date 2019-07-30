What is Cordova?
- Formerly called Phone Gap
- Is a platform to build Native Mobile App using HTML5, CSS and JavaScript
- It acts as a container for running a web application written in HTML, CSS, JS and agive them access to native device functionality like Camera, GPS, Accelerometer, Contacts etc.
- Packages the web application into devices installer format:
	- Android - .apk (Android Application Package)
	- IOS - .ipa
	- Windows Phone .xap (Silverlight Application Package)

Apache Cordova is an engine that powers PhoneGap, like how Webkit is an engine that powers Chrome

The Cordova libraries communicate with the Native Framework of the respective OS
It wraps the application in a Native Container. 
- For IOS: UIWebView class
- Android: android.webkit.webview
- Windows: WebViewClass

If Cordova does not provide an API to complete your application requirement, a custom Native Plugin can be created and used

What is Kapsel?
Kapsel is a set of custom plugins developed by SAP underlying the Cordova technology to meet the enterprise requirements like encryption storage, Cache Management, Logon, AuthProxy, fiori client etc.

Use ConfigApp  to quickly create and edit config.xml files used by Cordova apps. ConfiGAP eases the process of changing the app id, icon,app name, manage plugins used in the app, splash screen, permissions of the app, and builds the app specific to device OS
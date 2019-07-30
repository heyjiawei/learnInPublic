Optimizing user experience for mobile devices and browsers
- Using Remote sources to debug a web app on an emulator, simulator or Physical device
	- npm install http-server -g
	- http-server -c-1 -p 8000
	- npm install ngrok -g
	- Browserstack 

- Scale a page correctly for small viewports with <meta> tag
	- <meta name='viewport' content='width=device-width, maximum-scale=1' />
		- maximum-scale=1 makes it unscallable

- Make a horizontal scrolling menu
	- in css:
	nav {
		display: flex;
		overflow-x: auto;
		-webkit-overflow-scrolling: touch; // This adds the flow effect
		margin: 10px 0;
	}
	
- Make a select dropdown list
	- in css:
	select {
		width: 100%;
		font-size: 30px;
		padding: 5px;
		border-radius: 5px
	}

- Make a nav menu available from a fixed-position header
	- in html:
	```
	<header>
		<div>Menu icon</div>
	</header>
	<nav>
		<ul>
			<li>Home</li>
			<li>Settings</li>
		</ul>
	</nav>
	```
	- in css:
	```
	header {
		position: fixed; // so header stays on top of the page
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	nav {
		display: none;
		position: fixed;
		top: 80px;
		left: 0;	// left, right and bottom 0 so it takes up the same size as our content
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.5); // so content has a blackish tint when menu is clicked
	}
	
	ul {
		background-color: dodgerblue;
	}
	
	li {
	padding: 20px;
	}
	```
	- in JS:  
	- toggle nav on click of header
	- on click of nav element, toggle nave and on click of nav children, return false. 
	- This is so that clicking on any menu links will not toggle nav to close
	
- use sticky positions for section headers
	- in CSS:
	```
	dt {
		background-color: mediumseagreen;
		position: sticky;
		position: -webkit-sticky;
		top: 0;
	}
	```
	- you should check if the device or operating system supports sticky
	
	
	
	
	
	
	
	
	
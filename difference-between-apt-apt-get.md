- Debian's APT (advanced packaging tool) is not the same as Ubuntu's apt

There are various tools that interact with APT and allowed you to install, remove and manage packages in Debian based Linux distributions (Ubuntu is one of them).
	- apt is one of such cli tool that is popular
	- Aptitude is also popular. It has both GUI and cli options

Problem: 
- apt-get commands and a number of similar commands are too low level. 
- They also have many functionalities which may never be used by an average Linux user.
- The most commonly used package management commands are scattered across apt-get and apt-cache

The apt commands have been introduced to solve this problem. 
- apt consists some of the most widely used features from apt-get and apt-cache leaving aside obscure and seldom used features. 
- It can also manage apt.conf file.

The main aim of apt is to provide an efficient way of handling package in a way “pleasant for end users” and can have tons of command options.
apt-get on the other hand gives you all the necessary tools in one place.

Even though apt has similar command options as apt-get, apt command cannot replace apt-get command. (This is known as not backward compatible)


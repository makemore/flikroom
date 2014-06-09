# sails1

a [Sails](http://sailsjs.org) application


#installing sails

1. Clone repo

2. npm install inside directory

3. Sails lift or node app.js



#updating node

I used the following instructions to upgrade from NodeJS version 0.10.6 to 0.10.21 on a Mac.

1) Clear NPM's cache:

sudo npm cache clean -f
2) Install a little helper called 'n'

sudo npm install -g n
3) Install latest stable NodeJS version

sudo n stable
Alternatively pick a specific version and install like this:

sudo n 0.8.20
For production environments you might want to pay attention to version numbering and be picky about odd/even numbers.
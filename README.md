Installing:

1. install node by downloading it on http://nodejs.org/
2. run: $ npm install -g bower
3. run: $ npm install -g grunt-cli
4. run: $ npm install
5. run: $ bower install

To run sass or bourbon install ruby and the desired framework

For suggestions contact me

======================================

Workflow:

[src] --> [test] --> [dist]

src is the folder from where you work. Don't work in test and dist, changes will be deleted by new tasks.
Copy dist folder when going to deploy

$ grunt dev
deletes dist and test folder ########

$ grunt watch
################

$ grunt test
deletes dist folder to remove confussion in versions

$ grunt dist
deletes test folder to remove confussion in versions

You can add  a grunt deploy test if your environment allowed it

======================================

Manual commands:

$ grunt reset-tmp
cleans tmp folder by deleting it and making tmp folder again

$ grunt clean
deletes components, tmp, test and dist folder

$ grunt clean:test
deletes test folder

$ grunt clean:dist
deletes dist folder

$ grunt clean:bower
deletes components folder

$ grunt clean:tmp
deletes tmp\
 folder

===============

Specific commands:

$ grunt csscomb
rearranges attributes in sass files (src/sass)

$ grunt cssmin
compresses css files and place them in dist/css

$ grunt csslint
analyzes css files in src/css

$ grunt concat
takes all the js files in src/js and combines them into one file concat.min.js that's saved in test/js

$ grunt imagemin
copies all images from src/img intro dist/img and compessses them

$ grunt compass
compiles compass/sass files in src folder see config.rb in src for more information

$ grunt uglify
compresses js and copies them into test/js folder

=======================================

To update grunt packages run
$ npm update

To update bower packages run
$ bower update

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
deletes dist and test folder

$ grunt watch
watches for changes and lints, checks and compiles them (css into .tmp).

$ grunt test
deletes .tmp and .test folder and does all dev tasks and copies them in the test folder (test task are not yet added).

$ grunt dist
deletes .tmp and test folder and does the following:
dev + test task + compresses all files with build date bannre and compies them into dist folder.

You can add  a grunt deploy test if your environment allows it

=======================================

To update grunt packages run
$ npm update

To update bower packages run
$ bower update

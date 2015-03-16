1. install node by downloading it on http://nodejs.org/
2. run: [npm install -g bower]
3. run: [npm install -g grunt-cli]
4. run: [npm install]
5. run: [bower install]

To run sass or bourbon install ruby and the desired framework

For suggestions contact me

======================================

[src] --> [test] --> [dist]

[grunt test] deletes dist folder to remove confussion in versions
[grunt dist] deletes test folder to remove confussion in versions
REMEMBER: src is the folder from where you work!

======================================

Commands:
[grunt csscomb] rearranges css attributes
[grunt cssmin] compresses css
[grunt csslint] gives warnings about bad css
[grunt concat] combining multiple js files
[grunt imagemin] compresses images
[grunt compass] compass
[grunt uglify] compresses js


Bundle commands:

[grunt dev] runs: compass + csslint + cssmin
[grunt test] runs: reinstalls bowers dependecies, copies js files and minifies them, make a extra combined js file, empties dist and tmp folder
[grunt dist] runs: copy js from test, copy minified css from src, imagemin, empties test folder

=======================================

To update grunt packages run: [npm update]
To update bower packages run: [bower update]

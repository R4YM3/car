'use strict';
module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    // TODO:
    // test automation
    // copy bower components into dist? --> depends on deploy..

    // Banner in files
    var banner = '/*\n<%= pkg.name %> <%= pkg.version %>';
    banner += '- <%= pkg.description %>\n<%= pkg.repository.url %>\n';
    banner += 'Built on <%= grunt.template.today("dd-mm-yyyy") %>\n*/\n';

    var bannerHTML = '<!--\n<%= pkg.name %> <%= pkg.version %>';
    bannerHTML += '- <%= pkg.description %>\n<%= pkg.repository.url %>\n';
    bannerHTML += 'Built on <%= grunt.template.today("dd-mm-yyyy") %>\n-->\n';

    // Configurable paths
    var config = {
        app: 'src',
        test: 'test',
        dist: 'dist',
        tmp: '.tmp',
        html: 'templates/wtf',
        sass: 'sass',
        css: 'css',
        fonts: 'fonts',
        js: 'js',
        img: 'img',
        bower: 'components'
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Project settings
        config: config,

        //******************
        //  AUTOMATION
        //******************

        //auto update requirejs
        bowerRequirejs: {
            target: {
                rjsConfig: '<%= config.app %>/<%= config.js %>/config.js'
            }
        },

        //clean bower and tmp folder
        clean: {
            css: '<%= config.app %>/css',
            bower: '<%= config.bower %>',
            tmp: '<%= config.tmp %>',
            test: '<%= config.test %>', //not used
            dist: '<%= config.dist %>',
            testsass: '<%= config.test %>/<%= config.sass %>'
        },

        //copy files
        copy: {
            test: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/<%= config.js %>',
                    src: ['**'],
                    dest: '<%= config.test %>/<%= config.js %>'
                }, {
                    expand: true,
                    cwd: '<%= config.html %>',
                    src: ['**'],
                    dest: '<%= config.test %>/html'
                }, {
                    expand: true,
                    cwd: '<%= config.app %>/<%= config.css %>',
                    src: ['**'],
                    dest: '<%= config.test %>/<%= config.css %>'
                }, {
                    expand: true,
                    cwd: '<%= config.app %>/<%= config.bower %>',
                    src: ['**'],
                    dest: '<%= config.test %>/<%= config.bower %>'
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.test %>/<%= config.js %>',
                    src: ['**'],
                    dest: '<%= config.dist %>/<%= config.js %>'
                }, {
                    expand: true,
                    cwd: '<%= config.test %>/<%= config.bower %>',
                    src: ['**'],
                    dest: '<%= config.dist %>/<%= config.bower %>'
                }, {
                    expand: true,
                    cwd: '<%= config.app %>/<%= config.img %>',
                    src: ['**'],
                    dest: '<%= config.dist %>/<%= config.img %>'
                }, {
                    expand: true,
                    cwd: '<%= config.app %>/<%= config.fonts %>',
                    src: ['**'],
                    dest: '<%= config.dist %>/<%= config.fonts %>'
                }]
            }
        },

        watch: {
            sass: {
                files: ['<%= config.app %>/<%= config.sass %>/**/*.scss'],
                tasks: ['clean:css', 'csscomb', 'csslint', 'compass']
            },
            js: {
                files: ['<%= config.app %>/<%= config.js %>/**/*.js', 'GruntFile.js'],
                tasks: ['jshint', 'jsbeautifier']
            },
            html: {
                files: ['<%= config.html %>/**/*.html'],
                tasks: ['validation']
            }
        },

        //******************
        //  DEV (SRC)
        //******************

        //validate js files
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                '<%= config.app %>/<%= config.js %>/**/*.js',
            ],
            // test: [
            //   '<%= config.test %>/<%= config.js %>/**/*.js',
            // ],
        },

        validation: {
            options: {
                reset: grunt.option('reset') || true,
                stoponerror: false,
                //remotePath: 'http://decodize.com/',
                //remoteFiles: ['html/moving-from-wordpress-to-octopress/',
                //              'css/site-preloading-methods/'], //or
                //remoteFiles: 'validation-files.json', // JSON file contains array of page paths.
                relaxerror: ['no document type declaration', 'character \"{\" not allowed in prolog', 'end of document in prolog', 'NET-enabling start-tag requires SHORTTAG YES'] //ignores these errors
            },
            files: {
                src: ['<%= config.html %>/**/*.html', ]
            }
        },

        //validate css files
        csslint: {
            options: {
                csslintrc: '.csslintrc'
            },
            strict: {
                options: {
                    import: 2
                },
                src: ['<%= config.app %>/<%= config.css %>/**/*.css']
            },
            lax: {
                options: {
                    import: false
                },
                src: ['<%= config.app %>/<%= config.css %>/**/*.css']
            }
        },

        //sorting attributes in css
        csscomb: {
            default: {
                options: {
                    config: 'csscomb.json'
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/<%= config.sass %>/',
                    src: ['**/*.scss'],
                    dest: '<%= config.app %>/<%= config.sass %>/',
                    ext: '.scss'
                }]
            }
        },

        //beatify js
        jsbeautifier: {
            files: ["<%= config.app %>/**/*.js", "GruntFile.js"],
            options: {}
        },

        //compass compiling
        // if compiling is getting slow, install node-sass and config compass with bower. You'll get serious speed benefits!
        // soon added!
        compass: {
            dist: {
                options: {
                    config: '<%= config.app %>/config.rb'
                }
            }
        },

        //******************
        //  TEST
        //******************

        //combining js files
        concat: {
            options: {
                separator: ';\n',
            },
            build: {
                files: [{
                    src: ['<%= config.test %>/<%= config.js %>/**/*.js'],
                    dest: '<%= config.dist %>/<%= config.js %>/concat.js'
                }]
            },
        },
        //compressing js
        uglify: {
            target: {
                files: [{
                    expand: true,
                    cwd: '<%= config.dist %>/js/',
                    src: ['*.js', '**/*.js'],
                    dest: '<%= config.dist %>/js/',
                    ext: '.js',
                }],
            },
            concat: {
                files: [{
                    expand: true,
                    cwd: '<%= config.dist %>/js',
                    src: ['concat.js', 'concat.js'],
                    dest: '<%= config.dist %>/js',
                    ext: '.min.js'
                }]
            }
        },

        //******************
        //  DIST
        //******************

        //compressing images
        imagemin: {
            dist: {
                options: {
                    optimizationLevel: 3
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.dist %>/<%= config.img %>',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: '<%= config.dist %>/<%= config.img %>'
                }]
            }
        },
        //compressing css
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: '<%= config.test %>/css',
                    src: ['*.css', '!*.min.css'],
                    dest: '<%= config.dist %>/css',
                    ext: '.min.css'
                }]
            }
        },

        htmlmin: {
            target: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.test %>/html',
                    src: ['*.html'],
                    dest: '<%= config.dist %>/html',
                    ext: '.html'
                }]
            }
        },

        //bless (ie max selector)
        bless: {
            css: {
                options: {
                    cacheBuster: true,
                    compress: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.dist %>/<%= config.css %>/',
                    src: ['*.css', '**/*.css'],
                    dest: '<%= config.dist %>/<%= config.css %>/',
                    ext: '.blessed.css',
                }],
            }
        },

        usebanner: {
            jscss: {
                options: {
                    position: 'top',
                    banner: banner,
                    linebreak: true
                },
                files: {
                    src: [
                        '<%= config.dist %>/<%= config.css %>**/*.css',
                        '<%= config.dist %>/<%= config.js %>**/*.js'
                    ]
                }
            },
            html: {
                options: {
                    position: 'top',
                    banner: bannerHTML,
                    linebreak: true
                },
                files: {
                    src: [
                        '<%= config.dist %>/html**/*.html'
                    ]
                }
            }
        }

    });

    //******************
    //  CUSTOM FUNCTIONS
    //******************

    //mkdir function
    grunt.registerTask('mkdir', function(dir) {
        require('fs').mkdirSync(dir);
    });

    //grunt bower-install
    grunt.registerTask('bower-install', function() {
        var done = this.async();
        grunt.util.spawn({
            cmd: 'bower',
            args: ['install'],
            opts: {
                stdio: 'inherit'
            }
        }, function(error, result) {
            if (error) {
                grunt.fail.fatal(result.stdout);
            }
            grunt.log.writeln(result.stdout);
            done();
        });
    });

    //******************
    //  TASKS
    //******************

    grunt.registerTask('dev', [
        'clean',
        'bower-install',
        'bowerRequirejs',
        'csscomb',
        'compass',
        'csslint',
        'jsbeautifier',
        'jshint',
        'clean:dist',
        'clean:test'
    ]);

    grunt.registerTask('test', [
        'clean',
        'dev',
        'copy:test',
        'clean:tmp',
    ]);

    grunt.registerTask('dist', [
        'test',
        'copy:dist',
        'concat',
        'uglify',
        'imagemin',
        'htmlmin',
        'cssmin',
        'usebanner',
        'clean:test'
    ]);

    grunt.registerTask('default', ['dev']);
};

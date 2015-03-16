'use strict';
module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  var banner = '/*\n<%= pkg.name %> <%= pkg.version %>';
    banner += '- <%= pkg.description %>\n<%= pkg.repository.url %>\n';
    banner += 'Build by - <%= pkg.contributors.join(", ") %>\n';
    banner += 'Built on <%= grunt.template.today("yyyy-mm-dd") %>\n*/\n';

  grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // TODO:
        // beautify
        // blessed
        // requirejs
        // test automation

        //******************
        //  AUTOMATION
        //******************

        //clean bower and tmp folder
        clean: {
            bower: 'components',
            tmp: 'tmp',
            test: 'test', //not used
            dist: 'dist'
        },

        //copy files
        copy: {
            unit: {
                expand: true,
                cwd: 'test/unit/fixtures/components',
                src: ['**/*'],
                dest: 'tmp/components'
            },
            acceptance: {
                expand: true,
                cwd: 'test/acceptance/fixtures',
                src: ['*.js', '!*-expected.js'],
                dest: 'tmp/'
            },
            test: {
                expand: true,
                cwd: 'src/js',
                src: ['**'],
                dest: 'test/js'
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/img',
                        src: ['**'],
                        dest: 'dist/img'
                    },
                    {
                        expand: true,
                        cwd: 'test/js',
                        src: ['**'],
                        dest: 'dist/js'
                    }
                ]
            }
        },

        watch: {
            compass: {
                files: ['src/sass/*.scss'],
                tasks: ['csscomb', 'csslint', 'compass']
            },
            jshint: {
                files: ['src/js/**/*.js'],
                tasks: ['jshint']
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
            //'lib/*.js',
            //'bin/*.js',
            'src/**/*.js'
          ]
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
            src: ['src/css/**/*.css']
          },
          lax: {
            options: {
              import: false
            },
            src: ['src/css/**/*.css']
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
                    cwd: 'src/sass/',
                    src: ['**/*.scss'],
                    dest: 'src/sass/',
                    ext: '.scss'
                }]
            }
        },

        //beatify js
        "jsbeautifier" : {
            files : ["src/**/*.js"],
            options : {
            }
        },

        //compass compiling
        compass: {
            dist: {
                options: {
                    config: 'src/config.rb'
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
                banner: banner
            },
            build: {
                files: [{
                    src: ['test/js/**/*.js'],
                    dest: 'test/js/concat.js'
                }]
            },
        },
        //compressing js
        uglify: {
            target: {
                files: [{
                  expand: true,
                  cwd: 'src/js/',
                  src: ['*.js', '**/*.js'],
                  dest: 'test/js/',
                  ext: '.min.js',
                }],
            },
            concat: {
                files: [{
                    expand: true,
                    cwd: 'test/js',
                    src: ['concat.js', 'concat.min.js'],
                    dest: 'test/js',
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
                src: ['dist/img/*.*'],
                dest: 'dist/img'
            }
        },
        //compressing css
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'src/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'dist/css',
                    ext: '.min.css'
                }]
            }
        },

        //bless (ie max selector)
        bless: {
            css: {
                options: {
                    banner: banner,
                    cacheBuster: true,
                    compress: true
                },
                files: [{
                  expand: true,
                  cwd: 'dist/css/',
                  src: ['*.css', '**/*.css'],
                  dest: 'dist/css/',
                  ext: '.blessed.css',
                }],
            }
        },

        // bower dependencies
        // bower: {
        //   options: {
        //     exclude: ['underscore']
        //   },
        //   standard: {
        //     rjsConfig: 'tmp/config.js'
        //   },
        //   pathless: {
        //     rjsConfig: 'tmp/pathless-config.js'
        //   },
        //   global: {
        //     rjsConfig: 'tmp/global-config.js'
        //   },
        //   baseurl: {
        //     options: {
        //       baseUrl: './'
        //     },
        //     rjsConfig: 'tmp/baseurl.js'
        //   }
        // },
    });

    //******************
    //  CUSTOM FUNCTIONS
    //******************

    //mkdir function
    grunt.registerTask('mkdir', function (dir) {
        require('fs').mkdirSync(dir);
    });

    //grunt bower-install
    grunt.registerTask('bower-install', function () {
        var done = this.async();
        grunt.util.spawn({
          cmd: 'bower',
          args: ['install'],
          opts: {
            stdio: 'inherit'
          }
        }, function (error, result) {
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
        'csscomb',
        'compass',
        'csslint',
        'jshint',
        'clean'
    ]);

    //clean dev folders
    grunt.registerTask('reset-tmp', ['clean:tmp', 'mkdir:tmp']);

    grunt.registerTask('test', [
        'clean:bower',
        'clean:dist',
        'clean:test',
        'reset-tmp',
        'bower-install',
        'copy:acceptance',
        'concat',
        'uglify',
        'clean:dist',
        'reset-tmp',
    ]);

    grunt.registerTask('dist', [
        'clean:dist',
        'copy:dist',
        'imagemin',
        'cssmin',
        'clean:test'
    ]);

    grunt.registerTask('default', ['dev']);
};

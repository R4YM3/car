'use strict';
module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  // Banner in files
  var banner = '/*\n<%= pkg.name %> <%= pkg.version %>';
    banner += '- <%= pkg.description %>\n<%= pkg.repository.url %>\n';
    banner += 'Built on <%= grunt.template.today("yyyy-mm-dd") %>\n*/\n';

  // Configurable paths
  var config = {
    app: 'src',
    images: 'img',
    html: 'html',
    js: 'js',
    test: 'test',
    dist: 'dist',
    tmp: '.tmp'
  };

  grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Project settings
        config: config,

        // TODO:
        // requirejs
        // test automation

        //******************
        //  AUTOMATION
        //******************

        //clean bower and tmp folder
        clean: {
            bower: 'components',
            tmp: '<%= config.tmp %>',
            test: '<%= config.test %>', //not used
            dist: '<%= config.dist %>',
        },

        //copy files
        copy: {
            unit: {
                expand: true,
                cwd: '<%= config.test %>/unit/fixtures/components',
                src: ['**/*'],
                dest: '<%= config.tmp %>/components'
            },
            acceptance: {
                expand: true,
                cwd: '<%= config.test %>/acceptance/fixtures',
                src: ['*.js', '!*-expected.js'],
                dest: '<%= config.tmp %>/'
            },
            test: {
                expand: true,
                cwd: '<%= config.app %>/js',
                src: ['**'],
                dest: '<%= config.test %>/js'
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.app %>/img',
                        src: ['**'],
                        dest: '<%= config.dist %>/img'
                    },
                    {
                        expand: true,
                        cwd: '<%= config.test %>/js',
                        src: ['**'],
                        dest: '<%= config.dist %>/js'
                    }
                ]
            }
        },

        watch: {
            compass: {
                files: ['<%= config.app %>/sass/*.scss'],
                tasks: ['csscomb', 'csslint', 'compass']
            },
            jshint: {
                files: ['<%= config.app %>/js/**/*.js'],
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
            '<%= config.app %>/**/*.js'
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
            src: ['<%= config.app %>/css/**/*.css']
          },
          lax: {
            options: {
              import: false
            },
            src: ['<%= config.app %>/css/**/*.css']
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
                    cwd: '<%= config.app %>/sass/',
                    src: ['**/*.scss'],
                    dest: '<%= config.app %>/sass/',
                    ext: '.scss'
                }]
            }
        },

        //beatify js
        "jsbeautifier" : {
            files : ["<%= config.app %>/**/*.js"],
            options : {
            }
        },

        //compass compiling
        compass: {
            dist: {
                options: {
                    config: '<%= config.app %>/config.rb'
                }
            }
        },

        // requirejs: {
        //     compile: {
        //         options: {
        //             name: '../config',
        //             baseUrl: 'src/js/app',
        //             out: 'src/js/app.min.js',
        //             paths: {
        //                 'jquery': '../../../components/jquery/jquery.min',
        //                 'modernizr': '../../../components/modernizr/modernizr',
        //                 'respond': '../../../components/respond/respond.min',
        //                 'requireLib': '../../../components/requirejs/require'
        //             },
        //             shim: {
        //                 'jquery': {
        //                     exports: '$'
        //                 },
        //                 'modernizr': {
        //                     exports: 'Modernizr'
        //                 }
        //             },
        //             include: ['requireLib'],
        //             //generateSourceMaps: true,
        //             preserveLicenseComments: false,
        //             optimize: 'uglify2'
        //         }
        //     }
        // },

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
                    src: ['<%= config.test %>/js/**/*.js'],
                    dest: '<%= config.test %>/js/concat.js'
                }]
            },
        },
        //compressing js
        uglify: {
            target: {
                files: [{
                  expand: true,
                  cwd: '<%= config.app %>/js/',
                  src: ['*.js', '**/*.js'],
                  dest: '<%= config.test %>/js/',
                  ext: '.min.js',
                }],
            },
            concat: {
                files: [{
                    expand: true,
                    cwd: '<%= config.test %>/js',
                    src: ['concat.js', 'concat.min.js'],
                    dest: '<%= config.test %>/js',
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
                src: ['<%= config.dist %>/img/*.*'],
                dest: '<%= config.dist %>/img'
            }
        },
        //compressing css
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/css',
                    src: ['*.css', '!*.min.css'],
                    dest: '<%= config.dist %>/css',
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
                  cwd: '<%= config.dist %>/css/',
                  src: ['*.css', '**/*.css'],
                  dest: '<%= config.dist %>/css/',
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

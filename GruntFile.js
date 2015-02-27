module.exports = function(grunt) {
    grunt.initConfig({

        auto_install: {
            local: {}
        },

        pkg: grunt.file.readJSON('package.json'),

        imagemin: {
            dynamic:{
                files:[{
                    expand: true,
                    cwd: 'src/img',
                    src: ['**/*.{png,PNG,jpg,JPG,gif,GIF}'],
                    dest: 'dist/img'
                }]
            }
        },

        uglify: {
            options: {
                manage: false
            },
            my_target:{
                files: {
                    'dist/js/main.min.js' : [ 'src/js/main.js'],
                    'dist/js/plugins.min.js' : [ 'src/js/plugins.js']
                }
            }
        },

        concat: {
            options:{
                seperator: ';',
                stripBanners: true,
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%=grunt.template.today("yyyy-mm-dd") %> */'
            },
            dist:{
                src: [
                    'dist/js/*.js',
                    '!**/concat.min.js' //ignore existing concat file
                ],
                dest: 'dist/js/concat.min.js',
            }
        },

        sass: {
            dist: {
                files: {
                    'src/css/screen.css' : 'src/sass/screen.scss'
                }
            }
        },

        compass: {
            compile: {
                options: {
                    config: 'src/config.rb',
                    basePath: 'src'
                }
            }
        },

        csslint: {
            options: {
                csslintrc: '.csslintrc'
            },
            strict: {
                options: {
                    import: 2
                },
                src: ['src/css/*.css']
            },
            lax: {
                options: {
                    import: false
                },
                src: ['src/css/*.css']
            }
        },

        cssmin: {
            my_target: {
                files: [{
                    expand:true,
                    cwd: 'src/css/',
                    src: ['*.css', '!*min.css'],
                    dest: 'dist/css/',
                    ext: '.min.css'
                }]
            }
        },

        csscomb: {
            default: {
                options: {
                    config: '/node_modules/grunt_csscomb/node_modules/csscomb/config/csscomb.json'
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

        bless: {
            css: {
                options: {
                    banner: '/* blessed CSS */',
                    cacheBuster: true,
                    compress: true
                },
                files: {
                    'src/css/screen.css' : 'dist/css/screen.blessed.min.css'
                }
            }
        },

        watch: {
            sass: {
                files: ['src/sass/*.scss'],
                tasks: ['csscomb', 'compass']
            }
        },
        bowerInstall: {

            //example: bower install jquery --save

            target: {

                // Point to the files that should be updated when
                // you run `grunt bower-install`
                src: [
                    'src/html/**/*.html',   // .html support...
                    //'app/views/**/*.jade',   // .jade support...
                    'src/sass/screen.scss',  // .scss & .sass support...
                    //'app/config.yml'         // and .yml & .yaml support out of the box!
                ],

                // Optional:
                // ---------
                cwd: '',
                dependencies: true,
                devDependencies: false,
                exclude: [],
                fileTypes: {},
                ignorePath: '',
                overrides: {}
            }
        }
    });

    //img
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    //js
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');

    //css
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-csscomb');
    grunt.loadNpmTasks('grunt-bless');

    //automation
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-bower-install');
    grunt.loadNpmTasks('grunt-auto-install');

    //customtasks
    grunt.registerTask('sass', ['sass', 'csscomb']);
    grunt.registerTask('js', ['uglify', 'concat']);
    grunt.registerTask('img', ['imagemin']);
    grunt.registerTask('css',['compass', 'cssmin']);

    grunt.registerTask('dev',['compass', 'csslint', 'cssmin']);
    grunt.registerTask('dist',['compass', 'cssmin', 'uglify', 'concat', 'imagemin']);
}

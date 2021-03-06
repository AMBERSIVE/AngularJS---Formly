module.exports = function(grunt) {

    var cleanCssOptions = {

    };

    grunt.initConfig({
        less: {
            skin:{
                options: {
                    cleancss: true,
                    strictImports: true,
                    compress: true
                },
                src: ["src/less/tinymce/bootstrap/skin.dev.less"],
                dest : 'build/skins/bootstrap/skin.min.css'
            },
            content: {
                options: {
                    cleancss: true,
                    strictImports: true,
                    compress: true
                },
                src: ["src/less/tinymce/bootstrap/Content.less"],
                dest : 'build/skins/bootstrap/content.min.css'
            },
            form: {
                options: {
                    cleancss: true,
                    strictImports: true,
                    compress: true
                },
                src: ["src/less/form.less"],
                dest : 'build/form.min.css'
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'src/*.js'],
            options: {
                globals: {
                    angular: true
                }
            }
        },
        concat:{
            'build':{
                src  : [
                    'src/*.js',
                ],
                dest : 'build/formly.js',
                filter: 'isFile'
            }
        },
        uglify:{
            build:{
                options: {
                    compress: {
                        drop_console: true
                    }
                },
                files: [{
                    expand: true,
                    cwd: 'build/',
                    src: ['*.js', '!*.min.js'],
                    dest: 'build',
                    ext: '.min.js'
                }]
            }
        },
        ngtemplates:{
            'ambersive.formly':{
                module:     'ambersive.formly',
                src:        'src/views/**/*.html',
                dest:       'src/templates.js',
                options: {
                    htmlmin: {
                        collapseBooleanAttributes:      true,
                        collapseWhitespace:             true,
                        removeAttributeQuotes:          true,
                        removeComments:                 true, // Only if you don't use comment directives!
                        removeEmptyAttributes:          true,
                        removeRedundantAttributes:      true,
                        removeScriptTypeAttributes:     true,
                        removeStyleLinkTypeAttributes:  true
                    }
                }
            }
        },
        watch: {
            files: ['src/*.js','src/views/**/*.html','src/**/*.less'],
            tasks: ['jshint','build']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['less','ngtemplates','concat','uglify']);

};
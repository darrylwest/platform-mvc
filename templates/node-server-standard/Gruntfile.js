/**
 * Gruntfile for <%= config.projectName %>
 *
 * @author: <%= config.authorName %>
 * @created: <%= new Date() %>
 */
module.exports = function(grunt) {
    'use strict';

    // require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        dirs: {
            app:'app',
            test: 'test'
        },
        watch:{
            scripts:{
                files:[
                    '<%= dirs.app %>/*.js',
                    '<%= dirs.app %>/*/*.js',
                    '<%= dirs.test %>/*/*.js'
                ],
                tasks: [
                    'mochaTest',
                    'jshint'
                ],
                options:{
                    spawn: true
                }
            }
        },
        jshint: {
            options:{
                jshintrc: '.jshintrc',
                verbose: true,
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= dirs.app %>/*.js',
                '<%= dirs.app %>/*/*.js',
                '<%= dirs.test %>/*/*.js'
            ]
        },
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec'
                },
                src: [
                    '<%= dirs.test %>/*/*.js'
                ]
            }
        },
        jsdoc: {
            dist:{
                src:[
                    '<%= dirs.app %>/*/*.js',
                    '<%= dirs.test %>/*/*.js'
                ],
                options:{
                    destination:'jsdoc'
                }
            }
        }
    });

    grunt.registerTask('testAndWatch', [
        'mochaTest',
        'jshint',
        'watch'
    ]);

    grunt.registerTask('test', [
        'mochaTest'
    ]);

    grunt.registerTask('default', [
        'jshint',
        'mochaTest',
        'jsdoc'
    ]);
};

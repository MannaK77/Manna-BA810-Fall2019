module.exports = function (grunt) {

    // Project configuration. 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        env: {
            dev: {
                NODE_ENV: 'development'
            },

            jshint: {
                options: {
                    reporter: require('jshint-stylish'),
                    esversion: 6
                },
                all: ['Grunfile.js', 'config/*.js']
            },

            nodemon: {
                dev: {
                    script: 'index.js'
                }
            },

            production: {
                NODE_ENV: 'production'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-nodemon');
    grunt.loadNpmTasks('grunt-env');
    



    grunt.registerTask('default', [
        'env:dev',
        'jshint',
        'nodemon'
    ]);




    grunt.registerTask('production', [
        'env:production',
        'nodemon'
    ]);
};
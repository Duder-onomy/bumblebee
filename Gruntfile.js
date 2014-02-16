module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        portToUse : 3000,
        pkg: grunt.file.readJSON('package.json'),
        mongodb : {
            test: {
                host: 'mongodb://localhost:27017/test',
                collections: ['users','contenttypes','nodes','content', 'tokens'],
                data: './fixtures/mongodb/test.js'
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'lib/**/*.js', 'test/**/*.js'],
            options: {
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        }
    });

    grunt.loadTasks('tasks');
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.registerTask('db:test', ['mongodb:test']);
    grunt.registerTask('default', ['jshint']);

};

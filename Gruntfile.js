module.exports = function(grunt){


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
            },
            release: {
                files: {
                    'dist/jquery.danmu.min.js': ['src/jquery.danmu.js']
                }
            }
        }
        
    });


    grunt.loadNpmTasks('grunt-contrib-uglify');


    grunt.registerTask('default', ['uglify:release']);

};


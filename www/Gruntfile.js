module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    cssmin: {
      minify: {
        expand: true,
        cwd: 'css/',
        src: ['*.css', '!*.min.css'],
        dest: 'css/',
        ext: '.min.css'
      },
      combine: {
        files: {
          'css/smashApp.min.css': ['css/smash.min.css','css/fonts.min.css']
        }
      }
    },
    jshint:{
      all: ['js/models/**/*.js','js/static/**/*.js','js/views/**/*.js','js/req.js']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('default', ['cssmin', 'jshint']);

}

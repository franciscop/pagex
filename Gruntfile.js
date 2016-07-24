// This builds the library itself
module.exports = function (grunt) {
  // Configuration
  grunt.initConfig({
    uglify: {
      options: {
        banner: '/* PageX ' + grunt.file.readJSON('package.json').version + ' https://github.com/franciscop/pagex */\n'
      },
      my_target: {
        files: {
          'pagex.min.js': 'pagex.js'
        }
      }
    },

    semistandard: {
      app: {
        src: [
          './Gruntfile.js',
          './src/pagex.js'
        ]
      }
    },

    watch: {
      scripts: {
        files: [
          'package.js', // To bump versions
          'Gruntfile.js',
          '*.js',
          'test/test.js',
          'src/*.js',
          'src/*.md',
          'src/**/*.*'
        ],
        tasks: ['default'],
        options: {
          spawn: false,
          livereload: true
        }
      }
    },

    mocha_phantomjs: {
      all: './test/test.html',
      options: {
        'web-security': false
      }
    },

    concat: {
      main: {
        files: {
          'pagex.js': ['src/isarray.js', 'src/pagex.js', 'src/pathtoregex.js']
        }
      }
    },

    bytesize: {
      all: {
        src: [
          'pagex.min.js'
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-semistandard');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-phantomjs');
  grunt.loadNpmTasks('grunt-bytesize');

  grunt.registerTask('build', ['concat', 'uglify']);
  grunt.registerTask('test', ['semistandard', 'mocha_phantomjs']);
  grunt.registerTask('default', ['build', 'test', 'bytesize']);
};

/*global module:false*/
module.exports = function (grunt) {

   'use strict';

   grunt.loadNpmTasks('grunt-contrib-qunit');
   grunt.loadNpmTasks('grunt-contrib-handlebars');
   grunt.loadNpmTasks('grunt-contrib-uglify');
   grunt.loadNpmTasks('grunt-contrib-copy');
   grunt.loadNpmTasks('grunt-contrib-clean');
   grunt.loadNpmTasks('grunt-contrib-requirejs');
   grunt.loadNpmTasks('grunt-contrib-jshint');
   grunt.loadNpmTasks('grunt-contrib-connect');
   grunt.loadNpmTasks('grunt-open');
   grunt.loadNpmTasks('grunt-contrib-cssmin');
   grunt.loadNpmTasks('grunt-htmlrefs');

   // Project configuration.
   grunt.initConfig({
      pkg:'<json:package.json>',
      meta:{
         banner:'/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
      },
      jshint:{
         options: {
            curly: true,
            eqeqeq: true,
            eqnull: true,
            browser: true,
            globals: {
               jQuery: true
            }
         },
         files:['grunt.js', 'app/tests/**/*.js']
      },
      qunit:{
         options: {
            timeout: 5000
         },
         all: ['app/tests.html']
      },
      htmlrefs: {
         dist: {
            src: 'app/index.html',
            dest: 'bin/release/'
         }
      },
      cssmin: {
         compress: {
            files: {
               'bin/release/styles/main.css': ['app/styles/main.css', 'app/styles/visual-slider.css']
            }
         },
         unsupported: {
            files: {
               'bin/release/styles/unsupported.css': ['app/styles/unsupported.css']
            }
         },
         viewPage: {
            files: {
               'bin/release/styles/view-style.css': ['app/styles/view-style.css']
            }
         }
      },
      clean: {
         options: {
            force: true
         },
         release: ["bin/release/**", "bin/build/**"]
      },
      requirejs: {
         compile: {
            options: {
               baseUrl: "app/scripts/",
               mainConfigFile: "app/scripts/config.js",
               dir: "bin/build/scripts",
               optimize: "uglify2",
               generateSourceMaps: true,
               preserveLicenseComments: false,
               removeCombined: true,
               findNestedDependencies: true
            }
         }
      },
      handlebars:{
         compile: {
            options: {
               namespace: "AutoAndyPhoto",
               amd: true,
               processName: function(filename) {
                  return filename.split("/").pop().split(".")[0];
               }
            },
            files: {
               "app/scripts/templates.js": "app/templates/*.handlebars"
            }
         }
      },
      copy: {
         release: {
            files: [
               {src: ["app/v.php"], dest: "bin/release/v.php", filter: "isFile"},
               {src: ["app/write.php"], dest: "bin/release/write.php", filter: "isFile"},
               {src: ["app/bitly.php"], dest: "bin/release/bitly.php", filter: "isFile"},
               {src: ["**"], dest: "bin/release/images/", cwd: "app/images/", expand: true},
               {src: ["bin/build/scripts/main.js"], dest: "bin/release/scripts/main.js", filter: "isFile"},
               {src: ["bin/build/scripts/main.js.map"], dest: "bin/release/scripts/main.js.map", filter: "isFile"},
               {src: ["bin/build/scripts/main.js.src"], dest: "bin/release/scripts/main.js.src", filter: "isFile"},
               {src: ["bin/build/scripts/config.js"], dest: "bin/release/scripts/config.js", filter: "isFile"},
               {src: ["bin/build/scripts/config.js.map"], dest: "bin/release/scripts/config.js.map", filter: "isFile"},
               {src: ["bin/build/scripts/config.js.src"], dest: "bin/release/scripts/config.js.src", filter: "isFile"},
               {src: ["bin/build/scripts/vendor/require.min.js"], dest: "bin/release/scripts/vendor/require.min.js", filter: "isFile"},
               {src: ["bin/build/scripts/vendor/require.min.js.map"], dest: "bin/release/scripts/vendor/require.min.js.map", filter: "isFile"},
               {src: ["bin/build/scripts/vendor/require.min.js.src"], dest: "bin/release/scripts/vendor/require.min.js.src", filter: "isFile"}
            ]
         }
      },
      open : {
         debug : {
            path: 'http://127.0.0.1:8080/index.html'
         },
         release : {
            path : 'http://127.0.0.1:8080/index.html'
         }
      },
      connect: {
         debug: {
            options: {
               port: 8080,
               base: 'app',
               keepalive: true
            }
         },
         release: {
            options: {
               port: 8080,
               base: 'bin/release',
               keepalive: true
            }
         },
         test: {
            options: {
               port: 8080,
               base: 'app'
            }
         }
      }
   });

   grunt.registerTask('debug', ['qunit', 'handlebars']);
   grunt.registerTask('release', ['qunit', 'clean:release', 'handlebars', 'requirejs', 'cssmin', 'htmlrefs', 'copy:release']);
   grunt.registerTask('deployRelease', ['release']);
   grunt.registerTask('deployBeta', ['release']);

   // test server tasks
   grunt.registerTask('localDebug', ['open:debug', 'connect:debug']);
   grunt.registerTask('localRelease', ['open:release', 'connect:release']);
};
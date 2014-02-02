var crypto = require('crypto');
var fs = require('fs');

function createFileSha(filenane) {
	var sha = crypto.createHash('sha1');
	return sha.update(fs.readFileSync(filenane));
}

module.exports = function(grunt) {
	grunt.initConfig({
		meta: {
			version: '0.0.5'
		},

		jshint: {
			options: {
				"asi" : false,
				"bitwise" : true,
				"boss" : false,
				"curly" : true,
				"debug": false,
				"devel": false,
				"eqeqeq": true,
				"evil": false,
				"expr": true,
				"forin": false,
				"immed": true,
				"latedef" : false,
				"laxbreak": false,
				"multistr": true,
				"newcap": true,
				"noarg": true,
				"node" : true,
				"browser": true,
				"noempty": false,
				"nonew": true,
				"onevar": false,
				"plusplus": false,
				"regexp": false,
				"strict": false,
				"sub": false,
				"trailing" : true,
				"undef": true,
				globals: {
					jQuery: true,
					Backbone: true,
					_: true,
					$: true,
					require: true,
					define: true
				}
			},
			js: ['public/javascripts/**/*.js', 'source/**/*.js']
		},

		requirejs: {
			js: {
				options: {
					baseUrl: "public/javascripts",
					mainConfigFile: "public/javascripts/main.js",
					name: 'main',
					optimize: 'uglify', // 'none',
					out: "public/build/main.js"
				}
			},
			css: {
				options: {
					baseUrl: 'public/css',
					cssIn: "public/css/main.css",
					out: "public/build/main.css",
					cssImportIgnore: null,
					optimizeCss: 'default'
				}
			}
		},

		hashres: {
			options: {
				fileNameFormat: '${name}-${hash}.${ext}'
			},
			prod: {
				src: [
					'public/build/main.js',
					'public/build/main.css'
				],
				dest: { src: 'tools/client/index.js', out: 'source/client/index.js' }
			}
		},


		concurrent: {
			dev: {
				// tasks: ['nodemon', 'node-inspector', 'watch'],
				tasks: ['nodemon', 'watch'],
				options: {
					logConcurrentOutput: true
				}
			}
		},

		nodemon: {
			dev: {
				script: 'app.js',
				options: {
					ignore: [
						'node_modules/**'
					],
					watch: ['source']
				}
			}
		},

		watch: {
			scripts: {
				files: ['public/**.js'],
				tasks: [],
				options: {
					livereload: true
				}
			}
		},

		env: {
			options:{
				// Shared options hash
			},
			dev: {
				NODE_ENV: 'development'
			},
			prod: {
				NODE_ENV: 'production'
			}

		}

	});

	// Load Tasks
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-env');
	grunt.loadNpmTasks('grunt-hashres');
	grunt.loadNpmTasks('grunt-nodemon');


	// Default task.
	// grunt.registerTask('default', ['jshint', 'requirejs', 'hashres']);
	grunt.registerTask('default', ['requirejs', 'hashres']);
	grunt.registerTask('development', ['env:dev', 'concurrent']);
	grunt.registerTask('production', ['env:prod', 'concurrent']);

	// grunt.registerTask('dev', ['concurrent:dev']);
};
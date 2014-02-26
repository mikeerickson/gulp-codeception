/*jshint node:true */

'use strict';

var map = require('map-stream'),
	gutil = require('gulp-util'),
     os = require('os'),
   exec = require('child_process').exec;

module.exports = function(command, opt) {
	var counter = 0;
	var skipCmd = '';

	if (typeof command === 'object') {
		throw new gutil.PluginError("gulp-codeception", "Invalid Codeception Binary");
	}

	// if path to codecept bin not supplied, use default vendor/bin path
	if(! command) {
		command = './vendor/bin/codecept run';
		if (os.platform() === 'win32') {
			command = '.\\vendor\\bin\\codecept run';
		}
	}

	// create default opt object if no options supplied
	if ( ! opt) { opt = {}; }

	// assign default options if one is not supplied
	if (typeof opt.testSuite === 'undefined') { opt.testSuite = ''; }
	if (typeof opt.silent === 'undefined') { opt.silent = false; }
	if (typeof opt.debug === 'undefined') { opt.debug = false; }
	if (typeof opt.testClass === 'undefined') { opt.testClass = ''; }
	if (typeof opt.clear === 'undefined') { opt.clear = false; }
	if (typeof opt.flags === 'undefined') { opt.flags = ''; }
	if (typeof opt.notify === 'undefined') { opt.notify = false; }
	if (typeof opt.skipSuites === 'undefined') { opt.skipSuites = ''; }

	return map(function (file, cb) {

		// construct command
		var cmd = opt.clear ? 'clear && ' + command : command;

		// assign default class and/or test suite
		if (opt.testSuite) { cmd += ' ' + opt.testSuite; }
		if (opt.testClass) { cmd += ' ' + opt.testClass; }

		// check if user supplied one or more suites to skip
		if (typeof opt.skipSuites === 'object') {
			if (opt.skipSuites.length > 0) {
				for( var i = 0; i < opt.skipSuites.length; i++  ) {
					skipCmd += ' --skip ' + opt.skipSuites[i];
				}
			}
		} else {
			if (opt.skipSuites.length > 0) {
				skipCmd = ' --skip ' + opt.skipSuites;
			}
		}

		if(counter === 0) {
			counter++;

			// attach any flags
			if (opt.debug) {
				opt.flags += ' --debug ';
			}
			cmd += skipCmd + ' ' + opt.flags;

			cmd.trim(); // clean up any space remnants

			if (opt.debug) {
				gutil.log(gutil.colors.yellow('\n       *** Debug Cmd: ' + cmd + '***\n'));
			}

			exec(cmd, function (error, stdout, stderr) {

				if (!opt.silent && stderr) {
					gutil.log(stderr);
				}

				if (stdout) {
					stdout = stdout.trim(); // Trim trailing cr-lf
				}

				if (!opt.silent && stdout) {
					gutil.log(stdout);
				}

				if(opt.debug && error) {
					gutil.log(error);
				}

				if (opt.notify) {
					cb(error, file);
				}

			});
		}
	});

};


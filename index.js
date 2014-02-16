/*jshint node:true */

"use strict";

var map = require('map-stream'),
	gutil = require('gulp-util'),
	exec = require('child_process').exec;

module.exports = function(command, opt){
	var counter = 0;

	// if path to codecept bin not supplied, use default vendor/bin path
	! command ? command = './vendor/bin/codecept run' : '';

	// create default opt object if no options supplied
	if ( ! opt) opt = {};

	// assign default options if one is not supplied
	if (typeof opt.testSuite === 'undefined') opt.testSuite = '';
	if (typeof opt.silent === 'undefined') opt.silent = false;
	if (typeof opt.debug === 'undefined') opt.debug = false;
	if (typeof opt.testClass === 'undefined') opt.testClass = '';
	if (typeof opt.clear === 'undefined') opt.clear = false;
	if (typeof opt.flags === 'undefined') opt.flags = '';
	if (typeof opt.notify === 'undefined') opt.notify = false;

	return map(function (file, cb) {

		// construct command
		var cmd = opt.clear ? 'clear && ' + command : command;

		// assing default class and/or test suite
		if (opt.testSuite) cmd += ' ' + opt.testSuite;
		if (opt.testClass) cmd += ' ' + opt.testClass;

		if(counter == 0) {
			counter++;

			// attach any flags
			if(opt.debug)
				opt.flags += ' --debug ';
			cmd += ' ' + opt.flags;

			cmd.trim(); // clean up any space remnants

			if (opt.debug) {
				console.log('\n       *** Debug Cmd: '.yellow + cmd.yellow + '***\n'.yellow);
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
					console.log(error);
				}

				if (opt.notify) {
					cb(error, file);
				}

			});
		}
	});

};


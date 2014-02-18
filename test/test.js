'use strict';

var gulpcodecept = require('../'),
    should       = require('should');

require('mocha');

describe('gulp-codeception', function() {
	describe('smoke test', function() {
		it('should not error if no parameters passed', function(done) {
			// Arrange
			var caughtErr;

			// Act
			try {
				gulpcodecept('',{});
			} catch (err) {
				caughtErr = err;
			}
			// Assert
			should.not.exist(caughtErr);
			//caughtErr.message.indexOf('required').should.be.above(-1);
			done();
		});
	});
});
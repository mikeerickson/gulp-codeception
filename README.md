# gulp-codception
> Codeception plugin for gulp 3

## Usage

First, install `gulp-codeception` as a development dependency:

```shell
npm install --save-dev gulp-codeception
```

Then, add it to your `gulpfile.js`:

```javascript
var codecept = require('gulp-codeception');

// option 1: default format
gulp.task('codecept', function() {
	gulp.src('./app/tests/*.php').pipe(codecept());
});

// option 2: with defined bin and options
gulp.task('codecept', function() {
	var options = {debug: false, flags: '--silent --report'};
	gulp.src('./app/tests/*.php').pipe(codecept('./vendor/bin/codecept run',options));
});

// option 3: supply callback to integrate something like notification (using gulp-notify)

var gulp  = require('gulp'),
 notify   = require('gulp-notify'),
 codecept = require('gulp-codecept');

gulp.task('codecept', function() {
	var options = {notify: false, testSuite: 'unit'};
	gulp.src('app/tests/*.php')
		.pipe(codecept('', options))
		.on('error', notify.onError({
			title: "Testing Failed",
			message: "Error(s) occurred during test..."
		}))
		.pipe(notify({
			title: "Testing Passed",
			message: "All tests have passed..."
		}));
});


```

## API

### (codeceptpath,options)

#### codeceptpath

Type: `String`

The path to the desired Codeception binary
- If not supplied, the defeault path will be ./vendor/bin/codecept

#### options.debug
Type: `Boolean`

Emit error details and shows command used in console

#### options.clear
Type: `Boolean`

Clear console before executing command

#### options.testClass
Type: `String`

Define a specific class for testing (supply full path to test class)

#### options.testSuite
Type: `String`

Define a specific test suite to execute (acceptance, unit, functional)
Note: You can also supply any custom suites you may have created

#### options.flags
Type: `String`

Define any custom flags you may wish to use during testing

var opts = {flags: '--silent --report'}

#### options.notify
Type: `Boolean`

Call user supplied callback to handle notification

## Changelog

- 0.0.1: Initial Release

## Credits

gulp-codeception written by Mike Erickson

E-Mail: [codedungeon@gmail.com](mailto:codedungeon@gmail.com)

Twitter: [@codedungeon](http://twitter.com/codedungeon)

Webiste: [codedungeon.org](http://codedungeon.org)
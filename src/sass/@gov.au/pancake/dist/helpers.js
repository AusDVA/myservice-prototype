/***************************************************************************************************************************************************************
 *
 * Returning ansi escape color codes
 *
 * @repo    - https://github.com/govau/pancake
 * @author  - Dominik Wilkowski
 * @license - https://raw.githubusercontent.com/govau/pancake/master/LICENSE (MIT)
 *
 **************************************************************************************************************************************************************/

'use strict';

//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// Dependencies
//--------------------------------------------------------------------------------------------------------------------------------------------------------------

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ExitHandler = exports.Spawning = exports.Size = exports.Cwd = exports.CheckNPM = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _tty = require('tty');

var _tty2 = _interopRequireDefault(_tty);

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _logging = require('./logging');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// Check npm version
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
/**
 * Check that npm used is 3 and above
 *
 * @return {boolean} - Whether npm version is satisfied
 */
var CheckNPM = exports.CheckNPM = function CheckNPM() {
	var npmVersion = Spawning.sync('npm', ['-v']);

	if (npmVersion.error) {
		_logging.Log.error('Pancake was unable to find an NPM version.');
		_logging.Log.error(error);

		_logging.Log.space();
		process.exit(1);
	} else {
		npmVersion = parseInt(npmVersion.stdout.toString().replace('\n', '')); //normalize some oddities npm gives us
	}

	_logging.Log.verbose('NPM version ' + _logging.Style.yellow(npmVersion) + ' detected');

	//npm 3 and higher is required as below will install dependencies inside each module folder
	if (npmVersion < 3) {
		return false;
	} else {
		return true;
	}
};

//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// Finding CWD
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
/**
 * Find the current working directory by checking inside the current directory for a package.json and see if it is a pancake module.
 * If it is then we go to the parent folder and run `npm prefix` there. Otherwise run `npm prefix` in the current working directory.
 *
 * @param  {string} cwd - Path to current working directory
 *
 * @return {string} - The absolute path to the folder of your host package.json
 */


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// Module imports
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
var Cwd = exports.Cwd = function Cwd() {
	var cwd = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : process.cwd();

	_logging.Log.verbose('Looking for cwd in ' + _logging.Style.yellow(cwd));

	var rootPath = void 0;
	var pkgPath = void 0;

	//let’s find the package.json and check if it's a valid one
	try {
		var location = _path2.default.normalize(cwd + '/package.json'); //on this level

		var testingPkg = require(location);

		if (testingPkg.pancake['pancake-module'] !== undefined) {
			//this package.json has an pancake-module object
			_logging.Log.verbose('Found valid pancake-module packages in ' + _logging.Style.yellow(cwd));

			rootPath = _path2.default.normalize(cwd + '/../'); //so let’s go down one level and look for the next package.json file

			pkgPath = Spawning.sync('npm', ['prefix'], { cwd: rootPath }); //this will find the nearest package.json

			if (pkgPath.error) {
				_logging.Log.error('Pancake was unable to find a folder with a package.json file from ' + _logging.Style.yellow(rootPath) + '.');
				_logging.Log.space();
				process.exit(1);
			} else {
				pkgPath = _path2.default.normalize(pkgPath.stdout.toString().replace('\n', '')); //normalize some oddities npm gives us
			}
		} else {
			//not a valid pancake module
			_logging.Log.verbose('Package.json not a pancake-module in ' + _logging.Style.yellow(location));

			pkgPath = _path2.default.normalize(cwd + '/'); //we start looking from here on for the next package.json
		}
	} catch (error) {
		//no package.json found in this folder
		_logging.Log.verbose('No package.json found in ' + _logging.Style.yellow(cwd));

		rootPath = _path2.default.normalize(cwd + '/'); //we start looking from here on for the next package.json

		pkgPath = Spawning.sync('npm', ['prefix'], { cwd: rootPath }); //this will find the nearest package.json

		if (pkgPath.error) {
			_logging.Log.error('Pancake was unable to find a folder with a package.json file from ' + _logging.Style.yellow(rootPath) + '.');
			_logging.Log.space();
			process.exit(1);
		} else {
			pkgPath = _path2.default.normalize(pkgPath.stdout.toString().replace('\n', '')); //normalize some oddities npm gives us
		}
	}

	_logging.Log.verbose('Cwd is ' + _logging.Style.yellow(pkgPath));

	return pkgPath;
};

//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// Get cli window size
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
/**
 * Get the size of the cli window
 * A port from https://github.com/jonschlinkert/window-size
 *
 * @return {object} - An object with width and height
 */
var Size = exports.Size = function Size() {
	var width = void 0;
	var height = void 0;

	if (_tty2.default.isatty(1)) {
		if (process.stdout.getWindowSize) {
			width = process.stdout.getWindowSize(1)[0];
			height = process.stdout.getWindowSize(1)[1];
		} else if (_tty2.default.getWindowSize) {
			width = _tty2.default.getWindowSize()[1];
			height = _tty2.default.getWindowSize()[0];
		} else if (process.stdout.columns && process.stdout.rows) {
			height = process.stdout.rows;
			width = process.stdout.columns;
		}
	} else if (_os2.default.release().startsWith('10')) {
		var numberPattern = /\d+/g;
		var cmd = 'wmic path Win32_VideoController get CurrentHorizontalResolution,CurrentVerticalResolution';
		var code = _child_process2.default.execSync(cmd).toString('utf8');
		var res = code.match(numberPattern);

		return {
			height: ~~res[1],
			width: ~~res[0]
		};
	} else {
		return {
			height: undefined,
			width: undefined
		};
	}

	return {
		height: height,
		width: width
	};
};

//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// Spawning new processes cross os
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
/**
 * Spawning child processes in an abstraction so we can handle different OS
 *
 * @type {Object}
 */
var Spawning = exports.Spawning = {
	isWin: /^win/.test(process.platform), //sniffing the os, Can’t use os.platform() as we want to support node 5

	/**
  * Spawning async
  *
  * @param  {string}  command - The program we run
  * @param  {array}   options - the flags and options we pass to it
  * @param  {object}  param   - Parameters we pass to child_process
  *
  * @return {Promise object}  - The error code returned from child_process.spawn
  */
	async: function async(command, options) {
		var param = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

		_logging.Log.verbose('Spawning async ' + _logging.Style.yellow(command + ' ' + [].concat((0, _toConsumableArray3.default)(options)).join(' ')) + ' with ' + _logging.Style.yellow((0, _stringify2.default)(param)));

		return new _promise2.default(function (resolve, reject) {
			var operation = void 0;
			var error = ''; //gather errors

			if (Spawning.isWin) {
				operation = _child_process2.default.spawn('cmd.exe', ['/s', '/c', command].concat((0, _toConsumableArray3.default)(options)), param);
			} else {
				operation = _child_process2.default.spawn(command, [].concat((0, _toConsumableArray3.default)(options)), param);
			}

			if (operation.stderr) {
				//if we even have an output
				operation.stderr.on('data', function (error) {
					error += error; //add to error object
				});
			}

			operation.on('close', function (code) {
				if (code !== 0) {
					reject(error.toString()); //ignore warnings
				} else {
					resolve(code);
				}
			});
		});
	},

	/**
  * Spawning sync
  *
  * @param  {string}  command - The program we run
  * @param  {array}   options - the flags and options we pass to it
  * @param  {object}  param   - Parameters we pass to child_process
  *
  * @return {object}          - The object returned from child_process.spawnSync
  */
	sync: function sync(command, options) {
		var param = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};


		_logging.Log.verbose('Spawning sync ' + _logging.Style.yellow(command + ' ' + [].concat((0, _toConsumableArray3.default)(options)).join(' ')) + ' with ' + _logging.Style.yellow((0, _stringify2.default)(param)));

		if (Spawning.isWin) {
			return _child_process2.default.spawnSync('cmd.exe', ['/s', '/c', command].concat((0, _toConsumableArray3.default)(options)), param);
		} else {
			return _child_process2.default.spawnSync(command, [].concat((0, _toConsumableArray3.default)(options)), param);
		}
	}
};

//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// Exit handler
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
/**
 * Handle exiting of program
 *
 * @param {null}   exiting - null for bind
 * @param {object} error   - Object to distinguish between closing events
 */
var ExitHandler = exports.ExitHandler = function ExitHandler(exiting, error) {
	if (error && error !== 1) {
		try {
			//try using our pretty output
			_logging.Log.error(error);
		} catch (error) {
			//looks like it’s broken too so let’s just do the old school thing
			console.error(error);
		}
	}

	if (exiting.withoutSpace) {
		process.exit(0); //exit now
	}

	_logging.Log.space(); //adding some space
	process.exit(0); //now exit with a smile :)
};
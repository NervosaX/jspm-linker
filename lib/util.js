var _ = require("lodash");
var fs = require("fs");
var path = require("path");
var chalk = require("chalk");
var util = require("util");

var log = function() {
	console.log(chalk.blue(util.format.apply(null, arguments)));
};

log.warn = function() {
	console.log(chalk.yellow(util.format.apply(null, arguments)));
};

log.error = function() {
	console.log(chalk.red(util.format.apply(null, arguments)));
};

log.debug = function() {
	var args = _.toArray(arguments);
	args.unshift("[DEBUG]");
	log.apply(null, args);
};

var touchJSON = function(filePath) {
	if (!fs.existsSync(filePath)) {
		fs.writeFileSync(filePath, "{}");
	}
};

var writeJSON = function(filePath, data) {
	fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

var readJSON = function(filePath) {
	if (fs.existsSync(filePath)) {
		return JSON.parse(fs.readFileSync(filePath));
	}

	log.error("Could not load path: " + filePath);
};

var getLinkerPath = function() {
	var homeDir = process.env[
		(process.platform === "win32")
		? "USERPROFILE"
		: "HOME"
	];
	return path.join(homeDir, ".jspm-linker");
};

var getLinkerFile = function() {
	var linkerPath = getLinkerPath();
	var jspmLinks = readJSON(linkerPath);
	return jspmLinks;
};

module.exports = {
	getLinkerPath: getLinkerPath,
	getLinkerFile: getLinkerFile,
	touchJSON: touchJSON,
	readJSON: readJSON,
	writeJSON: writeJSON,
	log: log
};

var _ = require("lodash");
var fs = require("fs");
var path = require("path");
var chalk = require("chalk");
var util = require("util");

var touchJSON = function(filePath) {
	if (!fs.existsSync(filePath)) {
		fs.writeFileSync(filePath, "{}");
	}
};

var writeJSON = function(filePath, data) {
	fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

var readJSON = function(filePath) {
	return JSON.parse(fs.readFileSync(filePath));
};

var getLinkerPath = function() {
	var homeDir = process.env[(process.platform === "win32") ? "USERPROFILE" : "HOME"];
	return path.join(homeDir, ".jspm-linker");
};

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

module.exports = {
	getLinkerPath: getLinkerPath,
	touchJSON: touchJSON,
	readJSON: readJSON,
	writeJSON: writeJSON,
	log: log
};

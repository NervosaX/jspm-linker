var path = require("path");
var fs = require("fs-extra");
var chokidar = require("chokidar");
var util = require("./util");
var link = require("./link");
var _ = require("lodash");

var getHomeDir = function() {
	return process.env[(process.platform === "win32") ? "USERPROFILE" : "HOME"];
};

var getLinkingDir = function() {
	return path.join(getHomeDir(), ".jspm", "linked");
};

var getLinkerCache = function() {
	return path.join(getHomeDir(), ".jspm-linker-cache");
};

module.exports = function() {
	var linkerPath = util.getLinkerPath();
	var jspmLinks = util.readJSON(linkerPath);

	var pathsToWatch = _.values(jspmLinks).map(function(link) {
		return link + "/**/*";
	});

	util.log("Listening for JSPM link changed...");
	chokidar.watch(pathsToWatch, {
		ignored: /flycheck_*|node_modules|\.git|jspm_packages/,
		ignoreInitial: true
	})
	.on("all", function(event, filepath) {
		var moduleName = _.findKey(jspmLinks, function(link) {
			return filepath.indexOf(link) > -1;
		});

		var modulePath = jspmLinks[moduleName];
		var fileChanged = filepath.slice(modulePath.length + 1);
		util.log("Relinking %s => %s", moduleName, fileChanged);
		link(moduleName, modulePath).then(function() {
			// Save a cached file in an easily accessible place. Any sort of build watcher
			// can watch this file for changes to reload the browser or whatever needs
			// to be done
			fs.outputFileSync(getLinkerCache(), +new Date());
		});
	});
};

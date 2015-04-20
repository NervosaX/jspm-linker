var path = require("path");
var glob = require("multi-glob").glob;
var _ = require("lodash");
var util = require("./util");
var link = require("./link");

var linkPackage = function(packagePath) {
	var jspmLinkerPath = util.getLinkerPath();
	util.touchJSON(jspmLinkerPath);

	var savedPackages = util.readJSON(jspmLinkerPath);

	var packageFile = util.readJSON(packagePath);
	var dirPath = path.dirname(packagePath);

	if (packageFile.jspmLinkable) {
		// Make sure the file exists for us to read/write from
		if (!savedPackages[packageFile.name]) {
			savedPackages[packageFile.name] = dirPath;
		}

		util.writeJSON(jspmLinkerPath, savedPackages);
		link(packageFile.name, dirPath);
		util.log("Added: '%s' -> %s", packageFile.name, dirPath);
	} else {
		util.log.warn("Skipped: '%s' does not contain 'jspmLinkable' in its package.json, and will be skipped",
									packageFile.name);
	}
};

module.exports = function(recursive) {
	var filePath = process.cwd();

	// By default, get the current directory package file
	var globPath = path.join(filePath, "package.json");

	// If recursively linking, use a wildcard glob
	if (recursive) {
		globPath = ["**/package.json"];
	}

	glob(globPath, {
		// Ignore most package.json files that will come up. We only want to
		// link our own packages
		ignore: ["**/node_modules/**/*", "**/jspm_packages/**/*"]
	}, function(err, files) {
		if (err) {
			util.log.error(err);
			return;
		}

		_.each(files, function(file) {
			linkPackage(path.resolve(process.cwd(), file));
		});

	});
};

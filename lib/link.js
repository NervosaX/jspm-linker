var fs = require("fs");
var path = require("path");
var _ = require("lodash");
var glob = require("glob");
var rimraf = require("rimraf");
var util = require("./util");

module.exports = function() {
	var packageJSON = path.join(process.cwd(), "package.json");
	var jspmLinks = util.getLinkerFile();

	if (fs.existsSync(packageJSON)) {
		packageJSON = require(packageJSON);
		if (packageJSON.jspm && packageJSON.jspm.dependencies) {
			var dependencies = packageJSON.jspm.dependencies;
			var jspmLinkNames = _.keys(jspmLinks);

			for (var key in dependencies) {
				if (jspmLinkNames.indexOf(key) !== -1) {
					var files = glob.sync("jspm_packages/**/" + key + "@*/");
					if (files.length) {
						// Slice off the extra "/" at the end, or else it tried to put
						// the symlink in the wrong place...
						var p = path.join(process.cwd(), files[0].slice(0, -1));
						rimraf.sync(p);
						util.log("Linked '" + key + "'");
						fs.symlinkSync(path.join(jspmLinks[key], "lib"), p);
					} else {
						util.log.warn("Found no files to link");
					}
				}
			}
		} else {
			util.log.warn("package.json contains no jspm dependencies");
		}
	} else {
		util.log.error("Could not find package.json file in this directory");
	}
};

var fs = require("fs");
var path = require("path");
var _ = require("lodash");
var glob = require("glob");
var rimraf = require("rimraf");
var util = require("./util");
var jspmInstall = require("jspm/lib/install").install;
var jspm = require("jspm");
var Promise = require("bluebird");

global.Promise = Promise;

module.exports = function() {
	var packageJSON = path.join(process.cwd(), "package.json");
	var jspmLinks = util.getLinkerFile();
	var toUnlink = {};

	if (fs.existsSync(packageJSON)) {
		packageJSON = require(packageJSON);
		if (packageJSON.jspm && packageJSON.jspm.dependencies) {
			var dependencies = packageJSON.jspm.dependencies;
			var jspmLinkNames = _.keys(jspmLinks);

			for (var key in dependencies) {
				if (jspmLinkNames.indexOf(key) !== -1) {
					var files = glob.sync("jspm_packages/**/" + key + "@*/");
					if (files.length) {
						var fp = path.dirname(files[0]);
						var installType = fp.split(path.sep).slice(-1)[0];
						toUnlink[key] = installType + ":" + key;
					} else {
						util.log.warn("Found no files to unlink");
					}
				}
			}

			jspm.setPackagePath(process.cwd());
			util.log("Unlinking packages: " + _.keys(toUnlink).join(", "));
			jspmInstall(toUnlink, { unlink: true });
		} else {
			util.log.warn("package.json contains no jspm dependencies");
		}
	} else {
		util.log.error("Could not find package.json file in this directory");
	}
};

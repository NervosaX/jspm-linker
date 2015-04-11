var path = require("path");
var util = require("./util");
var link = require("./link");

module.exports = function() {
	var filePath = process.cwd();
	var jspmLinkerPath = util.getLinkerPath();
	var packageFile = util.readJSON(path.join(filePath, "package.json"));

	// Make sure the file exists for us to read/write from
	util.touchJSON(jspmLinkerPath);

	var savedPackages = util.readJSON(jspmLinkerPath);

	if (!savedPackages[packageFile.name]) {
		savedPackages[packageFile.name] = filePath;
	}

	util.writeJSON(jspmLinkerPath, savedPackages);

	link(packageFile.name, filePath);
	util.log("Added '%s' -> %s", packageFile.name, filePath);
};

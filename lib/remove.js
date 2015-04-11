var path = require("path");
var util = require("./util");

module.exports = function() {
	var filePath = process.cwd();
	var jspmLinkerPath = util.getLinkerPath();
	var packageFile = util.readJSON(path.join(filePath, "package.json"));

	// Make sure the file exists for us to read/write from
	util.touchJSON(jspmLinkerPath);

	var savedPackages = util.readJSON(jspmLinkerPath);

	if (savedPackages[packageFile.name]) {
		delete savedPackages[packageFile.name];

		util.writeJSON(jspmLinkerPath, savedPackages);

		util.log("Removed '%s' -> %s", packageFile.name, filePath);
		util.log("Note: You will still need to manually remove the link");
	} else {
		util.log.warn("Not linked! Aborting.");
	}
};

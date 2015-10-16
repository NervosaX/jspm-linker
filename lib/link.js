var jspm = require("jspm");
var link = require("jspm/lib/link").link;
var common = require("jspm/lib/common");
var util = require("./util");

module.exports = function(name, path) {
	jspm.setPackagePath(path);
	return link("npm:" + name + "@dev", path, true);
};

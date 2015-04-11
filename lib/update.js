var util = require("./util");
var link = require("./link");

module.exports = function() {
	var path = util.getLinkerPath();
	var jspmLinks = util.readJSON(path);

	for (var key in jspmLinks) {
		link(key, jspmLinks[key]);
		util.log("Updating '%s' -> %s", key, jspmLinks[key]);
	}
};

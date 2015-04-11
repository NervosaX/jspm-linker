var util = require("./util");

module.exports = function() {
	var path = util.getLinkerPath();
	var jspmLinks = util.readJSON(path);

	for (var key in jspmLinks) {
		util.log("'%s' -> %s", key, jspmLinks[key]);
	}
};

var util = require("./util");

module.exports = function() {
	var jspmLinks = util.getLinkerFile();

	for (var key in jspmLinks) {
		util.log("'%s' -> %s", key, jspmLinks[key]);
	}
};

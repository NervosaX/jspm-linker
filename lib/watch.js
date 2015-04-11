var gaze = require("gaze");
var util = require("./util");
var link = require("./link");
var _ = require("lodash");

module.exports = function() {
	var path = util.getLinkerPath();
	var jspmLinks = util.readJSON(path);

	var pathsToWatch = _.values(jspmLinks).map(function(link) {
		return link + "/**/*";
	});

	pathsToWatch.push("!node_modules/**");

	gaze(pathsToWatch, function(err, watcher) {
		util.log("Watching for changes...");
		if (err) {
			util.error(err);
			return;
		}
		this.on("all", function(event, filepath) {
			var moduleName = _.findKey(jspmLinks, function(link) {
				return filepath.indexOf(link) > -1;
			});
			var modulePath = jspmLinks[moduleName];
			var fileChanged = filepath.slice(modulePath.length + 1);
			util.log("Relinking %s => %s", moduleName, fileChanged);
			link(moduleName, modulePath);
		});
	});
};

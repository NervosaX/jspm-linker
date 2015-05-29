var fs = require("fs");

module.exports = function(from, to) {
	fs.symlinkSync(from, to);
};

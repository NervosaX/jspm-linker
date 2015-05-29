#!/usr/bin/env node
var add = require("./lib/add");
var list = require("./lib/list");
var update = require("./lib/update");
var remove = require("./lib/remove");
var link = require("./lib/link");
var unlink = require("./lib/unlink");

var yargs = require("yargs")
	.usage("Usage: Usage: $0 <command> [options]")
	.command("add", "Add a project to the linking list")
	.command("remove", "Remove a project from the linking list")
	.command("list", "List currently linked files")
	.command("link", "Link all found jspm packages")
	.describe("help", "Display this help")
	.alias("v", "version")
	.alias("h", "help")
	.version(function() {
		return require("./package.json").version;
	});

// Explicitly check for help option
if (yargs.argv.help && !yargs.argv._.length) {
	yargs.showHelp();
	return;
}

var args;

switch (yargs.argv._[0]) {
	case "add":
		args = yargs.reset()
			.usage("Usage: $0 add [options]")
			.help("help").alias("h", "help")
			.describe("recursive", "Find linkable packages recursively from the current directory")
			.alias("r", "recursive")
			.argv;

		var recursive = args.recursive || false;
		add(recursive);
		break;
	case "list":
		args = yargs.reset()
			.usage("Usage: $0 list [options]")
			.help("help")
			.alias("h", "help")
			.argv;
		list();
		break;
	case "remove":
		args = yargs.reset()
			.usage("Usage: $0 remove [options]")
			.help("help")
			.alias("h", "help")
			.argv;
		remove();
		break;
	case "link":
		args = yargs.reset()
			.usage("Usage: $0 link [options]")
			.help("help")
			.alias("h", "help")
			.argv;
		link();
		break;
	case "unlink":
		args = yargs.reset()
			.usage("Usage: $0 unlink [options]")
			.help("help")
			.alias("h", "help")
			.argv;
		unlink();
		break;
	default:
		yargs.showHelp();
		break;
}

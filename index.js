#!/usr/bin/env node
var add = require("./lib/add");
var list = require("./lib/list");
var update = require("./lib/update");
var remove = require("./lib/remove");
var watch = require("./lib/watch");

var yargs = require("yargs")
	.usage("Usage: Usage: $0 <command> [options]")
	.command("add", "Add a project to the linking list")
	.command("remove", "Remove a project from the linking list")
	.command("list", "List currently linked files")
	.command("update", "Update all currently linked files")
	.command("watch", "Watch to relink projects")
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
			.help("help")
			.alias("h", "help")
			.argv;
		add();
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
	case "update":
		args = yargs.reset()
			.usage("Usage: $0 update [options]")
			.help("help")
			.alias("h", "help")
			.argv;
		update();
		break;
	case "watch":
		args = yargs.reset()
			.usage("Usage: $0 watch [options]")
			.help("help")
			.alias("h", "help")
			.argv;
		watch();
		break;
	default:
		yargs.showHelp();
		break;
}

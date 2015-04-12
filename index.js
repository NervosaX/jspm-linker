#!/usr/bin/env node
var add = require("./lib/add");
var list = require("./lib/list");
var update = require("./lib/update");
var remove = require("./lib/remove");
var watch = require("./lib/watch");

var yargs = require("yargs")
	.usage("Usage: $0 <command> [options]")
	.demand(1)
	.command("add", "Add a project to the linking list")
	.command("remove", "Remove a project from the linking list")
	.command("list", "List currently linked files")
	.command("update", "Update all currently linked files")
	.command("watch", "Watch to relink projects");

switch (yargs.argv._[0]) {
	case "add":
		add();
		break;
	case "list":
		list();
		break;
	case "remove":
		remove();
		break;
	case "update":
		update();
		break;
	case "watch":
		watch();
		break;
	default:
		yargs.showHelp();
		break;
}

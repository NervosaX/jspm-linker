# JSPM Linker

A basic link watcher/manager for the [jspm CLI](https://github.com/jspm/jspm-cli).

Because the JSPM linking process currently makes some transformations
to your packages file structure (instead of making a direct symlink like
npm does), it's necessary to run a watcher to re-link your separate
modules. This is a basic attempt at simplifying that process.

See https://github.com/jspm/jspm-cli/wiki/Linking for more information
on the jspm linking process.

## Installing
Without publishing this directly to npm (I don't feel that this is
currently quite worthy) you can git clone the project and then in the
repo type `npm install` and `npm link`. The project will then be
available globally as `jspm-linker`.

## Usage
* `jspm-linker add` - Go to your package (in the same directory as your
package.json) and use this command to add to your local watch list. Do
this for each of your packages.

Note: `"jspmLinkable": true` should be added to the package.json files you
wish for this tool to affect.

######Options:
`--recursive`: Recursively links modules from the current directory.
Useful for setting up initial dev environments.X

* `jspm-linker remove` - Repeat the same as above, but removes from the
 watch list.
* `jspm-linker list` - List your currently linked packages
* `jspm-linker update` - Relink your entire list of packages
* `jspm-linker watch` - Watch for changes on your entire list of packages
(re-links on any file change in your package).

## Disclaimer
Use at your own risk, this package is quite untested, and makes direct use
 of the JSPM source code which is totally subject to change by the jspm-cli project.

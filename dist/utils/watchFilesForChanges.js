"use strict";

exports.__esModule = true;
exports.default = _default;

/**
 * watchFilesForChanges
 *
 * Adds files as loader dependency which will make Webpack watch
 * the files in watch-mode and reload if they change.
 */
function _default(loader, files) {
  files.forEach(file => loader.addDependency(file));
}
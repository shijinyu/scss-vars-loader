"use strict";

exports.__esModule = true;
exports.default = _default;

function _default(files) {
  return files.reduce((vars, filepath) => {
    if (!filepath.endsWith('.js')) {
      return vars;
    }

    delete require.cache[filepath];
    return Object.assign(vars, require(filepath));
  }, {});
}
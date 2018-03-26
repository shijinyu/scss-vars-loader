"use strict";

exports.__esModule = true;
exports.default = _default;

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(files) {
  return files.reduce((vars, filepath) => Object.assign(vars, filepath.endsWith('.json') && JSON.parse(_fs.default.readFileSync(filepath, 'utf8'))), {});
}
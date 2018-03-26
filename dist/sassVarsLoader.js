"use strict";

exports.__esModule = true;
exports.default = _default;

var _loaderUtils = _interopRequireDefault(require("loader-utils"));

var _readVarsFromJSONFiles = _interopRequireDefault(require("./utils/readVarsFromJSONFiles"));

var _readVarsFromJavascriptFiles = _interopRequireDefault(require("./utils/readVarsFromJavascriptFiles"));

var _watchFilesForChanges = _interopRequireDefault(require("./utils/watchFilesForChanges"));

var _convertJsToSass = _interopRequireDefault(require("./utils/convertJsToSass"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _default(content) {
  this.cacheable();
  const options = _loaderUtils.default.getOptions(this) || {};
  const files = options.files || [];
  const asValue = typeof options.asValue == 'boolean' || true;
  const syntax = options.syntax || 'scss';
  (0, _watchFilesForChanges.default)(this, files);

  const vars = _objectSpread({}, (0, _readVarsFromJSONFiles.default)(files), (0, _readVarsFromJavascriptFiles.default)(files), options.vars);

  const sassVarsString = (0, _convertJsToSass.default)(vars, syntax);
  return `${sassVarsString}\n${content}`;
}
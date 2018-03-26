"use strict";

exports.__esModule = true;
exports.default = void 0;

function convertJsToSass(obj, syntax) {
  const suffix = syntax === 'sass' ? '' : ';';
  const keys = Object.keys(obj);
  const lines = keys.map(key => `$${key}: ${formatValue(obj[key], syntax)}${suffix}`);
  return lines.join('\n');
}

function formatNestedObject(obj, syntax) {
  const keys = Object.keys(obj);
  return keys.map(key => `${key}: ${formatValue(obj[key], syntax)}`).join(', ');
}

function formatValue(value, syntax) {
  if (value instanceof Array) {
    return `(${value.map(formatValue).join(', ')})`;
  }

  if (typeof value === 'object') {
    return `(${formatNestedObject(value, syntax)})`;
  }

  if (typeof value === 'string') {
    return value;
  }

  return JSON.stringify(value);
}

var _default = convertJsToSass;
exports.default = _default;
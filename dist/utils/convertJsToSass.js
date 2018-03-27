"use strict";

exports.__esModule = true;
exports.default = void 0;

function convertJsToSass(obj, props = {}) {
  const keys = Object.keys(obj);
  const lines = keys.map(key => `$${key}: ${formatValue(obj[key], props[key])};`);
  return lines.join('\n');
}

function formatNestedObject(obj, prop = {}) {
  const keys = Object.keys(obj);
  return keys.map(key => `${key}: ${formatValue(obj[key], prop[key])}`).join(', ');
}

function formatValue(value, prop = {}) {
  if (value instanceof Array) {
    let var_arr = value.map((item, index) => formatValue(item, prop[index])).join(', ');
    return `(${var_arr})`;
  }

  if (typeof value === 'object') {
    return `(${formatNestedObject(value, prop)})`;
  }

  if (typeof value === 'string') {
    if (prop.asValue && !(value.startsWith('"') || value.endsWith('"'))) {
      value = `"${value}"`;
    }

    if (prop.asDefault) {
      value += '  !default';
    }

    return value;
  }

  return JSON.stringify(value);
}

var _default = convertJsToSass;
exports.default = _default;
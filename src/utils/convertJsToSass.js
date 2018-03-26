function convertJsToSass(obj, syntax, asValue) {
  const suffix = syntax === 'sass' ? '' : ';';
  const keys = Object.keys(obj);
  const lines = keys.map(
    key => `$${key}: ${formatValue(obj[key], syntax, asValue)}${suffix}`
  );
  return lines.join('\n');
}

function formatNestedObject(obj, syntax, asValue) {
  const keys = Object.keys(obj);
  return keys
    .map(key => `${key}: ${formatValue(obj[key], syntax, asValue)}`)
    .join(', ');
}

function formatValue(value, syntax, asValue) {
  if (value instanceof Array) {
    return `(${value.map(formatValue).join(', ')})`;
  }

  if (typeof value === 'object') {
    return `(${formatNestedObject(value, syntax, asValue)})`;
  }

  if (typeof value === 'string') {
    return asValue ? `"${asValue}"` : value;
  }

  return JSON.stringify(value);
}

export default convertJsToSass;

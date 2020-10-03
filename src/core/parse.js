export function parse(value = '') {
  value = value.toString();
  if (value.startsWith('=')) {
    try {
      return eval(value.slice(1));
    } catch (err) {
      return value;
    }
  }
  return value;
}

export function cellResize(data) {
  const type = data.type.toUpperCase() + "_RESIZE";
  return {
    type,
    data,
  };
}

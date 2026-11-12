
export function shallowEqual(previous, next) {
  if (Object.is(previous, next)) {
    return true;
  }

  if (
    typeof previous !== "object" ||
    previous === null ||
    typeof next !== "object" ||
    next === null
  ) {
    return false;
  }

  const previousKeys = Object.keys(previous);
  const nextKeys = Object.keys(next);

  if (previousKeys.length !== nextKeys.length) {
    return false;
  }

  return previousKeys.every(
    (key) =>
      Object.hasOwn(next, key) &&
      Object.is(previous[key], next[key]),
  );
}

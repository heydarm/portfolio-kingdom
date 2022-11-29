export function debounce<Args extends any[]>(
  func: (...args: Args) => any,
  time: number = 300
) {
  let timeout: number;
  return (...args: Args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      // @ts-expect-error
      func.apply(this, args);
    }, time);
  };
}

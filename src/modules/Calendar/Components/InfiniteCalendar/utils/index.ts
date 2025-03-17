export function groupBySeven<T>(array: T[]): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += 7) {
    result.push(array.slice(i, i + 7));
  }
  return result;
}
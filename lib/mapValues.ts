export function mapValues<T extends Record<string, any>, V>(
  obj: T,
  valueMapper: (k: T[keyof T]) => V,
) {
  return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, valueMapper(v)])) as {
    [K in keyof T]: V
  }
}

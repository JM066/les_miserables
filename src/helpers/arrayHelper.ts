type Key = string | number

export function arrayToMap<TItem, TKey extends Key, TValue>(
  array: TItem[],
  keyResolver: (item: TItem, index: number) => TKey,
  valueResolver: (item: TItem, index: number) => TValue
) {
  const result: Record<TKey, TValue> = {} as Record<TKey, TValue>
  for (let index = 0; index < array.length; index++) {
    const item = array[index]
    result[keyResolver(item, index)] = valueResolver(item, index)
  }
  return result
}

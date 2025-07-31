/**
 * 根据 path 获取对象数据
 */
type Prev = [never, 0, 1, 2, 3, 4, 5]
type Join<T, P> = T extends string | number ? P extends string | number ? `${T}.${P}` : never : never
type Paths<T, Depth extends number = 3> =
  Depth extends never ?
    never
    : T extends object
      ? {
          [K in keyof T & (string | number)]:
            T[K] extends object
              ? `${K}` | Join<K, Paths<T[K], Prev[Depth]>>
              : `${K}`
        }[keyof T & (string | number)]
      : never

export function getByPath<T, K extends string & Paths<T>>(obj: T, path: K) {
  return path.split('.').reduce((prev, curr) => prev && prev[curr], obj)
}

/**
 * 对请求的返回结构做目标转化
 * @param source
 * @param target
 * @returns
 */
export function transformRes<TSource extends object, TTarget extends Record<string, Paths<TSource>>>(
  source: TSource, target: TTarget
) {
  target = { ...target }
  const result = {} as Record<keyof TTarget, any>
  for (const key in target) {
    const path = target[key]
    result[key] = getByPath(source, path)
  }
  return result
}

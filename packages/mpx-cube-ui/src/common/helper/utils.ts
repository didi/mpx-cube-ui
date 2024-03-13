function judgeTypeFnCreator<T>(type: string) {
  const toString = Object.prototype.toString
  return function isType(o: any): o is T {
    return toString.call(o) === `[object ${type}]`
  }
}

type Func = (...args: any[]) => any
type Obj = Record<string, any>

const isFunc = judgeTypeFnCreator<Func>('Function')
const isUndef = judgeTypeFnCreator<undefined>('Undefined')
const isArray = judgeTypeFnCreator<Array<any>>('Array')
const isString = judgeTypeFnCreator<string>('String')
const isObject = judgeTypeFnCreator<Obj>('Object')
const isNumber = judgeTypeFnCreator<number>('Number')
const isDate = judgeTypeFnCreator<Date>('Date')

function deepAssign(to: Obj, from: Obj): void {
  for (const key in from) {
    if (!to[key] || typeof to[key] !== 'object') {
      to[key] = from[key]
    } else {
      deepAssign(to[key], from[key])
    }
  }
}

function findIndex<T>(ary: Array<T>, fn: (a: T, b: number, c: Array<T>) => boolean): number {
  if (ary.findIndex) {
    return ary.findIndex(fn)
  }
  /* istanbul ignore next */
  let index = -1
  /* istanbul ignore next */
  ary.some(function (item, i, ary) {
    const ret = fn.call(item, i, ary)
    if (ret) {
      index = i
      return ret
    }
    return false
  })
  /* istanbul ignore next */
  return index
}

const isWeb = __mpx_mode__ === 'web'
const isWx = __mpx_mode__ === 'wx'
const isAli = __mpx_mode__ === 'ali'

export {
  isFunc,
  isUndef,
  isArray,
  isString,
  isObject,
  isNumber,
  isDate,
  deepAssign,
  findIndex,
  isWeb,
  isWx,
  isAli
}

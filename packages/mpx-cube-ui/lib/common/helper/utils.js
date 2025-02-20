function judgeTypeFnCreator(type) {
    const toString = Object.prototype.toString;
    return function isType(o) {
        return toString.call(o) === `[object ${type}]`;
    };
}
const isFunc = judgeTypeFnCreator('Function');
const isUndef = judgeTypeFnCreator('Undefined');
const isArray = judgeTypeFnCreator('Array');
const isString = judgeTypeFnCreator('String');
const isObject = judgeTypeFnCreator('Object');
const isNumber = judgeTypeFnCreator('Number');
const isDate = judgeTypeFnCreator('Date');
function deepAssign(to, from) {
    for (const key in from) {
        if (!to[key] || typeof to[key] !== 'object') {
            to[key] = from[key];
        }
        else {
            deepAssign(to[key], from[key]);
        }
    }
}
function findIndex(ary, fn) {
    if (ary.findIndex) {
        return ary.findIndex(fn);
    }
    /* istanbul ignore next */
    let index = -1;
    /* istanbul ignore next */
    ary.some(function (item, i, ary) {
        const ret = fn.call(item, i, ary);
        if (ret) {
            index = i;
            return ret;
        }
        return false;
    });
    /* istanbul ignore next */
    return index;
}
const isWeb = __mpx_mode__ === 'web';
const isWx = __mpx_mode__ === 'wx';
const isAli = __mpx_mode__ === 'ali';
export { isFunc, isUndef, isArray, isString, isObject, isNumber, isDate, deepAssign, findIndex, isWeb, isWx, isAli };

export function getByPath(obj, path) {
    return path.split('.').reduce((prev, curr) => prev && prev[curr], obj);
}
/**
 * 对请求的返回结构做目标转化
 * @param source
 * @param target
 * @returns
 */
export function transformRes(source, target) {
    target = { ...target };
    for (const key in target) {
        target[key] = getByPath(source, target[key]);
    }
    return target;
}

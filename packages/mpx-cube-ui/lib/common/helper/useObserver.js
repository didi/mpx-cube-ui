import { getCurrentInstance } from '@mpxjs/core';
/**
 * 观察某个元素是否进入（离开）视图
 *
 * @export
 * @param {string} selector 选择器
 * @param {() => void} onShow 进入视图回调
 * @param {() => void} onHide 离开视图回调
 * @return {() => void}
 */
export default function useObserver(selector, onShow, onHide) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const instance = this || getCurrentInstance()?.proxy || getCurrentInstance();
    if (!instance) {
        console.error('[useObserver] can\'t get current instance');
        return () => { return undefined; };
    }
    let observer;
    if (__mpx_mode__ === 'wx') {
        observer = instance.createIntersectionObserver();
        observer.relativeToViewport().observe(selector, (res) => {
            if (!res.intersectionRatio && res.boundingClientRect?.top < 0) {
                onHide?.();
            }
            else if (res.intersectionRatio) {
                onShow?.();
            }
        });
    }
    else {
        observer = new IntersectionObserver(([res]) => {
            if (res.isIntersecting !== undefined ? res.isIntersecting : res.intersectionRatio) {
                onShow?.();
            }
            else if (!res.intersectionRatio && res.boundingClientRect?.top < 0) {
                onHide?.();
            }
        });
        const el = document.querySelector(selector);
        if (el) {
            observer.observe(document.querySelector(selector));
        }
    }
    return () => {
        observer.disconnect();
    };
}

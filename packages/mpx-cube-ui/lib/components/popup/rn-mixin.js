import mpx, { getMixin } from '@mpxjs/core';
let mixin = {};
// eslint-disable-next-line
// @ts-ignore
if (__mpx_mode__ === 'ios' || __mpx_mode__ === 'android') {
    mixin = {
        data: {
            animationData: {},
            rootAnimationData: {},
            maskAnimationData: {},
            ANIMATION_PRESET: {},
            contentRect: {}
        },
        computed: {
            contentInfo() {
                return {
                    height: this.styleConfig?.content?.height || this.contentRect.height || this.getWindowInfo().screenHeight
                };
            }
        },
        lifetimes: {
            created() {
                this.ANIMATION_PRESET = {
                    'cube-popup_mask_fade_transition': (animationOptions) => {
                        const animation = this.maskAnimation || (this.maskAnimation = mpx.createAnimation({ ...animationOptions, timingFunction: 'ease-in-out' }));
                        if (this.isVisible) {
                            const opacity = this.styleConfig?.mask?.visibleOpacity || 0.4;
                            animation.opacity(opacity).step();
                        }
                        else {
                            animation.opacity(0).step();
                        }
                        this.maskAnimationData = animation.export();
                    },
                    'cube-popup_transition': (animationOptions) => {
                        if (!this.isVisible) {
                            setTimeout(() => {
                                this.display = false;
                            }, animationOptions.duration);
                        }
                    },
                    'move-up': (animationOptions) => {
                        const hasTranslate = !!this.animation;
                        const animation = this.animation || (this.animation = mpx.createAnimation(animationOptions));
                        if (this.isVisible) {
                            if (!hasTranslate) {
                                animation.translateY(this.contentInfo.height).step({ duration: 0 });
                            }
                            animation.translateY(0).step();
                        }
                        else {
                            animation.translateY(this.contentInfo.height).step();
                        }
                        this.animationData = animation.export();
                    },
                    'move-right': () => { },
                    'move-left': () => { },
                    'move-down': () => { },
                    fade: (animationOption) => {
                        const animation = this.animation || (this.animation = mpx.createAnimation(animationOption));
                        if (this.isVisible) {
                            animation.opacity(1).step();
                        }
                        else {
                            animation.opacity(0).step();
                        }
                        this.animationData = animation.export();
                    }
                };
                this.$watch('isVisible', (n, o) => {
                    if (!!n === !!o)
                        return;
                    this.rnAnimation({
                        duration: 300,
                        timingFunction: 'ease-out'
                    });
                }, { immediate: true });
            }
        },
        methods: {
            getWindowInfo() {
                if (this.windowInfo)
                    return this.windowInfo;
                return (this.windowInfo = mpx.getWindowInfo());
            },
            initContentRect() {
                if (this.styleConfig?.content?.height)
                    return;
                if (this.contentRect.height || this.boundingClientRectFail)
                    return;
                return new Promise((resolve) => {
                    this.$refs['popup-content'].boundingClientRect((res) => {
                        if (res) {
                            this.contentRect = res;
                        }
                        else {
                            this.boundingClientRectFail = true;
                        }
                        resolve(res);
                    }).exec();
                });
            },
            async rnAnimation(animationOptions = {}) {
                await this.initContentRect();
                const names = [...Object.keys(this.rootClass).filter(v => this.rootClass[v]), this.transitionClass];
                if (!names.length)
                    return;
                names.forEach(v => {
                    const presetFn = this.ANIMATION_PRESET[v];
                    presetFn && presetFn(animationOptions);
                });
            }
        }
    };
}
export default getMixin(mixin);

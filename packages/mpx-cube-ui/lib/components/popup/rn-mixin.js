import mpx, { getMixin } from '@mpxjs/core';
let mixin = {
    methods: {
        // 避免web 调用报错
        initContentRect() { return Promise.resolve(); }
    }
};
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
                const styleConfigContent = this.styleConfig?.content || {};
                return {
                    width: styleConfigContent.width || this.contentRect.width || this.getWindowInfo().screenWidth,
                    height: styleConfigContent.height || this.contentRect.height || this.getWindowInfo().screenHeight
                };
            }
        },
        lifetimes: {
            created() {
                this.ANIMATION_PRESET = {
                    'cube-popup_mask_fade_transition': (animationOptions) => {
                        const animation = this.maskAnimation || (this.maskAnimation = mpx.createAnimation({ ...animationOptions, timingFunction: 'ease-in-out' }));
                        const opacity = this.isVisible ? (this.styleConfig?.mask?.visibleOpacity || 0.4) : 0;
                        animation.opacity(opacity).step();
                        this.maskAnimationData = animation.export();
                    },
                    'cube-popup_mask': (animationOptions) => {
                        if (this.maskFadeTransition)
                            return;
                        const animation = this.maskAnimation || (this.maskAnimation = mpx.createAnimation({ ...animationOptions, timingFunction: 'ease-in-out', duration: 0 }));
                        const opacity = this.isVisible ? (this.styleConfig?.mask?.visibleOpacity || 0.4) : 0;
                        animation.opacity(opacity).step();
                        this.maskAnimationData = animation.export();
                    },
                    'cube-popup_transition': (animationOptions) => {
                        if (!this.isVisible) {
                            setTimeout(() => {
                                this.display = false;
                                // fix 玄学，不加 100ms ，drn 动画会非常卡
                            }, animationOptions.duration + 100);
                        }
                    },
                    'move-center': (animationOptions) => {
                        const animation = this.animation || (this.animation = mpx.createAnimation(animationOptions));
                        if (this.isVisible) {
                            animation.opacity(1).step({ duration: 0 });
                            animation.scale(0).step({ duration: 0 });
                            animation.scale(1.1).step({ duration: animationOptions.duration / 2 });
                            animation.scale(1).step({ duration: animationOptions.duration / 2 });
                        }
                        else {
                            animation.opacity(0).step();
                        }
                        this.animationData = animation.export();
                    },
                    'move-up': (animationOptions) => this.translateAnimation(animationOptions, 'Y', this.contentInfo.height),
                    'move-right': (animationOptions) => this.translateAnimation(animationOptions, 'X', -this.contentInfo.width),
                    'move-left': (animationOptions) => this.translateAnimation(animationOptions, 'X', this.contentInfo.width),
                    'move-down': (animationOptions) => this.translateAnimation(animationOptions, 'Y', -this.contentInfo.height),
                    fade: (animationOption) => {
                        const animation = this.animation || (this.animation = mpx.createAnimation(animationOption));
                        const opacity = this.isVisible ? 1 : 0;
                        animation.opacity(opacity).step();
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
            translateAnimation(animationOptions, axis, start) {
                const hasTranslate = !!this.animation;
                const animation = this.animation || (this.animation = mpx.createAnimation(animationOptions));
                if (this.isVisible) {
                    if (hasTranslate) {
                        animation[`translate${axis}`](start).step({ duration: 0 });
                    }
                    animation[`translate${axis}`](0).step();
                }
                else {
                    animation[`translate${axis}`](start).step();
                }
                this.animationData = animation.export();
            },
            // @vuese
            // 仅 rn 使用，当内容元素高度变化后调用。用于更新动画高度
            initContentRect() {
                return new Promise((resolve) => {
                    this.$refs['popup-content'].boundingClientRect((res) => {
                        if (res) {
                            this.contentRect = res;
                        }
                        else {
                            this.boundingClientRectFaill = this.boundingClientRectFaill || 0;
                            this.boundingClientRectFaill++;
                            if (this.boundingClientRectFaill <= 2) {
                                // 打开前获取一次，打开后获取一次；两次获取不到后不再获取
                                setTimeout(() => {
                                    this.initContentRect();
                                }, 500); // 500 确保动画结束后再次获取
                            }
                        }
                        resolve(res);
                    }).exec();
                });
            },
            async rnAnimation(animationOptions = {}) {
                if (!this.styleConfig?.content?.height && !this.contentRect.height) {
                    await this.initContentRect();
                }
                const names = [...Object.keys(this.rootClass).filter(v => this.rootClass[v]), this.transition];
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

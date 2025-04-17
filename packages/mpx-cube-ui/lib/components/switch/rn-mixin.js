import mpx, { getMixin } from '@mpxjs/core';
let mixin = {};
// eslint-disable-next-line
// @ts-ignore
if (__mpx_mode__ === 'ios' || __mpx_mode__ === 'android') {
    mixin = {
        data: {
            ANIMATION_PRESET: {},
            switchAnimationData: {},
            switchHandleAnimationData: {}
        },
        lifetimes: {
            created() {
                this.ANIMATION_PRESET = {
                    'cube-switch-BGC': (animationOptions) => {
                        const animation = this.maskAnimation || (this.maskAnimation = mpx.createAnimation({ ...animationOptions }));
                        if (this.isOn) {
                            const onBGC = this.switchOnGBC || '#FF6435';
                            animation.backgroundColor(onBGC).step();
                        }
                        else {
                            const defaultBGC = this.switchDefaultGBC || '#EAEAEA';
                            animation.backgroundColor(defaultBGC).step();
                        }
                        this.switchAnimationData = animation.export();
                    },
                    'cube-switch-left': (animationOptions) => {
                        const animation = this.maskAnimation || (this.maskAnimation = mpx.createAnimation({ ...animationOptions }));
                        if (this.isOn) {
                            animation.left(18).step();
                        }
                        else {
                            animation.left(2).step();
                        }
                        this.switchHandleAnimationData = animation.export();
                    }
                };
                this.$watch('isOn', (n, o) => {
                    if (!!n === !!o)
                        return;
                    this.rnAnimation({
                        duration: 300,
                        timingFunction: 'ease'
                    });
                }, { immediate: true });
            }
        },
        methods: {
            async rnAnimation(animationOptions = {}) {
                this.ANIMATION_PRESET['cube-switch-on'](animationOptions);
                this.ANIMATION_PRESET['cube-switch-handle-on'](animationOptions);
            }
        }
    };
}
export default getMixin(mixin);

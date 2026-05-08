import mpx, { getMixin } from '@mpxjs/core';
let mixin = {};
if (__mpx_mode__ === 'ios' || __mpx_mode__ === 'android' || __mpx_mode__ === 'harmony') {
    const DURATION = 2000;
    const NORMAL_COLOR = '#ccc';
    const SECONDARY_COLOR = 'rgba(204, 204, 204, 0.4)';
    const ACTIVE_COLOR = '#fff';
    mixin = {
        data: {
            beforeAnim: {},
            middleAnim: {},
            afterAnim: {}
        },
        lifetimes: {
            ready() {
                this.timer = null;
                this.count = 0;
                this.time = 0;
                this.startAnim();
            },
            detached() {
                if (this.timer) {
                    clearInterval(this.timer);
                    this.timer = null;
                }
            }
        },
        methods: {
            startAnim() {
                if ((this.count - 1) % 3 === 0 || (this.count - 2) % 3 === 0) {
                    this.time = 500;
                }
                else if (this.count !== 0 && this.count % 3 === 0) {
                    this.time = 1000;
                }
                this.timer = setTimeout(() => {
                    if (this.count % 3 === 0) {
                        this.executeAnim('beforeAnim');
                    }
                    else if ((this.count - 1) % 3 === 0) {
                        this.executeAnim('middleAnim');
                    }
                    else if ((this.count - 2) % 3 === 0) {
                        this.executeAnim('afterAnim');
                    }
                    this.startAnim();
                }, this.time);
            },
            executeAnim(animName) {
                this.count++;
                this[animName] = {};
                this.$nextTick(() => {
                    this[animName] = this.createDotAnimation();
                });
            },
            createDotAnimation() {
                const duration = DURATION / 4;
                const animation = mpx.createAnimation({
                    duration: DURATION,
                    timingFunction: 'linear'
                });
                animation.scale(1).backgroundColor(NORMAL_COLOR).step({ duration });
                animation.scale(1.3).backgroundColor(SECONDARY_COLOR).step({ duration });
                animation.scale(1).backgroundColor(ACTIVE_COLOR).step({ duration });
                animation.scale(1).backgroundColor(NORMAL_COLOR).step({ duration });
                return animation.export();
            }
        }
    };
}
export default getMixin(mixin);

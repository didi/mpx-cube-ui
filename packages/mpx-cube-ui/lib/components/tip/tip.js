import { createComponent } from '../../common/helper/create-component';
import { visibilityMixin } from '../../common/mixins';
import rnMixin from './rn-mixin';
const EVENT_CLICK = 'click';
const EVENT_CLOSE = 'close';
const ANIMATION_ENTER = 'enter';
const ANIMATION_LEAVE = 'leave';
var TipAngleDirection;
(function (TipAngleDirection) {
    TipAngleDirection["TOP"] = "top";
    TipAngleDirection["RIGHT"] = "right";
    TipAngleDirection["BOTTOM"] = "bottom";
    TipAngleDirection["LEFT"] = "left";
})(TipAngleDirection || (TipAngleDirection = {}));
createComponent({
    mixins: [visibilityMixin, rnMixin],
    properties: {
        /**
         * @description 小三角的方向
         * @optional top/bottom/left/right
         * @defaultDesc top
         */
        direction: {
            type: String,
            value: TipAngleDirection.TOP
        },
        /**
         * @description Tip 的行内样式
         */
        customStyle: Object,
        /**
          * @description 小三角的行内样式
          */
        angStyle: Object,
        /**
         * @description 是否展示关闭 Icon
         */
        showClose: {
            type: Boolean,
            value: true
        },
        closeOnClickOutside: {
            type: Boolean,
            value: false
        }
    },
    data: {
        animationClass: ''
    },
    computed: {
        rootClass() {
            const directionClass = `cube-tip-direction_${this.direction}`;
            const themeType = this.themeType;
            const mainClass = themeType ? `cube-tip cube-tip-${themeType}` : 'cube-tip';
            if (__mpx_mode__ === 'ios' || __mpx_mode__ === 'android') {
                return `${mainClass} ${directionClass} ${this.animationClass}`;
            }
            else {
                const withOutClose = !this.showClose ? 'cube-tip-without-close' : '';
                return `${mainClass} ${directionClass} ${this.animationClass} ${withOutClose}`;
            }
        }
    },
    methods: {
        onClick() {
            this.hide();
            // 点击时触发
            this.triggerEvent(EVENT_CLICK);
        },
        onClose() {
            this.hide();
            // 点击关闭按钮触发
            this.triggerEvent(EVENT_CLOSE);
        },
        show() {
            if (__mpx_mode__ === 'ios' || __mpx_mode__ === 'android') {
                this.isVisible = true;
            }
            else {
                this.animationClass = `scale-${ANIMATION_ENTER}`;
                this.isVisible = true;
            }
        },
        hide() {
            if (__mpx_mode__ === 'ios' || __mpx_mode__ === 'android') {
                this.isVisible = false;
            }
            else {
                this.animationClass = `scale-${ANIMATION_LEAVE}`;
            }
        }
    }
});

import { createComponent } from '../../common/helper/create-component';
import { visibilityMixin } from '../../common/mixins';
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
    mixins: [visibilityMixin],
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
        }
    },
    data: {
        animationClass: ''
    },
    computed: {
        directionClass() {
            return `cube-tip-direction_${this.direction}`;
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
            this.animationClass = `scale-${ANIMATION_ENTER}`;
            this.isVisible = true;
        },
        hide() {
            this.animationClass = `scale-${ANIMATION_LEAVE}`;
        }
    }
});

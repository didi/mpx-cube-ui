import { createPopupComponent as createComponent } from '../../common/helper/create-component';
const EVENT_TIMEOUT = 'timeout';
createComponent({
    properties: {
        /**
         * @description 图标类型（自动添加`cubeic-`前缀）
         * @optional 图标 Icon，更多选择参见[内置 Icon](https://www.mpxjs.cn/mpx-cube-ui/demo-theme-default/index.html#/pages/icon/index)
         */
        icon: {
            type: String,
            value: ''
        },
        /**
         * @description 遮罩
         */
        mask: {
            type: Boolean,
            value: false
        },
        /**
         * @description 显示时间（设置为 0 时不会自动消失，需要手动隐藏）
         */
        time: {
            type: Number,
            value: 1500
        },
        /**
         * @description 样式 z-index 的值
         */
        zIndex: {
            type: Number,
            value: 900
        },
        /**
         * @description 提示信息文案（一行最多只能展示十二个文字最多展示两行）
         */
        txt: String
    },
    lifetimes: {
        ready() {
            // 组件 ready 生命周期事件
            this.triggerEvent('ready');
        }
    },
    data: {
        timer: null
    },
    computed: {
        tostTipClass() {
            // eslint-disable-next-line
            // @ts-ignore
            if (__mpx_mode__ === 'ios' || __mpx_mode__ === 'android' || __mpx_mode__ === 'harmony') {
                return {
                    'cube-toast-tip-icon': !!this.icon
                };
            }
            return '';
        }
    },
    methods: {
        onMaskClick() {
            this.maskClosable && this.hide();
        },
        show() {
            this.isVisible = true;
            this.clearTimer();
            if (this.time !== 0) {
                this.timer = setTimeout(() => {
                    this.hide();
                    // 达到超时时间后触发
                    this.triggerEvent(EVENT_TIMEOUT);
                }, this.time);
            }
        },
        hide() {
            this.isVisible = false;
            this.clearTimer();
        },
        clearTimer() {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }
});

import { getMixin } from '@mpxjs/core';
const EVENT_TOGGLE = 'toggle';
export default getMixin({
    properties: {
        /**
         * @description 遮盖层初始状态是否可见
         */
        visible: {
            type: Boolean,
            value: false
        }
    },
    data: {
        // If use the prop visible directly, the toggle will failed when user haven't set v-model as a reactive property.
        // So we use the data isVisible instead.
        isVisible: false
    },
    watch: {
        isVisible(newVal) {
            // 显示/隐藏时触发
            // @arg event.detail = { value }， 表当前状态是显示还是隐藏
            this.triggerEvent(EVENT_TOGGLE, {
                value: newVal
            });
        }
    },
    created() {
        this.$watch('visible', (newVal, oldVal) => {
            if (newVal) {
                this.show();
            }
            else if (oldVal) {
                this.hide();
            }
        }, {
            immediate: true
        });
    },
    methods: {
        // @vuese
        // 显示
        show() {
            this.isVisible = true;
        },
        // @vuese
        // 隐藏
        hide() {
            this.isVisible = false;
        }
    }
});

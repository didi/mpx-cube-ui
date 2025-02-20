import { getMixin } from '@mpxjs/core';
const EVENT_MASK_CLICK = 'maskClick';
export default getMixin({
    properties: {
        /**
         * @description 是否点击蒙层隐藏
         */
        maskClosable: {
            type: Boolean,
            value: false
        }
    },
    methods: {
        onMaskClick() {
            // 点击遮盖层触发事件
            this.triggerEvent(EVENT_MASK_CLICK);
            this.maskClosable && this.onClose();
        }
    }
});

import { getMixin } from '@mpxjs/core';
export default getMixin({
    properties: {
        /**
         * @description 弹出层 z-index
         */
        zIndex: {
            type: Number,
            value: 100
        },
        /**
         * @description 遮罩是否可点击
         */
        maskClosable: {
            type: Boolean,
            value: false
        },
        /**
         * @description 遮罩是否渐显
         */
        maskFadeTransition: {
            type: Boolean,
            value: false
        }
    }
});

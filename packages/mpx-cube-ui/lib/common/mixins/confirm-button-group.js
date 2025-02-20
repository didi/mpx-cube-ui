import { getMixin } from '@mpxjs/core';
import { defConfirmBtn, defCancelBtn } from '../helper/confirm-button-group';
export default getMixin({
    properties: {
        /**
         * @description 按钮类型
         * @optional optional/confirm
         */
        type: {
            type: String,
            value: 'optional'
        },
        /**
         * @description 按钮方向
         * @optional vertical/horizontal
         */
        direction: {
            type: String,
            value: 'vertical'
        },
        /**
         * @description 确定按钮
         * @optional vertical/horizontal
         */
        confirmBtn: {
            type: Object,
            optionalTypes: [String],
            value: {
                ...defConfirmBtn
            }
        },
        /**
         * @description 取消按钮
         */
        cancelBtn: {
            type: Object,
            optionalTypes: [String],
            value: {
                ...defCancelBtn
            }
        }
    }
});

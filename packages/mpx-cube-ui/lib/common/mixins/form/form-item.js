import { getMixin } from '@mpxjs/core';
export default getMixin({
    properties: {
        /**
         * @description 配置项
         * @optional Option
         * @ali true
         * @wx true
         * @web true
         * @tt true
         */
        option: {
            type: Object,
            value: {
                value: '',
                text: '',
                desc: '',
                disabled: false,
                position: 'left'
            }
        },
        /**
         * @description 双向绑定属性值
         * @optional String/Number
         * @ali true
         * @wx true
         * @web true
         * @tt true
         */
        value: {
            type: String,
            value: ''
        }
    }
});

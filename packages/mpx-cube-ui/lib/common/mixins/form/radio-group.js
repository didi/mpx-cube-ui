import { getMixin } from '@mpxjs/core';
export default getMixin({
    properties: {
        /**
         * @description 选项数据
         * @ali true
         * @wx true
         * @web true
         * @tt true
         */
        options: {
            type: Array,
            value: []
        },
        /**
         * @description 选中值
         * @ali true
         * @wx true
         * @web true
         * @tt true
         */
        value: {
            type: String,
            value: ''
        },
        /**
         * @description 是否行内展示
         * @ali true
         * @wx true
         * @web true
         * @tt true
         */
        inline: {
            type: Boolean,
            value: false
        },
        /**
         * @description 控制每行展示的个数
         * @ali true
         * @wx true
         * @web true
         * @tt true
         */
        colNum: {
            type: Number,
            value: 1
        }
    }
});

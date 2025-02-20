import { getMixin } from '@mpxjs/core';
export default getMixin({
    properties: {
        // 用于生成最外层类名
        // 如原类名为 cube-component，添加 themeType = demo 后，类名变为 cube-component cube-component-demo
        themeType: {
            type: String,
            value: ''
        }
    }
});

import { getMixin } from '@mpxjs/core';
const EVENT_PICK_START = 'pickstart';
const EVENT_PICK_END = 'pickend';
export default getMixin({
    properties: {
        // 设置选择器中间选中框的样式
        indicatorStyle: {
            type: String,
            value: ''
        },
        immediateChange: {
            type: Boolean,
            value: false
        }
    },
    methods: {
        // 不能通过 pickstart 及 pickend 来判断
        // web 单独点击时，不触发 pickstart 事件，只派发 change 和 pickend 事件
        // 小程序点击当前选中值时，派发 pickstart，但不派发 pickend 事件
        // 这令人头大的差异 ！！
        onPickstart(e) {
            // 当滚动选择开始时候触发事件
            this.triggerEvent(EVENT_PICK_START, e.detail);
        },
        onPickend(e) {
            // 当滚动选择结束时候触发事件
            this.triggerEvent(EVENT_PICK_END, e.detail);
        }
    }
});

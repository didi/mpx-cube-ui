import { getMixin } from '@mpxjs/core';
export default getMixin({
    properties: {
        /**
         * @description 标题
         */
        title: {
            type: String,
            value: ''
        },
        /**
         * @description 顶部取消按钮文案配置
         */
        cancelText: {
            type: String,
            value: ''
        },
        /**
         * @description 顶部取消按钮对齐方式
         * @optional left/right
         */
        cancelBtnAlign: {
            type: String,
            value: 'left'
        },
        /**
         * @description 是否展示关闭按钮X
         */
        showCloseIcon: {
            type: Boolean,
            value: false
        },
        // 触发 confirm 事件时是否需要主动关闭弹窗
        hideOnConfirm: {
            type: Boolean,
            value: true
        },
        // 触发 cancel 事件时是否需要主动关闭弹窗
        hideOnCancel: {
            type: Boolean,
            value: true
        },
        // 触发 close 事件时是否需要主动关闭弹窗
        hideOnClose: {
            type: Boolean,
            value: true
        }
    },
    lifetimes: {
        ready() {
            // 组件 ready 生命周期事件
            this.triggerEvent('ready');
        }
    }
});

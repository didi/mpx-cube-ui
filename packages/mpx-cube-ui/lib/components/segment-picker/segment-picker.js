import { createComponent } from '@mpxjs/core';
import { visibilityMixin, popupMixin, themePropsMixin } from '../../common/mixins/index';
// const COMPONENT_NAME = 'cube-segment-picker'
const EVENT_NEXT = 'next';
const EVENT_PREV = 'prev';
const EVENT_SELECT = 'select';
const EVENT_CANCEL = 'cancel';
const EVENT_CHANGE = 'change';
const EVENT_PICK_START = 'pickstart';
const EVENT_PICK_END = 'pickend';
createComponent({
    mixins: [visibilityMixin, popupMixin, themePropsMixin],
    properties: {
        // todo 类型
        /**
         * @description 定义各个选择器的组件名和属性
         */
        list: {
            type: Array,
            value: []
        },
        /**
         * @description 下一步按钮文案
         */
        nextTxt: {
            type: String,
            value: ''
        },
        confirmTxt: {
            type: String,
            value: '确认'
        },
        cancelTxt: {
            type: String,
            value: '取消'
        },
        /**
         * @description 上一步按钮文案
         */
        prevTxt: {
            type: String,
            value: ''
        },
        index: {
            type: Number,
            value: 0
        }
    },
    data: {
        current: 0,
        selectedVal: [],
        selectedIndex: [],
        selectedText: []
    },
    computed: {
        _list() {
            return this.list.map(item => {
                item.is = item.is || 'cube-picker-popup';
                return item;
            });
        },
        currentPicker() {
            const pickers = this.$refs.pickers;
            for (let i = 0; i < this.list.length; i++) {
                const item = pickers[i];
                const attrs = item.dataset || item.$attrs;
                if (attrs.index === this.current) {
                    return item;
                }
            }
            return undefined;
        },
        _nextTxt() {
            return this.nextTxt || '下一步';
        },
        _prevTxt() {
            return this.prevTxt || '上一步';
        }
    },
    watch: {
        list() {
            this.current = 0;
            this.selectedVal = [];
            this.selectedIndex = [];
            this.selectedText = [];
        }
    },
    methods: {
        show() {
            if (this.isVisible || !this.list.length) {
                return;
            }
            this.isVisible = true;
            this.currentPicker.show();
        },
        hide() {
            if (!this.isVisible || !this.list.length) {
                return;
            }
            this.isVisible = false;
            this.currentPicker.hide();
        },
        onSelect(e) {
            const args = Object.keys(e.detail).map(item => e.detail[item]);
            this.selectedVal[this.current] = args[0];
            this.selectedIndex[this.current] = args[1];
            this.selectedText[this.current] = args[2];
            if (this.current < this.list.length - 1) {
                this.triggerEvent(EVENT_NEXT, Object.assign({
                    current: this.current
                }, e.detail));
                this.current++;
                this.currentPicker.show();
            }
            else {
                this.isVisible = false;
                this.triggerEvent(EVENT_SELECT, {
                    selectedVal: this.selectedVal,
                    selectedIndex: this.selectedIndex,
                    selectedText: this.selectedText
                });
                this.current = 0;
            }
        },
        onCancel() {
            if (this.current > 0) {
                this.triggerEvent(EVENT_PREV);
                this.current--;
                this.currentPicker.show();
            }
            else {
                this.isVisible = false;
                this.triggerEvent(EVENT_CANCEL);
            }
        },
        onColumnChange(e) {
            this.triggerEvent(EVENT_CHANGE, Object.assign({
                current: this.current
            }, e.detail));
        },
        onPickstart(e) {
            // 不能通过 pickstart 及 pickend 来判断
            // web 单独点击时，不触发 pickstart 事件，只派发 change 和 pickend 事件
            // 小程序点击当前选中值时，派发 pickstart，但不派发 pickend 事件
            // 这令人头大的差异 ！！
            this.triggerEvent(EVENT_PICK_START, e.detail);
        },
        onPickend(e) {
            this.triggerEvent(EVENT_PICK_END, e.detail);
        }
    }
});

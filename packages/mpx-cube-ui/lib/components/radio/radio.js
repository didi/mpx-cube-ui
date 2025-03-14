import { createSelectComponent as createComponent } from '../../common/helper/create-component';
const EVENT_INPUT = 'input';
// const EVENT_FOCUS = 'focus'
// const EVENT_BLUR = 'blur'
createComponent({
    computed: {
        radioLabelClass() {
            return {
                'cube-radio-label_checked': this.option.value === this.value,
                'cube-radio-label-right': this.option.position === 'right',
                'cube-radio-label_disabled': this.option.disabled
            };
        },
        showText() {
            return this.option.text || this.option.desc;
        }
    },
    methods: {
        onTap() {
            if (this.option.disabled)
                return;
            const data = {
                value: this.option.value
            };
            // 绑定值变化时触发
            // @arg 事件对象 e，包含选中的单选框 value 值
            this.triggerEvent(EVENT_INPUT, data);
        }
    }
});

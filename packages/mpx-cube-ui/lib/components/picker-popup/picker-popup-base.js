import { createPickerPopupBaseComponent as createComponent } from '../../common/helper/create-component';
const EVENT_CONFIRM = 'confirm';
const EVENT_CANCEL = 'cancel';
createComponent({
    options: {
        multipleSlots: true
    },
    properties: {
        pending: {
            type: Boolean,
            value: false
        }
    },
    methods: {
        onConfirm() {
            if (this.pending)
                return;
            this.hide();
            this.triggerEvent(EVENT_CONFIRM);
        },
        onMaskClick() {
            this.maskClosable && this.onCancel();
        },
        onCancel() {
            this.triggerEvent(EVENT_CANCEL);
            this.hide();
        }
    }
});

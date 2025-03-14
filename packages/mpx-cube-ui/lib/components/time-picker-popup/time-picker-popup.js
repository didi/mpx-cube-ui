import { createTimePickerPopupComponent as createComponent } from '../../common/helper/create-component';
import { timePickerMixin } from '../../common/mixins';
createComponent({
    options: {
        multipleSlots: true
    },
    mixins: [timePickerMixin],
    data: {
        setIndex: [0, 0, 0] // picker 每次打开时，根据该字段选择值。点击确定按钮后，setIndex 更新
    },
    lifetimes: {
        ready() {
            const { selectedIndex } = this.$refs.picker.getSelectedInfo();
            this.setIndex = selectedIndex;
        }
    },
    methods: {
        setTime(value) {
            this.$refs.picker.setTime(value);
        },
        show() {
            if (this.isVisible)
                return;
            this.isVisible = true;
            this.$refs.picker._updateNow();
            this.$refs.picker._updateSelectedIndex();
        }
    }
});

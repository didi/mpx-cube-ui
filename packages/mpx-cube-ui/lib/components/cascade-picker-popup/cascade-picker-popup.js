import { createPickerPopupComponent as createComponent } from '../../common/helper/create-component';
createComponent({
    options: {
        multipleSlots: true
    },
    properties: {
        /**
         * @description 是否异步加载数据
         * @wx true
         * @ali true
         * @web true
         */
        async: {
            type: Boolean,
            value: false
        },
        list: {
            type: Array,
            value: []
        }
    },
    data: {
        pending: false,
        setIndex: [] // picker 每次打开时，根据该字段选择值。点击确定按钮后，setIndex 更新
    },
    watch: {
        selectedIndex: {
            handler(newV) {
                this.setIndex = newV.slice();
            },
            immediate: true
        }
    },
    methods: {
        onPendingChange(e) {
            this.pending = e.detail.pending;
        },
        updateData(list, index) {
            if (!index || !index.length)
                index = this.setIndex;
            this.setIndex = index;
            this.$refs.picker.updateData(list, index);
        },
        updateList(list) {
            this.$refs.picker.updateList(list);
        },
        updateIndex(index) {
            this.$refs.picker.updateIndex(index);
        }
    }
});

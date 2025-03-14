import { createPickerModalComponent as createComponent } from '../../common/helper/create-component';
createComponent({
    options: {
        multipleSlots: true
    },
    data: {
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
        show() {
            if (this.isVisible)
                return;
            this.updateIndex(this.setIndex);
            this.$nextTick(() => {
                this.isVisible = true;
            });
        },
        // @vuese
        // 更新 picker 的数据及选中值
        // @arg list 为每一列的数据
        // @arg index 为每一列的数据选中的索引
        updateData(list, index) {
            if (!index || !index.length)
                index = this.setIndex;
            this.setIndex = index;
            this.$refs.picker.updateData(list, index);
        },
        // @vuese
        // 更新 picker 的数据
        // @arg list 为每一列的数据
        updateList(list) {
            this.$refs.picker.updateList(list);
        },
        // @vuese
        // 更新 picker 的选中值
        // @arg index 为每一列的数据选中的索引
        updateIndex(index) {
            this.setIndex = index;
            this.$refs.picker.updateIndex(index);
        }
    }
});

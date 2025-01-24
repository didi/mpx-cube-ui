
import { CascadePickerSubTree } from '../../components/cascade-picker/cascade-picker'

import { createPickerPopupComponent } from '../../common/helper/create-component'

createPickerPopupComponent({
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
      value: [] as CascadePickerSubTree[]
    }
  },
  data: {
    pending: false,
    setIndex: [] as number[] // picker 每次打开时，根据该字段选择值。点击确定按钮后，setIndex 更新
  },
  watch: {
    selectedIndex: {
      handler(newV) {
        this.setIndex = newV.slice()
      },
      immediate: true
    }
  },
  methods: {
    onPendingChange(e) {
      this.pending = e.detail.pending
    },
    updateData(
      list?: CascadePickerSubTree[],
      index?: number[]
    ) {
      if (!index || !index.length) index = this.setIndex
      this.setIndex = index
      this.$refs.picker.updateData(list, index)
    },
    updateList(list: CascadePickerSubTree[]) {
      this.$refs.picker.updateList(list)
    },
    updateIndex(index: number[]) {
      this.$refs.picker.updateIndex(index)
    }
  }
})

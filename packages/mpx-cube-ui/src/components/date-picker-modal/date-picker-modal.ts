import { createTimePickerModalComponent as createComponent } from '../../common/helper/create-component'
import { datePickerMixin } from '../../common/mixins'
createComponent({
  options: {
    multipleSlots: true
  },
  mixins: [datePickerMixin],
  data: {
    setIndex: [] as number[] // picker 每次打开时，根据该字段选择值。点击确定按钮后，setIndex 更新
  },
  lifetimes: {
    ready() {
      const { selectedIndex } = this.$refs.picker.getSelectedInfo()
      this.setIndex = selectedIndex
    }
  }
})

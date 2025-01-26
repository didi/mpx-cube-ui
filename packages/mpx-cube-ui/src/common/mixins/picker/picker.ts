import { getMixin } from '@mpxjs/core'

import { PickerColumn } from '../../../components/picker/picker'

export default getMixin({
  properties: {
    // @description 传入 picker 数据，数组的长度决定了 picker 的列数
    list: {
      type: Array,
      value: [] as PickerColumn[]
    },
    // @description 被选中的索引值，拉起 picker 后显示这个索引值对应的内容
    selectedIndex: {
      type: Array,
      value: [] as number[]
    }
  },
  computed: {
    merge() {
      return [this.list, this.selectedIndex]
    }
  },
  watch: {
    merge(newVal) {
      this.updateData(newVal[0], newVal[1])
    }
  }
})

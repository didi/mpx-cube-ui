import { getMixin } from '@mpxjs/core'

import { PickerColumn } from '../../../components/picker/index'

const EVENT_PICK_START = 'pickstart'
const EVENT_PICK_END = 'pickend'

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
    },
    // 是否在手指松开时立即触发 change 事件。若不开启则会在滚动动画结束后触发 change 事件。
    // 微信 webview 特有属性，基础库 2.21.1 及以上； 支付宝需基础库 2.8.7 及以上
    immediateChange: {
      type: Boolean,
      value: false
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
  },
  methods: {
    // 不能通过 pickstart 及 pickend 来判断
    // web 单独点击时，不触发 pickstart 事件，只派发 change 和 pickend 事件
    // 小程序点击当前选中值时，派发 pickstart，但不派发 pickend 事件
    // 这令人头大的差异 ！！
    onPickstart(e) {
      // 当滚动选择开始时候触发事件
      this.triggerEvent(EVENT_PICK_START, e.detail)
    },
    onPickend(e) {
      // 当滚动选择结束时候触发事件
      this.triggerEvent(EVENT_PICK_END, e.detail)
    }
  }
})

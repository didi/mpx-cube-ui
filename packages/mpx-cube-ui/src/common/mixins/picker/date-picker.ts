import { getMixin } from '@mpxjs/core'

const EVENT_PICK_START = 'pickstart'
const EVENT_PICK_END = 'pickend'

export default getMixin({
  properties: {
    // 可选范围的最小值
    min: {
      // Array, Number（时间戳，毫秒单位）
      type: null,
      value: [2010, 0, 1]
    },
    // 可选范围的最大值
    max: {
      // Array, Number（时间戳，毫秒单位）
      type: null,
      // [new Date().getFullYear() + 1, 12, 31, 23, 59, 59]，表示为当前时间未来一年的12月31日
      value: [new Date().getFullYear() + 1, 12, 31, 23, 59, 59]
    },
    // @description 起始列
    // @optional year/month/date/hour/minute/second
    startColumn: {
      type: String,
      value: 'year'
    },
    // 列数
    columnCount: {
      type: Number,
      value: 3
    },
    // 日期格式配置
    format: {
      type: Object,
      // { year: 'YYYY', month: 'M', date: 'D', hour: 'hh', minute: 'mm', second: 'ss' }
      value: {}
    },
    // 当前选择的日期
    value: {
      // Array, Number（时间戳，毫秒单位）
      type: null,
      value: +new Date()
    },
    // 列的展示顺序
    columnOrder: {
      type: Array,
      value: ['year', 'month', 'date', 'hour', 'minute', 'second']
    },
    immediateChange: {
      type: Boolean,
      value: false
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

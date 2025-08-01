import { createComponent } from '@mpxjs/core'
import { visibilityMixin } from '../../common/mixins'

const EVENT_MASK_CLOSE = 'maskClose'
createComponent({
  mixins: [visibilityMixin],
  options: {
    multipleSlots: true,
    styleIsolation: 'shared'
  },
  properties: {
    min: {
      type: Number,
      value: +new Date(2016, 2, 12)
    },
    // 可选日期的最大时间
    max: {
      type: Number,
      value: +new Date(2016, 4, 14)
    },
    // 可选的最大范围，0 为不限制
    maxRange: {
      type: Number,
      value: 30
    },
    // 是否滚动到底部
    scrollToEnd: {
      type: Boolean,
      value: true
    },
    // 日期默认值，区间选择Array格式
    defaultDate: {
      type: Array,
      value: []
    },
    height: {
      type: String,
      value: '300px'
    },
    maskClosable: {
      type: Boolean,
      value: true
    },
    isCustomizeShow: {
      type: Boolean,
      value: false
    },
    customizeShowFunction: {
      type: Object,
      value: function (day, disable) {
        return `<div>${day}</div>`
      }
    },
    title: {
      type: String,
      value: '选择日期'
    },
    buttonText: {
      type: String,
      value: '完成'
    }
  },
  data: {
    isVisible: false,
    lastValue: [] as any[]
  },
  methods: {
    maskClick() {
      this.triggerEvent(EVENT_MASK_CLOSE)
      this.hide()
    },
    cancel() {
      if (!this.lastValue.length) {
        this.lastValue = this.defaultDate
      }
      this.hide()
    },
    confirm() {
      const dateRange = this.$refs.calendar.getSelectDate()
      this.lastValue = [dateRange[0].date, dateRange[1].date]
      this.$emit('confirm', dateRange)
      this.hide()
    }
  }
})

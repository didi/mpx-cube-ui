import { createComponent } from '@mpxjs/core'
import { visibilityMixin } from '../../common/mixins'

const EVENT_MASK_CLOSE = 'maskClose'
const EVENT_CONFIRM = 'confirm'
const EVENT_CANCEL = 'cancel'

createComponent({
  mixins: [visibilityMixin],
  options: {
    multipleSlots: true,
    styleIsolation: 'shared'
  },
  properties: {
    // 可选择的最小日期
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
    // 日期默认值，区间选择Array格式
    defaultDate: {
      type: Array,
      value: []
    },
    // 容器高度
    height: {
      type: String,
      value: '300px'
    },
    // 点击遮罩层是非关闭弹框
    maskClosable: {
      type: Boolean,
      value: true
    },
    // 标题
    title: {
      type: String,
      value: '选择日期'
    },
    // 按钮文案
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
      // 点击遮盖层
      this.triggerEvent(EVENT_MASK_CLOSE)
      this.hide()
    },
    cancel() {
      if (!this.lastValue.length) {
        this.lastValue = this.defaultDate
      }
      console.log('this.lastValue', this.lastValue)
      const dateRange = this.$refs.calendar.getSelectDate()
      // 点击叉号
      // @arg event.detail = { value }， 表当前选中的时间范围
      this.triggerEvent(EVENT_CANCEL, { value: dateRange })
      this.hide()
    },
    confirm() {
      const dateRange = this.$refs.calendar.getSelectDate()
      this.lastValue = [dateRange[0].date, dateRange[1].date]
      // 点击确认
      // @arg event.detail = { value }， 表当前选中的时间范围
      this.triggerEvent(EVENT_CONFIRM, { value: dateRange })
      this.hide()
    },
    // @vuese
    // 显示
    showCalendar() {
      this.$refs.calendar.reset(this.lastValue)
      this.show()
    }
  }
})

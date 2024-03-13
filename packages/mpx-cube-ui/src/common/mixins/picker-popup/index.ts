import { getMixin } from '@mpxjs/core'

const EVENT_CONFIRM = 'confirm'
const EVENT_VALUE_CHANGE = 'valueChange'
const EVENT_CANCEL = 'cancel'
const EVENT_CHANGE = 'change'
const EVENT_COLUMN_CHANGE = 'columnChange'

export default getMixin({
  methods: {
    onColumnChange(e) {
      // 列变化事件，某列选中的 value 及 index 任意一个变化后触发事件
      // @arg event.detail = { column, index, text, value }
      // @arg column 是发生变化的列；index, text, value 分别是变化后的索引、文案、值
      this.triggerEvent(EVENT_COLUMN_CHANGE, e.detail)
    },
    onChange(e) {
      // 滚动后触发
      // @arg @fileOnly(picker-popup,picker-modal,cascade-picker-popup,cascade-picker-modal) event.detail = { selectedIndex, selectedText, selectedVal }
      // @arg @fileOnly(picker-popup,picker-modal,cascade-picker-popup,cascade-picker-modal) 每个属性都是数组，是当前所有列的选中信息；
      // @arg @fileOnly(picker-popup,picker-modal,cascade-picker-popup,cascade-picker-modal) 分别表示被选中的索引、文案、值

      // @arg @fileOnly(date-picker-popup,date-picker-modal) event.detail = { date, selectedIndex, selectedText, selectedVal }
      // @arg @fileOnly(date-picker-popup,date-picker-modal) date 表当前选中日期，Date 类型；其他每个属性都是数组，是当前所有列的选中信息； 分别表示被选中的索引、文案、值

      // @arg @fileOnly(time-picker-popup,time-picker-modal) event.detail = { selectedTime, selectedText, formatedTime, selectedIndex }。
      // @arg @fileOnly(time-picker-popup,time-picker-modal) selectedTime: 当前选中的timestamp；selectedText: 当前选中的时间文案；
      // @arg @fileOnly(time-picker-popup,time-picker-modal) formatedTime: 格式化日期；selectedIndex: 当前选中的索引。
      this.triggerEvent(EVENT_CHANGE, e.detail)
    },
    onConfirm() {
      const {
        selectedIndex,
        selectedVal,
        selectedText,
        date,
        selectedTime,
        formatedTime
      } = this.$refs.picker.getSelectedInfo()

      const oldSetIndex = this.setIndex
      this.setIndex = selectedIndex
      const changed = oldSetIndex.some((item, index) => {
        return item !== selectedIndex[index]
      })
      const result: Record<string, any> = {
        selectedText
      }
      if (date) {
        result.date = date
        result.selectedVal = selectedVal
      } else if (formatedTime) {
        result.selectedTime = selectedTime
        result.formatedTime = formatedTime
      } else {
        result.selectedIndex = selectedIndex
        result.selectedVal = selectedVal
      }
      if (changed) {
        // 所确认的值变化时触发此事件
        // @arg 同上
        this.triggerEvent(EVENT_VALUE_CHANGE, Object.assign({}, result))
      }
      // 点击确认按钮触发此事件
      // @arg 同上
      this.triggerEvent(EVENT_CONFIRM, result)
    },
    onCancel(e) {
      // 点击取消按钮时触发
      this.triggerEvent(EVENT_CANCEL, e.detail)
    }
  }
})

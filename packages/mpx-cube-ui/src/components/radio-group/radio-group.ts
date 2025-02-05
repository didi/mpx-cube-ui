import { createSelectComponent } from '../../common/helper/create-component'
import { radioGroupMixin } from '../../common/mixins'

const EVENT_INPUT = 'input'

const groupClsPrefix = 'radio-group'

createSelectComponent({
  mixins: [radioGroupMixin],
  data () {
    return {
      radioValue: this.value
    }
  },
  computed: {
    radioGroupClass () {
      return {
        'cube-radio-group': true,
        [`cube-radio-group-${this.themeType}`]: this.themeType,
        [`${groupClsPrefix}-inline-block`]: this.inline,
        [`${groupClsPrefix}-multiple-columns`]: this.colNum > 1
      }
    },
    inlineColumnStyle () {
      if (this.colNum > 1) return `flex: 0 0 ${this.colWidth}`
    },
    colWidth () {
      return this.colNum <= 1 ? '100%' : `${100 / this.colNum}%`
    },
    showSlot () {
      return this.options.length === 0
    }
  },
  watch: {
    radioValue (newV) {
      const data = {
        value: newV
      }
      if (newV === this.value) return
      // 绑定值变化时触发
      // @arg 事件对象 e，包含选中的单选框 value 值
      this.triggerEvent(EVENT_INPUT, data)
    },
    value(newV) {
      if (newV === this.radioValue) return
      this.radioValue = newV
    }
  }
})

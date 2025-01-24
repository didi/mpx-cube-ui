import { createSelectComponent } from '../../common/helper/create-component'
import { checkboxGroupMixin } from '../../common/mixins'
import Checkbox from '../checkbox/index.mpx?resolve'
import { isWeb } from '../../common/helper/utils'

const EVENT_INPUT = 'input'
const EVENT_CHECKED = 'checked'
const EVENT_CANCEL_CHECKED = 'cancelChecked'

const groupClsPrefix = 'checkbox-group'

createSelectComponent({
  mixins: [checkboxGroupMixin],
  relations: {
    [Checkbox]: {
      type: 'child',
      linked () {
        if (isWeb) return
        const checkboxs = this.getRelationNodes(Checkbox)
        this.usingMpSlot = checkboxs && checkboxs.length // 使用 slot 时只能通过组件关联获取子组件实例
        this.usingMpSlot && this.setCheckboxValue()
      }
    }
  },
  data: {
    checkedValues: [],
    cubeCheckboxGroup: true, // 提供 web 侧查找父组件标识
    usingMpSlot: false
  },
  computed: {
    checkboxGroupClass () {
      return {
        [`${groupClsPrefix}-inline-block`]: this.inline,
        [`${groupClsPrefix}-multiple-columns`]: this.colNum > 1
      }
    },
    checkboxStyle () {
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
    values: {
      immediate: true,
      handler (newV) {
        this.checkedValues = newV
        this.$nextTick(() => {
          !this.usingMpSlot && this.setCheckboxValue()
        })
      }
    }
  },
  methods: {
    inputChange (e) {
      const { value: checked, optionValue } = e.detail
      const index = this.values.indexOf(optionValue)

      if (checked) {
        if (index !== -1) return
        index === -1 && this.checkedValues.push(optionValue)
      } else {
        if (index === -1) return
        index !== -1 && this.checkedValues.splice(index, 1)
      }

      if (checked) {
        // 勾选复选框组中的某一项时触发
        // @arg 事件对象 e，包含当前勾选的复选框值
        this.triggerEvent(EVENT_CHECKED, { value: optionValue })
      } else {
        // 取消勾选复选框组中的某一项时触发
        // @arg 事件对象 e，包含当前取消勾选的复选框值
        this.triggerEvent(EVENT_CANCEL_CHECKED, { value: optionValue })
      }

      const data = {
        value: this.checkedValues
      }
      // 当绑定值变化时触发
      // @arg 事件对象 e，包含当前选中的复选框值的集合
      this.triggerEvent(EVENT_INPUT, data)
    },
    setCheckboxValue () {
      let checkboxs
      if (isWeb) {
        checkboxs = this.$children
      } else {
        checkboxs = this.usingMpSlot ? this.getRelationNodes(Checkbox) : this.$refs.checkboxRef
      }
      checkboxs && checkboxs.length && checkboxs.forEach(checkbox => {
        checkbox.isChecked = this.checkedValues.includes(checkbox.option.value)
      })
    }
  }
})

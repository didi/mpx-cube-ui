import { createSelectComponent as createComponent } from '../../common/helper/create-component'
import CheckboxGroup from '../checkbox-group/index.mpx?resolve'

const EVENT_INPUT = 'input'

createComponent({
  relations: {
    [CheckboxGroup]: {
      type: 'parent'
    }
  },
  properties: {
    /**
     * @description 双向绑定是否选中
     * @optional true/false
     * @ali true
     * @wx true
     * @web true
     */
    value: {
      type: Boolean,
      value: false
    },
    /**
     * @description 复选框形状
     * @optional round/square
     * @ali true
     * @wx true
     * @web true
     */
    shape: {
      type: String,
      value: 'round'
    }
  },
  data: {
    isChecked: false
  },
  computed: {
    checkboxLabelClass () {
      return {
        'cube-checkbox-label-position': this.option.position === 'right'
      }
    },
    checkboxUiClass () {
      return {
        'cube-checkbox-ui-square': this.isSquare,
        'cube-checkbox-ui-round': this.isRound,
        'cube-checkbox-ui_disabled': this.option.disabled,
        'cube-checkbox-ui_checked': this.isChecked
      }
    },
    checkboxInnerUiClass () {
      return {
        'cube-checkbox-inner-ui-square': this.isSquare,
        'cube-checkbox-inner-ui-round': this.isRound
      }
    },
    checkboxTextWrapClass () {
      return {
        'cube-checkbox-text-wrap_disabled': this.option.disabled
      }
    },
    isSquare () {
      return this.shape === 'square'
    },
    isRound () {
      return this.shape === 'round'
    },
    showText () {
      return this.option.text || this.option.desc
    }
  },
  watch: {
    value: {
      immediate: true,
      handler (newV) {
        this.isChecked = newV
      }
    }
  },
  methods: {
    onTap () {
      if (this.option.disabled) return

      this.isChecked = !this.isChecked // TODO: 参考cube-ui checker/checkbox
      this.sendData()
    },
    findGroupUpward () {
      if (__mpx_mode__ === 'web') {
        const parent = this.$parent
        if (parent.$data.cubeCheckboxGroup) {
          return parent
        }
        return null
      } else {
        const nodes = this.getRelationNodes(CheckboxGroup)
        if (Array.isArray(nodes)) {
          return nodes[0]
        } else {
          return nodes
        }
      }
    },
    sendData () {
      const parent = this.findGroupUpward()
      const data = {
        value: this.isChecked,
        optionValue: this.option.value
      }
      parent && parent.inputChange({ detail: data })
      // 当绑定值变化时触发
      // @arg 事件对象 e，包含选中态 value，以及 option 里定义的 value
      this.triggerEvent(EVENT_INPUT, data)
    }
  }
})

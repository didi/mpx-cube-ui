import { createComponent } from '../../common/helper/create-component'

createComponent({
  properties: {
    /**
     * @description 开关状态，可直接赋值
     * @optional true/false
     */
    value: {
      type: Boolean,
      value: false
    },
    /**
     * @description 是否禁用
     * @optional true/false
     */
    disabled: {
      type: Boolean,
      value: false
    }
  },
  data: {
    isOn: false
  },
  computed: {
    switchClass() {
      return {
        'cube-switch': true,
        'cube-switch-on': this.isOn,
        [`cube-switch-${this.themeType}`]: this.themeType
      }
    }
  },
  watch: {
    value: {
      handler(newVal) {
        this.isOn = newVal
      },
      immediate: true
    }
  },
  methods: {
    toggleSwitch() {
      if (this.disabled) return
      const newValue = !this.isOn
      this.isOn = newValue
      // 当开关状态变化时触发
      this.triggerEvent('change', { value: newValue })
      // 当开关状态变化时触发
      this.triggerEvent('input', { value: newValue })
    }
  }
})

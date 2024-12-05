import { createComponent } from '../../common/helper/create-component'

createComponent({
  properties: {
    value: {
      type: Boolean,
      value: false
    },
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
      this.triggerEvent('change', { value: newValue })
      this.triggerEvent('input', { value: newValue })
    }
  }
})

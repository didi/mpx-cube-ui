import { createComponent } from '../../common/helper/create-component'
import rnMixin from './rn-mixin'

createComponent({
  mixins: [rnMixin],
  properties: {
    /**
     * @description 开关状态，可直接赋值
     * @optional true/false
     */
    value: {
      type: Boolean,
      value: false
    },
    switchDefaultGBC: {
      type: String,
      value: ''
    },
    switchOnGBC: {
      type: String,
      value: ''
    },
    /**
     * @description 是否禁用
     * @optional true/false
     */
    disabled: {
      type: Boolean,
      value: false
    },
    /**
     * @description 点击后是否需要更改 value
     * @optional true/false
     */
    changeOnClick: {
      type: Boolean,
      value: true
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
    },
    swithBGClass() {
      if (__mpx_mode__ === 'ios' || __mpx_mode__ === 'android' || __mpx_mode__ === 'harmony') {
        return {}
      }
      if (this.isOn && this.switchOnGBC) {
        return {
          backgroundColor: this.switchOnGBC
        }
      } else if (!this.isOn && this.switchDefaultGBC) {
        return {
          backgroundColor: this.switchDefaultGBC
        }
      } else {
        return {}
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
      if (this.disabled) {
        this.triggerEvent('click', { value: this.isOn })
        return
      }

      if (!this.changeOnClick) {
        this.triggerEvent('click', { value: this.isOn })
        return
      }

      const newValue = !this.isOn
      this.isOn = newValue
      // 当开关有点击时触发
      this.triggerEvent('click', { value: newValue })
      // 当开关状态变化时触发
      this.triggerEvent('change', { value: newValue })
      // 当开关状态变化时触发
      this.triggerEvent('input', { value: newValue })
    }
  }
})

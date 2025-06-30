import { createComponent } from '../../common/helper/create-component'

const EVENT_FOCUS = 'focus'
const EVENT_BLUR = 'blur'
const EVENT_INPUT = 'input'

createComponent({
  // 补充密码展示
  properties: {
    // 输入框的内容
    value: {
      type: String,
      optionalTypes: [Number],
      value: ''
    },
    // 输入框的类型
    type: {
      type: String,
      value: 'text'
    },
    // 占位文本
    placeholder: {
      type: String,
      value: '请输入...'
    },
    // 指定 placeholder 的样式
    placeholderStyle: {
      type: String,
      value: 'color: #969699'
    },
    // 指定 placeholder 的样式类
    placeholderClass: {
      type: String,
      value: 'input-placeholder'
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      value: false
    },
    // 是否只读
    readonly: {
      type: Boolean,
      value: false
    },
    // 获取焦点
    focus: {
      type: Boolean,
      value: false
    },
    // 自动聚焦
    autoFocus: {
      type: Boolean,
      value: false
    },
    // 是否自动填充
    autocomplete: {
      type: Boolean,
      optionalTypes: [String],
      value: false
    },
    // 最大输入长度
    maxlength: {
      type: Number
    },
    // 最小输入长度
    minlength: {
      type: Number
    },
    clearable: {
      type: Boolean,
      optionalTypes: [Object],
      value: false
    },
    eye: {
      type: Boolean,
      optionalTypes: [Object],
      value: false
    }
  },
  data: {
    inputValue: '',
    isFocus: false,
    formatedClearable: {
      visible: false,
      blurHidden: true
    },
    formatedEye: {
      open: false,
      reverse: false
    },
    autoFoucs: false
  },
  computed: {
    _type() {
      const type = this.type
      if (type === 'password' && this.eye && this.pwdVisible) {
        return 'text'
      }
      return type
    },
    _showClear() {
      let visible = this.formatedClearable?.visible && this.inputValue && !this.readonly && !this.disabled
      if (this.formatedClearable?.blurHidden && !this.isFocus) {
        visible = false
      }
      return visible
    },
    _showPwdEye() {
      return this.type === 'password' && this.eye && !this.disabled
    },
    pwdVisible() {
      const eye = this.formatedEye
      return eye.reverse ? !eye.open : eye.open
    },
    _maxlength () {
      if (!this.maxlength) {
        return -1
      }
      console.log(parseInt(`${this.maxlength}`))
      // return parseInt(`${this.maxlength}`)
      return parseInt(`${this.maxlength}`)
    },
    _inputWrapperClass() {
      let ret = ''
      if (this.isFocus) {
        ret += ' cube-input_focused'
      }
      if (this.disabled) {
        ret += ' cube-input_disabled'
      }
      return ret
    },
    eyeType() {
      return this.formatedEye.open ? 'visible' : 'invisible'
    }
  },
  watch: {
    inputValue: {
      handler (value) {
        if ((this._maxlength < value.length) && (this._maxlength >= 0)) {
          this.inputValue = value.slice(0, this._maxlength)
        }
      },
      immediate: true
    },
    value: {
      handler (value) {
        this.inputValue = value
      },
      immediate: true
    },
    clearable: {
      handler() {
        this.formatClearable()
      },
      deep: true,
      immediate: true
    },
    eye: {
      handler() {
        this.formateEye()
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    formatClearable() {
      if (typeof this.clearable === 'boolean') {
        this.formatedClearable.visible = this.clearable
      } else {
        Object.assign(this.formatedClearable, this.clearable)
      }
    },
    formateEye() {
      if (typeof this.eye === 'boolean') {
        this.formatedEye.open = this.eye
      } else {
        Object.assign(this.formatedEye, this.eye)
      }
    },
    handleFocus(e) {
      // 输入框聚焦时触发
      // @arg 事件对象
      this.triggerEvent(EVENT_FOCUS, e.detail)
      this.isFocus = true
    },
    handleBlur(e) {
      // 输入框失去焦点时触发
      // @arg 事件对象
      this.triggerEvent(EVENT_BLUR, e.detail)
      this.isFocus = false
    },
    handleInput (e) {
      const { value } = e.detail
      if ((this._maxlength < value.length) && (this._maxlength >= 0)) return
      this.inputValue = value
      // 当键盘输入时，触发 input 事件
      // @arg 事件对象 e = event.detail = {value, cursor}
      this.triggerEvent(EVENT_INPUT, e.detail)
    },
    handleClear () {
      // 点击清除按键时触发
      this.inputValue = ''
      this.triggerEvent(EVENT_INPUT, { value: '' })
    },
    handlePwdEye() {
      // 点击密码可视化的时候触发
      this.formatedEye.open = !this.formatedEye.open
    }
  }
})

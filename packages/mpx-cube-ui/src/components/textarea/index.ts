import { createComponent } from '../../common/helper/create-component'

const DEFAULT_INDICATOR = {
  negative: true,
  remain: true
}

const EVENT_FOCUS = 'focus'
const EVENT_BLUR = 'blur'
const EVENT_INPUT = 'input'
const EVENT_CONFIRM = 'confirm'
const EVENT_LINE_CHANGE = 'linechange'
const EVENT_KEYBOARD_HEIGHT_CHANGE = 'keyboardheightchange'

createComponent({
  properties: {
    // 输入框的内容
    value: {
      type: String,
      value: ''
    },
    // 占位文本
    placeholder: {
      type: String,
      value: ''
    },
    // 指定 placeholder 的样式
    placeholderStyle: {
      type: String,
      value: 'color: #969699'
    },
    // 指定 placeholder 的样式类
    placeholderClass: {
      type: String,
      value: 'textarea-placeholder'
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      value: false
    },
    // 最大输入长度
    maxlength: {
      type: Number,
      value: 60
    },
    // 自动聚焦
    autoFocus: {
      type: Boolean,
      value: false
    },
    // 获取焦点
    focus: {
      type: Boolean,
      value: false
    },
    // 计数标示
    indicator: {
      type: Object,
      optionalTypes: [Boolean],
      value: {}
    },
    // 文本框宽度
    width: {
      type: String,
      value: '100%'
    },
    // 文本框高度
    height: {
      type: Number,
      value: 130
    },
    // 文本框背景色
    backgroundColor: {
      type: String,
      value: '#F8F8F8'
    },
    // textarea 是在一个 position:fixed，需设置为true
    fixed: {
      type: Boolean,
      value: false
    },
    // 是否自动增高（web暂不支持）
    autoHeight: {
      type: Boolean,
      value: false
    },
    // 指定focus时的光标位置（web暂不支持）
    cursor: {
      type: Number,
      value: -1
    },
    // 指定光标与键盘的距离（web暂不支持）
    cursorSpacing: {
      type: Number,
      value: 0
    },
    // 是否显示键盘上方带有”完成“按钮那一栏（web暂不支持）
    showConfirmBar: {
      type: Boolean,
      value: true
    },
    // 光标起始位置（web暂不支持）
    selectionStart: {
      type: Number,
      value: -1
    },
    // 光标结束位置（web暂不支持）
    selectionEnd: {
      type: Number,
      value: -1
    },
    // 键盘弹起时，是否自动上推页面（web暂不支持）
    adjustPosition: {
      type: Boolean,
      value: true
    },
    // focus时，点击页面的时候不收起键盘（web暂不支持）
    holdKeyboard: {
      type: Boolean,
      value: false
    },
    // 是否去掉 iOS 下的默认内边距（web暂不支持）
    disableDefaultPadding: {
      type: Boolean,
      value: false
    }
  },
  data: {
    textareaValue: '',
    isFocus: false
  },
  computed: {
    indicatorConf() {
      let indicator = this.indicator
      if (typeof indicator === 'boolean') {
        indicator = {}
      }
      return Object.assign({}, DEFAULT_INDICATOR, indicator)
    },
    remain() {
      let diff = this._maxlength - this._count
      if (!this.indicatorConf.negative && diff < 0) {
        diff = 0
      }
      return diff
    },
    showRemain () {
      return !(__mpx_mode__ === 'ali' || !this.indicator)
    },
    count() {
      if (this._maxlength < 0) {
        return `${this._count}`
      }
      return `${this._count}/${this._maxlength}`
    },
    _maxlength () {
      if (!this.maxlength) {
        return 60
      }
      return parseInt(`${this.maxlength}`)
    },
    _count() {
      return this.textareaValue.length
    },
    _computedTextareaWrapStyle () {
      // todo
      let ret = ''
      // web environment does not support the autoHeight attribute
      if (!this.autoHeight || (this.autoHeight && __mpx_mode__ === 'web')) {
        ret = `height: ${this.height}px;`
      }
      ret += `width: ${this.width}; background-color: ${this.backgroundColor};`
      return ret
    },
    _computedTextareaStyle () {
      let ret = ''
      if (!this.autoHeight || (this.autoHeight && __mpx_mode__ === 'web')) {
        ret = 'height: 100%;'
      }
      return ret
    },
    _textareaWrapperClass () {
      let ret = ''
      if (this.isFocus) {
        ret += ' cube-textarea-wrapper_focused'
      }
      if (this.disabled) {
        ret += ' cube-textarea-wrapper_disabled'
      }
      return ret
    },
    _textareaIndicatorClass () {
      let ret = 'cube-textarea-indicator'
      if (this._count - this._maxlength > 0 || this.remain < 0) {
        ret += ' cube-textarea-indicator_warning'
      }
      return ret
    }
  },
  watch: {
    textareaValue: {
      handler (value) {
        if ((this._maxlength < value.length) && (this._maxlength >= 0)) {
          this.textareaValue = value.slice(0, this._maxlength)
        }
      },
      immediate: true
    },
    value: {
      handler (value) {
        this.textareaValue = value
      },
      immediate: true
    },
    focus: {
      handler (value) {
        if (value) {
          this.triggerFocus()
          return
        }
        this.triggerBlur()
      },
      immediate: true
    },
    maxlength: {
      handler (value) {
        this.textareaValue = this.textareaValue.slice(0, value)
      }
    }
  },
  methods: {
    handleFocus(e) {
      // 输入框聚焦时触发
      // @arg 事件对象 e = { value, height }，height 为键盘高度
      this.triggerEvent(EVENT_FOCUS, e.detail)
      this.isFocus = true
    },
    handleBlur(e) {
      // 输入框失去焦点时触发
      // @arg 事件对象 e = {value, cursor}
      this.triggerEvent(EVENT_BLUR, e.detail)
      this.isFocus = false
    },
    handleInput (e) {
      const { value } = e.detail
      this.textareaValue = value
      if ((this._maxlength < value.length) && (this._maxlength >= 0)) return
      // 当键盘输入时，触发 input 事件
      // @arg 事件对象 e = event.detail = {value, cursor, keyCode}，keyCode 为键值
      this.triggerEvent(EVENT_INPUT, e.detail)
    },
    handleLineChange(e) {
      // 输入框行数变化时调用
      // @arg 事件对象 e = {height: 0, heightRpx: 0, lineCount: 0}
      this.triggerEvent(EVENT_LINE_CHANGE, e.detail)
    },
    handleConfirm (e) {
      // 点击完成时， 触发 confirm 事件
      // @arg 事件对象 e = {value: value}
      this.triggerEvent(EVENT_CONFIRM, e.detail)
    },
    handleKeyboardHeightChange (e) {
      // 键盘高度发生变化的时候触发此事件
      // @arg 事件对象 e = {height: height, duration: duration}
      this.triggerEvent(EVENT_KEYBOARD_HEIGHT_CHANGE, e.detail)
    },
    triggerFocus () {
      this.isFocus = true
      if (__mpx_mode__ === 'web') {
        const textarea = this.$refs.textarea
        textarea && textarea.fields({ node: true }, function (res) {
          const el = res.node
          el && el.focus()
        }).exec()
      }
    },
    triggerBlur () {
      this.isFocus = false
      if (__mpx_mode__ === 'web') {
        const textarea = this.$refs.textarea
        textarea && textarea.fields({ node: true }, function (res) {
          const el = res.node
          el && el.blur()
        }).exec()
      }
    }
  }
})

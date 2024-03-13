import { getMixin } from '@mpxjs/core'

const EVENT_CANCEL = 'cancel'
const EVENT_CLOSE = 'close'
export default getMixin({
  properties: {
    /**
     * @description 内容文本
     * @wx true
     * @ali true
     * @web true
     */
    content: {
      type: String,
      value: ''
    },
    /**
     * @description icon 与 title、content的排列方向(vertical/horizontal)
     * @wx true
     * @ali true
     * @web true
     */
    layout: {
      type: String,
      value: 'vertical'
    },
    /**
     * @description 是否不使用内置的底部按钮
     * @wx true
     * @ali true
     * @web true
     */
    noBuiltInBtns: {
      type: Boolean,
      value: false
    },
    /**
     * @description 是否点击蒙层隐藏
     * @wx true
     * @ali true
     * @web true
     */
    maskClosable: {
      type: Boolean,
      value: true
    },
    // 是否显示关闭按钮
    showCloseIcon: {
      type: Boolean,
      value: true
    }
  },
  methods: {
    onMaskClick() {
      this.maskClosable && this.onCancel()
    },
    onCancel() {
      this.triggerEvent(EVENT_CANCEL)
    },
    onClose() {
      // 点击顶部关闭icon或遮盖层触发事件
      this.triggerEvent(EVENT_CLOSE)
    }
  }
})

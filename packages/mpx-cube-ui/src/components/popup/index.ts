import { createComponent } from '@mpxjs/core'
import {
  popupMixin,
  visibilityMixin,
  themePropsMixin
} from '../../common/mixins'

const EVENT_MASK_CLICK = 'maskClick'

createComponent({
  options: {
    multipleSlots: true,
    styleIsolation: 'shared'
  },
  mixins: [popupMixin, visibilityMixin, themePropsMixin],
  properties: {
    /**
     * @description 拓展 class 属性，`cube-${type}`，可用于样式覆盖和定制
     */
    type: {
      type: String,
      value: ''
    },
    /**
     * @description 是否显示遮罩
     */
    mask: {
      type: Boolean,
      value: true
    },
    /**
     * @description 文本内容，**微信&web** 支持 `html string` 的文本格式，**支付宝**目前不支持，所以需要自己转，具体见：支付宝 [rich-text文档](https://opendocs.alipay.com/mini/component/rich-text#%E5%B1%9E%E6%80%A7%E8%AF%B4%E6%98%8E)
     */
    content: {
      type: String,
      value: ''
    },
    /**
     * @description 是否居中显示
     */
    center: {
      type: Boolean,
      value: true
    },
    /**
     * @description 内容位置
     * @optional top/right/bottom/left/center
     */
    position: {
      type: String,
      value: ''
    },
    /**
     * @description 过渡动画
     * @optional move-up/move-right/move-left/move-down/fade
     */
    transition: {
      type: String,
      value: ''
    }
  },
  data: {
    visibleClass: ''
  },
  computed: {
    rootClass() {
      const cls: { [index: string]: boolean } = {
        'cube-popup_mask': this.mask,
        'cube-popup_mask_fade_transition': this.maskFadeTransition,
        'cube-popup_transition': !!this.transition
      }
      if (this.type) {
        cls[`cube-${this.type}`] = true
      }
      if (this.position) {
        cls[`cube-popup-${this.position}`] = true
      } else if (this.center) {
        cls['cube-popup-center'] = true
      }

      return cls
    }
  },
  methods: {
    preventTouchMove(e) {
      e.preventDefault && e.preventDefault()
    },
    onMaskClick() {
      // 点击遮罩
      this.triggerEvent(EVENT_MASK_CLICK)
      if (this.maskClosable) {
        this.hide()
      }
    },
    show() {
      this.isVisible = true
      this.visibleClass = 'show'
    },
    hide() {
      this.isVisible = false
      this.visibleClass = 'hide'
    }
  }
})

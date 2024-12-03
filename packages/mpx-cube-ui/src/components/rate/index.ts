import { createComponent } from '@mpxjs/core'

const EVENT_INPUT = 'input'
const EVENT_TYPE_MOUSE = 'mouse'

function isMouseEvent(e) {
  return e.type.indexOf(EVENT_TYPE_MOUSE) > -1
}
createComponent({
  options: {
    multipleSlots: true,
    styleIsolation: 'shared'
  },
  properties: {
    /**
     * @description 拓展 class 属性，`cube-${type}`，可用于样式覆盖和定制
     */
    value: {
      type: Number,
      value: 0
    },
    /**
     * @description 是否显示遮罩
     */
    max: {
      type: Number,
      value: 0
    },
    /**
     * @description 是否显示遮罩
     */
    disabled: {
      type: Boolean,
      value: false
    },
    /**
     * @description 文本内容，**微信&web** 支持 `html string` 的文本格式，**支付宝**目前不支持，所以需要自己转，具体见：支付宝 [rich-text文档](https://opendocs.alipay.com/mini/component/rich-text#%E5%B1%9E%E6%80%A7%E8%AF%B4%E6%98%8E)
     */
    justify: {
      type: Boolean,
      value: false
    },
    /**
     * @description 是否居中显示
     */
    allowHalf: {
      type: Boolean,
      value: false
    }
  },
  data: {
    tempValue: 0
  },
  computed: {
    rateClass() {
      return this.justify && 'cube-rate-justify'
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        if (val !== this.tempValue) {
          this.tempValue = this.handleNum(val)
        }
      }
    }
  },
  lifetimes: {
    created() {
      this.mousePressed = false
    }
  },
  methods: {
    handleStart(e) {
      if (!this.disabled) {
        if (isMouseEvent(e)) {
          this.mousePressed = true
          document.addEventListener('mouseup', this.handleEnd)
          document.addEventListener('mousemove', this.handleMove)
        }
        const rect = this.$refs.rateContainer.$el.getBoundingClientRect()
        this.left = rect.left
        this.containerWidth = rect.width
      }
    },
    handleMove(e) {
      console.log('handleMove')
      if (this.disabled) return

      if (!isMouseEvent(e)) {
        this.computeTempValue(e.touches[0])
      } else if (this.mousePressed) {
        this.computeTempValue(e)
      }
    },
    handleEnd(e) {
      console.log('handleEnd')
      if (this.disabled) return
      if ((!isMouseEvent(e) || this.mousePressed)) {
        if (isMouseEvent(e)) {
          this.mousePressed = false
          document.removeEventListener('mouseup', this.handleEnd)
          document.removeEventListener('mousemove', this.handleMove)
        }
        this.computeTempValue(isMouseEvent(e) ? e : e.changedTouches[0])
        this.triggerEvent(EVENT_INPUT, { value: this.tempValue })
      }
    },
    handleNum(num) {
      if (this.allowHalf) {
        const baseNum = Math.ceil(num) - 0.5
        num = num <= baseNum ? baseNum : baseNum + 0.5
      } else {
        num = Math.ceil(num)
      }
      return num
    },
    computeTempValue(touch) {
      let num = (touch.clientX - this.left) / this.containerWidth * this.max
      num = this.handleNum(num)
      if (num > 0 && num <= this.max) {
        this.tempValue = num
      } else if (num <= 0) {
        this.tempValue = 0
      } else {
        this.tempValue = this.max
      }
    }
  }
})

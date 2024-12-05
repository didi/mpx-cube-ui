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
     * @description 当前评分
     */
    value: {
      type: Number,
      value: 0
    },
    /**
     * @description 星星数目
     */
    max: {
      type: Number,
      value: 0
    },
    /**
     * @description 是否禁止
     */
    disabled: {
      type: Boolean,
      value: false
    },
    /**
     * @description 星星是否均匀分布
     */
    justify: {
      type: Boolean,
      value: false
    },
    /**
     * @description 是否半星
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
          this.triggerEvent(EVENT_INPUT, { value: this.tempValue })
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
      if (this.disabled) return

      if (!isMouseEvent(e)) {
        this.computeTempValue(e.touches[0])
      } else if (this.mousePressed) {
        this.computeTempValue(e)
      }
    },
    handleEnd(e) {
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
        if (this.disabled) {
          num = num < baseNum ? baseNum - 0.5 : baseNum
        } else {
          num = num <= baseNum ? baseNum : baseNum + 0.5
        }
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

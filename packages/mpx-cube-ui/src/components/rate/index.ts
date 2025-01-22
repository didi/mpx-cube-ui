import { createComponent } from '@mpxjs/core'

const EVENT_INPUT = 'input'
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
      type: Array,
      value: []
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
    },
    /**
     * @description 是否自定义
     */
    isCustomize: {
      type: Boolean,
      value: false
    }
  },
  data: {
    tempValue: 0,
    domName: '#cube-rate'
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
  methods: {
    handleStart(e) {
      if (!this.disabled) {
        this.createSelectorQuery().select(this.domName).boundingClientRect((rect) => {
          const { width, left } = rect
          this.containerWidth = width
          this.left = left
        }).exec()
      }
    },
    handleMove(e) {
      e.preventDefault && e.preventDefault()
      if (this.disabled) return
      this.computeTempValue(e.touches[0])
    },
    handleEnd(e) {
      if (this.disabled) return
      this.computeTempValue(e.changedTouches[0])
      this.triggerEvent(EVENT_INPUT, { value: this.tempValue })
    },
    handleNum(num, isEvent = false) {
      if (this.allowHalf) {
        const ceilNum = Math.ceil(num)
        const baseNum = ceilNum - 0.5
        if (isEvent) {
          num = num <= baseNum ? baseNum : ceilNum
        } else {
          num = num < baseNum ? ceilNum - 1 : (num === ceilNum) ? ceilNum : baseNum
        }
      } else {
        num = Math.ceil(num)
      }
      return num
    },
    computeTempValue(touch) {
      let num = (touch.clientX - this.left) / this.containerWidth * this.max.length
      num = this.handleNum(num, true)
      if (num > 0 && num <= this.max.length) {
        this.tempValue = num
      } else if (num <= 0) {
        this.tempValue = 0
      } else {
        this.tempValue = this.max.length
      }
    }
  }
})

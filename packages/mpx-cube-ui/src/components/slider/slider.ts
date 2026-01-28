import { MOUNTED } from '@mpxjs/core'
import { createComponent } from '../../common/helper/create-component'

const EVENT_CHANGE = 'change' // 完成一次拖动后触发的事件
const EVENT_CHANGING = 'changing' // 拖动过程中触发的事件

interface Rect {
  id: string
  left: number
  right: number
  top: number
  bottom: number
  width: number
  height: number
}

createComponent({
  properties: {
    /**
     * @description 最小值
     */
    min: {
      type: Number,
      value: 0
    },
    /**
     * @description 最大值
     */
    max: {
      type: Number,
      value: 100
    },
    /**
     * @description 步长，取值必须大于 0，并且可被(max - min)整除
     */
    step: {
      type: Number,
      value: 1
    },
    /**
     * @description 是否禁用
     */
    disabled: {
      type: Boolean,
      value: false
    },
    /**
     * @description 当前取值
     */
    value: {
      type: Number,
      value: 0
    },
    /**
     * @description 背景条的颜色（请使用 backgroundColor）
     */
    color: String,
    /**
     * @description 已选择的颜色（请使用 activeColor）
     */
    'selected-color': String,
    /**
     * @description 已选择的颜色
     */
    activeColor: String,
    /**
     * @description 背景条的颜色
     */
    backgroundColor: String,
    /**
     * @description 滑块的大小，取值范围为 12 - 28
     */
    'block-size': {
      type: Number,
      value: 28
    },
    /**
     * @description 滑块的颜色
     */
    'block-color': String,
    /**
     * @description 是否显示当前 value
     */
    'show-value': {
      type: Boolean,
      value: false
    },
    /**
     * @description 是否显示当前 value
     */
    showValue: {
      type: Boolean,
      value: false
    },
    /**
     * @description customContent
     */
    customContent: {
      type: Boolean,
      value: false
    }
  },
  data: {
    currentValue: 0,
    percentage: 0,
    startDragRect: null as null | Rect
  },
  watch: {
    value: {
      handler(newVal) {
        const val = Math.max(this.min, Math.min(this.max, newVal))
        if (newVal === this.currentValue && newVal === val) {
          return
        }
        const percentage = (val - this.min) / (this.max - this.min)
        this.constrainValue(percentage)
      },
      immediate: true
    }
  },
  [MOUNTED]() {
    this.getRect().then(res => {
      this.startDragRect = res
    })
  },
  computed: {
    sliderClass() {
      return {
        'cube-slider': true,
        [`cube-slider-${this.themeType}`]: this.themeType
      }
    },
    _blockSize() {
      return this['block-size'] || this.blockSize
    },
    showValueLable() {
      return this['show-value'] || this.showValue
    },
    containerStyle() {
      const minH = Math.max(30, this._blockSize + 10)
      return {
        minHeight: `${minH}px`,
        paddingLeft: `${this._blockSize / 2}px`,
        paddingRight: `${this._blockSize / 2}px`
      }
    },
    handleStyle() {
      return {
        left: `${this.percentage * 100}%`
      }
    },
    thumbStyle() {
      const style = {
        width: `${this._blockSize}px`,
        height: `${this._blockSize}px`,
        backgroundColor: this['block-color'] || this.blockColor
      }
      if (!style.backgroundColor) {
        delete style.backgroundColor
      }
      return style
    },
    trackStyle() {
      const style = {
        backgroundColor: this.backgroundColor || this.color
      }
      if (!style.backgroundColor) {
        delete style.backgroundColor
      }
      return style
    },
    stepStyle() {
      const style = {
        width: `${this.percentage * 100}%`,
        backgroundColor: this.activeColor || this.selectedColor
      }
      if (!style.backgroundColor) {
        delete style.backgroundColor
      }
      return style
    },
    // 限制步长，确保 step 大于 0，并且可被 (max - min) 整除
    validStep() {
      if (this.step <= 0) return 1
      if ((this.max - this.min) % this.step !== 0) {
        console.warn(`Step ${this.step} is not a divisor of range ${this.max - this.min}`)
      }
      return this.step
    }
  },
  methods: {
    getRect() {
      return new Promise((resolve) => {
        this.createSelectorQuery()
          .select('.cube-slider-tab-area')
          .boundingClientRect(res => {
            resolve(res)
          })
          .exec()
      })
    },
    constrainValue(originalPercentage) {
      const minVal = this.min
      const maxVal = this.max
      const stepVal = this.validStep
      const totalSteps = (maxVal - minVal) / stepVal
      const val = minVal + originalPercentage * (maxVal - minVal)
      const constrained = Math.max(minVal, Math.min(maxVal, val))
      const steps = Math.round((constrained - minVal) / stepVal)
      this.percentage = steps / totalSteps
      this.currentValue = minVal + steps * stepVal
    },
    calcProgress(x: number, rect: Rect) {
      const { left, width } = rect || {}
      if (left !== undefined && x !== undefined) {
        const offsetX = Math.max(0, x - left)
        this.constrainValue(offsetX / width)
      }
    },
    async onClick(e) {
      const rect = await this.getRect()
      this.startDragRect = rect
      this.calcProgress(e.detail.x, rect)
      // 完成一次拖动后触发的事件
      // @arg event.detail = {value}
      this.triggerEvent(EVENT_CHANGE, { value: this.currentValue })
    },
    async startHandler(e) {
      if (__mpx_mode__ === 'web') {
        e && e.preventDefault()
      }
      this.startDragRect = await this.getRect()
    },
    moveHandler(e) {
      if (!this.startDragRect) {
        return
      }
      const x = e.touches[0].clientX
      this.calcProgress(x, this.startDragRect)
      // 拖动过程中触发的事件
      // @arg event.detail = {value}
      this.triggerEvent(EVENT_CHANGING, { value: this.currentValue })
      if (__mpx_mode__ === 'web') {
        e && e.preventDefault()
      }
    },
    endHandler() {
      this.startDragRect = null
      // 完成一次拖动后触发的事件
      // @arg event.detail = {value}
      this.triggerEvent(EVENT_CHANGE, { value: this.currentValue })
    }
  }
})

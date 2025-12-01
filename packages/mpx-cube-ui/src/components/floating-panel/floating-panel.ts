import { createComponent } from '../../common/helper/create-component'

const EVENT_INPUT = 'input'
const WINDOW_HEIGHT = window.innerHeight
const DEFAULT_HEIGHT = 100
const DEFAULT_EXPAND_HEIGHT = Math.round(WINDOW_HEIGHT * 0.6)
const DAMP = 0.2

const regExp = /^-?\d+(\.\d+)?$/
const addUnit = (value: number | string) => (regExp.test('' + value) ? value + 'px' : value)
export function closest(arr: number[], target: number) {
  return arr.reduce((pre, cur) =>
    Math.abs(pre - target) < Math.abs(cur - target) ? pre : cur
  )
}

createComponent({
  properties: {
    // 当前面板的显示高度
    height: {
      type: Number,
      optionalTypes: [String],
      value: 0
    },
    // 设置自定义锚点, 单位 px
    anchors: {
      type: Array,
      value: [DEFAULT_HEIGHT, DEFAULT_EXPAND_HEIGHT]
    },
    // 拖拽结束时是否吸附到预设锚点
    magnetic: {
      type: Boolean,
      value: true
    },
    // 动画时长，单位秒，设置为 0 可以禁用动画
    duration: {
      type: Number,
      optionalTypes: [String],
      value: 0.3
    },
    // 允许拖拽内容容器
    contentDraggable: {
      type: Boolean,
      value: true
    },
    // 当不拖拽时，是否锁定背景滚动
    lockScroll: {
      type: Boolean,
      value: false
    },
    // 是否开启底部安全区适配
    safeAreaInsetBottom: {
      type: Boolean,
      value: true
    }
  },
  data: {
    heightVal: 0,
    dragging: false,
    startY: 0,
    startPageY: 0,
    deltaY: 0,
    maxScroll: -1,
    contentScrollTop: 0
  },
  computed: {
    _anchors() {
      const list: number[] = Array.isArray(this.anchors) ? this.anchors : []
      const min = list[0] ?? DEFAULT_HEIGHT
      const max = list.length ? list[list.length - 1] : DEFAULT_EXPAND_HEIGHT
      return list.length >= 2 ? list : [min, max]
    },
    boundary() {
      const list: number[] = this._anchors
      return {
        min: list[0] ?? DEFAULT_HEIGHT,
        max: list[list.length - 1] ?? DEFAULT_EXPAND_HEIGHT
      }
    },
    rootStyle() {
      const h = this.heightVal
      const { max } = this.boundary
      return {
        height: addUnit(max),
        transform: `translateY(calc(100% + ${addUnit(-h)}))`,
        transition: this.dragging
          ? 'none'
          : `transform ${this.duration}s cubic-bezier(0.18, 0.89, 0.32, 1.28)`
      }
    }
  },
  watch: {
    height: {
      handler(newVal: number | string) {
        const val = +newVal || 0
        const { min, max } = this.boundary
        this.heightVal = Math.round(Math.max(min, Math.min(max, val)))
      },
      immediate: true
    },
    anchors: {
      handler() {
        this.heightVal = Math.round(closest(this._anchors, this.heightVal))
      }
    }
  },
  methods: {
    ease(moveY: number) {
      const absDistance = Math.abs(moveY)
      const { min, max } = this.boundary
      if (absDistance > max) {
        return -(max + (absDistance - max) * DAMP)
      }
      if (absDistance < min) {
        return -(min - (min - absDistance) * DAMP)
      }
      return moveY
    },
    onHeaderTouchStart(e: TouchEvent) {
      const touch = e.touches && e.touches[0]
      this.dragging = true
      this.startPageY = touch ? touch.pageY : 0
      this.startY = -this.heightVal
      this.maxScroll = -1
    },
    onHeaderTouchMove(e: TouchEvent) {
      const touch = e.touches && e.touches[0]
      if (!touch) return
      this.deltaY = touch.pageY - this.startPageY
      const moveY = this.deltaY + this.startY
      const val = Math.round(-this.ease(moveY))
      this.heightVal = val
      this.triggerEvent(EVENT_INPUT, { value: val })
    },
    onHeaderTouchEnd() {
      this.maxScroll = -1
      this.dragging = false
      const { min, max } = this.boundary
      if (this.magnetic) {
        this.heightVal = this._anchors && this._anchors.length
          ? closest(this._anchors, this.heightVal)
          : Math.max(min, Math.min(max, this.heightVal))
      } else {
        this.heightVal = Math.max(min, Math.min(max, this.heightVal))
      }
      this.heightVal = Math.round(this.heightVal)
      this.triggerEvent(EVENT_INPUT, { value: this.heightVal })
    },
    onContentScroll(e: any) {
      const detail = e && e.detail
      const fromDetail = typeof detail?.scrollTop === 'number' ? detail.scrollTop : undefined
      const fromTarget = e ? (e.target?.scrollTop ?? e.currentTarget?.scrollTop) : undefined
      const st = typeof fromDetail === 'number' ? fromDetail : fromTarget
      this.contentScrollTop = typeof st === 'number' ? st : 0
    },
    onContentTouchStart(e: TouchEvent) {
      if (!this.contentDraggable) return
      const touch = e.touches && e.touches[0]
      this.dragging = true
      this.startPageY = touch ? touch.pageY : 0
      this.startY = -this.heightVal
      this.maxScroll = -1
    },
    onContentTouchMove(e: TouchEvent) {
      if (!this.contentDraggable) return
      const touch = e.touches && e.touches[0]
      if (!touch) return
      this.deltaY = touch.pageY - this.startPageY
      this.maxScroll = Math.max(this.maxScroll, this.contentScrollTop)
      if (-this.startY < this.boundary.max) {
        const moveY = this.deltaY + this.startY
        const val = Math.round(-this.ease(moveY))
        this.heightVal = val
        this.triggerEvent(EVENT_INPUT, { value: val })
        return
      }
      if (!(this.contentScrollTop <= 0 && this.deltaY > 0) || this.maxScroll > 0) {
        return
      }
      const moveY = this.deltaY + this.startY
      const val = Math.round(-this.ease(moveY))
      this.heightVal = val
      this.triggerEvent(EVENT_INPUT, { value: val })
    },
    onContentTouchEnd() {
      if (!this.contentDraggable) return
      this.maxScroll = -1
      this.dragging = false
      const prev = -this.startY
      const { min, max } = this.boundary
      if (this.magnetic) {
        this.heightVal = this._anchors && this._anchors.length
          ? closest(this._anchors, this.heightVal)
          : Math.max(min, Math.min(max, this.heightVal))
      } else {
        this.heightVal = Math.max(min, Math.min(max, this.heightVal))
      }
      this.heightVal = Math.round(this.heightVal)
      if (this.heightVal !== prev) {
        this.triggerEvent(EVENT_INPUT, { value: this.heightVal })
      }
    },
    preventTouchMove(e: TouchEvent) {
      if (this.lockScroll || this.dragging) {
        if (e && typeof e.preventDefault === 'function') {
          e.preventDefault()
        }
      }
    }
  }
})

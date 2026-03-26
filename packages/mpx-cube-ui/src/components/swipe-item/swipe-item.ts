import { createComponent } from '../../common/helper/create-component'

const EVENT_ITEM_CLICK = 'item-click'
const EVENT_BTN_CLICK = 'btn-click'
const EVENT_ITEM_ACTIVE = 'item-active'
const DIRECTION_LEFT = 1
const DIRECTION_RIGHT = -1
const momentumLimitTime = 300
const momentumLimitDistance = 15
const directionLockThreshold = 5
const easingDuration = 260
const easing = 'cubic-bezier(0.23, 1, 0.32, 1)'

let activeSwipeItem: any = null
let swipeItemUid = 0

createComponent({
  options: {
    multipleSlots: true
  },
  properties: {
    item: {
      type: Object,
      value: {}
    },
    btns: {
      type: Array,
      value: []
    },
    index: {
      type: Number,
      value: -1
    },
    useSlot: {
      type: Boolean,
      value: false
    },
    autoShrink: {
      type: Boolean,
      value: false
    }
  },
  data: {
    instanceId: 0,
    x: 0,
    maxScrollX: 0,
    moved: false,
    movingDirectionX: 0,
    distX: 0,
    distY: 0,
    startX: 0,
    pointX: 0,
    pointY: 0,
    startTime: 0,
    endTime: 0,
    btnStyles: [] as any[],
    btnsWrapStyle: {},
    scrollerStyle: {}
  },
  watch: {
    btns: {
      immediate: true,
      handler() {
        this.refresh()
      }
    }
  },
  lifetimes: {
    created() {
      this.instanceId = ++swipeItemUid
    },
    detached() {
      if (activeSwipeItem && activeSwipeItem.id === this.instanceId) {
        activeSwipeItem = null
      }
    }
  },
  methods: {
    getRevealRatio(x) {
      const max = Math.abs(this.maxScrollX)
      if (!max) {
        return 0
      }
      const ratio = Math.abs(x) / max
      if (ratio > 1) {
        return 1
      }
      if (ratio < 0) {
        return 0
      }
      return ratio
    },
    updateBtnStyles(x, duration = 0) {
      const btns = this.btns || []
      const ratio = this.getRevealRatio(x)
      const styleList: any[] = []
      const total = btns.length
      btns.forEach((btn, index) => {
        const btnWidth = this.getBtnWidth(btn)
        const layer = total - index
        const offset = (1 - ratio) * 14 * layer
        styleList.push({
          width: `${btnWidth}px`,
          background: btn.color || '#c8c7cd',
          zIndex: `${layer}`,
          transform: `translate3d(${offset}px, 0, 0)`,
          transitionDuration: `${duration}ms`,
          transitionTimingFunction: easing
        })
      })
      this.btnStyles = styleList
    },
    getNow() {
      return Date.now()
    },
    getBtnWidth(btn) {
      if (typeof btn.width === 'number' && btn.width > 0) {
        return btn.width
      }
      const text = `${btn.text || ''}`
      return Math.max(64, text.length * 14 + 24)
    },
    refresh() {
      const btns = this.btns || []
      let width = 0
      btns.forEach((btn) => {
        const btnWidth = this.getBtnWidth(btn)
        width += btnWidth
      })
      this.maxScrollX = -width
      this.btnsWrapStyle = {
        width: `${width}px`
      }
      this.setTranslate(0, 0)
    },
    setTranslate(x, duration = 0) {
      this.x = x
      this.updateBtnStyles(x, duration)
      this.scrollerStyle = {
        transform: `translate3d(${x}px, 0, 0)`,
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: easing
      }
    },
    scrollTo(x, duration = easingDuration) {
      this.setTranslate(x, duration)
    },
    shrink() {
      this.scrollTo(0, easingDuration)
    },
    grow() {
      this.scrollTo(this.maxScrollX, easingDuration)
    },
    onItemClick() {
      this.triggerEvent(EVENT_ITEM_CLICK, {
        item: this.item,
        index: this.index
      })
    },
    onBtnClick(btn) {
      this.triggerEvent(EVENT_BTN_CLICK, {
        btn,
        index: this.index,
        item: this.item
      })
      if (this.autoShrink) {
        this.shrink()
      }
    },
    onTouchStart(e) {
      if (!this.btns || this.btns.length === 0) {
        return
      }
      if (activeSwipeItem && activeSwipeItem.id !== this.instanceId) {
        activeSwipeItem.shrink()
      }
      activeSwipeItem = {
        id: this.instanceId,
        shrink: () => this.shrink()
      }
      this.triggerEvent(EVENT_ITEM_ACTIVE, {
        index: this.index
      })
      const point = e.touches && e.touches[0]
      if (!point) return
      this.moved = false
      this.movingDirectionX = 0
      this.pointX = point.pageX
      this.pointY = point.pageY
      this.distX = 0
      this.distY = 0
      this.startX = this.x
      this.startTime = this.getNow()
      this.setTranslate(this.x, 0)
    },
    onTouchMove(e) {
      if (!this.btns || this.btns.length === 0) {
        return
      }
      const point = e.touches && e.touches[0]
      if (!point) return
      const deltaX = point.pageX - this.pointX
      const deltaY = point.pageY - this.pointY
      this.pointX = point.pageX
      this.pointY = point.pageY
      this.distX += deltaX
      this.distY += deltaY
      const absDistX = Math.abs(this.distX)
      const absDistY = Math.abs(this.distY)
      if (absDistX + directionLockThreshold <= absDistY) {
        return
      }
      if (__mpx_mode__ === 'web' && e.preventDefault) {
        e.preventDefault()
      }
      const timestamp = this.getNow()
      if (timestamp - this.endTime > momentumLimitTime && absDistX < momentumLimitDistance) {
        return
      }
      this.movingDirectionX = deltaX > 0 ? DIRECTION_RIGHT : deltaX < 0 ? DIRECTION_LEFT : 0
      let newX = this.x + deltaX
      if (newX > 0) {
        newX = 0
      }
      if (newX < this.maxScrollX) {
        newX = this.x + deltaX / 3
      }
      this.moved = true
      this.setTranslate(newX, 0)
      if (timestamp - this.startTime > momentumLimitTime) {
        this.startTime = timestamp
        this.startX = this.x
      }
    },
    onTouchEnd() {
      if (!this.moved) {
        return
      }
      if (this.movingDirectionX === DIRECTION_RIGHT) {
        this.shrink()
        return
      }
      this.endTime = this.getNow()
      const duration = this.endTime - this.startTime
      const absDistX = Math.abs(this.x - this.startX)
      if ((duration < momentumLimitTime && absDistX > momentumLimitDistance) || this.x < this.maxScrollX / 2) {
        this.grow()
      } else {
        this.shrink()
      }
    }
  }
})

import { createComponent } from '../../common/helper/create-component'
import StickyEle from './sticky-ele/index.mpx?resolve'

const EVENT_CHANGE = 'change'
const EVENT_DIFF_CHANGE = 'diff-change'

type EleKey = string | number

interface StickyEleInstance {
  eleKey?: EleKey
  cubeStickyEle?: boolean
  refresh?: () => void
  setOn?: (on: boolean) => void
}

createComponent({
  relations: {
    [StickyEle]: {
      type: 'child'
    }
  },
  properties: {
    pos: {
      type: Number,
      value: 0
    },
    checkTop: {
      type: Boolean,
      value: true
    },
    offset: {
      type: Number,
      value: 0
    }
  },
  data: {
    diff: 0,
    currentDiff: 0,
    currentIndex: -1,
    currentKey: '' as EleKey | '',
    fixedEleHeight: 0,
    positions: [] as number[],
    heights: [] as number[],
    _refreshTimer: null as unknown as ReturnType<typeof setTimeout>,
    eles: [] as StickyEleInstance[]
  },
  computed: {
    containerStyle() {
      return {}
    },
    fixedEleStyle() {
      return {
        top: `${this.offset}px`
      }
    }
  },
  watch: {
    pos: {
      handler(pos: number) {
        this.computeCurrentSticky(pos)
      },
      immediate: true
    },
    offset() {
      this.computeCurrentSticky(this.pos)
    },
    checkTop() {
      this.computeCurrentSticky(this.pos)
    },
    currentIndex(newIndex: number, oldIndex: number) {
      const oldEle = this.eles[oldIndex]
      const newEle = this.eles[newIndex]

      const currentKey = (newEle && newEle.eleKey !== undefined) ? newEle.eleKey : newIndex === -1 ? '' : newIndex
      const fixedEle = (this.$refs as any)?.fixedEle._selector
      const fixedSlot = this.$slots?.fixed || (this as any).$scopedSlots?.fixed

      this.currentKey = currentKey
      this.triggerEvent(EVENT_CHANGE, { current: currentKey, index: newIndex })

      this.$nextTick(() => {
        if (fixedSlot) {
          this.fixedEleHeight = fixedEle?.offsetHeight || 0
        } else {
          const oldChild = fixedEle?.firstElementChild
          if (oldChild && oldEle && (oldEle as any).$el) {
            (oldEle as any).$el.firstElementChild.appendChild(oldChild)
            oldEle.refresh && oldEle.refresh()
          }
          if (newEle && (newEle as any).$el) {
            const newChild = (newEle as any).$el.firstElementChild?.firstElementChild
            if (newChild) {
              fixedEle?.appendChild(newChild)
            }
            this.fixedEleHeight = fixedEle?.offsetHeight || 0
          } else {
            this.fixedEleHeight = 0
          }
        }
      })
    },
    currentDiff(newVal: number) {
      const height = this.heights[this.currentIndex] || 0
      this.triggerEvent(EVENT_DIFF_CHANGE, { diff: newVal, height })
    }
  },
  lifetimes: {
    ready() {
      this.refresh()
    }
  },
  methods: {
    _scheduleRefresh() {
      clearTimeout(this._refreshTimer)
      this._refreshTimer = setTimeout(() => {
        this.refresh()
      }, 0)
    },
    _getEles(): StickyEleInstance[] {
      const nodes = this.getRelationNodes(StickyEle) as unknown as StickyEleInstance[] | undefined
      return nodes || []
    },
    // @vuese
    // 刷新 sticky 内部元素位置与高度
    refresh() {
      this.$nextTick(() => {
        this.eles = this._getEles()
        this.eles.forEach((ele: StickyEleInstance) => ele.refresh && ele.refresh())
        this._calculateHeight(() => {
          this.computeCurrentSticky(this.pos)
        })
      })
    },
    computeCurrentSticky(scrollY: number) {
      scrollY += this.offset

      const positions = this.positions
      const heights = this.heights
      const checkTop = this.checkTop

      const len = positions.length
      for (let i = len - 1; i >= 0; i--) {
        const isLast = i === len - 1
        const nextTop = isLast ? scrollY : positions[i + 1]
        let top: number
        let bottom: number

        if (checkTop) {
          top = positions[i]
          bottom = top + heights[i]
        } else {
          top = positions[i] + heights[i]
          bottom = top
        }

        const max = Math.max(bottom, nextTop)

        if (scrollY >= top && scrollY <= max) {
          this.currentIndex = i
          this.currentDiff = scrollY - top

          const diff = nextTop - scrollY
          if (diff >= 0 && !isLast) {
            this.diff = diff - (this.fixedEleHeight || heights[i])
          } else {
            this.diff = 0
          }
          return
        }
      }
      this.currentIndex = -1
      this.currentDiff = 0
      this.diff = 0
    },
    _updateFixedEleHeight() {
      const query = this.createSelectorQuery()
      query.select('.cube-sticky-fixed').boundingClientRect((rect: any) => {
        this.fixedEleHeight = rect?.height || 0
      })
      query.exec()
    },
    _calculateHeight(done?: () => void) {
      const query = this.createSelectorQuery()
      let rootTop = 0

      query.select('.cube-sticky').boundingClientRect((rootRect: any) => {
        rootTop = rootRect?.top || 0
      })
      query.selectAll('.cube-sticky-ele').boundingClientRect((rects: any[]) => {
        this.positions = []
        this.heights = []
        ;(rects || []).forEach((rect, i) => {
          this.positions[i] = (rect?.top || 0) - rootTop
          this.heights[i] = rect?.height || 0
        })
      })
      query.exec(() => {
        this._updateFixedEleHeight()
        done && done()
      })
    }
  }
})

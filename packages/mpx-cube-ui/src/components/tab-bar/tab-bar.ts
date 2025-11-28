import mpx, { createComponent, MOUNTED, UNMOUNTED } from '@mpxjs/core'
import Tab from './tab.mpx?resolve'

const EVENT_INPUT = 'input'
const EVENT_CHANGE = 'change'
const EVENT_CLICK = 'click'

createComponent({
  options: {
    styleIsolation: 'shared'
  },
  relations: {
    [Tab]: {
      type: 'child'
    }
  },
  properties: {
    /**
     * @description 双向绑定属性值
     */
    value: {
      type: Number,
      optionalTypes: [String],
      value: 0
    },
    /**
     * @description 用于 cube-tab-bar 渲染的数据，当需要使用内置的默认插槽，此参数必传，数组的每一项是一个 Object 类型，包括 label、icon 和 value，如果使用自定义插槽，也需要传递此值
     */
    tabs: {
      type: Array,
      value: []
    },
    /**
     * @description 文字与图标是否显示在一行
     * @optional true/false
     */
    inline: {
      type: Boolean,
      value: false
    },
    /**
     * @description 是否开启下划线跟随效果
     * @optional true/false
     */
    showSlider: {
      type: Boolean,
      value: false
    },
    /**
     * @description 是否开启 transition 过渡
     * @optional true/false
     */
    useTransition: {
      type: Boolean,
      value: true
    },
    /**
     * @description 是否需要自定义默认插槽
     * @optional true/false
     */
    customizeContent: {
      type: Boolean,
      value: false
    }
  },
  data: {
    useTransitionCopy: false,
    // 下划线开头的属性不会变成响应式
    _resizeTimer: null as unknown as NodeJS.Timeout,
    els: [] as WechatMiniprogram.BoundingClientRectCallbackResult[],
    cubeTabBar: true // 提供 web 侧查找父组件标识
  },
  computed: {
    tabBarClass() {
      return {
        'cube-tab-bar_inline': this.inline,
        'cube-tab-bar_transition': this.useTransitionCopy
      }
    },
    currentIndex() {
      return this.tabs.findIndex(item => item.value === this.value || item.label === this.value)
    },
    currentOffset() {
      let offsetLeft = 0
      for (let i = 0; i < this.currentIndex; i++) {
        const width = this.els[i]?.width || 0
        const marginLeft = Number.parseInt(this.els[i]?.['margin-left'] || 0)
        const marginRight = Number.parseInt(this.els[i]?.['margin-right'] || 0)

        offsetLeft += width + marginLeft + marginRight
      }
      offsetLeft += Number.parseInt(this.els[this.currentIndex]?.['margin-left'] || 0)
      return offsetLeft
    },
    currentWidth() {
      return this.els[this.currentIndex]?.width
    }
  },
  methods: {
    trigger(value) {
      this.triggerEvent(EVENT_CLICK, { value })
      if (value === this.value) {
        return
      }
      const changedEvents = [EVENT_INPUT, EVENT_CHANGE]
      changedEvents.forEach((eventType) => {
        this.triggerEvent(eventType, { value })
      })
      this.$nextTick(() => {
        this.calcAllTabWidth()
      })
    },
    calcAllTabWidth() {
      // 使用了自定义插槽渲染tab-bar
      const children = this.getRelationNodes(Tab)
      if (children?.length) {
        this.els = []
        children.forEach(child => {
          mpx.createSelectorQuery().in(child).select('.cube-tab').fields({
            size: true,
            computedStyle: ['margin-left', 'margin-right']
          }, (rect) => {
            this.els.push(rect as unknown as WechatMiniprogram.BoundingClientRectCallbackResult)
          }).exec()
        })
        return
      }
      // 没有使用自定义插槽
      mpx.createSelectorQuery().in(this).selectAll('.cube-tab-bar > .cube-tab').fields({
        size: true,
        computedStyle: ['margin-left', 'margin-right']
      }, (rects) => {
        this.els = rects as unknown as WechatMiniprogram.BoundingClientRectCallbackResult[]
      }).exec()
    },
    _resizeHandler() {
      clearTimeout(this._resizeTimer)
      this._resizeTimer = setTimeout(() => {
        this.calcAllTabWidth()
      }, 60)
    }
  },
  [MOUNTED]() {
    // 避免用户一开始就看到下划线滚动到目标位置
    const initialUseTransition = this.useTransition
    this.calcAllTabWidth()
    if (initialUseTransition) {
      this.useTransitionCopy = false
      setTimeout(() => {
        this.useTransitionCopy = initialUseTransition
      }, 300)
    }
    if (__mpx_mode__ === 'web') {
      window.addEventListener('resize', this._resizeHandler)
    }
  },
  [UNMOUNTED]() {
    clearTimeout(this._resizeTimer)
    if (__mpx_mode__ === 'web') {
      window.removeEventListener('resize', this._resizeHandler)
    }
  }
})

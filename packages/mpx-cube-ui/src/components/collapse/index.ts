import { createComponent } from '../../common/helper/create-component'
const EVENT_INPUT = 'input'
createComponent({
  options: {
    multipleSlots: true
  },
  properties: {
    // 属性最小内容展示高度，需要写单位，如：100px。当内容高度小于该值时，不会出现收起展开按钮。
    minHeight: {
      type: String,
      value: '0'
    },
    // 切换开关所在位置
    // @optional top/bottom
    switchPositon: {
      type: String,
      value: 'top'
    },
    // 切换开关文案，数组第一项为展开时文案，第二项为收起时文案。当为字符串时，展开收起文案不变
    switchText: {
      // Array / String
      type: Array,
      optionalTypes: [String],
      value: ['展开', '收起']
    },
    // 是否默认收起
    collapsed: {
      type: Boolean,
      value: true
    }
  },
  watch: {
    collapsed: {
      handler(newV) {
        this.isCollapsed = newV
      },
      immediate: true
    }
  },
  data: {
    isCollapsed: true,
    contentMaxHeight: '0px',
    textStyle: {},
    hideSwitch: false
  },
  computed: {
    isSetMinHeight() {
      return this.minHeight !== '0'
    },
    showTopSwitch() {
      return this.switchPositon === 'top' && !this.hideSwitch
    },
    showBottomSwitch() {
      return this.switchPositon === 'bottom' && !this.hideSwitch
    },
    text() {
      const switchText = this.switchText
      if (Array.isArray(switchText)) {
        return this.isCollapsed ? switchText[0] : switchText[1]
      } else if (typeof switchText === 'string') {
        return switchText
      }
      return ''
    },
    contentWrapStyle() {
      return {
        maxHeight: this.isCollapsed ? this.minHeight : this.contentMaxHeight
      }
    }
  },
  methods: {
    // query.select('.box').boundingClientRect((boxRect) => {
    //   query.select('.parent').boundingClientRect((parentRect) => {
    //     const distance = boxRect.bottom - parentRect.top;
    //     console.log('盒子底部与父元素顶部的距离: ', distance);
    //   }).exec();
    // }).exec();

    heightHandler() {
      let contentHeight = -1
      let ghostNodeHeight = -1
      const query = this.createSelectorQuery()
      const content = query.select('.cube-collapse-content')
      content.boundingClientRect((res) => {
        this.contentMaxHeight = res.height + 'px'
        contentHeight = res.height
        if (ghostNodeHeight !== -1) {
          if (contentHeight <= ghostNodeHeight) {
            this.hideSwitch = true
          }
        }
      })

      const ghostNode = query.select('.cube-collapse-ghost-node')
      ghostNode.boundingClientRect((res) => {
        ghostNodeHeight = res.height
        if (contentHeight !== -1) {
          if (contentHeight <= ghostNodeHeight) {
            this.hideSwitch = true
          }
        }
      })
      query.exec()
    },
    toggleCollapse() {
      this.isCollapsed = !this.isCollapsed
      // 当绑定值变化时触发
      // @arg 事件对象 e，包含 value 属性，表示当前展开收起状态
      this.triggerEvent(EVENT_INPUT, {
        value: this.isCollapsed
      })
    }
  },
  lifetimes: {
    ready() {
      this.heightHandler()
    }
  }
})

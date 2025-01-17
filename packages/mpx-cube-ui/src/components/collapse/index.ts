import { createComponent } from '../../common/helper/create-component'
const EVENT_INPUT = 'input'
createComponent({
  options: {
    multipleSlots: true
  },
  properties: {
    // 折叠内容最大高度，默认为0，如果值很大则没有折叠效果了，需要写单位
    minHeight: {
      type: String,
      value: '0'
    },
    switchPositon: {
      type: String,
      value: 'top'
    },
    switchText: {
      type: Array,
      optionalTypes: [String],
      value: ['展开', '收起']
    },
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
      const query = this.createSelectorQuery()
      const content = query.select('.cube-collapse-content')
      content.boundingClientRect((res) => {
        this.contentMaxHeight = res.height + 'px'
      })
      query.exec()
    },
    toggleCollapse() {
      this.isCollapsed = !this.isCollapsed
      // 当绑定值变化时触发
      // @arg 事件对象 e，包含当前选中的复选框值的集合
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

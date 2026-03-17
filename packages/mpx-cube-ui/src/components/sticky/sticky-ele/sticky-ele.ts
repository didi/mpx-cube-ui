import { createComponent } from '../../../common/helper/create-component'
import Sticky from '../index.mpx?resolve'

createComponent({
  behavior: ['cube-sticky-ele'],
  properties: {
    eleKey: {
      type: null,
      value: ''
    }
  },
  data: {
    cubeStickyEle: true,
    on: false,
    eleHeight: 'auto'
  },
  computed: {
    eleHeightStyle() {
      return {
        height: this.eleHeight
      }
    }
  },
  relations: {
    [Sticky]: {
      type: 'parent'
    }
  },
  methods: {
    setOn(on: boolean) {
      this.on = on
    },
    refresh() {
      // 重置高度为 auto，然后重新计算并设置固定高度
      this.eleHeight = 'auto'
      const query = this.createSelectorQuery()
      const that = this
      query.select('.cube-sticky-ele').boundingClientRect((rect: any) => {
        if (rect && rect.height > 0) {
          that.eleHeight = `${rect.height}px`
        }
      })
      query.exec()
    }
  }
})

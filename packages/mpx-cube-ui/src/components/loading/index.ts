import { createComponent } from '../../common/helper/create-component'

createComponent({
  properties: {
    /**
     * @description 加载图标的大小，单位px
     */
    size: {
      type: Number,
      value: 24
    }
  },
  data: {
    line: 12
  },
  computed: {
    style() {
      if (!this.size) {
        return
      }
      const value = `${this.size}px`
      return {
        width: value,
        height: value
      }
    }
  }
})

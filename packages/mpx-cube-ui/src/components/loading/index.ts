import { createComponent } from '../../common/helper/create-component'

createComponent({
  properties: {
    size: {
      type: Number,
      value: 24
    }
  },
  data: {
    balde: 12
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

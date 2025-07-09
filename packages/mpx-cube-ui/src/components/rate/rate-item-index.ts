import { createComponent } from '@mpxjs/core'

createComponent({
  properties: {
    index: {
      type: Number,
      value: 0
    },
    value: {
      type: Number,
      value: 0
    }
  },
  computed: {
    rateItemClass() {
      return {
        'cube-rate-item-def-active': this.index <= this.value,
        'cube-rate-item-def-half-active': this.index === this.value + 0.5
      }
    }
  }
})

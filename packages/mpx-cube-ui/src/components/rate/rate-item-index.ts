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
        'cube-rate-item_active': this.index <= this.value,
        'cube-rate-item_half_active': this.index === this.value + 0.5
      }
    }
  }
})

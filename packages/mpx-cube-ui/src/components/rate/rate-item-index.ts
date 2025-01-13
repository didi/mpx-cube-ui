import { createComponent } from '@mpxjs/core'
import { isWx } from '../../common/helper/utils'

createComponent({
  properties: {
    index: {
      type: Number,
      value: 0
    },
    value: {
      type: Number,
      value: 0
    },
    isCustomize: {
      type: Boolean,
      value: true
    }
  },
  computed: {
    rateItemClass() {
      const indexValue = isWx ? this.index + 1 : this.index
      return {
        'cube-rate-item_active': indexValue <= this.value,
        'cube-rate-item_half_active': indexValue === this.value + 0.5
      }
    }
  }
})

import { createComponent } from '@mpxjs/core'
import { isWeb } from '../../common/helper/utils'

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
    isCustom: {
      type: Boolean,
      value: true
    }
  },
  computed: {
    rateItemClass() {
      const indexValue = isWeb ? this.index : this.index + 1
      return {
        'cube-rate-item_active': indexValue <= this.value,
        'cube-rate-item_half_active': indexValue === this.value + 0.5
      }
    }
  }
})

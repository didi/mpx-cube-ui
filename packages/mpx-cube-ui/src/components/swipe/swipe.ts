import { createComponent } from '../../common/helper/create-component'

const EVENT_ITEM_CLICK = 'item-click'
const EVENT_BTN_CLICK = 'btn-click'

createComponent({
  options: {
    multipleSlots: true
  },
  properties: {
    list: {
      type: Array,
      value: []
    },
    autoShrink: {
      type: Boolean,
      value: false
    }
  },
  methods: {
    onItemClick(e) {
      const detail = e.detail || {}
      this.triggerEvent(EVENT_ITEM_CLICK, {
        item: detail.item,
        index: detail.index
      })
    },
    onBtnClick(e) {
      const detail = e.detail || {}
      const current = this.list[detail.index]
      this.triggerEvent(EVENT_BTN_CLICK, {
        btn: detail.btn,
        index: detail.index,
        item: detail.item || (current && current.item) || current
      })
    }
  }
})

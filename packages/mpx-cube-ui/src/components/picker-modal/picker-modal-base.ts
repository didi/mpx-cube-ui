import { createPickerModalBaseComponent } from '../../common/helper/create-component'

const EVENT_CONFIRM = 'confirm'

createPickerModalBaseComponent({
  options: {
    multipleSlots: true
  },
  properties: {
    pending: {
      type: Boolean,
      value: false
    }
  },
  methods: {
    onConfirm() {
      if (this.pending) return
      this.triggerEvent(EVENT_CONFIRM)
    }
  }
})

import { createOptionButtonsComponent } from '../../../common/helper/create-component'
import { defConfirmBtn, defCancelBtn, parseBtn } from '../../../common/helper/confirm-button-group'

const EVENT_CONFIRM = 'confirm'
const EVENT_CANCEL = 'cancel'

createOptionButtonsComponent({
  computed: {
    typeClass () {
      return this.isVertical ? 'cube-confirm-button-group_vertical' : ''
    },
    isConfirm() {
      return this.type === 'confirm'
    },
    isOptional() {
      return this.type === 'optional'
    },
    isVertical() {
      return this.direction === 'vertical'
    },
    _confirmBtn() {
      return parseBtn(this.confirmBtn, defConfirmBtn)
    },
    _cancelBtn() {
      return parseBtn(this.cancelBtn, defCancelBtn)
    }
  },
  methods: {
    onConfirm() {
      this.triggerEvent(EVENT_CONFIRM)
    },
    onCancel() {
      this.triggerEvent(EVENT_CANCEL)
    }
  }
})

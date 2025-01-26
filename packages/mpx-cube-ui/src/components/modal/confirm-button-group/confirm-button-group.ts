import { createOptionButtonsComponent } from '../../../common/helper/create-component'
import { defConfirmBtn, defCancelBtn, parseBtn } from '../../../common/helper/confirm-button-group'

const EVENT_CONFIRM = 'confirm'
const EVENT_CANCEL = 'cancel'

createOptionButtonsComponent({
  computed: {
    typeClass () {
      return this.isVertical ? 'cube-confirm-button-group_vertical' : ''
    },
    rnCancelBtnClass() {
      // @ts-ignore
      return ((__mpx_mode__ === 'ios' || __mpx_mode__ === 'android') && this.isVertical) ? 'cube-option-cancel-button_vertical' : ''
    },
    rnConfirmBtnClass() {
      // @ts-ignore
      return ((__mpx_mode__ === 'ios' || __mpx_mode__ === 'android') && this.isVertical) ? 'cube-option-confirm-button_vertical' : ''
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
    },
    realDirection() {
      // @ts-ignore
      return ((__mpx_mode__ === 'ios' || __mpx_mode__ === 'android') && this.direction === 'vertical') ? 'vertical-reverse' : this.direction
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

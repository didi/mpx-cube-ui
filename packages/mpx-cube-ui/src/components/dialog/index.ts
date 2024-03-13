import { createPopupComponent } from '../../common/helper/create-component'
import type { DialogBtn } from './dialogBtn'

const EVENT_CONFIRM = 'confirm'
const EVENT_CANCEL = 'cancel'
const EVENT_CLOSE = 'close'

const defConfirmBtn: DialogBtn = {
  text: '',
  active: true,
  disabled: false
}
const defCancelBtn: DialogBtn = {
  text: '',
  active: false,
  disabled: false
}

const parseBtn = (btn: string | DialogBtn, defBtn: DialogBtn): DialogBtn => {
  if (typeof btn === 'string') {
    btn = {
      text: btn
    }
  }
  return Object.assign({}, defBtn, btn)
}

const btnClsPrefix = 'cube-dialog-btn'
const btnsClsPrefix = 'cube-dialog-btns'
const dialogMainClsPrefix = 'cube-dialog-main'

createPopupComponent({
  options: {
    multipleSlots: true
  },
  properties: {
    // todo dialog type 类型
    /**
     * @description 类型
     * @optional alert/confirm
     */
    type: {
      type: String,
      value: 'alert' // alert | confirm
    },
    /**
     * @description 图标类型（自动添加`cubeic-`前缀）
     * @optional 图标 Icon，更多选择参见[内置 Icon](https://www.mpxjs.cn/mpx-cube-ui/demo-theme-default/index.html#/pages/icon/index)
     */
    icon: {
      type: String,
      value: ''
    },
    /**
     * @description 标题
     */
    title: {
      type: String,
      value: ''
    },
    /**
     * @description 正文内容
     */
    content: String,
    /**
     * @description 顶部居中的小圆图标
     */
    headIcon: {
      type: String,
      value: ''
    },
    /**
     * @description 是否显示关闭 Icon 按钮
     */
    showClose: {
      type: Boolean,
      value: false
    },
    /**
     * @description 确认按钮参数配置
     * @optional DialogBtn
     */
    confirmBtn: {
      type: Object,
      optionalTypes: [String],
      value: {
        text: '',
        active: true,
        disabled: false
      } as DialogBtn
    },
    /**
     * @description 取消按钮参数配置
     * @optional DialogBtn
     */
    cancelBtn: {
      type: Object,
      optionalTypes: [String],
      value: {
        text: '',
        active: false,
        disabled: false
      } as DialogBtn
    }
  },
  computed: {
    _cancelBtn () {
      return parseBtn(this.cancelBtn, defCancelBtn)
    },
    _confirmBtn () {
      return parseBtn(this.confirmBtn, defConfirmBtn)
    },
    useSlotBtn () {
      return !this._cancelBtn.text && !this._confirmBtn.text
    },
    isConfirm () {
      return this.type === 'confirm'
    },
    isPrompt () {
      return this.type === 'prompt'
    },
    containerClass () {
      return `cube-dialog-${this.type}`
    },
    btnsClass () {
      return {
        [`${btnsClsPrefix}-border-right-1px`]: this.isConfirm || this.isPrompt
      }
    },
    cancelBtnClass () {
      return {
        [`${btnClsPrefix}-highlight`]: !!this._cancelBtn.active,
        [`${btnClsPrefix}_disabled`]: !!this._cancelBtn.disabled
      }
    },
    confirmBtnClass () {
      return {
        [`${btnClsPrefix}-highlight`]: !!this._confirmBtn.active,
        [`${btnClsPrefix}_disabled`]: !!this._confirmBtn.disabled
      }
    },
    mainClass () {
      return {
        [`${dialogMainClsPrefix}-is-visible`]: this.isVisible,
        [`${dialogMainClsPrefix}-overflow`]: this.headIcon
      }
    }
  },
  methods: {
    onMaskClick () {
      this.maskClosable && this.onCancel()
    },
    onConfirm () {
      if (this._confirmBtn.disabled) {
        return
      }
      this.hide()
      // 点击确认按钮后触发
      this.triggerEvent(EVENT_CONFIRM)
    },
    onCancel () {
      if (this._cancelBtn.disabled) {
        return
      }
      this.hide()
      // 点击取消按钮后触发
      this.triggerEvent(EVENT_CANCEL)
    },
    onClose () {
      this.hide()
      // 点击关闭按钮后触发
      this.triggerEvent(EVENT_CLOSE)
    }
  }
})

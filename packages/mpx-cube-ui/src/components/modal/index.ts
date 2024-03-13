import { createModalComponent } from '../../common/helper/create-component'
import { confirmButtonGroupMixin } from '../../common/mixins'

const EVENT_CONFIRM = 'confirm'
const EVENT_CANCEL = 'cancel' // 配置cancelText时生效
const EVENT_CLOSE = 'close' // 配置showCloseIcon为true时生效

enum ModalDirection {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal'
}

createModalComponent({
  options: {
    multipleSlots: true
  },
  mixins: [confirmButtonGroupMixin],
  properties: {
    /**
     * @description 内容文本
    */
    content: {
      type: String,
      value: ''
    },
    /**
     * @description icon 与 title、content的排列方向
     * @optional vertical/horizontal
     */
    layout: {
      type: String,
      value: ModalDirection.VERTICAL
    },
    /**
     * @description 是否不使用内置的底部按钮
     */
    noBuiltInBtns: {
      type: Boolean,
      value: false
    },
    /**
     * @description （已废弃）是否让确认按钮显示在左边 v1.0.0
     */
    leftConfirm: {
      type: Boolean,
      value: false
    },
    classConfig: {
      type: Object,
      value: {}
    },
    styleConfig: {
      type: Object,
      value: {}
    }
  },
  computed: {
    bodyLayoutClass() {
      return {
        horizontal: this.layout === 'horizontal'
      }
    },
    cancelBtnClass() {
      return {
        'algin-right': this.cancelBtnAlign === 'right'
      }
    }
  },
  methods: {
    onConfirm() {
      if (this.hideOnConfirm) {
        this.hide()
      }
      // 点击底部确定按钮触发事件
      this.triggerEvent(EVENT_CONFIRM)
    },
    onCancel() {
      if (this.hideOnCancel) {
        this.hide()
      }
      // 点击顶部/底部取消按钮触发事件
      this.triggerEvent(EVENT_CANCEL)
    },
    onClose() {
      this.hide()
      // 点击顶部关闭icon或遮盖层触发事件
      this.triggerEvent(EVENT_CLOSE)
    }
  }
})

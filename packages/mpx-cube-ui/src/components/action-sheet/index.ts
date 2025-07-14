import { createComponent } from '../../common/helper/create-component'

const EVENT_SELECT = 'select'
const EVENT_CANCEL = 'cancel'
const EVENT_MASK_CLOSE = 'maskClose'

createComponent({
  options: {
    styleIsolation: 'shared'
  },
  data: {
    isVisible: false
  },
  properties: {
    /**
     * @description 需要展示的数据列表
     */
    inputData: {
      type: Array,
      value: []
    },
    /**
     * @description 高亮第几个选项
     */
    active: {
      type: Number,
      value: -1
    },
    /**
     * @description 组件的标题
     */
    title: {
      type: String,
      value: ''
    },
    /**
     * @description Picker 样式
     * @optional true/false
     */
    pickerStyle: {
      type: Boolean,
      value: false
    },
    /**
     * @description 点击蒙层是否隐藏
     * @optional true/false
     */
    maskClosable: {
      type: Boolean,
      value: true
    },
    /**
     * @description 取消文案
     */
    cancelTxt: {
      type: String,
      value: '取消'
    }
  },
  computed: {
    _cancelTxt() {
      return this.cancelTxt
    },
    pickerStyleClass() {
      if (this.pickerStyle) {
        return {
          space: 'cube-action-sheet-space-picker',
          title: 'cube-action-sheet-title-picker',
          cancel: 'cube-action-sheet-cancel-picker'
        }
      }
      return {
        space: '',
        title: '',
        cancel: ''
      }
    }
  },
  methods: {
    // @vuese
    // 显示
    show() {
      if (this.isVisible) return
      this.isVisible = true
    },
    // @vuese
    // 隐藏
    hide() {
      this.isVisible = false
    },
    maskClick() {
      if (this.maskClosable) {
        // 点击遮盖层隐藏时触发
        this.triggerEvent(EVENT_MASK_CLOSE)
        console.log(1111)
        this.hide()
      }
    },
    cancel() {
      // 点击取消时触发
      this.triggerEvent(EVENT_CANCEL)
      this.hide()
    },
    itemClick(item, index) {
      // 点击某项时触发
      this.triggerEvent(EVENT_SELECT, { item, index })
      this.hide()
    }
  }
})

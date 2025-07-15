import { createComponent } from '../../common/helper/create-component'
import { visibilityMixin } from '../../common/mixins'

const EVENT_SELECT = 'select'
const EVENT_CANCEL = 'cancel'
const EVENT_MASK_CLOSE = 'maskClose'

createComponent({
  mixins: [visibilityMixin],
  options: {
    styleIsolation: 'shared'
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
    maskClick() {
      // 点击遮盖层时触发
      this.triggerEvent(EVENT_MASK_CLOSE)
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

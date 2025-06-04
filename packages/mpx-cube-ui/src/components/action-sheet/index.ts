import { createComponent } from '../../common/helper/create-component'

const EVENT_SELECT = 'select'
const EVENT_CANCEL = 'cancel'

createComponent({
  options: {
    styleIsolation: 'shared'
  },
  properties: {
    /**
     * @description 需要展示的数据列表
     */
    data: {
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
    }
  },
  methods: {
    show() {
      this.$refs.modal.show()
    },
    hide() {
      this.$refs.modal.hide()
    },
    maskClick() {
      this.cancel()
    },
    cancel() {
      this.triggerEvent(EVENT_CANCEL)
      this.hide()
    },
    itemClick(item, index) {
      this.triggerEvent(EVENT_SELECT, { item, index })
      this.hide()
    }
  }
})

import { createModalComponent } from '../../common/helper/create-component'
import { ExtendOption } from '../../types/form-item'

const EVENT_CONFIRM = 'confirm'
const EVENT_CLOSE = 'close'
const EVENT_CANCEL = 'cancel'

createModalComponent({
  options: {
    multipleSlots: true
  },
  properties: {
    /**
     * @description 副标题
     */
    subtitle: {
      type: String,
      value: ''
    },
    /**
     * @description 选项数据
     */
    options: {
      type: Array,
      value: [] as ExtendOption[]
    },
    /**
     * @description 选中值
     * @optional
     */
    value: {
      type: String,
      optionalTypes: [Number],
      value: ''
    }
  },
  data: {
    checkedValue: ''
  },
  watch: {
    checkedValue (newV) {
      this.hide()
      // 在选项值发生改变时触发
      // @arg 当前选项值
      this.triggerEvent(EVENT_CONFIRM, newV)
    }
  },
  lifetimes: {
    created() {
      this.checkedValue = this.value
    }
  },
  methods: {
    onClose() {
      // 点击顶部关闭icon或遮盖层触发事件
      this.triggerEvent(EVENT_CLOSE)
    },
    onCancel() {
      // 点击顶部取消按钮触发事件
      this.triggerEvent(EVENT_CANCEL)
    }
  }
})

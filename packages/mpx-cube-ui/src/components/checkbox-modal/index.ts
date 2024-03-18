import { createModalComponent } from '../../common/helper/create-component'
import { ExtendOption, Value } from '../../types/form-item'

const EVENT_CONFIRM = 'confirm'
const EVENT_CLOSE = 'close'
const EVENT_CANCEL = 'cancel'

createModalComponent({
  options: {
    addGlobalClass: true
  },
  properties: {
    /**
     * @description 描述
     */
    subtitle: {
      type: String,
      value: ''
    },
    /**
     * @description 底部按钮文案
     */
    confirmBtn: {
      type: String,
      value: '确定'
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
    values: {
      type: Array,
      value: [] as Value[]
    }
  },
  data: {
    checkedValues: [] as Value[],
    lastCheckedValues: [] as Value[]
  },
  watch: {
    values: {
      handler(newVal) {
        if (newVal && newVal.length) {
          this.checkedValues = [...this.values] as Value[]
        }
      },
      immediate: true
    }
  },
  lifetimes: {
    created () {
      this.lastCheckedValues = [...this.checkedValues]
    }
  },
  methods: {
    onConfirm() {
      this.lastCheckedValues = [...this.checkedValues]
      // 点击确认时触发
      // @arg 确认选项值
      this.triggerEvent(EVENT_CONFIRM, this.checkedValues)
    },
    onClose() {
      this.checkedValues = [...this.lastCheckedValues]
      // 点击顶部关闭icon或遮盖层触发事件
      this.triggerEvent(EVENT_CLOSE)
    },
    onCancel() {
      this.checkedValues = [...this.lastCheckedValues]
      // 点击顶部取消按钮触发事件
      this.triggerEvent(EVENT_CANCEL)
    }
  }
})

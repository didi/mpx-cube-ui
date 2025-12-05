import { createComponent } from '../../common/helper/create-component'

const EVENT_CLICK = 'click'

const regExp = /^-?\d+(\.\d+)?$/

const addUnit = (value: number | string) => {
  return regExp.test('' + value) ? value + 'px' : value
}

createComponent({
  properties: {
    /**
     * @description 图标类型（自动添加`cubeic-`前缀）
     * @optional 图标 Icon，更多选择参见[内置 Icon](https://www.mpxjs.cn/mpx-cube-ui/example/index.html#/pages/icon/index)
     */
    type: String,
    /**
     * @description 图标颜色
     */
    color: String,
    /**
     * @description 图标大小
     */
    size: {
      type: Number,
      optionalTypes: [String]
    }
  },
  computed: {
    iconClass() {
      return `cubeic cubeic-${this.type}`
    },
    iconStyle() {
      const style: Record<string, any> = {}
      if (this.color) {
        style.color = this.color
      }
      if (this.size) {
        style.fontSize = addUnit(this.size)
      }
      return style
    }
  },
  methods: {
    onClick() {
      // 点击图标时触发
      // @arg -
      this.triggerEvent(EVENT_CLICK)
    }
  }
})

import { getMixin } from '@mpxjs/core'
import { ExtendOption } from '../../../types/form-item'

export default getMixin({
  properties: {
    /**
     * @description 选项数据
     * @ali true
     * @wx true
     * @web true
     */
    options: {
      type: Array,
      value: [] as ExtendOption[]
    },
    /**
     * @description 选中值
     * @ali true
     * @wx true
     * @web true
     */
    value: {
      type: String,
      optionalTypes: [Number],
      value: ''
    },
    /**
     * @description 是否行内展示
     * @ali true
     * @wx true
     * @web true
     */
    inline: {
      type: Boolean,
      value: false
    },
    /**
     * @description 控制每行展示的个数
     * @ali true
     * @wx true
     * @web true
     */
    colNum: {
      type: Number,
      value: 1
    }
  }
})

import { getMixin } from '@mpxjs/core'
import { Value, ExtendOption } from '../../../types/form-item'

export default getMixin({
  properties: {
    /**
     * @description 配置项数组
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
     * @optional
     * @ali true
     * @wx true
     * @web true
     */
    values: {
      type: Array,
      value: [] as Value[]
    },
    /**
     * @description 选择框形状
     * @optional round/square
     * @ali true
     * @wx true
     * @web true
     */
    shape: {
      type: String,
      value: 'round'
    },
    /**
     * @description 是否表现为行内元素
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

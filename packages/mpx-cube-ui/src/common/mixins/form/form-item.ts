import { getMixin } from '@mpxjs/core'
import { Option } from '../../../types/form-item'

export default getMixin({
  properties: {
    /**
     * @description 配置项
     * @optional Option
     * @ali true
     * @wx true
     * @web true
     */
    option: {
      type: Object,
      value: {
        value: '',
        text: '',
        desc: '',
        disabled: false,
        position: 'left'
      } as Option
    },
    /**
     * @description 双向绑定属性值
     * @optional String/Number
     * @ali true
     * @wx true
     * @web true
     */
    value: {
      type: String,
      optionalTypes: [Number],
      value: ''
    }
  }
})

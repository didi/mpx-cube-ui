import { getMixin } from '@mpxjs/core'

export default getMixin({
  properties: {
    // 标题
    title: {
      type: String
    },
    // 子标题
    subtitle: {
      type: String
    },
    // 顶部取消按钮文案
    cancelTxt: {
      type: String,
      value: '取消'
    },
    // 顶部确定按钮文案
    confirmTxt: {
      type: String,
      value: '确认'
    },
    // @description 是否点击蒙层隐藏
    maskClosable: {
      type: Boolean,
      value: true
    }
  }
})

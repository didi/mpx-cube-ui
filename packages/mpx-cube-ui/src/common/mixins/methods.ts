import { getMixin } from '@mpxjs/core'

export default getMixin({
  methods: {
    preventTouchMove() { /* empty */ }
    // TODO: vue 的事件触发
    // $emit(...args) {
    //   this.triggerEvent(...args)
    // }
  }
})

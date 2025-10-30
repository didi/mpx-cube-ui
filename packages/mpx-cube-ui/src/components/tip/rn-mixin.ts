import mpx, { getMixin } from '@mpxjs/core'

let mixin = {} as Parameters<typeof getMixin>[0]
// eslint-disable-next-line
// @ts-ignore
if (__mpx_mode__ === 'ios' || __mpx_mode__ === 'android' || __mpx_mode__ === 'harmony') {
  mixin = {
    data: {
      tipAnimationData: {}
    },
    computed: {
      angleWrapperClass() {
        return `cube-tip-angle-wapper_${this.direction}`
      },
      angleClass() {
        return `cube-tip-angle_${this.direction}`
      }
    },
    watch: {
      isVisible: {
        handler(newV) {
          const animation = this.tipAnimation || (this.tipAnimation = mpx.createAnimation({
            timingFunction: 'ease'
          }))
          if (newV) {
            animation.opacity(1).step({ duration: 0 })
            animation.scale(1.1).step({ duration: 200 })
            animation.scale(1).step({ duration: 200 })
          } else {
            animation.scale(0).step({ duration: 200 })
          }
          this.tipAnimationData = animation.export()
        },
        immediate: true
      }
    }
  }
}
export default getMixin(mixin)

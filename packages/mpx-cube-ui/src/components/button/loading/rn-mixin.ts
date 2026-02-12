import mpx, { getMixin } from '@mpxjs/core'

let mixin = {} as Parameters<typeof getMixin>[0]

const DURATION = 2000
const NORMAL_COLOR = '#ccc'
const SECONDARY_COLOR = 'rgba(204, 204, 204, 0.4)'
const ACTIVE_COLOR = '#fff'

if (__mpx_mode__ === 'ios' || __mpx_mode__ === 'android' || __mpx_mode__ === 'harmony') {
  mixin = {
    data: {
      beforeAnim: {} as WechatMiniprogram.AnimationExportResult,
      middleAnim: {} as WechatMiniprogram.AnimationExportResult,
      afterAnim: {} as WechatMiniprogram.AnimationExportResult,
      timer: null,
      count: 0,
      time: 0
    },
    lifetimes: {
      ready() {
        this.startAnim()
      },
      detached() {
        if (this.timer) {
          clearInterval(this.timer)
          this.timer = null
        }
      }
    },
    methods: {
      startAnim() {
        if ((this.count - 1) % 3 === 0 || (this.count - 2) % 3 === 0) {
          this.time = 500
        } else if (this.count !== 0 && this.count % 3 === 0) {
          this.time = 1000
        }
        this.timer = setTimeout(() => {
          if (this.count % 3 === 0) {
            this.executeAnim('beforeAnim')
          } else if ((this.count - 1) % 3 === 0) {
            this.executeAnim('middleAnim')
          } else if ((this.count - 2) % 3 === 0) {
            this.executeAnim('afterAnim')
          }
          this.startAnim()
        }, this.time)
      },
      executeAnim(animName) {
        this.count++
        this[animName] = {} as any
        this.$nextTick(() => {
          this[animName] = this.createDotAnimation()
        })
      },
      createDotAnimation() {
        const duration = DURATION / 4
        const animation = mpx.createAnimation({
          duration: DURATION,
          timingFunction: 'linear'
        })
        animation.scale(1).backgroundColor(NORMAL_COLOR).step({ duration })
        animation.scale(1.3).backgroundColor(SECONDARY_COLOR).step({ duration })
        animation.scale(1).backgroundColor(ACTIVE_COLOR).step({ duration })
        animation.scale(1).backgroundColor(NORMAL_COLOR).step({ duration })
        return animation.export()
      }
    }
  }
}

export default getMixin(mixin)

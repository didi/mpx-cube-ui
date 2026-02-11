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
      timer: null
    },
    lifetimes: {
      ready() {
        this.startLoop()
      },
      detached() {
        if (this.timer) {
          clearInterval(this.timer)
          this.timer = null
        }
      }
    },
    methods: {
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
      },
      startLoop() {
        this.startOnce()
        this.timer = setInterval(() => {
          this.startOnce()
        }, DURATION) as any
      },
      startOnce() {
        this.beforeAnim = {} as any
        this.middleAnim = {} as any
        this.afterAnim = {} as any
        this.$nextTick(() => {
          this.beforeAnim = this.createDotAnimation()
          setTimeout(() => {
            this.middleAnim = this.createDotAnimation()
          }, DURATION / 4)
          setTimeout(() => {
            this.afterAnim = this.createDotAnimation()
          }, DURATION / 2)
        })
      }
    }
  }
}

export default getMixin(mixin)

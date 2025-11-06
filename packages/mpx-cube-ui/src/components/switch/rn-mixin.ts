import mpx, { getMixin } from '@mpxjs/core'

let mixin = {} as Parameters<typeof getMixin>[0]
// eslint-disable-next-line
// @ts-ignore
if (__mpx_mode__ === 'ios' || __mpx_mode__ === 'android' || __mpx_mode__ === 'harmony') {
  type ANIMATION_PRESET = Record<
    string,
    (
      animationOptions: WechatMiniprogram.AnimationOption,
    ) => void
  >
  mixin = {
    data: {
      ANIMATION_PRESET: {} as ANIMATION_PRESET,
      switchAnimationData: {} as WechatMiniprogram.AnimationExportResult,
      switchHandleAnimationData: {} as WechatMiniprogram.AnimationExportResult
    },
    lifetimes: {
      created() {
        this.ANIMATION_PRESET = {
          'cube-switch-BGC': (animationOptions) => {
            const animation = this.bgAnimation || (this.bgAnimation = mpx.createAnimation({ ...animationOptions }))
            if (this.isOn) {
              const onBGC = this.switchOnGBC || '#FF6435'
              animation.backgroundColor(onBGC).step({ duration: animationOptions.duration })
            } else {
              const defaultBGC = this.switchDefaultGBC || '#EAEAEA'
              animation.backgroundColor(defaultBGC).step({ duration: animationOptions.duration })
            }
            this.switchAnimationData = animation.export()
          },
          'cube-switch-left': (animationOptions) => {
            const animation = this.handleAnimation || (this.handleAnimation = mpx.createAnimation({ ...animationOptions }))
            if (this.isOn) {
              animation.left(18).step({ duration: animationOptions.duration })
            } else {
              animation.left(2).step({ duration: animationOptions.duration })
            }
            this.switchHandleAnimationData = animation.export()
          }
        }
        this.$watch(
          'isOn',
          (n, o) => {
            if (!!n === !!o) return
            this.rnAnimation({
              duration: 300,
              timingFunction: 'ease'
            })
          }
        )
        if (this.isOn) {
          this.rnAnimation({
            duration: 0,
            timingFunction: 'ease'
          })
        }
      }
    },
    methods: {
      async rnAnimation(
        animationOptions: WechatMiniprogram.StepOption = {}
      ) {
        this.ANIMATION_PRESET['cube-switch-BGC'](animationOptions)
        this.ANIMATION_PRESET['cube-switch-left'](animationOptions)
      }
    }
  }
}
export default getMixin(mixin)

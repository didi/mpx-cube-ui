import mpx, { getMixin, REACTHOOKSEXEC } from '@mpxjs/core'
import { useEffect } from 'react'

let mixin = {} as Parameters<typeof getMixin>[0]
// eslint-disable-next-line
// @ts-ignore
if (__mpx_mode__ === 'ios' || __mpx_mode__ === 'android') {
  type ANIMATION_PRESET = Record<
    string,
    (
      animationOptions: WechatMiniprogram.AnimationOption,
    ) => void
  >
  mixin = {
    [REACTHOOKSEXEC] () {
      useEffect(() => {
        if (this.visibleClass === 'show') {
          this.isVisible = true
        } else if (this.visibleClass === 'hide') {
          this.isVisible = false
        }
      })
    },
    data: {
      animationData: {} as WechatMiniprogram.AnimationExportResult,
      rootAnimationData: {} as WechatMiniprogram.AnimationExportResult,
      maskAnimationData: {} as WechatMiniprogram.AnimationExportResult,
      ANIMATION_PRESET: {} as ANIMATION_PRESET,
      contentRect: {} as WechatMiniprogram.BoundingClientRectCallbackResult
    },
    computed: {
      contentInfo() {
        return {
          height: this.styleConfig?.content?.height || this.contentRect.height
        }
      }
    },
    lifetimes: {
      created() {
        this.ANIMATION_PRESET = {
          'cube-popup_mask_fade_transition': (animationOptions) => {
            const animation = this.maskAnimation || (this.maskAnimation = mpx.createAnimation({ ...animationOptions, timingFunction: 'ease-out' }))
            if (this.isVisible) {
              animation.opacity(0.4).step()
            } else {
              animation.opacity(0).step()
            }
            this.maskAnimationData = animation.export()
          },
          'cube-popup_transition': (animationOptions) => {
            if (!this.isVisible) {
              setTimeout(() => {
                this.display = false
              }, animationOptions.duration)
            }
          },
          'move-up': (animationOptions) => {
            const hasTranslate = !!this.animation
            const animation = this.animation || (this.animation = mpx.createAnimation(animationOptions))
            if (this.isVisible) {
              if (!hasTranslate) {
                animation.translateY(this.contentInfo.height).step({ duration: 0 })
              }
              animation.translateY(0).step()
            } else {
              animation.translateY(this.contentInfo.height).step()
            }
            this.animationData = animation.export()
          },
          'move-right': () => { /* empty fn */ },
          'move-left': () => { /* empty fn */ },
          'move-down': () => { /* empty fn */ },
          fade: (animationOption) => {
            const animation = this.animation || (this.animation = mpx.createAnimation(animationOption))
            if (this.isVisible) {
              animation.opacity(1).step()
            } else {
              animation.opacity(0).step()
            }
            this.animationData = animation.export()
          }
        }
        this.$watch(
          'isVisible',
          (n, o) => {
            if (!!n === !!o) return
            this.rnAnimation({
              duration: 300,
              timingFunction: 'ease-out'
            })
          },
          { immediate: true }
        )
      }
    },
    methods: {
      initContentRect() {
        if (this.visibleClass === 'hide' && this.isMaskClosed === true) {
          this.isMaskClosed = false
          return
        }
        if (this.styleConfig?.content?.height) return
        return new Promise((resolve) => {
          this.$nextTick(() => {
            this.$refs['popup-content'].boundingClientRect((res) => {
              this.contentRect = res
              resolve(res)
            }).exec()
          })
        })
      },
      async rnAnimation(
        animationOptions: WechatMiniprogram.StepOption = {}
      ) {
        await this.initContentRect()
        const names = [...Object.keys(this.rootClass).filter(v => this.rootClass[v]), this.transitionClass]
        if (!names.length) return
        names.forEach(v => {
          const presetFn = this.ANIMATION_PRESET[v]
          presetFn && presetFn(animationOptions)
        })
      }
    }
  }
}
export default getMixin(mixin)

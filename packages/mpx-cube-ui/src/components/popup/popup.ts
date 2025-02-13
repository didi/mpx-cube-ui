import mpx, { createComponent } from '@mpxjs/core'
import {
  popupMixin,
  visibilityMixin,
  themePropsMixin,
  varContextMixin
} from '../../common/mixins'

const EVENT_MASK_CLICK = 'maskClick'

type ANIMATION_PRESET = Record<
  string,
  (
    animationOptions: WechatMiniprogram.AnimationOption,
  ) => void
>

createComponent({
  options: {
    multipleSlots: true,
    styleIsolation: 'shared'
  },
  mixins: [popupMixin, visibilityMixin, themePropsMixin, varContextMixin],
  properties: {
    // 拓展 class 属性，cube-${type}，可用于样式覆盖和定制
    type: {
      type: String,
      value: ''
    },
    // 是否显示遮罩
    mask: {
      type: Boolean,
      value: true
    },
    // 文本内容，**微信&web** 支持 `html string` 的文本格式，**支付宝**目前不支持，所以需要自己转，具体见：支付宝 [rich-text文档](https://opendocs.alipay.com/mini/component/rich-text#%E5%B1%9E%E6%80%A7%E8%AF%B4%E6%98%8E)
    content: {
      type: String,
      value: ''
    },
    // 是否居中显示
    center: {
      type: Boolean,
      value: true
    },
    // todo 类型
    // 内容位置
    position: {
      type: String,
      value: ''
    },
    // todo
    // 过渡动画
    transition: {
      type: String,
      value: ''
    },
    styleConfig: {
      type: Object,
      value: {}
    },
    removeCatchTouch: {
      type: Boolean,
      value: false
    }
  },
  data: {
    visibleClass: '',
    transitionClass: '',
    animationData: {} as WechatMiniprogram.AnimationExportResult,
    rootAnimationData: {} as WechatMiniprogram.AnimationExportResult,
    maskAnimationData: {} as WechatMiniprogram.AnimationExportResult,
    ANIMATION_PRESET: {} as ANIMATION_PRESET,
    display: false,
    contentRect: {} as WechatMiniprogram.BoundingClientRectCallbackResult
  },
  lifetimes: {
    created() {
      // eslint-disable-next-line
      // @ts-ignore
      if (__mpx_mode__ === 'ios' || __mpx_mode__ === 'android') {
        this.ANIMATION_PRESET = {
          'cube-popup_mask_fade_transition': (animationOptions) => {
            const animation = this.maskAnimation || (this.maskAnimation = mpx.createAnimation(animationOptions))
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
              duration: 250,
              timingFunction: 'ease-out'
            })
          },
          { immediate: true }
        )
      }
    }
  },
  computed: {
    rootClass() {
      const cls: { [index: string]: boolean } = {
        'cube-popup_mask': this.mask,
        'cube-popup_mask_fade_transition': this.maskFadeTransition,
        'cube-popup_transition': !!this.transitionClass
      }
      if (this.type) {
        cls[`cube-${this.type}`] = true
      }
      if (this.position) {
        cls[`cube-popup-${this.position}`] = true
      } else if (this.center) {
        cls['cube-popup-center'] = true
      }
      // eslint-disable-next-line
      // @ts-ignore
      if (__mpx_mode__ === 'ios' || __mpx_mode__ === 'android') {
        cls[`cube-popup-${this.display ? 'show' : 'hide'}`] = true
      }
      return cls
    },
    contentInfo() {
      return {
        height: this.styleConfig?.content?.height || this.contentRect.height
      }
    }
  },
  methods: {
    initContentRect() {
      if (this.styleConfig?.content?.height) return
      return new Promise((resolve) => {
        setTimeout(() => {
          this.$refs["popup-content"]
          .boundingClientRect((res) => {
            this.contentRect = res
            resolve(res)
          }).exec()
        })
      })
    },
    getWindowInfo() {
      if (this.windowInfo) return this.windowInfo
      return (this.windowInfo = mpx.getWindowInfo())
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
    },
    contentHideAnimationend() {
      // bug:
      // a 页面弹窗，进入到b页面，再b页面返回a页面，会有 hide 的animation 动画
      // 转 web 后，因使用的是keep-alive，dom有animation动画的class，挂载后触发动画
      // tips:
      // bindanimationend仅web生效，微信小程序不生效
      this.transitionClass = ''
    },
    preventTouchMove(e: any) {
      e.preventDefault && e.preventDefault()
    },
    onMaskClick() {
      // 点击遮罩
      this.triggerEvent(EVENT_MASK_CLICK)
      if (this.maskClosable) {
        this.hide()
      }
    },
    show() {
      this.isVisible = true
      this.display = true
      this.visibleClass = 'show'
      this.transitionClass = this.transition
    },
    hide() {
      this.isVisible = false
      this.visibleClass = 'hide'
      this.transitionClass = this.transition
    }
  }
})

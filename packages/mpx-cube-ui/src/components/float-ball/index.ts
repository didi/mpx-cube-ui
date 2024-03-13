import mpx, { MOUNTED } from '@mpxjs/core'
import { createComponent } from '../../common/helper/create-component'

const EVENT_BALL_CLICK = 'click'
const EVENT_TOUCH_START = 'touchstart'
const EVENT_TOUCH_MOVE = 'touchmove'
const EVENT_TOUCH_END = 'touchend'

const res = mpx.getSystemInfoSync()
// 屏幕尺寸
const CLIENT_WIDTH = res.windowWidth
const CLIENT_HEIGHT = res.windowHeight
// 屏幕左右边界
const CLINET_LEFT = 0
const CLINET_TOP = 0

createComponent({
  properties: {
    /**
     * @description 小球文案。若引用时未提供文案则显示插槽内用户自定义内容
     * @ali true
     * @wx true
     * @web true
     */
    name: {
      type: String,
      value: ''
    },
    /**
     * @description 屏幕边框停靠距离。默认为零，吸附停靠为左右屏幕边框
     * @ali true
     * @wx true
     * @web true
     */
    dockDistance: {
      type: Number,
      value: 0
    },
    /**
     * @description 指定小球初始距离屏幕原点的 left/top 位置。该属性未指定的话则默认在屏幕右侧居中位置。
     * @ali true
     * @wx true
     * @web true
     */
    initialPosition: {
      type: Object,
      value: {}
    }
  },
  data: {
    left: -999,
    top: -999,
    maxRight: 0,
    maxBottom: 0,
    sizeW: 0,
    sizeH: 0,
    defaultPos: {},
    showTransition: false
  },
  computed: {
    positionStyle() {
      let left = CLIENT_WIDTH; let top = CLIENT_HEIGHT / 2
      if (this.left !== -999 && this.top !== -999) {
        left = this.left
        top = this.top
      } else if (this.initialPosition && typeof this.initialPosition.left === 'number' && typeof this.initialPosition.top === 'number') {
        left = this.initialPosition.left
        top = this.initialPosition.top
      } else if (this.defaultPos && typeof this.defaultPos.left === 'number' && typeof this.defaultPos.top === 'number') {
        left = this.defaultPos.left
        top = this.defaultPos.top
      }

      return { left: `${left}px`, top: `${top}px` }
    },
    floatBallClass() {
      return {
        'cube-float-ball': true,
        [`cube-float-ball-${this.themeType}`]: this.themeType,
        'cube-float-ball-transition': this.showTransition
      }
    }
  },
  [MOUNTED]() {
    // 小球的尺寸
    this.$refs.ball
      .fields({ size: true }, res => {
        // 小球的初始位置
        this.sizeW = res.width
        this.sizeH = res.height
        this.defaultPos = {
          left: Math.floor(CLIENT_WIDTH - this.sizeW - this.dockDistance),
          top: Math.floor(CLIENT_HEIGHT / 2 - this.sizeH / 2)
        }
        // 最大移动范围的右边位置 和 下边位置
        this.maxRight = CLIENT_WIDTH - this.sizeW
        this.maxBottom = CLIENT_HEIGHT - this.sizeH
      })
      .exec()
  },
  methods: {
    startHandler(e) {
      // 手指接触小球时触发
      // @arg event 事件对象
      this.triggerEvent(EVENT_TOUCH_START, e)
      this.showTransition = false
      this.startTime = +new Date()
      if (__mpx_mode__ === 'web') {
        e && e.preventDefault()
      }
    },
    moveHandler(e) {
      // 手指移动小球时触发
      // @arg event 事件对象
      this.triggerEvent(EVENT_TOUCH_MOVE, e)
      const X = e.touches[0].clientX - this.sizeW / 2 // icon横坐标
      const Y = e.touches[0].clientY - this.sizeH / 2 // icon纵坐标

      /**
       * 为x、y坐标限定左右区间，此写法只是用左区间为0
       * 当CLINET_LEFT为负时，&& 的第一项值为 0，0为假，就不会走后面的判断，于是此表达式返回第一项的值
       * 当CLINET_LEFT为正时，&& 的第一项值为真，则此时返回后面表达式的值
       */
      this.left = Math.max(X, CLINET_LEFT) && Math.min(X, this.maxRight)
      this.top = Math.max(Y, CLINET_TOP) && Math.min(Y, this.maxBottom)
      if (__mpx_mode__ === 'web') {
        e && e.preventDefault()
      }
    },
    endHandler(e) {
      // 手指抬起小球时触发
      // @arg event 事件对象
      this.triggerEvent(EVENT_TOUCH_END, e)
      this.showTransition = true
      const endTime = +new Date()
      if (endTime - this.startTime < 200) {
        // 手指点击小球触发
        // @arg event 事件对象
        this.triggerEvent(EVENT_BALL_CLICK, e)
      } else {
        const x = e.changedTouches[0].clientX // 手指横坐标
        const Y = e.changedTouches[0].clientY - this.sizeH / 2 // icon纵坐标
        const DISTANCE = this.dockDistance

        this.left =
          x <= CLIENT_WIDTH / 2
            ? CLINET_LEFT + DISTANCE
            : this.maxRight - DISTANCE
        this.top = Math.max(Y, CLINET_TOP) && Math.min(Y, this.maxBottom)
      }
    }
  }
})

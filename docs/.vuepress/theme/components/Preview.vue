<template>
  <div
    ref="container"
    class="preview-container"
  >
    <div
      class="preview"
      ref="preview"
      v-show="showSimulator"
    >
      <span class="current-time">{{ time }}</span>
      <header class="header">
        <i
          class="cubeic cubeic-back"
          v-show="showBack"
          @click="goBack()"
        />
        {{ title }}
      </header>
      <div class="simulator-wrapper">
        <iframe
          ref="simulator"
          class="simulator"
          :src="previewPath"
          frameborder="0"
          width="100%"
          height="100%"
        />
      </div>
      <div class="footer" />
    </div>
  </div>
</template>

<script>
import { throttle } from 'lodash'
import { EXAMPLE_DOC_PORT } from '../../../../config/index'

const baseUrl =
  process.env.NODE_ENV === 'development'
    ? `http://localhost:${EXAMPLE_DOC_PORT}/`
    : `/mpx-cube-ui/example/index.html`

/**
 * 轮询
 * @param cb
 * @param delay
 * @returns
 */
const polling = (cb, delay = 3000) => {
  let firstCall = true
  const timerRef = {
    value: -1
  }
  const pollingFunc = function (...args) {
    if (firstCall) {
      firstCall = false
      cb.call(this, ...args)
    }
    clearTimeout(timerRef.value)
    timerRef.value = setTimeout(() => {
      cb.call(this, ...args)
      pollingFunc(...args)
    }, delay)
    return timerRef
  }
  return pollingFunc
}

const getComponent = (list) => {
  if (!Array.isArray(list)) {
    return null
  }
  for (const item of list) {
    if (location.href.includes(`${item.path}.html`)) {
      return item.title
    }
    const title = getComponent(item.children)
    if (title) {
      return title
    }
  }
  return null
}

const getTime = () => {
  const now = new Date()
  return `${`${now.getHours()}`.padStart(2, 0)}:${`${now.getMinutes()}`.padStart(2, 0)}`
}

export default {
  data() {
    return {
      flush: 1,
      time: getTime(),
      timer: null,
      showSimulator: false,
      componentName: ''
    }
  },
  computed: {
    previewPath() {
      if (this.componentName) {
        return `${baseUrl}#/pages/${this.componentName}/index`
      }
      return baseUrl
    },
    title() {
      if (!this.flush) {
        return ''
      }
      return (
        getComponent([
          this.$themeConfig.sidebar.find((item) => item.title === '组件'),
        ]) || this.$siteTitle
      )
    },
    showBack() {
      return this.title !== this.$siteTitle
    }
  },
  watch: {
    $route(to) {
      this.flush += 1
      this.syncChildPath(to)
    }
  },
  created() {
    const img = new Image()
    const show = () => {
      this.showSimulator = true
      setTimeout(() => {
        this.handleResize()
      })
    }
    img.src = '/mpx-cube-ui/images/iphoneX.png'
    img.onload = show
    img.onerror = show
    this.timer = polling(() => {
      this.time = getTime()
    }, 6000)()

    window.addEventListener('message', this.handleMessage)
  },
  mounted() {
    this.componentName = this.getComponentName(top.location.href)
    this.handleResize()
    this.calcPreviewerPosition()
    window.addEventListener('resize', this.handleResize)
    window.addEventListener('scroll', this.calcPreviewerPosition)
    this.$refs.simulator.onload = () => {
      this.syncChildPath(this.$router.currentRoute)
    }
  },
  beforeDestroy() {
    clearTimeout(this.timer.value)
    window.removeEventListener('resize', this.handleResize)
    window.removeEventListener('scroll', this.calcPreviewerPosition)
    window.removeEventListener('message', this.handleMessage)
  },
  methods: {
    syncChildPath(to) {
      this.$refs.simulator.contentWindow.postMessage({
        to: this.getComponentName(to.path)
      }, '*')
    },
    goBack() {
      this.$router.back()
    },
    handleMessage(e) {
      if (e.data?.component !== undefined) {
        if (!e.data?.component) {
          this.$router.replace('/guide/intro.html')
          return
        }
        const data = e.data
        const findComponent = (list) => {
          if (!Array.isArray(list)) {
            return null
          }
          for (const item of list) {
            if (item.path?.endsWith(data.component)) {
              return item
            }
            const target = findComponent(item.children)
            if (target) {
              return target
            }
          }
          return null
        }
        const component = findComponent([
          this.$themeConfig.sidebar.find((item) => item.title === '组件'),
        ])
        if (component) {
          this.$router.push(`${component.path}.html`)
        }
      }
    },
    handleResize: throttle(function () {
      this.calcPreviewerHeight()
      this.calcPreviewerTransform()
    }, 6),
    calcPreviewerHeight() {
      const el = this.$refs.preview
      el.style.height = `${window.innerHeight - 110}px`
    },
    calcPreviewerTransform() {
      let offset = 0
      const el = this.$refs.preview

      if (!el.offsetParent) {
        const container = this.$refs.container
        const elOffsetLeft = el.offsetLeft
        const containerOffsetLeft = container.offsetLeft
        offset = containerOffsetLeft - elOffsetLeft
      } else {
        const clientRect = el.getBoundingClientRect()
        const innerWidth = window.innerWidth
        offset =
          clientRect.right < innerWidth
            ? 0
            : clientRect.right - innerWidth + 24 // 24为右边距
      }
      el.style.transform = `translateX(${offset}px)`
    },
    calcPreviewerPosition: throttle(function () {
      const el = this.$refs.preview
      const offset = document.documentElement.scrollLeft
      el.style.right = `${offset + 24}px`
    }, 6),
    getComponentName(path) {
      let componentName = ''
      const [_, componentPath] = path.split('components')

      if (!componentPath) {
        return componentName
      }
      componentPath.replace(/\/(.*?).html/, (_, res) => {
        if (res.indexOf('/') > 0) {
          componentName = res.split('/')[1]
        } else {
          componentName = res
        }
      })
      return componentName
    }
  }
}
</script>

<style lang="stylus" scoped>
.preview-container
  position relative
  width 385px
  min-width 385px
  padding-right 24px
  box-sizing border-box
  overflow hidden

  .preview
    margin-top: 2rem
    position fixed
    top 0
    right 24px
    // safari shit
    width: 0
    width 360px
    min-width 360px
    height 667px
    min-height 560px
    max-height 667px
    background-color #fff
    border-radius 20px 20px 100px 100px
    // box-shadow 0 8px 12px #ebedf0
    background url("/mpx-cube-ui/images/iphoneX.png") no-repeat center 0
    background-size 100%
    padding 25px
    padding-top 54px
    box-sizing border-box
    .current-time
      position absolute
      left 38px
      top 28px
      font-size 12px
      font-weight 700
      padding 3px 10px
      color #a3a6a9
      background-color #edf0f4
    .header
      position relative
      z-index 1
      line-height 32px
      height 32px
      padding-bottom 6px
      font-weight 700
      text-align center
      background-color #edf0f4
      .cubeic-back
        position absolute
        top calc(50% - 3px)
        left 0
        transform translateY(-50%)
        width 0
        height 0
        padding 0 6px
        border 8px solid rgba(0, 0, 0, 0)
        border-right 8px solid #fc9153
        cursor pointer
        &:after
          content: ''
          position: absolute
          top -4px
          right -13px
          width 8px
          height 8px
          background #edf0f4
          transform rotate(45deg)
    .simulator-wrapper
      position absolute
      left 25px
      top 90px
      right 25px
      bottom 18px
      z-index 10
      .simulator
        border-radius 0 0 53px 53px
        background-color var(--bg-color)
    .footer
      position absolute
      left 7px
      bottom 0
      width calc(100% - 24.5px)
      height 200px
      border 4.5px solid #d9dce2
      border-top none
      border-radius 0 0 60px 60px
      background #fff
      overflow hidden
      &::after
        content ''
        left 12px
        bottom 13px
        position absolute
        width calc(100% - 24px)
        height 100%
        border-radius 0 0 54px 54px
        background-color var(--bg-color)
        border 1px solid #fafbfc
</style>

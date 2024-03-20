<template>
  <div
    class="theme-container"
    :class="pageClasses"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <Navbar ref="navbar" v-if="shouldShowNavbar" @toggle-sidebar="toggleSidebar" />
    <div class="sidebar-mask" @click="toggleSidebar(false)" />
    <Sidebar ref="sidebar" :items="sidebarItems" @toggle-sidebar="toggleSidebar" />
    <div class="main-container" :style="style">
      <Home class="main" v-if="$page.frontmatter.home" />
      <Page class="main" v-else :sidebar-items="sidebarItems" />
      <ClientOnly>
        <Preview ref="preview" class="show-absolute" />
      </ClientOnly>
    </div>
  </div>
</template>

<script>
import Home from '@parent-theme/components/Home.vue'
import Navbar from '@parent-theme/components/Navbar.vue'
import Page from '@parent-theme/components/Page.vue'
import Sidebar from '@parent-theme/components/Sidebar.vue'
import { resolveSidebarItems } from '@parent-theme/util'
import Preview from '@theme/components/Preview.vue'
import { throttle } from 'lodash'

export default {
  name: 'Layout',
  data() {
    return {
      style: {},
      isSidebarOpen: false,
      preHash: '',
      preHashEl: null,
      firstTime: true,
      navbarIsHidden: false
    }
  },
  computed: {
    shouldShowNavbar() {
      const { themeConfig } = this.$site
      const { frontmatter } = this.$page
      if (frontmatter.navbar === false || themeConfig.navbar === false) {
        return false
      }
      return (
        this.$title ||
        themeConfig.logo ||
        themeConfig.repo ||
        themeConfig.nav ||
        this.$themeLocaleConfig.nav
      )
    },
    shouldShowSidebar() {
      const { frontmatter } = this.$page
      return (
        !frontmatter.home &&
        frontmatter.sidebar !== false &&
        this.sidebarItems.length
      )
    },
    sidebarItems() {
      return resolveSidebarItems(
        this.$page,
        this.$page.regularPath,
        this.$site,
        this.$localePath
      )
    },
    pageClasses() {
      const userPageClass = this.$page.frontmatter.pageClass
      return [
        {
          'no-navbar': !this.shouldShowNavbar,
          'sidebar-open': this.isSidebarOpen,
          'no-sidebar': !this.shouldShowSidebar
        },
        userPageClass
      ]
    }
  },
  mounted() {
    /* 初始化页面跳转 */
    document.querySelector('.theme-container').addEventListener('click', (e) => {
      if (e && e.target && e.target.classList.contains('css-var-default')) {
        this.handleHashChange(e)
      }
    })
    const initHash = () => {
      setTimeout(() => {
        this.handleHashChange()
      }, 500)
    }
    initHash()
    this.$router.afterEach(() => {
      initHash()
    })
    /* 计算main-container样式 */
    this.style = this.calcStyle()
    window.addEventListener('scroll', this.resetPosition)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.resetPosition)
  },
  methods: {
    /**
     * 场景：处理a标签跳转事件和页面跳转在加载后存在hash的情况
     * 作用：跳转并高亮目标元素
     * @param {Event} e
     */
    handleHashChange(e) {
      let targetHash = ''
      if (e) {
        targetHash = e.target.getAttribute('href').slice(1)
        e.preventDefault && e.preventDefault()
      }

      const curHash = targetHash || document.location.hash.slice(1)
      document.location.hash = `#${curHash}`

      const curHashEl = document.getElementById(decodeURIComponent(curHash))
      if (!curHashEl) return false

      if (this.preHashEl) this.preHashEl.classList.remove('active')
      curHashEl.classList.add('active')
      // 由于上文修改了location.hash，导致scroll失效，二者需要先后异步执行
      this.$nextTick(() => {
        curHashEl.scrollIntoView({ behavior: "smooth" })
      })

      this.preHash = curHash
      this.preHashEl = curHashEl
      // 返回false阻止原生跳转
      return false
    },
    toggleSidebar(to) {
      this.isSidebarOpen = typeof to === 'boolean' ? to : !this.isSidebarOpen
      this.$emit('toggle-sidebar', this.isSidebarOpen)
    },
    // side swipe
    onTouchStart(e) {
      this.touchStart = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
      }
    },
    onTouchEnd(e) {
      const dx = e.changedTouches[0].clientX - this.touchStart.x
      const dy = e.changedTouches[0].clientY - this.touchStart.y
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        if (dx > 0 && this.touchStart.x <= 80) {
          this.toggleSidebar(true)
        } else {
          this.toggleSidebar(false)
        }
      }
    },
    resetPosition: throttle(function() {
      const navbar = this.$refs.navbar.$el
      const sidebar = this.$refs.sidebar.$el
      const preview = this.$refs.preview.$el
      const isMobile = getComputedStyle(preview)?.display === 'none'
      const clientRect = navbar.getBoundingClientRect()
      const isHidden = clientRect.bottom <= 0
      const reset = () => {
        // sidebar fixed
        sidebar.className = sidebar.className.includes('fixed')
          ? sidebar.className
          : `${sidebar.className} fixed`
        // simulator fixed
        preview.className = preview.className.replace(/\s*show-absolute\s*/, '')
      }
      if (isMobile) {
        reset()
        return
      }
      if (isHidden === this.navbarIsHidden) {
        return
      }
      this.navbarIsHidden = isHidden
      if (this.navbarIsHidden) {
        reset()
      } else {
        sidebar.className = sidebar.className.replace(/\s*fixed\s*/, '')
        preview.className = preview.className.includes('show-absolute')
          ? preview.className
          : `${preview.className} show-absolute`
      }
    }, 6),
    calcStyle() {
      const scrollBarWidth = window.innerWidth - document.body.clientWidth + 1 // + 1 兼容edge
      return {
        width: `calc(100vw - ${scrollBarWidth}px)`
      }
    }
  },
  components: {
    Home,
    Page,
    Sidebar,
    Navbar,
    Preview
  }
}
</script>

<style lang="stylus" scoped>
.theme-container
  height 100%

.main-container
  display flex
  min-height 100vh
  width 100vw
  @media screen and (max-width: $MQMobile)
    flex-direction: column
    .preview-container
      display: none
  .main
    flex 1
    min-width: 600px
    background-color var(--bg-color)
    @media screen and (max-width: $MQMobileNarrow)
      min-width: unset
    ::v-deep .page-edit
      display none
  .preview-container
    flex-shrink 0
    background-color var(--bg-color)
    &.show-absolute
      ::v-deep .preview
        position absolute
        right 24px !important
        transform none !important

.page
  padding-bottom 0
  // padding-right 372px
  @media screen and (max-width 960px)
    padding-right 0

</style>

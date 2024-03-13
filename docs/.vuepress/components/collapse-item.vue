<template>
  <div class="collapse-item-wrap">
    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
      @before-leave="beforeLeave"
      @leave="leave"
      @after-leave="afterLeave">
      <!-- 用于触发 transition 组件中事件 -->
      <!-- TODO: ?? -->
      <!-- 此处魔改 element-ui，用于增加最小显示行数功能 -->
      <div v-show="isActive"></div>
    </transition>

    <div @click="clickItem" v-if="showArrow" ref="controlBar" class="bar-wrapper">
      <slot name="control">
        <div class="bar">
          <span class="text">{{isActive ? controlText[0] : controlText[1]}}</span>
          <i class="cubeic-select" :class="{ 'unselect': !isActive }"></i>
        </div>
      </slot>
    </div>
    <div ref="wrap" :style="contentWrapStyle" class="collapse-content-wrap">
      <slot ref="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'collapse-item',
  inject: ['collapse'],
  props: {
    title: {
      type: String,
      default: ''
    },
    name: {
      type: [String, Number],
      default() {
        return this._uid
      }
    },
    maxHeight: {
      type: String,
      default: '0'
    },
    controlText: {
      type: Array,
      default: () => {
        return ['收起', '展开']
      }
    }
  },
  computed: {
    isActive() {
      return this.collapse.activeNames.indexOf(this.name) > -1
    },
    contentWrapStyle() {
      return {
        maxHeight: this.isActive ? this.contentHeight : this.maxHeight
      }
    }
  },
  data() {
    return {
      showArrow: true,
      contentHeight: 'none'
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.coputeBarPosition()

      const el = this.$refs.wrap
      this.contentHeight = el.scrollHeight + 'px'
      if (this.maxHeight === 0) {
        this.showArrow = true
      } else if (this.maxHeight === 'none') {
        this.showArrow = false
      } else {
        this.showArrow = +this.maxHeight.replace('px', '') < el.scrollHeight
      }
    })
  },
  methods: {
    clickItem() {
      this.collapse.handleItemClick(this.name)
    },
    beforeEnter() {
      const el = this.$refs.wrap
      if (!el.dataset) el.dataset = {}

      el.dataset.oldPaddingTop = el.style.paddingTop
      el.dataset.oldPaddingBottom = el.style.paddingBottom

      el.style.maxHeight = this.maxHeight
      el.style.paddingTop = 0
      el.style.paddingBottom = 0
    },
    enter() {
      const el = this.$refs.wrap
      el.dataset.oldOverflow = el.style.overflow
      if (el.scrollHeight !== 0) {
        el.style.maxHeight = el.scrollHeight + 'px'
        el.style.paddingTop = el.dataset.oldPaddingTop
        el.style.paddingBottom = el.dataset.oldPaddingBottom
      } else {
        el.style.maxHeight = ''
        el.style.paddingTop = el.dataset.oldPaddingTop
        el.style.paddingBottom = el.dataset.oldPaddingBottom
      }

      el.style.overflow = 'hidden'
    },
    afterEnter() {
      const el = this.$refs.wrap
      // for safari: remove class then reset height is necessary
      el.style.maxHeight = 'auto'
      el.style.overflow = el.dataset.oldOverflow
    },
    beforeLeave() {
      const el = this.$refs.wrap
      if (!el.dataset) el.dataset = {}
      el.dataset.oldPaddingTop = el.style.paddingTop
      el.dataset.oldPaddingBottom = el.style.paddingBottom
      el.dataset.oldOverflow = el.style.overflow

      el.style.maxHeight = el.scrollHeight + 'px'
      el.style.overflow = 'hidden'
    },
    leave() {
      const el = this.$refs.wrap

      if (el.scrollHeight !== 0) {
        // for safari: add class after set height, or it will jump to zero height suddenly, weired
        el.style.maxHeight = this.maxHeight
        el.style.paddingTop = 0
        el.style.paddingBottom = 0
      }
    },
    afterLeave() {
      const el = this.$refs.wrap
      el.style.maxHeight = this.maxHeight
      el.style.overflow = el.dataset.oldOverflow
      el.style.paddingTop = el.dataset.oldPaddingTop
      el.style.paddingBottom = el.dataset.oldPaddingBottom
    },
    coputeBarPosition() {
      const el = this.$slots.default[0].elm
      const bar = this.$refs.controlBar

      const style = window.getComputedStyle(el)
      bar.style.borderTopLeftRadius = style.borderTopLeftRadius
      bar.style.borderTopRightRadius = style.borderTopRightRadius
      el.style.borderTopLeftRadius = 0
      el.style.borderTopRightRadius = 0
    }
  }
}
</script>

<style lang="stylus">
.collapse-item-wrap
  margin-top 14px
  pre
    margin 0 !important
  .bar-wrapper
    position relative
    background-color #eff2f5
    border-bottom: 1px solid #e3e3e3
  .bar
    padding-left 16px
    height 30px
    line-height 30px
    text-align right
    cursor pointer
    user-select: none
    &:hover
      .text
        color: $accentColor
      .cubeic-select
        border-top: 6px solid $accentColor
    .text
      font-size: 14px
      color: #2c3e50
      transition: color .3s
    .cubeic-select
      display inline-block
      margin-left 6px
      margin-right 20px
      transform rotateZ(-180deg)
      transition all .3s
      position: relative
      top: -2px
      border-top 6px solid #2c3e50
      border-right 5px solid transparent
      border-left 5px solid transparent
    .unselect
      top: -2px
      transform rotateZ(0deg)
  .collapse-content-wrap
    overflow hidden
    transition max-height .3s
</style>

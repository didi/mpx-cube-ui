<script>
import { isActive, emit } from '@parent-theme/util'

function renderLink(h, to, text, active, layoutInstance) {
  const component = {
    props: {
      to,
      activeClass: '',
      exactActiveClass: ''
    },
    class: {
      active,
      'sidebar-link': true
    },
    nativeOn: {
      click() {
        // 点击后关闭菜单
        layoutInstance?.toggleSidebar(false)
      }
    }
  }
  return h('RouterLink', component, text)
}

function renderExternal(h, to, text) {
  return h(
    'a',
    {
      attrs: {
        href: to,
        target: '_blank',
        rel: 'noopener noreferrer',
      },
      class: {
        'sidebar-link': true,
      },
    },
    [text, h('OutboundLink')]
  )
}

export default {
  functional: true,
  props: ['item', 'sidebarDepth'],
  render(h, {
      parent: { $route, $parent },
      props: { item },
    }) {
    let parent = $parent
    let layoutInstance = null

    while (parent) {
      if (parent.$vnode?.componentOptions.Ctor.options.name === 'Layout') {
        layoutInstance = parent
        break
      }
      parent = parent.$parent
    }

    const selfActive = isActive($route, item.path)
    const active =
      item.type === 'auto'
        ? selfActive ||
          item.children.some((c) =>
            isActive($route, item.basePath + '#' + c.slug)
          )
        : selfActive
    const link = item.type === 'external'
        ? renderExternal(h, item.path, item.title || item.path)
        : renderLink(h, item.path, item.title || item.path, active, layoutInstance)

    return link
  },
}
</script>

<style lang='stylus'>
.sidebar .sidebar-sub-headers
  padding-left 1rem
  font-size 0.95em
a.sidebar-link
  font-size 1em
  font-weight 400
  display inline-block
  color $textColor
  border-left 0.25rem solid transparent
  padding 0.35rem 0.35rem 0.35rem 1.25rem
  line-height 1.4
  width: 100%
  box-sizing: border-box
  &:hover
    color $accentColor
  &.active
    font-weight 600
    color $accentColor
    border-left-color $accentColor
  .sidebar-group &
    padding-left 2rem
  .sidebar-sub-headers &
    padding-top 0.25rem
    padding-bottom 0.25rem
    border-left none
    &.active
      font-weight 500
</style>

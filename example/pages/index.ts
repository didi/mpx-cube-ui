import mpx, { createPage, ref, onMounted, onUnmounted } from '@mpxjs/core'
import demoConfig from '../common/config'
import { currentTheme, useTheme, themeList } from '../common/theme'

const SCROLL_KEY = '___scoll_top___'

createPage({
  setup(props, context) {
    const onClick = (item: string) => {
      const component = `${item.replace(/\(.*\)/, '')}`
      const route = `./${component}/index`
      if (__mpx_mode__ === 'web' && window.parent !== window) {
        window.parent.postMessage({
          component
        }, '*')
        return
      }
      mpx.navigateTo({
        url: route
      })
    }

    const { themeType } = useTheme()
    const themeText = ref(themeList[currentTheme.value].text)
    const themeIndex = ref([currentTheme.value]) // 默认乘客
    const onChooseTheme = () => {
      context.refs.pickerPopup.show()
    }

    const onThemeChange = (e) => {
      const { selectedIndex, selectedText } = e.detail
      themeIndex.value[0] = selectedIndex[0]
      currentTheme.value = selectedIndex[0]
      themeText.value = selectedText[0]
    }

    const show = ref(true)
    const isIframe = __mpx_mode__ === 'web' && window.parent !== window
    const handleScroll = () => {
      localStorage.setItem(SCROLL_KEY, String(document.documentElement.scrollTop))
    }
    if (isIframe) {
      show.value = false
      window.addEventListener('scroll', handleScroll)
      window.onbeforeunload = () => {
        localStorage.setItem(SCROLL_KEY, '0')
      }
    }

    onMounted(() => {
      if (isIframe) {
        setTimeout(() => {
          show.value = true
          document.documentElement.scrollTop = Number(localStorage.getItem(SCROLL_KEY))
        })
      }
    })

    onUnmounted(() => {
      if (isIframe) {
        window.removeEventListener('scroll', handleScroll)
      }
    })

    return {
      show,
      componentList: demoConfig.entryMap.introduce,
      themeList: [
        themeList
      ],
      onClick,
      themeIndex,
      themeText,
      themeType,
      onChooseTheme,
      onThemeChange
    }
  }
})

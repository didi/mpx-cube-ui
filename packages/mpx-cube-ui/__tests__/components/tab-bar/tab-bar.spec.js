const simulate = require('@mpxjs/miniprogram-simulate')

describe('component tab-bar unit test', () => {
  const componentId = simulate.loadMpx('src/components/tab-bar/index.mpx')
  const tabId = simulate.loadMpx('src/components/tab-bar/tab.mpx')
  const iconId = simulate.loadMpx('src/components/icon/index.mpx')
  const BASE_PROPS = {
    tabs: [
      {
        label: 'Home',
        value: 0,
        icon: 'home'
      }, {
        label: 'Like',
        value: 1,
        icon: 'like'
      }, {
        label: 'User',
        value: 2,
        icon: 'user'
      }, {
        label: 'Star',
        value: 3,
        icon: 'star'
      }
    ]
  }
  const DEFAULT_PROPS = {
    value: 0,
    tabs: [],
    inline: false,
    showSlider: false,
    useTransition: true
  }

  beforeEach(() => {
    jest.resetModules()
  })

  function newComponent(props) {
    const component = simulate.render(componentId, {
      ...BASE_PROPS,
      ...props
    })
    const parent = document.createElement('parent')
    component.attach(parent)
    return component
  }

  async function snapTest(props) {
    const component = newComponent(props)
    await simulate.sleep(10)
    expect(component.dom.innerHTML).toMatchSnapshot()
  }

  describe('render check', () => {
    it('render', async () => {
      await snapTest()
      await snapTest({
        value: 1
      })
      await snapTest({
        tabs: BASE_PROPS.tabs.slice(1, 3)
      })
      await snapTest({
        inline: true
      })
      await snapTest({
        showSlider: true
      })
      await snapTest({
        useTransition: true
      })
    })
  })

  describe('event check', () => {
    it('click event', async () => {
      const component = newComponent()
      expect(component.dom.innerHTML).toMatchSnapshot()
      const clickFn = jest.fn()
      // 触发组件树中的节点自定义事件
      component.addEventListener('click', clickFn)
      const cubTab = component.querySelector('.cube-tab')
      cubTab.querySelector('.cube-tab').dispatchEvent('tap')
      await simulate.sleep(10)
      expect(clickFn).toHaveBeenCalled()
    })
  })

  describe('props check', () => {
    it('prop default', async () => {
      const component = newComponent()
      const data = component.instance.data
      expect(data.value).toBe(DEFAULT_PROPS.value)
      expect(data.tabs).toEqual(BASE_PROPS.tabs)
      expect(data.inline).toBe(DEFAULT_PROPS.inline)
      expect(data.showSlider).toEqual(DEFAULT_PROPS.showSlider)
      expect(data.useTransition).toBe(DEFAULT_PROPS.useTransition)
      await simulate.sleep(10)
      expect(component.dom.innerHTML).toMatchSnapshot()
      const valueDom = component.querySelector('.cube-tab').querySelector('.cube-tab').dom
      expect(valueDom.className).toMatch('cube-tab--cube-tab_active')
    })

    it('props value', async () => {
      const idx = 1
      const component = newComponent({ value: idx })
      const instance = component.instance
      const tabs = component.querySelectorAll('.cube-tab')
      await simulate.sleep(10)
      expect(component.dom.innerHTML).toMatchSnapshot()
      expect(instance.data.value).toBe(idx)
      expect(tabs[idx].data.isActive).toBe(true)
    })

    it('props tabs', async () => {
      const component = newComponent()
      const getTpl = (icon, text) => `<cube-icon><wx-view class="cube-icon--cubeic cube-icon--cubeic cube-icon--cubeic-${icon}" style=""></wx-view></cube-icon><wx-rich-text><wx-view class="rich-text">${text}</wx-view></wx-rich-text>`
      await simulate.sleep(10)
      expect(component.dom.innerHTML).toMatchSnapshot()
      const tabs = [...component.querySelectorAll('.cube-tab')].map(comp => comp.querySelector('.cube-tab'))
      for (let i = 0; i < BASE_PROPS.tabs.length; i += 1) {
        expect(tabs[i].dom.innerHTML).toBe(getTpl(BASE_PROPS.tabs[i].icon, BASE_PROPS.tabs[i].label))
      }
    })

    it('props inline', async () => {
      const component = newComponent({
        inline: true
      })
      await simulate.sleep(10)
      expect(component.dom.innerHTML).toMatchSnapshot()
      const instance = component.instance
      const tabBar = component.querySelector('.cube-tab-bar')
      const className = tabBar.dom.className
      expect(className).toMatch('cube-tab-bar_inline')
      expect(instance.data.inline).toBe(true)
    })

    it('props showSlider', async () => {
      const component = newComponent({
        showSlider: true
      })
      await simulate.sleep(10)
      expect(component.dom.innerHTML).toMatchSnapshot()
      const instance = component.instance
      const slider = component.querySelector('.cube-tab-bar-slider')
      expect(slider).toBeDefined()
      expect(instance.data.showSlider).toBe(true)
    })

    it('props useTransition', async () => {
      const component = newComponent({
        useTransition: true
      })
      await simulate.sleep(300)
      expect(component.dom.innerHTML).toMatchSnapshot()
      const instance = component.instance
      const tabBar = component.querySelector('.cube-tab-bar')
      const className = tabBar.dom.className
      expect(className).toMatch('cube-tab-bar_transition')
      expect(instance.data.useTransition).toBe(true)
    })
  })

  describe('slot check', () => {
    const text = '123'
    const component = simulate.render(simulate.load({
      usingComponents: {
        'cube-tab-bar': componentId,
        'cube-tab': tabId,
        'cube-icon': iconId
      },
      template: `
        <cube-tab-bar
          custom-content
          tabs="{{tabs}}"
          wx:model="{{selectedLabelSlotsOnly}}"
          wx:model-prop="value"
          bindclick="clickHandler"
        >
          <cube-tab
            class="cube-tab"
            wx:for="{{tabs}}"
            wx:key="label"
            label="{{item.label}}"
            value="{{item.value}}"
            custom-content
            custom-icon
          >
            <cube-icon type="{{item.icon}}"/>
            <!-- use en empty tag to replace default slot -->
            <text class="my-text">${text}</text>
          </cube-tab>
        </cube-tab-bar>
      `,
      data: {
        ...BASE_PROPS,
        selectedLabelSlotsOnly: 0
      }
    }))
    component.attach(document.createElement('parent'))

    it('matchSnapshot', () => {
      expect(component.dom.innerHTML).toMatchSnapshot()
    })

    it('check render correct contents', () => {
      const text = component.querySelector('.my-text').dom.innerHTML
      expect(text).toBe(text)
    })
  })
})

const simulate = require('@mpxjs/miniprogram-simulate')

function expectCurrentViewId(id, index) {
  expect(id).toMatch(new RegExp(`^cube-scroll-nav-item-\\d+-${index}$`))
}

describe('component scroll-nav-bar unit test', function () {
  simulate.load({
    id: 'nav-item-content',
    tagName: 'nav-item-content',
    template: '<rich-text class="nav-item-inner" nodes="{{txt}}"></rich-text>',
    properties: {
      txt: {
        type: String,
        value: ''
      }
    }
  })
  const componentId = simulate.loadMpx('src/components/scroll-nav-bar/index.mpx')
  const BASE_LABELS = ['快车', '小巴', '专车']
  const BASE_TXTS = BASE_LABELS.map(label => `<span>${label}</span>`)

  function newComponent(props = {}) {
    const component = simulate.render(componentId, props)
    component.attach(document.createElement('parent'))
    return component
  }

  async function createComponent(props = {}) {
    const component = newComponent(props)
    await simulate.sleep(10)
    return component
  }

  describe('render and props check', () => {
    it('should render horizontal nav with labels and txts', async () => {
      const component = await createComponent({
        labels: BASE_LABELS,
        txts: BASE_TXTS,
        current: '小巴'
      })
      const instance = component.instance

      expect(component.dom.innerHTML).toMatchSnapshot()
      expect(instance.activeIndex).toBe(1)
      expect(instance.currentValue).toBe('小巴')
      expectCurrentViewId(instance.currentView, 1)
      expect(instance.rootClass).toBe('cube-scroll-nav-bar')
      expect(instance.containerClass).toBe('scroll-container')
      expect(instance.contentClass).toBe('scroll-content')
      expect(instance.scrollX).toBe(true)
      expect(instance.scrollY).toBe(false)
      expect(instance.enableFlex).toBe(true)
      expect(instance.navItems.map(item => item.plainText)).toEqual(BASE_LABELS)
      expect(instance.navItems[1].isActive).toBe(true)
      expect(instance.navItems[1].activeClass).toBe('active')
      expect(instance.navItems[1].className).toContain('active')
    })

    it('should render vertical nav and resolve enhanced options', async () => {
      const component = await createComponent({
        direction: 'vertical',
        labels: BASE_LABELS,
        options: {
          scrollbar: true,
          bounce: true
        }
      })
      const instance = component.instance

      expect(component.dom.innerHTML).toMatchSnapshot()
      expect(instance.resolvedDirection).toBe('vertical')
      expect(instance.rootClass).toBe('cube-scroll-nav-bar cube-scroll-nav-bar_vertical')
      expect(instance.containerClass).toBe('scroll-container scroll-container_vertical')
      expect(instance.contentClass).toBe('scroll-content scroll-content_vertical')
      expect(instance.scrollX).toBe(false)
      expect(instance.scrollY).toBe(true)
      expect(instance.enableFlex).toBe(false)
      expect(instance.useEnhanced).toBe(true)
      expect(instance.showScrollbar).toBe(true)
      expect(instance.bounces).toBe(true)
      expect(instance.navItems[0].className).toContain('nav-item_vertical')
    })

    it('should support legacy list api', async () => {
      const component = await createComponent({
        list: [
          { value: 1, txt: '<span>快车</span>' },
          { label: 2, text: '小巴', disabled: true },
          3
        ],
        current: '1'
      })
      const instance = component.instance

      expect(instance.navItems.map(item => item.label)).toEqual([1, 2, 3])
      expect(instance.navItems.map(item => item.plainText)).toEqual(['快车', '小巴', '3'])
      expect(instance.navItems[1].disabled).toBe(true)
      expect(instance.currentValue).toBe(1)
      expect(instance.activeIndex).toBe(0)
    })
  })

  describe('interaction check', () => {
    it('tap item should update active state and emit change', async () => {
      const component = await createComponent({
        labels: BASE_LABELS,
        txts: BASE_TXTS,
        current: '快车'
      })
      const instance = component.instance
      const changeFn = jest.fn()
      component.addEventListener('change', changeFn)

      const navItems = component.querySelectorAll('.nav-item')
      navItems[2].dispatchEvent('tap')
      await simulate.sleep(10)

      expect(changeFn).toHaveBeenCalledTimes(1)
      expect(changeFn.mock.calls[0][0].detail).toEqual({
        active: '专车',
        index: 2,
        txt: '<span>专车</span>',
        label: '专车'
      })
      expect(instance.activeIndex).toBe(2)
      expect(instance.currentValue).toBe('专车')
      expectCurrentViewId(instance.currentView, 2)
      expect(instance.navItems[2].isActive).toBe(true)
      expect(instance.navItems[0].isActive).toBe(false)
    })

    it('tap disabled item should not update active state', async () => {
      const component = await createComponent({
        list: [
          { label: '快车', txt: '快车' },
          { label: '小巴', txt: '小巴', disabled: true },
          { label: '专车', txt: '专车' }
        ],
        current: '快车'
      })
      const instance = component.instance
      const changeFn = jest.fn()
      component.addEventListener('change', changeFn)

      const navItems = component.querySelectorAll('.nav-item')
      navItems[1].dispatchEvent('tap')
      await simulate.sleep(10)

      expect(changeFn).not.toHaveBeenCalled()
      expect(instance.activeIndex).toBe(0)
      expect(instance.currentValue).toBe('快车')
      expectCurrentViewId(instance.currentView, 0)
      expect(instance.navItems[1].isActive).toBe(false)
    })

    it('scrollToIndex should update current view', async () => {
      const component = await createComponent({
        labels: BASE_LABELS,
        current: '快车'
      })
      const instance = component.instance

      component.instance.scrollToIndex(2)
      await simulate.sleep(10)

      expect(instance.activeIndex).toBe(2)
      expect(instance.currentValue).toBe('专车')
      expectCurrentViewId(instance.currentView, 2)
      expect(instance.navItems[2].isActive).toBe(true)
    })

    it('should generate unique item ids for different instances', async () => {
      const first = await createComponent({ labels: BASE_LABELS, current: '快车' })
      const second = await createComponent({ labels: BASE_LABELS, current: '快车' })

      expect(first.instance.navItems[0].id).not.toBe(second.instance.navItems[0].id)
      expect(first.instance.currentView).not.toBe(second.instance.currentView)
      expectCurrentViewId(first.instance.currentView, 0)
      expectCurrentViewId(second.instance.currentView, 0)
    })
  })
})

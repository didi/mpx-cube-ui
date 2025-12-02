const simulate = require('@mpxjs/miniprogram-simulate')

describe('component floating-panel unit test', () => {
  const componentId = simulate.loadMpx('src/components/floating-panel/index.mpx')

  function newComponent(props) {
    const component = simulate.render(componentId, props)
    component.attach(document.createElement('parent'))
    return component
  }

  async function _snapTest(component) {
    expect(component.dom.innerHTML).toMatchSnapshot()
  }

  const baseProps = {
    height: 100,
    anchors: [100, 500],
    duration: 0.3
  }

  describe('props check default', () => {
    const component = newComponent(baseProps)

    it('matchSnapshot', () => {
      _snapTest(component)
    })

    it('should render correct initial style', () => {
      const root = component.querySelector('.cube-floating-panel')
      // height: anchors[max] -> 500px
      expect(root.dom.style.height).toBe('500px')
      // transform: translateY(calc(100% + -100px)) because initial height is 100
      expect(root.dom.style.transform).toBe('translateY(calc(100% + -100px))')
    })
  })

  describe('slot render check', () => {
    const component = simulate.render(simulate.load({
      usingComponents: {
        'cube-floating-panel': componentId
      },
      template: `
      <cube-floating-panel height="{{100}}" anchors="{{[100, 500]}}">
        <view class="slot-node" slot="default">test</view>
      </cube-floating-panel>`
    }))
    const parent = document.createElement('parent')
    component.attach(parent)
    it('matchSnapshot', () => {
      _snapTest(component)
    })

    it('should render correct slot content', () => {
      const content = component.querySelector('.slot-node').dom.innerHTML
      expect(content).toBe('test')
    })
  })

  describe('props check safeAreaInsetBottom', () => {
    const props = Object.assign({}, baseProps, {
      safeAreaInsetBottom: false
    })
    const component = newComponent(props)
    it('should not have safe-area class', () => {
      const root = component.querySelector('.cube-floating-panel')
      expect(root.dom.classList.contains('cube-floating-panel-safe-area-bottom')).toBe(false)
    })
  })

  describe('props check contentDraggable', () => {
    it('should drag when contentDraggable is true (default)', async () => {
      // This is covered by default props, but we can test on content element
      const component = newComponent(baseProps)
      const content = component.querySelector('.cube-floating-panel-content')
      const start = { touches: [{ pageY: 500 }] }
      const move = { touches: [{ pageY: 450 }] }
      const inputHandler = jest.fn()
      component.addEventListener('input', inputHandler)

      content.dispatchEvent('touchstart', start)
      content.dispatchEvent('touchmove', move)
      await simulate.sleep(10)

      expect(inputHandler).toHaveBeenCalled()
    })

    it('should not drag when contentDraggable is false', async () => {
      const props = Object.assign({}, baseProps, {
        contentDraggable: false
      })
      const component = newComponent(props)
      const content = component.querySelector('.cube-floating-panel-content')
      const start = { touches: [{ pageY: 500 }] }
      const move = { touches: [{ pageY: 450 }] }
      const inputHandler = jest.fn()
      component.addEventListener('input', inputHandler)

      content.dispatchEvent('touchstart', start)
      content.dispatchEvent('touchmove', move)
      await simulate.sleep(10)

      expect(inputHandler).not.toHaveBeenCalled()
    })
  })
})

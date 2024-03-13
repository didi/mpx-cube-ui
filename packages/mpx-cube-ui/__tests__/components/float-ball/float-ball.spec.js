const simulate = require('@mpxjs/miniprogram-simulate')

describe('component float-ball unit test', () => {
  const componentId = simulate.loadMpx('src/components/float-ball/index.mpx')
  function newComponent (props) {
    const component = simulate.render(componentId, props)
    component.attach(document.createElement('parent'))
    return component
  }

  async function _snapTest(component) {
    // 判断前后生成的dom是否一样
    expect(component.dom.innerHTML).toMatchSnapshot()
  }
  const baseProps = {
    name: 'float-ball',
    dockDistance: 10
  }
  describe('props check default', () => {
    const component = newComponent(baseProps)
    it('matchSnapshot', () => {
      _snapTest(component)
    })

    const _this = component.instance
    const showDom = component.querySelector('.cube-float-ball-content')
    it('should render correct contents: name', () => {
      expect(showDom).toBeTruthy()
      const contentText = showDom.dom.innerHTML
      expect(contentText).toBe(baseProps.name) // content 文案正确
    })

    it('should render correct position: dockDistance', () => {
      const realPositionLeft = component.querySelector('.cube-float-ball').dom.style.left
      const realPositionTop = component.querySelector('.cube-float-ball').dom.style.top

      const floatballWidth = _this.sizeW
      const floatballHeight = _this.sizeH
      const CLIENT_WIDTH = _this.maxRight
      const CLIENT_HEIGHT = _this.maxBottom
      const expectPositionLeft = CLIENT_WIDTH - floatballWidth - baseProps.dockDistance
      const expectPositionTop = CLIENT_HEIGHT / 2 - floatballHeight / 2
      expect(realPositionLeft).toBe(`${expectPositionLeft}px`)
      expect(realPositionTop).toBe(`${expectPositionTop}px`)
    })
  })

  describe('props check initialPosition', () => {
    const props = Object.assign({}, baseProps, {
      initialPosition: { left: 100, top: 100 }
    })
    const component = newComponent(props)
    it('matchSnapshot', () => {
      _snapTest(component)
    })

    // initialPosition
    it('should render correct position: initialPosition', () => {
      const realPositionLeft = component.querySelector('.cube-float-ball').dom.style.left
      const realPositionTop = component.querySelector('.cube-float-ball').dom.style.top
      const expectPositionLeft = props.initialPosition.left
      const expectPositionTop = props.initialPosition.top
      expect(realPositionLeft).toBe(`${expectPositionLeft}px`)
      expect(realPositionTop).toBe(`${expectPositionTop}px`)
    })
  })

  describe('slot render check', () => {
    const component = simulate.render(simulate.load({
      usingComponents: {
        'cube-float-ball': componentId
      },
      template: `
      <cube-float-ball>
        <view class="slot-node" slot="default">test</view>
      </cube-float-ball>`
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

  describe('event trigger check', () => {
    const component = newComponent(baseProps)
    it('matchSnapshot', () => {
      _snapTest(component)
    })

    it('event is triggered', async () => {
      const start = {
        changedTouches: [{ clientX: 0, clientY: 0 }]
      }
      const move = {
        changedTouches: [{ clientX: 20, clientY: 20 }]
      }
      const end = {
        changedTouches: [{ clientX: 40, clientY: 50 }]
      }
      const startHandler = jest.fn()
      const moveHandler = jest.fn()
      const endHandler = jest.fn()
      component.addEventListener('touchstart', startHandler)
      component.addEventListener('touchmove', moveHandler)
      component.addEventListener('touchend', endHandler)

      component.dispatchEvent('touchstart', start)
      component.dispatchEvent('touchmove', move)
      component.dispatchEvent('touchend', end)
      await simulate.sleep(10)

      expect(startHandler).toHaveBeenCalled()
      expect(moveHandler).toHaveBeenCalled()
      expect(endHandler).toHaveBeenCalled()
    })
  })
})

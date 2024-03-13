const simulate = require('@mpxjs/miniprogram-simulate')
describe('component divider unit test', function() {
  const componentId = simulate.loadMpx('src/components/divider/index.mpx')

  beforeEach(() => {
    jest.resetModules()
  })

  async function snapTest(options) {
    const component = simulate.render(componentId)
    component.attach(document.createElement('parent'))
    await simulate.sleep(0)
    expect(component.dom.innerHTML).toMatchSnapshot()
  }

  describe('render check', () => {
    it('render', async () => {
      await snapTest()
      await snapTest({
        text: '我是分割线'
      })
      await snapTest({
        position: 'left'
      })
      await snapTest({
        position: 'right'
      })
    })
  })

  describe('props check', () => {
    it('default status', () => {
      const component = simulate.render(componentId)
      component.attach(document.createElement('parent'))
      const data = component.instance.data
      expect(data.position).toBe('center')
    })
    it('prop position', async () => {
      const component = simulate.render(componentId, {
        position: 'left',
        text: '我是分割线'
      })
      component.attach(document.createElement('parent'))
      expect(component.dom.querySelector('.main--left'))
    })
    it('prop text', () => {
      const component = simulate.render(componentId, {
        text: '我是分割线'
      })
      component.attach(document.createElement('parent'))
      const data = component.instance.data
      expect(data.text).toBe('我是分割线')
      expect(component.dom.textContent).toBe('我是分割线')
    })
  })

  describe('slot check', () => {
    const message = 'this is a message'
    const component = simulate.render(simulate.load({
      usingComponents: {
        'cube-divider': componentId
      },
      template: `
        <cube-divider>
          <view class="divider-slot">${message}</view>
        </cube-divider>
      `
    }))
    component.attach(document.createElement('parent'))

    it('matchSnapshot', () => {
      expect(component.dom.innerHTML).toMatchSnapshot()
    })
    it('slot render', () => {
      const slotDom = component.querySelector('cube-divider').querySelector('.cube-divider').dom.querySelector('.divider-slot')
      expect(slotDom.innerHTML).toBe(message)
    })
  })
})

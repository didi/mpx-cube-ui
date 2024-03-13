const simulate = require('@mpxjs/miniprogram-simulate')

describe('component icon unit test', function() {
  const componentId = simulate.loadMpx('src/components/icon/index.mpx')

  beforeEach(() => {
    jest.resetModules()
  })

  async function snapTest(options) {
    const component = simulate.render(componentId, options)
    component.attach(document.createElement('parent'))
    await simulate.sleep(0)
    expect(component.dom.innerHTML).toMatchSnapshot()
  }

  it('render', async () => {
    await snapTest({
      type: 'add'
    })
  })

  it('prop type', () => {
    const component = simulate.render(componentId, {
      type: 'add'
    })
    component.attach(document.createElement('parent'))
    const data = component.instance.data
    expect(data.type).toBe('add')
  })
})

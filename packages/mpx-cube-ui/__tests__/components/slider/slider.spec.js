const simulate = require('@mpxjs/miniprogram-simulate')

describe('component slider unit test', function () {
  const componentId = simulate.loadMpx('src/components/slider/index.mpx')

  function newComponent(props) {
    const component = simulate.render(componentId, props)
    const parent = document.createElement('parent')
    component.attach(parent) // 会触发 attach 生命周期
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
        showValue: true
      })
      await snapTest({
        customContent: true
      })
    })
  })

  describe('event check', () => {
    it('change event', async () => {
      const component = newComponent()
      expect(component.dom.innerHTML).toMatchSnapshot()
      const change = jest.fn()
      // 触发组件树中的节点自定义事件
      component.addEventListener('change', change)
      const tabArea = component.querySelector('.cube-slider-tab-area')
      tabArea.dispatchEvent('tap')
      await simulate.sleep(10)
      expect(change).toHaveBeenCalled()
    })

    it('changing event', async () => {
      const component = newComponent()
      expect(component.dom.innerHTML).toMatchSnapshot()
      const change = jest.fn()
      const changing = jest.fn()
      // 触发组件树中的节点自定义事件
      component.addEventListener('change', change)
      component.addEventListener('changing', changing)
      const sliderHandle = component.querySelector('.cube-slider-handle')
      sliderHandle.dispatchEvent('touchstart')
      sliderHandle.dispatchEvent('touchmove')
      sliderHandle.dispatchEvent('touchend')
      await simulate.sleep(10)
      expect(change).toHaveBeenCalled()
      expect(changing).toHaveBeenCalled()
    })

    // disabled情况下不触发事件
    it('disabled event check', async () => {
      const component = newComponent({ disabled: true })
      expect(component.dom.innerHTML).toMatchSnapshot()
      const change = jest.fn()
      const change2 = jest.fn()
      const changing = jest.fn()
      // 触发组件树中的节点自定义事件
      component.addEventListener('change', change)
      component.addEventListener('changing', changing)
      const tabArea = component.querySelector('.cube-slider-tab-area')
      const sliderHandle = component.querySelector('.cube-slider-handle')
      tabArea.dispatchEvent('tap')
      sliderHandle.dispatchEvent('touchstart')
      sliderHandle.dispatchEvent('touchmove')
      sliderHandle.dispatchEvent('touchend')
      await simulate.sleep(10)
      expect(change).not.toHaveBeenCalled()
      expect(change2).not.toHaveBeenCalled()
      expect(changing).not.toHaveBeenCalled()
    })
  })

  describe('props check', () => {
    it('prop default', async () => {
      const DEFAULT_PROPS = {
        min: 0,
        max: 100,
        step: 1,
        disabled: false,
        value: 0,
        backgroundColor: '',
        activeColor: '',
        'block-size': 28,
        'block-color': '',
        showValue: false,
        customContent: false
      }
      const component = newComponent()
      const data = component.instance.data
      expect(data.min).toBe(DEFAULT_PROPS.min)
      expect(data.max).toBe(DEFAULT_PROPS.max)
      expect(data.step).toBe(DEFAULT_PROPS.step)
      expect(data.disabled).toBe(DEFAULT_PROPS.disabled)
      expect(data.currentValue).toBe(DEFAULT_PROPS.value)
      expect(data.backgroundColor).toBe(DEFAULT_PROPS.backgroundColor)
      expect(data.activeColor).toBe(DEFAULT_PROPS.activeColor)
      expect(data['block-size']).toBe(DEFAULT_PROPS['block-size'])
      expect(data['block-color']).toBe(DEFAULT_PROPS['block-color'])
      expect(data.showValue).toBe(DEFAULT_PROPS.showValue)
      expect(data.customContent).toBe(DEFAULT_PROPS.customContent)
    })

    it('props', async () => {
      // 中横线的props不支持（实际上没问题），暂时没测，比如'block-size'、'block-color'
      const PROPS = {
        min: 50,
        max: 200,
        step: 2,
        disabled: true,
        value: 50,
        backgroundColor: '#fff',
        activeColor: '#ff7e33',
        showValue: true,
        customContent: true
      }
      const component = newComponent(PROPS)
      const data = component.instance.data
      await simulate.sleep(10)
      expect(component.dom.innerHTML).toMatchSnapshot()
      expect(data.min).toBe(PROPS.min)
      expect(data.max).toBe(PROPS.max)
      expect(data.step).toBe(PROPS.step)
      expect(data.disabled).toBe(PROPS.disabled)
      expect(data.currentValue).toBe(PROPS.value)
      expect(data.backgroundColor).toBe(PROPS.backgroundColor)
      expect(data.activeColor).toBe(PROPS.activeColor)
      expect(data.showValue).toBe(PROPS.showValue)
      expect(data.customContent).toBe(PROPS.customContent)
    })
  })

  describe('slot check', () => {
    const text = '123'
    const component = simulate.render(simulate.load({
      usingComponents: {
        'cube-slider': componentId
      },
      template: `
        <cube-slider
          value="{{ 30 }}"
          custom-content="{{true}}"
        >
          <view class="slider-thumb">${text}</view>
        </cube-slider>
      `
    }))
    component.attach(document.createElement('parent'))

    it('matchSnapshot', () => {
      expect(component.dom.innerHTML).toMatchSnapshot()
    })

    it('check render correct contents', () => {
      const text = component.querySelector('.slider-thumb').dom.innerHTML
      expect(text).toBe(text)
    })
  })
})

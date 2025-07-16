const simulate = require('@mpxjs/miniprogram-simulate')

describe('component input unit test', () => {
  const componentId = simulate.loadMpx('src/components/input/index.mpx')
  beforeEach(() => {
    jest.resetModules()
  })

  function createComponent(props) {
    const component = simulate.render(componentId, props)
    component.attach(document.createElement('parent'))

    it('matchSnapshot', () => {
      expect(component.dom.innerHTML).toMatchSnapshot()
    })
    return component
  }

  describe('base props check', () => {
    const placeholderText = '请输入内容'
    const maxlength = 10
    const clearableConfig = { visible: true, autoFocus: true }
    const eyeConfig = { visible: true, open: false }
    const component = createComponent({
      value: 123,
      type: 'text',
      placeholder: placeholderText,
      disabled: true,
      maxlength,
      clearable: clearableConfig,
      eye: eyeConfig
    })

    it('props value check', () => {
      expect(component.instance.data.inputValue).toBe('123')
    })
    it('props type check', () => {
      expect(component.instance.data.type).toBe('text')
    })
    it('props placeholder check', () => {
      expect(component.instance.data.placeholder).toBe(placeholderText)
    })
    it('props disable check', () => {
      const instance = component.instance
      const disabledDom = component.querySelector('.cube-input_disabled')
      expect(disabledDom).toBeTruthy()
      expect(instance.data.disabled).toBe(true)

      const inputEl = component.querySelector('.cube-input-field')
      inputEl.dispatchEvent('focus')
      expect(instance.data.isFocus).toBe(false)
    })

    it('props maxlength check', () => {
      expect(component.instance.data.maxlength).toBe(maxlength)
    })

    it('props clearable check', () => {
      expect(component.instance.data.clearable).toEqual(clearableConfig)
    })

    it('props eye check', () => {
      expect(component.instance.data.eye).toEqual(eyeConfig)
    })
  })

  describe('api check', () => {
    const component = createComponent({
      value: 'test',
      type: 'text'
    })

    // 存在被调用两次的问题
    it('handleFocus', async () => {
      const inputEl = component.querySelector('.cube-input-field')
      const focusFn = jest.fn()
      component.addEventListener('focus', focusFn)
      inputEl.dispatchEvent('focus')
      await simulate.sleep(10)
      expect(focusFn).toHaveBeenCalled()
    })

    it('handleInput', async () => {
      const inputFn = jest.fn()
      component.addEventListener('input', inputFn)
      const newValue = 'new value'
      component.instance.handleInput({ detail: { value: newValue } })
      await simulate.sleep(10)
      expect(component.instance.data.inputValue).toBe(newValue)
      expect(inputFn).toHaveBeenCalled()
    })
  })
})

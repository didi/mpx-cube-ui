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

  describe('base props value check', () => {
    const component = createComponent({ value: 123 })

    it('props value check', () => {
      expect(component.instance.data.inputValue).toBe('123')
    })
  })

  describe('base props placeholder check', () => {
    const placeholder = '请输入内容'
    const component = createComponent({ placeholder })

    it('props placeholder check', () => {
      expect(component.instance.data.placeholder).toBe(placeholder)
    })
  })

  describe('base props type check', () => {
    const component = createComponent({ type: 'password' })

    it('props type check', () => {
      expect(component.instance.data.type).toBe('password')
    })
  })

  describe('base props props check', () => {
    const component = createComponent({ disabled: true })

    it('props disable check', () => {
      const instance = component.instance
      const disabledDom = component.querySelector('.cube-input_disabled')
      expect(disabledDom).toBeTruthy()
      expect(instance.data.disabled).toBe(true)

      const inputEl = component.querySelector('.cube-input-field')
      inputEl.dispatchEvent('focus')
      expect(instance.data.isFocus).toBe(false)
    })
  })

  describe('base props maxlength check', () => {
    const maxlength = 10
    const component = createComponent({ maxlength, value: 123 })

    it('props maxlength check', async () => {
      expect(component.instance.data.maxlength).toBe(maxlength)
      const inputEl = component.querySelector('.cube-input-field')
      inputEl.dispatchEvent('input', { detail: { value: '12345678910' } })
      await simulate.sleep(10)
      expect(component.instance.data.inputValue).toBe('123')
    })
  })

  describe('base props clearable check', () => {
    const clearableConfig = { visible: true, blurHidden: true }
    const component = createComponent({
      value: 123,
      clearable: clearableConfig
    })

    it('props clearable check', async () => {
      expect(component.instance.data.clearable).toEqual(clearableConfig)
      const inputEl = component.querySelector('.cube-input-field')
      inputEl.dispatchEvent('focus')
      await simulate.sleep(10)
      const clearBtn = component.querySelector('.cube-input-clear')
      expect(clearBtn).toBeTruthy()
    })
  })

  describe('base props eye check', () => {
    const eyeConfig = { reverse: true, open: true }
    const component = createComponent({
      value: 123,
      type: 'password',
      eye: eyeConfig
    })

    it('props eye check', async () => {
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

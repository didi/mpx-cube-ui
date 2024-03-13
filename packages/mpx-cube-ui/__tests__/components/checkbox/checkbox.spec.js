const simulate = require('@mpxjs/miniprogram-simulate')

describe('component checkbox unit test', function() {
  const componentId = simulate.loadMpx('src/components/checkbox/index.mpx')
  const tempComponentId = simulate.loadMpx('test/components/checkbox/template/wx-model.mpx')

  const DEFAULT_PROPS = {
    value: false,
    shape: 'round'
  }

  beforeEach(() => {
    jest.resetModules()
  })

  function newComponent(props) {
    const component = simulate.render(componentId, props)
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
        value: true
      })
      await snapTest({
        shape: 'square'
      })
      await snapTest({
        option: {
          value: '桔子value',
          text: '桔子text',
          desc: '桔子desc',
          position: 'right',
          disabled: true
        }
      })
    })
  })

  describe('props check', () => {
    it('prop default', () => {
      const component = newComponent()
      const data = component.instance.data
      expect(data.value).toBe(DEFAULT_PROPS.value)
      expect(data.shape).toBe(DEFAULT_PROPS.shape)

      const valueDom = component.querySelector('.cube-checkbox-ui').dom
      expect(valueDom.className).not.toMatch('cube-checkbox-ui_checkd')
      const shapeDom = component.querySelector('.cube-checkbox-ui').dom
      expect(shapeDom.className).toMatch('cube-checkbox-ui-round')
    })

    it('prop value', () => {
      const component = newComponent({
        value: true
      })
      const data = component.instance.data
      expect(data.value).toBe(true)
      expect(component.instance.isChecked).toBe(true)

      const valueDom = component.querySelector('.cube-checkbox-ui').dom
      expect(valueDom.className).toMatch('cube-checkbox-ui_checked')
    })

    it('prop shape', () => {
      const component = newComponent({
        shape: 'square'
      })
      const data = component.instance.data
      expect(data.shape).toBe('square')

      const shapeDom = component.querySelector('.cube-checkbox-ui').dom
      expect(shapeDom.className).toMatch('cube-checkbox-ui-square')
    })

    it('prop option', () => {
      const component = newComponent({
        option: {
          value: '桔子value',
          text: '桔子text',
          desc: '桔子desc',
          position: 'right',
          disabled: true
        }
      })
      const data = component.instance.data
      expect(data.option).toEqual({
        value: '桔子value',
        text: '桔子text',
        desc: '桔子desc',
        position: 'right',
        disabled: true
      })
      const textDom = component.querySelector('.cube-checkbox-text').dom
      expect(textDom.innerHTML).toBe('桔子text')

      const descDom = component.querySelector('.cube-checkbox-desc').dom
      expect(descDom.innerHTML).toBe('桔子desc')

      const positionDom = component.querySelector('.cube-checkbox-label').dom
      expect(positionDom.className).toMatch('cube-checkbox-label-position')

      const disabledDom = component.querySelector('.cube-checkbox-ui').dom
      expect(disabledDom.className).toMatch('cube-checkbox-ui_disabled')
    })
  })

  describe('wx-model check', () => {
    const component = simulate.render(tempComponentId)
    component.attach(document.createElement('parent'))
    const that = component.instance
    it('wx:model render correct content', () => {
      expect(that.checkboxValue).toBe(true)
    })

    it('wx:model change', async () => {
      const checkboxs = component.querySelectorAll('cube-checkbox')
      checkboxs[0].querySelector('.cube-checkbox').dispatchEvent('tap')
      const checkboxData1 = checkboxs[0].instance
      const checkboxData2 = checkboxs[0].instance
      expect(checkboxData1.isChecked).toBe(true)
      expect(checkboxData2.isChecked).toBe(true)
      await simulate.sleep(10)
      expect(that.checkboxValue).toBe(false)
      expect(checkboxData1.isChecked).toBe(false)
      expect(checkboxData2.isChecked).toBe(false)

      checkboxs[0].querySelector('.cube-checkbox').dispatchEvent('tap')
      await simulate.sleep(10)
      expect(that.checkboxValue).toBe(true)
      expect(checkboxData1.isChecked).toBe(true)
      expect(checkboxData2.isChecked).toBe(true)
    })
  })

  describe('click check', () => {
    it('checkbox is disabled', async () => {
      const component = newComponent({
        option: { disabled: true }
      })
      expect(component.dom.innerHTML).toMatchSnapshot()
      const clickFn = jest.fn()
      component.addEventListener('input', clickFn)
      const checkbox = component.querySelector('.cube-checkbox')
      checkbox.dispatchEvent('tap')
      await simulate.sleep(10)
      expect(clickFn).not.toHaveBeenCalled()
    })

    it('input trigger event should return correct value', async () => {
      const component = newComponent({
        value: true,
        option: {
          value: false
        }
      })
      const inputFn = jest.fn()
      component.addEventListener('input', inputFn)
      const that = component.instance
      const checkbox = component.querySelector('.cube-checkbox')
      expect(that.isChecked).toBe(true)
      checkbox.dispatchEvent('tap')
      await simulate.sleep(10)
      expect(inputFn).toHaveBeenCalled()
      expect(that.isChecked).toBe(false)
    })
  })

  describe('slot check', () => {
    const inputHandle = jest.fn()
    const component = simulate.render(simulate.load({
      usingComponents: {
        'cube-checkbox': componentId
      },
      template: `
        <cube-checkbox id="my-checkbox" bind:tap="inputHandle">
          <view class="my-title">${DEFAULT_PROPS.shape}</view>
        </cube-checkbox>
      `,
      methods: {
        inputHandle
      }
    }))
    component.attach(document.createElement('parent'))

    it('matchSnapshot', () => {
      expect(component.dom.innerHTML).toMatchSnapshot()
    })

    it('check render correct contents', () => {
      const data = component.querySelector('#my-checkbox').instance.data
      expect(data.value).toBe(DEFAULT_PROPS.value)
      const slotContext = component.querySelector('.my-title').dom.innerHTML
      expect(slotContext).toBe(DEFAULT_PROPS.shape)
    })

    it('check trigger event when click slot btn', async () => {
      const that = component.querySelector('#my-checkbox').instance
      expect(that.isChecked).toBe(false)
      const slotDom = component.querySelector('.my-title')
      slotDom.dispatchEvent('tap')
      await simulate.sleep(10)
      expect(inputHandle).toHaveBeenCalled()
      expect(that.isChecked).toBe(true)
    })
  })
})

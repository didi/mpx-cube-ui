const simulate = require('@mpxjs/miniprogram-simulate')

describe('component checkbox-group unit test', function() {
  const componentId = simulate.loadMpx('src/components/checkbox-group/index.mpx')
  const tempComponentId = simulate.loadMpx('test/components/checkbox-group/template/wx-model.mpx')
  const slotComponentId = simulate.loadMpx('test/components/checkbox-group/template/slot.mpx')

  const BASE_PROPS = {
    options: [
      {
        value: '苹果value',
        text: '苹果desc'
      },
      {
        value: '橘子value',
        text: '橘子desc'
      },
      {
        value: '香蕉value',
        text: '香蕉desc'
      },
      {
        value: '桃子value',
        text: '桃子desc'
      }
    ],
    values: ['香蕉value']
  }

  const DEFAULT_PROPS = {
    shape: 'round',
    inline: false,
    colNum: 1
  }

  beforeEach(() => {
    jest.resetModules()
  })

  function newComponent(componentId, props) {
    const component = simulate.render(componentId, props)
    const parent = document.createElement('parent')
    component.attach(parent)
    return component
  }

  async function snapTest(componentId, props) {
    const component = newComponent(componentId, props)
    await simulate.sleep(10)
    expect(component.dom.innerHTML).toMatchSnapshot()
  }

  describe('render check', () => {
    it('render', async () => {
      await snapTest(componentId, {
        option: {
          text: '小桔text',
          value: '小桔value'
        },
        value: '小桔value'
      })
      await snapTest(componentId, BASE_PROPS)
      await snapTest(
        componentId,
        Object.assign({ ...BASE_PROPS }, {
          shape: 'square'
        })
      )
      await snapTest(
        componentId,
        Object.assign({ ...BASE_PROPS }, {
          inline: true
        })
      )
      await snapTest(
        componentId,
        Object.assign({ ...BASE_PROPS }, {
          colNum: 2
        })
      )
      await snapTest(componentId, {
        options: [
          {
            value: '苹果value',
            text: '苹果desc'
          },
          {
            value: '橘子value',
            text: '橘子desc'
          },
          {
            value: '香蕉value',
            text: '香蕉desc',
            disabled: true
          },
          {
            value: '桃子value',
            text: '桃子desc',
            position: 'right'
          }
        ],
        values: ['香蕉value']
      })
    })
  })

  describe('props check', () => {
    it('prop default', () => {
      const component = newComponent(componentId, BASE_PROPS)
      const data = component.instance.data

      expect(data.options).toEqual(BASE_PROPS.options)
      expect(data.values).toEqual(BASE_PROPS.values)
      expect(data.shape).toBe(DEFAULT_PROPS.shape)
      expect(data.inline).toBe(DEFAULT_PROPS.inline)
      expect(data.colNum).toBe(DEFAULT_PROPS.colNum)

      const checkboxGroupDom = component.dom
      expect(checkboxGroupDom.className).not.toMatch('checkbox-group-inline-block')
      expect(checkboxGroupDom.className).not.toMatch('checkbox-group-multiple-columns')
      const checkboxRefs = component.querySelectorAll('.cube-checkbox-group cube-checkbox')
      const checkboxDom = checkboxRefs[0].querySelector('.cube-checkbox-ui').dom
      expect(checkboxDom.className).not.toMatch('cube-checkbox-ui-square')
    })

    it('prop shape', () => {
      const component = newComponent(componentId, Object.assign({ ...BASE_PROPS }, {
        shape: 'square'
      }))
      const data = component.instance.data
      expect(data.shape).toBe('square')
      const checkboxRefs = component.querySelectorAll('.cube-checkbox-group cube-checkbox')
      const checkboxDom = checkboxRefs[0].querySelector('.cube-checkbox-ui').dom
      expect(checkboxDom.className).toMatch('cube-checkbox-ui-square')
    })

    it('prop inline', () => {
      const component = newComponent(componentId, Object.assign({ ...BASE_PROPS }, {
        inline: true
      }))
      const data = component.instance.data
      expect(data.inline).toBe(true)
      const checkboxGroupDom = component.querySelector('.cube-checkbox-group').dom
      const flag = checkboxGroupDom.className.includes('checkbox-group-inline-block')
      expect(flag).toBe(true)
    })

    it('prop colNum', () => {
      const component = newComponent(componentId, Object.assign({ ...BASE_PROPS }, {
        colNum: 2
      }))
      const data = component.instance.data
      expect(data.colNum).toBe(2)
      const checkboxGroupDom = component.querySelector('.cube-checkbox-group').dom
      const flag = checkboxGroupDom.className.includes('checkbox-group-multiple-columns')
      expect(flag).toBe(true)
    })
  })

  describe('wx-model check', () => {
    const component = simulate.render(tempComponentId)
    component.attach(document.createElement('parent'))
    const that = component.instance
    it('wx:model render correct content', () => {
      expect(that.options).toEqual(BASE_PROPS.options)
      expect(that.values).toEqual(BASE_PROPS.values)
    })

    it('wx:model change', async () => {
      const checkbox = component.querySelector('cube-checkbox-group').querySelectorAll('cube-checkbox')[0]
      const checkboxData = checkbox.instance
      expect(checkboxData.isChecked).toBe(false)
      /**
       * magic code 某种情况更新了视图，mpx重新渲染，
       * 触发了 miniprogram-exparser/exparser.min.js 重新收集点击事件，同时没有把之前收集的清除掉，
       * 导致一次点击行为，会触发两次点击回调
       * */
      const checkboxSon = checkbox.querySelector('.cube-checkbox')
      const eventsLength = checkboxSon.dom.__wxElement.__wxEvents.tap?._arr.length || 0
      if (eventsLength > 1) {
        checkboxSon.dom.__wxElement.__wxEvents.tap._arr.splice(0, eventsLength - 1)
      }
      checkbox.querySelector('.cube-checkbox').dispatchEvent('tap')
      await simulate.sleep(10)
      expect(checkboxData.isChecked).toBe(true)
      const target = [...BASE_PROPS.values].concat(checkboxData.option.value)
      expect(that.values).toEqual(target)
    })
  })

  describe('click check', () => {
    it('input trigger event should return correct value', async () => {
      const component = newComponent(componentId, BASE_PROPS)

      const that = component.instance
      const inputFn = jest.fn()
      component.addEventListener('input', inputFn)
      const checkbox = component.querySelectorAll('.cube-checkbox-group cube-checkbox')[0]
      expect(that.checkedValues).toEqual(['香蕉value'])
      checkbox.querySelector('.cube-checkbox').dispatchEvent('tap')
      await simulate.sleep(10)
      const param = inputFn.mock.calls[0][0].detail
      const target = {
        value: that.checkedValues
      }
      expect(param).toEqual(target)
    })

    it('checked trigger event should return correct value', async () => {
      const component = newComponent(componentId, BASE_PROPS)

      const checkedFn = jest.fn()
      component.addEventListener('checked', checkedFn)
      const checkbox = component.querySelectorAll('.cube-checkbox-group cube-checkbox')[0]
      checkbox.querySelector('.cube-checkbox').dispatchEvent('tap')
      await simulate.sleep(10)
      expect(checkedFn).toHaveBeenCalled()
      const param = checkedFn.mock.calls[0][0].detail
      const target = {
        value: checkbox.instance.option.value
      }
      expect(param).toEqual(target)
    })

    it('cancelChecked trigger event should return correct value', async () => {
      const component = newComponent(componentId, BASE_PROPS)

      const cancelCheckedFn = jest.fn()
      component.addEventListener('checked', cancelCheckedFn)
      const checkbox = component.querySelectorAll('.cube-checkbox-group cube-checkbox')[2]
      checkbox.querySelector('.cube-checkbox').dispatchEvent('tap')
      await simulate.sleep(10)
      expect(cancelCheckedFn).toHaveBeenCalled()
      const param = cancelCheckedFn.mock.calls[0][0].detail
      const target = {
        value: checkbox.instance.option.value
      }
      expect(param).toEqual(target)
    })
  })

  describe('slot check', () => {
    const inputHandle = jest.fn()
    const checkedHandle = jest.fn()
    const cancelCheckedHandle = jest.fn()
    const component = simulate.render(slotComponentId)
    component.attach(document.createElement('parent'))
    it('check render correct contents', () => {
      const slotContext = component.querySelector('.my-checkbox-group .my-checkbox').dom.innerHTML
      expect(slotContext).toBeTruthy()
    })

    it('check trigger event when click slot checkbox', async () => {
      component.addEventListener('input', inputHandle)
      component.addEventListener('checked', checkedHandle)
      component.addEventListener('cancelChecked', cancelCheckedHandle)
      const checkbox = component.querySelectorAll('.my-checkbox-group .my-checkbox')[0]
      expect(checkbox.instance.isChecked).toBe(false)
      const checkboxSon = checkbox.querySelector('.cube-checkbox')
      checkboxSon.dispatchEvent('tap')
      // await simulate.sleep(10)
      // expect(checkbox.instance.isChecked).toBe(true)
      // expect(inputHandle).toHaveBeenCalledTimes(1)
      // expect(checkedHandle).toHaveBeenCalledTimes(1)
      // expect(cancelCheckedHandle).not.toHaveBeenCalled()
      checkboxSon.dispatchEvent('tap')
      await simulate.sleep(10)
      expect(checkbox.instance.isChecked).toBe(false)
      expect(inputHandle).toHaveBeenCalledTimes(2)
      expect(checkedHandle).toHaveBeenCalledTimes(1)
      expect(cancelCheckedHandle).toHaveBeenCalled()
    })
  })
})

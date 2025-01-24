const simulate = require('@mpxjs/miniprogram-simulate')

describe('component rate unit test', function () {
  const componentId = simulate.loadMpx('src/components/rate/index.mpx')
  const componentSlotId = simulate.loadMpx('test/components/rate/template/slot.mpx')
  const componentTemplateId = simulate.loadMpx('test/components/rate/template/wx-model.mpx')

  function changeProps() {
    const baseProps = {
      value: 1.5,
      max: [1, 2, 3],
      justify: false,
      allowHalf: true,
      disabled: true
    }
    return baseProps
  }

  function newComponent(id, props) {
    const component = simulate.render(id, props)
    const parent = document.createElement('parent')
    component.attach(parent) // 会触发 attach 生命周期
    return component
  }

  describe('wx-model check', () => {
    const component = newComponent(componentTemplateId)

    // it('matchSnapshot', () => {
    //   expect(component.dom.innerHTML).toMatchSnapshot() // 判断前后生成的dom是否一样
    // })

    it(' wx:model', async () => {
      // 确保 switchValue 首次显示符合预期
      const rates = component.querySelector('rate').querySelectorAll('rate-item')
      const rate1 = rates[0].querySelector('.cube-rate-item_active')
      const rate2 = rates[1].querySelector('.cube-rate-item-def')
      const rate3 = rates[2].querySelector('.cube-rate-item-def')
      // 确保 rate 首次显示符合预期
      expect(rates.length).toEqual(3)
      expect(rate1 !== undefined).toBe(true)
      expect(rate2 !== undefined).toBe(true)
      expect(rate3 !== undefined).toBe(true)

      expect(component.instance.value).toBe(1)

      // 当分数变化的时候，星星的样式也变化
      component.instance.value = 2
      await simulate.sleep(10)

      const rateClicked1 = rates[0].querySelector('.cube-rate-item_active')
      const rateClicked2 = rates[1].querySelector('.cube-rate-item_active')
      const rateClicked3 = rates[2].querySelector('.cube-rate-item-def')
      expect(component.instance.value).toBe(2)
      expect(rateClicked1 !== undefined).toBe(true)
      expect(rateClicked2 !== undefined).toBe(true)
      expect(rateClicked3 !== undefined).toBe(true)

      // 是否居中
      const justifyFalse = component.querySelector('rate').querySelector('.cube-rate-justify')
      expect(justifyFalse).toBeUndefined()
      component.instance.justify = true
      await simulate.sleep(10)

      const justifyTrue = component.querySelector('rate').querySelector('.cube-rate-justify')
      expect(justifyTrue !== undefined).toBe(true)
    })
  })
  describe('correct props check', () => {
    const component = newComponent(componentId, changeProps())

    // it('matchSnapshot', () => {
    //   expect(component.dom.innerHTML).toMatchSnapshot() // 判断前后生成的dom是否一样
    // })

    it(' props to rate ', async () => {
      const rates = component.querySelectorAll('rate-item')
      const justify = component.querySelector('.cube-rate-justify')
      const rate1 = rates[0].querySelector('.cube-rate-item_active')
      const rate2 = rates[1].querySelector('.cube-rate-item_half_active')
      const rate3 = rates[2].querySelector('.cube-rate-item-def')
      expect(component.instance.value).toBe(1.5)
      expect(justify).toBeUndefined()
      expect(component.instance.isCustomize).toBe(false)
      expect(component.instance.disabled).toBe(true)
      expect(rates.length).toEqual(3)
      expect(rate1 !== undefined).toBe(true)
      expect(rate2 !== undefined).toBe(true)
      expect(rate3 !== undefined).toBe(true)
    })
  })
  describe('event trigger check', () => {
    const component = newComponent(componentTemplateId)
    // it('matchSnapshot', () => {
    //   expect(component.dom.innerHTML).toMatchSnapshot()
    // })

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

  describe('slot check', () => {
    const component = simulate.render(componentSlotId)
    component.attach(document.createElement('parent'))

    // it('matchSnapshot', () => {
    //   expect(component.dom.innerHTML).toMatchSnapshot() // 判断前后生成的dom是否一样
    // })

    it('should render correct contents: value/justify/allowHalf/disabled', () => {
      const justify = component.querySelector('rate').querySelector('.cube-rate-justify')
      const rateItems = component.querySelectorAll('rate-item')
      const rateItems1 = rateItems[0].querySelector('.cube-rate-item_active')
      const rateItems2 = rateItems[1].querySelector('.cube-rate-item-def')

      expect(rateItems.length).toBe(4)
      expect(justify !== undefined).toBe(true)
      expect(rateItems1 !== undefined).toBe(true)
      expect(rateItems2 !== undefined).toBe(true)
      expect(component.instance.value).toBe(1)
    })

    const touchStartHandle = jest.fn()
    const touchMoveHandle = jest.fn()
    const touchEndHandle = jest.fn()
    it('should trigger event when touch', async () => {
      const dom = component.querySelector('rate')
      component.addEventListener('touchstart', touchStartHandle)
      component.addEventListener('touchmove', touchMoveHandle)
      component.addEventListener('touchend', touchEndHandle)
      dom.dispatchEvent('touchstart')
      dom.dispatchEvent('touchmove')
      dom.dispatchEvent('touchend')
      await simulate.sleep(10)
      expect(touchStartHandle).toHaveBeenCalled()
      expect(touchMoveHandle).toHaveBeenCalled()
      expect(touchEndHandle).toHaveBeenCalled()
    })
  })
})

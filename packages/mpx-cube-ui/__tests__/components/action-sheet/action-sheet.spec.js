const simulate = require('@mpxjs/miniprogram-simulate')

describe('component action-sheet unit test', function () {
  const componentId = simulate.loadMpx('src/components/action-sheet/index.mpx')
  // const componentSlotId = simulate.loadMpx('test/components/rate/template/slot.mpx')
  // const componentTemplateId = simulate.loadMpx('test/components/rate/template/wx-model.mpx')

  function changeProps(isPicker = false) {
    const baseProps = {
      inputData: [
        {
          content: 'align-center',
          class: 'cube-foo'
        },
        {
          content: 'align-left',
          align: 'left'
        },
        {
          content: 'align-right',
          align: 'right'
        }
      ]
    }
    if (isPicker) baseProps.pickerStyle = true
    return baseProps
  }

  function newComponent(id, props) {
    const component = simulate.render(id, props)
    const parent = document.createElement('parent')
    component.attach(parent) // 会触发 attach 生命周期
    return component
  }

  // describe('wx-model check', () => {
  //   const component = newComponent(componentTemplateId)

  //   it('matchSnapshot', () => {
  //     expect(component.dom.innerHTML).toMatchSnapshot() // 判断前后生成的dom是否一样
  //   })

  //   it(' wx:model', async () => {
  //     // 确保 switchValue 首次显示符合预期
  //     const rates = component.querySelector('rate').querySelectorAll('rate-item')
  //     const rate1 = rates[0].querySelector('.cube-rate-item_active')
  //     const rate2 = rates[1].querySelector('.cube-rate-item-def')
  //     const rate3 = rates[2].querySelector('.cube-rate-item-def')
  //     // 确保 rate 首次显示符合预期
  //     expect(rates.length).toEqual(3)
  //     expect(rate1 !== undefined).toBe(true)
  //     expect(rate2 !== undefined).toBe(true)
  //     expect(rate3 !== undefined).toBe(true)

  //     expect(component.instance.value).toBe(1)

  //     // 当分数变化的时候，星星的样式也变化
  //     component.instance.value = 2
  //     await simulate.sleep(10)

  //     const rateClicked1 = rates[0].querySelector('.cube-rate-item_active')
  //     const rateClicked2 = rates[1].querySelector('.cube-rate-item_active')
  //     const rateClicked3 = rates[2].querySelector('.cube-rate-item-def')
  //     expect(component.instance.value).toBe(2)
  //     expect(rateClicked1 !== undefined).toBe(true)
  //     expect(rateClicked2 !== undefined).toBe(true)
  //     expect(rateClicked3 !== undefined).toBe(true)

  //     // 是否居中
  //     const justifyFalse = component.querySelector('rate').querySelector('.cube-rate-justify')
  //     expect(justifyFalse).toBeUndefined()
  //     component.instance.justify = true
  //     await simulate.sleep(10)

  //     const justifyTrue = component.querySelector('rate').querySelector('.cube-rate-justify')
  //     expect(justifyTrue !== undefined).toBe(true)
  //   })
  // })

  describe('correct props check', () => {
    const component = newComponent(componentId, changeProps())

    it('matchSnapshot', () => {
      expect(component.dom.innerHTML).toMatchSnapshot() // 判断前后生成的dom是否一样
    })

    it(' props to rate ', async () => {
      const actionSheetItems = component.querySelectorAll('.cube-action-sheet-item')
      const justify = component.querySelector('.cube-rate-justify')
      // const rate1 = rates[0].querySelector('.cube-rate-item_active')
      // const rate2 = rates[1].querySelector('.cube-rate-item_half_active')
      // const rate3 = rates[2].querySelector('.cube-rate-item-def')
      expect(actionSheetItems.length).toBe(3)
      expect(justify).toBeUndefined()
      // expect(actionSheetItems[0].instance.isCustomize).toBe(false)
      // expect(component.instance.disabled).toBe(true)
      // expect(rates.length).toEqual(3)
      // expect(rate1 !== undefined).toBe(true)
      // expect(rate2 !== undefined).toBe(true)
      // expect(rate3 !== undefined).toBe(true)
    })
  })
})

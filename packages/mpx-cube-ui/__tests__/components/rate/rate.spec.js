const simulate = require('@mpxjs/miniprogram-simulate')

describe('component rate unit test', function () {
  // const componentId = simulate.loadMpx('src/components/rate/index.mpx')
  const componentTemplateId = simulate.loadMpx('test/components/rate/template/wx-model.mpx')

  // function changeProps(index) {
  //   const baseProps = {
  //     options: [
  //       {
  //         value: 'Option1',
  //         text: 'Option1'
  //       },
  //       {
  //         value: 'Option2',
  //         text: 'Option2'
  //       }
  //     ],
  //     value: 'Option2'
  //   }
  //   const options = baseProps.options[0]
  //   if (index === 1) options.position = 'right'
  //   if (index === 2) options.disabled = true
  //   if (index === 3) baseProps.inline = true
  //   if (index === 4) baseProps.colNum = 3

  //   return baseProps
  // }

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
      // const rates = component.querySelector('rate').querySelectorAll('rate-item')
      const rates = component.querySelector('rate').querySelector('.cube-rate-items')
      console.log(44, rates.dom.innerHTML)
      const rate1 = rates[0].querySelector('.cube-rate-item_active')
      const rate2 = rates[1].querySelector('.cube-rate-item-def')
      const rate3 = rates[2].querySelector('.cube-rate-item-def')
      // 确保 rate 首次显示符合预期
      expect(rates.length).toEqual(3)

      expect(rate1 !== undefined).toBe(true)
      expect(rate2 !== undefined).toBe(true)
      expect(rate3 !== undefined).toBe(true)

      expect(component.instance.value).toBe(1)

      const start = {
        changedTouches: [{ clientX: 0, clientY: 0 }]
      }
      const move = {
        changedTouches: [{ clientX: 20, clientY: 0 }]
      }
      const end = {
        changedTouches: [{ clientX: 30, clientY: 0 }]
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

      // 点击第二个星星后，所有rate-item的值都改变且父组件的值也改变
      const rateClicked1 = rates[0].querySelector('cube-rate-item_active')
      const rateClicked2 = rates[1].querySelector('cube-rate-item_active')
      const rateClicked3 = rates[2].querySelector('cube-rate-item-def')
      expect(component.instance.value).toBe(2)
      expect(rateClicked1 !== undefined).toBe(true)
      expect(rateClicked2 !== undefined).toBe(true)
      expect(rateClicked3 !== undefined).toBe(true)

      // 改变父组件的值，所有radio的值也会改变
      component.instance.value = 3
      await simulate.sleep(10)
      const rateChangeValued1 = rates[0].querySelector('cube-rate-item_active')
      const rateChangeValued2 = rates[1].querySelector('cube-rate-item_active')
      const rateChangeValued3 = rates[2].querySelector('cube-rate-item_active')
      expect(rateChangeValued1 !== undefined).toBe(true)
      expect(rateChangeValued2 !== undefined).toBe(true)
      expect(rateChangeValued3 !== undefined).toBe(true)
    })
  })
  // describe(' correct props check ', () => {
  //   const component = newComponent(componentId, changeProps())

  //   // it('matchSnapshot', () => {
  //   //   expect(component.dom.innerHTML).toMatchSnapshot() // 判断前后生成的dom是否一样
  //   // })

  //   it(' props to radio-group ', async () => {
  //     const radios = component.querySelectorAll('cube-radio')
  //     expect(component.instance.radioValue).toBe('Option2')
  //     expect(radios[0].instance.showText).toBe('Option1')
  //     expect(radios[1].instance.showText).toBe('Option2')
  //     expect(radios[1].instance.value).toBe('Option2')
  //     expect(radios[0].instance.value).toBe('Option2')

  //     radios[0].querySelector('.cube-radio-label').dispatchEvent('tap')
  //     await simulate.sleep(10)
  //     expect(component.instance.radioValue).toBe('Option1')
  //   })
  // })

  // describe(' check disabled', () => {
  //   const component = newComponent(componentId, changeProps(DISABLED))

  //   // it('matchSnapshot', () => {
  //   //   expect(component.dom.innerHTML).toMatchSnapshot() // 判断前后生成的dom是否一样
  //   // })
  //   const radios = component.querySelectorAll('cube-radio')
  //   const radio0 = radios[0].querySelector('.cube-radio-label_disabled')
  //   const radio1 = radios[1].querySelector('.cube-radio-label_disabled')

  //   expect(radio0).toBeTruthy()
  //   expect(radio1).toBe(undefined)
  // })

  // describe('  position check ', () => {
  //   const component = newComponent(componentId, changeProps(POSITION))

  //   // it('matchSnapshot', () => {
  //   //   expect(component.dom.innerHTML).toMatchSnapshot() // 判断前后生成的dom是否一样
  //   // })
  //   const radios = component.querySelectorAll('cube-radio')
  //   const radio0 = radios[0].querySelector('.cube-radio-label-right')
  //   const radio1 = radios[1].querySelector('.cube-radio-label-right')

  //   expect(radio0).toBeTruthy()
  //   expect(radio1).toBe(undefined)
  // })

  // describe('  line check ', () => {
  //   const component = newComponent(componentId, changeProps(LINE))

  //   // it('matchSnapshot', () => {
  //   //   expect(component.dom.innerHTML).toMatchSnapshot() // 判断前后生成的dom是否一样
  //   // })

  //   const radios = component.querySelector('.radio-group-inline-block')

  //   expect(radios).toBeTruthy()
  // })

  // describe('slot check', () => {
  //   const onClickBtn = jest.fn()
  //   const prop = {
  //     title: '标题',
  //     content: '内容',
  //     confirmBtn: {
  //       text: '按钮文本'
  //     }
  //   }
  //   const component = simulate.render(
  //     simulate.load({
  //       usingComponents: {
  //         'cube-radio-group': componentId
  //       },
  //       template: `
  //       <cube-radio-group id="my-dialog" visible="{{true}}" >
  //         <view slot="title" class="my-title">${prop.title}</view>
  //         <view slot="content" class="my-content">${prop.content}</view>
  //         <view slot="btns" class="my-btn" bind:tap="onClickBtn">${prop.confirmBtn.text}</view>
  //       </cube-radio-group>
  //       `,
  //       methods: {
  //         onClickBtn
  //       }
  //     })
  //   )
  //   const parent = document.createElement('parent')
  //   component.attach(parent)

  //   // it('matchSnapshot', () => {
  //   //   expect(component.dom.innerHTML).toMatchSnapshot() // 判断前后生成的dom是否一样
  //   // })

  //   it('should render correct contents: title/content/btn', () => {
  //     const titleText = component.querySelector('.my-title').dom.innerHTML
  //     const contentText = component.querySelector('.my-content').dom.innerHTML
  //     const btnText = component.querySelector('.my-btn').dom.innerHTML

  //     expect(titleText).toBe(prop.title)
  //     expect(contentText).toBe(prop.content)
  //     expect(btnText).toBe(prop.confirmBtn.text)
  //   })
  //   it('should trigger event when click slot btn', async () => {
  //     const btn = component.querySelector('.my-btn')
  //     btn.dispatchEvent('tap')
  //     await simulate.sleep(10)
  //     expect(onClickBtn).toHaveBeenCalled()
  //   })
  // })
})

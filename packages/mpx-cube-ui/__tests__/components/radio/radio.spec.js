const simulate = require('@mpxjs/miniprogram-simulate')

describe('component radio unit test', function () {
  function newComponent(componentId, props) {
    const component = simulate.render(componentId, props)
    const parent = document.createElement('parent')
    component.attach(parent) // 会触发 attach 生命周期
    return component
  }
  describe('wx:model check', () => {
    const componentId = simulate.loadMpx(
      'test/components/radio/template/wx-model.mpx'
    )
    const component = newComponent(componentId)
    it('matchSnapshot', () => {
      expect(component.dom.innerHTML).toMatchSnapshot() // 判断前后生成的dom是否一样
    })
    const radios = component.querySelectorAll('.cube-radio')
    it('wx:model', async () => {
      const radio1 = radios[0]
      const radio2 = radios[1]
      // 确保 radio 首次显示符合预期
      expect(radio1.instance.value).toBe('Option1')
      expect(radio2.instance.value).toBe('Option1')
      expect(radios.length).toEqual(2)

      radio2.querySelector('.cube-radio-label').dispatchEvent('tap')
      await simulate.sleep(10)

      // 点击第二个raido后，所有radio的值都改变且父组件的值也改变
      expect(component.instance.radioValue).toBe('Option2')
      expect(radio1.instance.value).toBe('Option2')
      expect(radio2.instance.value).toBe('Option2')
      expect(radio2.instance.value).toBe('Option2')

      // 改变父组件的值，所有radio的值也会改变
      component.instance.radioValue = 'Option1'
      await simulate.sleep(10)
      expect(component.instance.radioValue).toBe('Option1')
      expect(radio1.instance.value).toBe('Option1')
      expect(radio2.instance.value).toBe('Option1')
    })
  })

  const componentId1 = simulate.loadMpx('src/components/radio/index.mpx')
  describe('correct render check', () => {
    const component = newComponent(componentId1, {
      option: {
        text: 'Option1',
        desc: 'Option1'
      }
    })
    it('matchSnapshot', () => {
      expect(component.dom.innerHTML).toMatchSnapshot() // 判断前后生成的dom是否一样
    })
    const radioText = component.querySelector('.cube-radio-text')

    const radioDesc = component.querySelector('.cube-radio-desc')

    it('correct render  check', async () => {
      // 正确渲染
      expect(radioText.dom.innerHTML).toBe('Option1')
      expect(radioDesc.dom.innerHTML).toBe('Option1')
      //
      const isChecked = component.querySelector('.cube-radio-label_checked')
      const isDisabled = component.querySelector('.cube-radio-label_disabled')
      const isRight = component.querySelector('.cube-radio-label-right')

      // eslint-disable-next-line eqeqeq
      expect(isChecked == undefined).toBe(true)
      // eslint-disable-next-line eqeqeq
      expect(isDisabled == undefined).toBe(true)
      // eslint-disable-next-line eqeqeq
      expect(isRight == undefined).toBe(true)
    })
  })

  describe('disabled check', () => {
    const component = newComponent(componentId1, {
      option: {
        text: 'Option1',
        desc: 'Option1',
        disabled: true
      }
    })
    it('matchSnapshot', () => {
      expect(component.dom.innerHTML).toMatchSnapshot() // 判断前后生成的dom是否一样
    })
    const radio = component.querySelector('.cube-radio-label_disabled')
    expect(radio !== undefined).toBe(true)
  })

  describe('right check', () => {
    const component = newComponent(componentId1, {
      option: {
        text: 'Option1',
        desc: 'Option1',
        position: 'right'
      }
    })
    it('matchSnapshot', () => {
      expect(component.dom.innerHTML).toMatchSnapshot() // 判断前后生成的dom是否一样
    })
    const isRight = component.querySelector('.cube-radio-label-right')
    expect(isRight !== undefined).toBe(true)
  })

  describe('slot check', () => {
    const onClickBtn = jest.fn()
    const prop = {
      title: '标题',
      content: '内容',
      confirmBtn: {
        text: '按钮文本'
      }
    }
    const component = simulate.render(
      simulate.load({
        usingComponents: {
          'cube-radio': componentId1
        },
        template: `
        <cube-radio id="my-dialog" visible="{{true}}" >
          <view slot="title" class="my-title">${prop.title}</view>
          <view slot="content" class="my-content">${prop.content}</view>
          <view slot="btns" class="my-btn" bind:tap="onClickBtn">${prop.confirmBtn.text}</view>
        </cube-radio>
        `,
        methods: {
          onClickBtn
        }
      })
    )
    const parent = document.createElement('parent')
    component.attach(parent)
    it('matchSnapshot', () => {
      expect(component.dom.innerHTML).toMatchSnapshot() // 判断前后生成的dom是否一样
    })
    it('should render correct contents: title/content/btn', () => {
      const titleText = component.querySelector('.my-title').dom.innerHTML
      const contentText = component.querySelector('.my-content').dom.innerHTML
      const btnText = component.querySelector('.my-btn').dom.innerHTML

      expect(titleText).toBe(prop.title)
      expect(contentText).toBe(prop.content)
      expect(btnText).toBe(prop.confirmBtn.text)
    })
    it('should trigger event when click slot btn', async () => {
      const btn = component.querySelector('.my-btn')
      btn.dispatchEvent('tap')
      await simulate.sleep(10)
      expect(onClickBtn).toHaveBeenCalled()
    })
  })
})

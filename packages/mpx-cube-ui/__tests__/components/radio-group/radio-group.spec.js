const simulate = require('@mpxjs/miniprogram-simulate')

describe('component radio-group unit test', function () {
  const componentId = simulate.loadMpx('src/components/radio-group/index.mpx')
  const componentTemplateId = simulate.loadMpx('test/components/radio-group/template/wx-model.mpx')

  const DISABLED = 2
  const POSITION = 1
  const LINE = 3
  const COLNUM = 4

  function changeProps(index) {
    const baseProps = {
      options: [
        {
          value: 'Option1',
          text: 'Option1'
        },
        {
          value: 'Option2',
          text: 'Option2'
        }
      ],
      value: 'Option2'
    }
    const options = baseProps.options[0]
    if (index === 1) options.position = 'right'
    if (index === 2) options.disabled = true
    if (index === 3) baseProps.inline = true
    if (index === 4) baseProps.colNum = 3

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

    it('matchSnapshot', () => {
      expect(component.dom.innerHTML).toMatchSnapshot() // 判断前后生成的dom是否一样
    })

    it(' wx:model', async () => {
      const radios = component.querySelectorAll('cube-radio')
      const radio1 = radios[0]
      const radio2 = radios[1]
      const radio3 = radios[2]
      // 确保 radio 首次显示符合预期
      expect(radios.length).toEqual(3)
      expect(radio1.instance.value).toBe('one-V')
      expect(radio2.instance.value).toBe('one-V')
      expect(radio3.instance.value).toBe('one-V')
      // showText
      expect(radio1.instance.showText).toBe('one-T')
      expect(radio2.instance.showText).toBe('two-T')
      expect(radio3.instance.showText).toBe('three-T')

      radio3.querySelector('.cube-radio-label').dispatchEvent('tap')
      await simulate.sleep(10)

      // 点击第三个raido后，所有radio的值都改变且父组件的值也改变
      expect(component.instance.checkedValue).toBe('three-V')
      expect(radio1.instance.value).toBe('three-V')
      expect(radio2.instance.value).toBe('three-V')
      expect(radio3.instance.value).toBe('three-V')

      // 改变父组件的值，所有radio的值也会改变
      component.instance.checkedValue = 'two-V'
      await simulate.sleep(10)
      expect(component.instance.checkedValue).toBe('two-V')
      expect(radio1.instance.value).toBe('two-V')
      expect(radio2.instance.value).toBe('two-V')
      expect(radio3.instance.value).toBe('two-V')
    })
  })
  describe(' correct props check ', () => {
    const component = newComponent(componentId, changeProps())

    it('matchSnapshot', () => {
      expect(component.dom.innerHTML).toMatchSnapshot() // 判断前后生成的dom是否一样
    })

    it(' props to radio-group ', async () => {
      const radios = component.querySelectorAll('cube-radio')
      expect(component.instance.radioValue).toBe('Option2')
      expect(radios[0].instance.showText).toBe('Option1')
      expect(radios[1].instance.showText).toBe('Option2')
      expect(radios[1].instance.value).toBe('Option2')
      expect(radios[0].instance.value).toBe('Option2')

      radios[0].querySelector('.cube-radio-label').dispatchEvent('tap')
      await simulate.sleep(10)
      expect(component.instance.radioValue).toBe('Option1')
    })
  })

  describe(' check disabled', () => {
    const component = newComponent(componentId, changeProps(DISABLED))

    it('matchSnapshot', () => {
      expect(component.dom.innerHTML).toMatchSnapshot() // 判断前后生成的dom是否一样
    })
    const radios = component.querySelectorAll('cube-radio')
    const radio0 = radios[0].querySelector('.cube-radio-label_disabled')
    const radio1 = radios[1].querySelector('.cube-radio-label_disabled')

    expect(radio0).toBeTruthy()
    expect(radio1).toBe(undefined)
  })

  describe('  position check ', () => {
    const component = newComponent(componentId, changeProps(POSITION))

    it('matchSnapshot', () => {
      expect(component.dom.innerHTML).toMatchSnapshot() // 判断前后生成的dom是否一样
    })
    const radios = component.querySelectorAll('cube-radio')
    const radio0 = radios[0].querySelector('.cube-radio-label-right')
    const radio1 = radios[1].querySelector('.cube-radio-label-right')

    expect(radio0).toBeTruthy()
    expect(radio1).toBe(undefined)
  })

  describe('  line check ', () => {
    const component = newComponent(componentId, changeProps(LINE))

    it('matchSnapshot', () => {
      expect(component.dom.innerHTML).toMatchSnapshot() // 判断前后生成的dom是否一样
    })

    const radios = component.querySelector('.radio-group-inline-block')

    expect(radios).toBeTruthy()
  })

  describe('  colNum check ', () => {
    const component = newComponent(componentId, changeProps(COLNUM))

    it('matchSnapshot', () => {
      expect(component.dom.innerHTML).toMatchSnapshot() // 判断前后生成的dom是否一样
    })

    const radios = component.querySelector('.radio-group-multiple-columns')

    expect(radios).toBeTruthy()
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
          'cube-radio-group': componentId
        },
        template: `
        <cube-radio-group id="my-dialog" visible="{{true}}" >
          <view slot="title" class="my-title">${prop.title}</view>
          <view slot="content" class="my-content">${prop.content}</view>
          <view slot="btns" class="my-btn" bind:tap="onClickBtn">${prop.confirmBtn.text}</view>
        </cube-radio-group>
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

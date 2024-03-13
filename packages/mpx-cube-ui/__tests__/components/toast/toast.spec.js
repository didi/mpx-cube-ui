const simulate = require('@mpxjs/miniprogram-simulate')

describe('component toast unit test', function() {
  const componentId = simulate.loadMpx('src/components/toast/index.mpx')
  function newComponent(props) {
    const component = simulate.render(componentId, props)
    component.attach(document.createElement('parent')) // 会触发 attach 生命周期
    return component
  }
  const baseProps = {
    // 遮盖层初始状态是否可见
    maskClosable: true,
    // 提示信息文案（一行最多只能展示十二个文字最多展示两行）
    txt: 'hello toast',
    maskFadeTransition: false,
    // 是否显示遮罩
    mask: true,
    // 初始化时是否展示 toast
    visible: false,
    zIndex: 900,
    time: 1500, // 显示时间（设置为 0 时不会自动消失，需要手动隐藏）
    icon: 'delete' // 图标类型（自动添加cubeic-前缀）
  }
  describe('base props check', () => {
    const component = newComponent(baseProps)
    it('matchSnapshot', () => {
      expect(component.dom.innerHTML).toMatchSnapshot() // 判断前后生成的dom是否一样
    })
    it('should render correct contents: content', () => {
      const tipText = component.querySelector('.cube-toast-tip').dom.innerHTML
      expect(tipText).toBe(baseProps.txt) // txt 文案正确
    })
  })
  describe('methods check', () => {
    const component = newComponent(baseProps)
    it('should be visibled through the "show" method', async () => {
      // 不能通过一个 querySelector 来选取，查看 https://github.com/wechat-miniprogram/miniprogram-simulate/issues/53
      component.instance.show()
      await simulate.sleep(10)
      const showDom = component.querySelector('.cube-toast').querySelector('.show') // props.visible 正确
      expect(showDom).toBeTruthy()

      expect(component.instance.data.isVisible).toBe(true)
    })
    it('should be invisibled through the "hide" method', async () => {
      component.instance.hide()
      await simulate.sleep(10)
      const showDom = component.querySelector('.cube-toast').querySelector('.hide') // props.visible 正确
      expect(showDom).toBeTruthy()

      expect(component.instance.data.isVisible).toBe(false)
    })
  })
  describe('event check', () => {
    const myProps = Object.assign(baseProps, { visible: true })
    const component = newComponent(myProps)

    it('matchSnapshot', () => {
      expect(component.dom.innerHTML).toMatchSnapshot() // 判断前后生成的dom是否一样
    })

    it('mask click => hide & toggle', async () => {
      const onToggleFn = jest.fn()
      component.addEventListener('toggle', onToggleFn)
      expect(component.instance.data.isVisible).toBe(true)
      const mask = component.querySelector('.cube-toast').querySelector('.cube-popup-mask')
      mask.dispatchEvent('touchend')
      await simulate.sleep(10)

      expect(component.instance.data.isVisible).toBe(false)
      expect(onToggleFn).toHaveBeenCalled()
    })
  })
  describe('slot check', () => {
    const imageSlot = '<image class="custom-img" src="https://dpubstatic.udache.com/static/dpubimg/c40384a2-25ef-4781-8e08-44447823d861.png" mode="aspectFit"></image>'
    const component = simulate.render(simulate.load({
      usingComponents: {
        'cube-toast': componentId
      },
      template: `
        <cube-toast
          txt="请输入乘车人手机号"
          wx:ref="toastImg">
            ${imageSlot}
        </cube-toast>
      `
    }))
    const parent = document.createElement('parent')
    component.attach(parent)

    it('matchSnapshot', () => {
      expect(component.dom.innerHTML).toMatchSnapshot() // 判断前后生成的dom是否一样
    })

    it('should render correct contents: slot content: image', async () => {
      const slotDom = component.querySelector('cube-toast').querySelector('.toast-slot-icon').dom.innerHTML
      expect(slotDom).toBeTruthy()
      // expect(slotDom).toBe(imageSlot)
    })
  })
})

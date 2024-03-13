const simulate = require('@mpxjs/miniprogram-simulate')

describe('component popup unit test', function() {
  const componentId = simulate.loadMpx('src/components/popup/index.mpx')
  function newComponent(props) {
    const component = simulate.render(componentId, props)
    component.attach(document.createElement('parent')) // 会触发 attach 生命周期
    return component
  }
  function HTMLDecode(text) {
    let temp = document.createElement('div')
    temp.innerHTML = text
    const output = temp.innerText || temp.textContent
    temp = null
    return output
  }
  const baseProps = {
    // 遮盖层初始状态是否可见
    maskClosable: true,
    // 文本内容，**微信&web** 支持 `html string` 的文本格式，**支付宝**目前不支持，所以需要自己转，具体见：支付宝 [rich-text文档](https://opendocs.alipay.com/mini/component/rich-text#%E5%B1%9E%E6%80%A7%E8%AF%B4%E6%98%8E)
    content: '<i style="color:#fc9153">Hello World</i>',
    maskFadeTransition: false,
    // 拓展 class 属性，cube-${type}，可用于样式覆盖和定制
    type: '',
    // 是否显示遮罩
    mask: true,
    // 是否居中显示
    center: true,
    // 初始化时是否展示 popup
    visible: false,
    zIndex: 100
  }
  describe('base props check', () => {
    const component = newComponent(baseProps)
    it('matchSnapshot', () => {
      expect(component.dom.innerHTML).toMatchSnapshot() // 判断前后生成的dom是否一样
    })
    it('should render correct contents: content', () => {
      const contentText = component.querySelector('.cube-popup-content rich-text').querySelector('.rich-text').dom.innerHTML
      expect(HTMLDecode(contentText)).toBe(baseProps.content) // content 文案正确
    })
  })
  describe('methods check', () => {
    const component = newComponent(baseProps)
    it('should be visibled through the "show" method', async () => {
      // 不能通过一个 querySelector 来选取，查看 https://github.com/wechat-miniprogram/miniprogram-simulate/issues/53
      const onToggleFn = jest.fn()
      component.addEventListener('toggle', onToggleFn)

      component.instance.show()
      await simulate.sleep(10)
      const showDom = component.querySelector('.cube-popup.show') // props.visible 正确
      expect(showDom).toBeTruthy()

      expect(component.instance.isVisible).toBe(true)
      expect(onToggleFn).toHaveBeenCalled()
    })
    it('should be invisibled through the "hide" method', async () => {
      const onToggleFn = jest.fn()
      component.addEventListener('toggle', onToggleFn)

      component.instance.hide()
      await simulate.sleep(10)
      const showDom = component.querySelector('.cube-popup.hide') // props.visible 正确
      expect(showDom).toBeTruthy()

      expect(component.instance.isVisible).toBe(false)
      expect(onToggleFn).toHaveBeenCalled()
    })
  })
  describe('slot check', () => {
    const onMaskClick = jest.fn()
    const onToggle = jest.fn()
    const component = simulate.render(simulate.load({
      usingComponents: {
        'cube-popup': componentId
      },
      template: `
        <cube-popup
          id="my-popup"
          visible="{{true}}"
          bind:touchend="onMaskClick"
          bind:toggle="onToggle"
        >
          <view slot="default" class="my-content">test</view>
          <view slot="mask" class="my-mask"></view>
        </cube-popup>
      `,
      methods: {
        onMaskClick,
        onToggle
      }
    }))
    const parent = document.createElement('parent')
    component.attach(parent)

    it('matchSnapshot', () => {
      expect(component.dom.innerHTML).toMatchSnapshot() // 判断前后生成的dom是否一样
    })

    it('should render correct contents: content/mask', async () => {
      // const instance = component.querySelector('cube-popup').instance
      // expect(instance.isVisible).toBe(true)

      const contentText = component.querySelector('.my-content').dom.innerHTML
      expect(contentText).toBe('test')

      const slotMaskDom = component.querySelector('.my-mask')
      expect(slotMaskDom).toBeTruthy()
      slotMaskDom.dispatchEvent('touchend')
      await simulate.sleep(10)

      expect(onMaskClick).toHaveBeenCalled()
      expect(onToggle).toHaveBeenCalled()
      // const instance2 = component.querySelector('cube-popup').instance
      // expect(instance2.isVisible).toBe(false)
    })
  })
  describe('event check', () => {
    const myProps = Object.assign(baseProps, { visible: true })
    const component = newComponent(myProps)

    it('matchSnapshot', () => {
      expect(component.dom.innerHTML).toMatchSnapshot() // 判断前后生成的dom是否一样
    })

    it('mask click emit maskClickFn', async () => {
      expect(component.instance.isVisible).toBe(true)
      const onMaskClickFn = jest.fn()
      const onToggleFn = jest.fn()
      component.addEventListener('maskClick', onMaskClickFn)
      component.addEventListener('toggle', onToggleFn)

      const mask = component.querySelector('.cube-popup-mask')
      mask.dispatchEvent('touchend')
      await simulate.sleep(10)

      expect(component.instance.isVisible).toBe(false)
      expect(onMaskClickFn).toHaveBeenCalled()
      expect(onToggleFn).toHaveBeenCalled()
    })
  })
})

const simulate = require('@mpxjs/miniprogram-simulate')

describe('component dialog unit test', function () {
  const componentId = simulate.loadMpx('src/components/dialog/index.mpx')

  const baseProps = {
    type: 'confirm',
    visible: true,
    title: '我是标题',
    content: '正文行文符合话术规范，表意清晰可多行展示，单行居中对齐，多行居左',
    confirmBtn: {
      text: '确认按钮'
    },
    cancelBtn: {
      text: '取消按钮'
    }
  }

  function newComponent(props) {
    const component = simulate.render(componentId, props)
    const parent = document.createElement('parent')
    component.attach(parent) // 会触发 attach 生命周期
    return component
  }

  describe('base props check', () => {
    const component = newComponent(baseProps)

    it('matchSnapshot', () => {
      expect(component.dom.innerHTML).toMatchSnapshot() // 判断前后生成的dom是否一样
    })
    it('should render visible component', () => {
      // 不能通过一个 querySelector 来选取，查看 https://github.com/wechat-miniprogram/miniprogram-simulate/issues/53
      const showDom = component
        .querySelector('.cube-dialog')
        .querySelector('.show') // props.visible 正确
      expect(showDom).toBeTruthy()
      expect(component.instance.data.isVisible).toBe(true)
    })
    it('should render correct contents: title/content', () => {
      const contentText = component
        .querySelector('.content')
        .querySelector('.rich-text').dom.innerHTML
      expect(contentText).toBe(baseProps.content) // content 文案正确

      const titleText = component.querySelector('.cube-dialog-title-def').dom.innerHTML
      expect(titleText).toBe(baseProps.title) // title 文案正确
    })
  })

  describe('props :headIcon="url" check', () => {
    const myProps = Object.assign(
      {
        headIcon:
          'https://dpubstatic.udache.com/static/dpubimg/5b36f778-2f98-4c0e-ac31-d2d7ee6d29a3.png'
      },
      baseProps
    )
    const component = newComponent(myProps)
    it('matchSnapshot', () => {
      expect(component.dom.innerHTML).toMatchSnapshot() // 判断前后生成的dom是否一样
    })

    it('should render headIcon', () => {
      const headIconDom = component.querySelector('.cube-dialog-head-icon')
      expect(headIconDom).toBeTruthy()
      expect(headIconDom.instance.data.src).toBe(myProps.headIcon)
      const imageDom = headIconDom.querySelector('.my-image')
      expect(imageDom.dom.innerHTML).toBe(myProps.headIcon)
    })
  })

  describe('props :icon="hot" check', () => {
    const myProps = Object.assign({ icon: 'hot' }, baseProps)
    const component = newComponent(myProps)
    it('matchSnapshot', () => {
      expect(component.dom.innerHTML).toMatchSnapshot() // 判断前后生成的dom是否一样
    })
    it('should render hot icon', () => {
      // 不能通过一个 querySelector 来选取，查看 https://github.com/wechat-miniprogram/miniprogram-simulate/issues/53
      const iconDom = component
        .querySelector('.icon')
        .querySelector('.cubeic-hot')
      expect(iconDom).toBeTruthy()
    })
  })

  describe('props :showClose="true" check', () => {
    const myProps = Object.assign({ showClose: true }, baseProps)
    const component = newComponent(myProps)
    const closeDom = component.querySelector('.cube-dialog-close')

    it('matchSnapshot', () => {
      expect(component.dom.innerHTML).toMatchSnapshot() // 判断前后生成的dom是否一样
    })
    it('should render "close" icon', () => {
      // 不能通过一个 querySelector 来选取，查看 https://github.com/wechat-miniprogram/miniprogram-simulate/issues/53
      expect(closeDom).toBeTruthy()
    })
    it('"close" icon event', async () => {
      const closeFn = jest.fn()
      // 触发组件树中的节点自定义事件
      component.addEventListener('close', closeFn)
      closeDom.dispatchEvent('tap')
      await simulate.sleep(10)
      expect(closeFn).toHaveBeenCalled()
    })
  })

  describe('props :type="alert" check', () => {
    const myProps = Object.assign({}, baseProps, { type: 'alert' })
    const component = newComponent(myProps)
    const btns = component.querySelectorAll('.cube-dialog-btn')

    it('matchSnapshot', () => {
      expect(component.dom.innerHTML).toMatchSnapshot() // 判断前后生成的dom是否一样
    })
    it('should render correct component', () => {
      expect(component.instance.data.type).toBe('alert') // 传参是否正确
      expect(btns).toHaveLength(1) // confirm 类型有1个按钮
      expect(btns[0].dom.innerHTML).toBe(baseProps.confirmBtn.text) // "确认按钮" 文案正确
      const alertDom = component.querySelector('.cube-dialog-alert')
      expect(alertDom).toBeTruthy()
    })
    it('confirm btn events', async () => {
      const fn = jest.fn()
      component.addEventListener('confirm', fn)

      btns[0].dispatchEvent('tap')
      await simulate.sleep(10)
      expect(fn).toHaveBeenCalled()

      component.instance.show()
      await simulate.sleep(10)
      const showDom = component
        .querySelector('.cube-dialog')
        .querySelector('.show')
      expect(showDom).toBeTruthy()
    })
  })

  describe('props :type="confirm" check', () => {
    const component = newComponent(baseProps)
    const btns = component.querySelectorAll('.cube-dialog-btn')
    it('matchSnapshot', () => {
      expect(component.dom.innerHTML).toMatchSnapshot() // 判断前后生成的dom是否一样
    })
    it('should render correct component', () => {
      expect(component.instance.data.type).toBe('confirm') // 传参是否正确
      expect(component.instance.data.isConfirm).toBe(true) // 传参是否正确
      expect(btns).toHaveLength(2) // confirm 类型有2个按钮
      expect(btns[0].dom.innerHTML).toBe(baseProps.cancelBtn.text) // "取消按钮" 文案正确
      expect(btns[1].dom.innerHTML).toBe(baseProps.confirmBtn.text) // "确认按钮" 文案正确
      const confirmDom = component.querySelector('.cube-dialog-confirm')
      expect(confirmDom).toBeTruthy()
    })
    it('confirm btn events', async () => {
      const cancelFn = jest.fn()
      const confirmFn = jest.fn()
      component.addEventListener('cancel', cancelFn)
      component.addEventListener('confirm', confirmFn)

      btns[0].dispatchEvent('tap')
      await simulate.sleep(10)
      expect(cancelFn).toHaveBeenCalled()

      component.instance.show()
      await simulate.sleep(10)

      btns[1].dispatchEvent('tap')
      await simulate.sleep(10)
      expect(confirmFn).toHaveBeenCalled()
    })
  })

  describe('slot check', () => {
    const onClickBtn = jest.fn()
    const component = simulate.render(
      simulate.load({
        usingComponents: {
          'cube-dialog': componentId
        },
        template: `
        <cube-dialog id="my-dialog" visible="{{true}}" >
          <view slot="title" class="my-title">${baseProps.title}</view>
          <view slot="content" class="my-content">${baseProps.content}</view>
          <view slot="btns" class="my-btn" bind:tap="onClickBtn">${baseProps.confirmBtn.text}</view>
        </cube-dialog>
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

      expect(titleText).toBe(baseProps.title)
      expect(contentText).toBe(baseProps.content)
      expect(btnText).toBe(baseProps.confirmBtn.text)
    })

    it('should trigger event when click slot btn', async () => {
      const btn = component.querySelector('.my-btn')
      btn.dispatchEvent('tap')
      await simulate.sleep(10)

      expect(onClickBtn).toHaveBeenCalled()
    })
  })

  describe('should be visibled through the "show" method after hiding', () => {
    const myProps = Object.assign({ showClose: true }, baseProps)
    const component = newComponent(myProps)
    const data = component.instance.data
    const btns = component.querySelectorAll('.cube-dialog-btn')

    function checkComponentHidden() {
      const hideDom = component
        .querySelector('.cube-dialog')
        .querySelector('.hide')
      expect(hideDom).toBeTruthy()
      expect(data.isVisible).toBe(false)
    }
    function checkComponentVisible() {
      const showDom = component
        .querySelector('.cube-dialog')
        .querySelector('.show')
      expect(showDom).toBeTruthy()
      expect(data.isVisible).toBe(true)
    }
    it('should be visibled after click "closeIcon"', async () => {
      const closeFn = jest.fn()
      component.addEventListener('close', closeFn)
      const closeDom = component.querySelector('.cube-dialog-close')
      closeDom.dispatchEvent('tap')
      await simulate.sleep(10)

      checkComponentHidden()
      expect(closeFn).toHaveBeenCalled()

      component.instance.show()
      await simulate.sleep(10)
      checkComponentVisible()
    })
    it('click "cancelBtn" dom to hide component', async () => {
      const cancelFn = jest.fn()
      component.addEventListener('cancel', cancelFn)
      const cancelBtn = btns[0]
      cancelBtn.dispatchEvent('tap')
      await simulate.sleep(10)

      checkComponentHidden()
      expect(cancelFn).toHaveBeenCalled()

      component.instance.show()
      await simulate.sleep(10)
      checkComponentVisible()
    })
    it('click "confirmBtn" dom to hide component', async () => {
      const confirmFn = jest.fn()
      component.addEventListener('confirm', confirmFn)
      const confirmBtn = btns[1]
      confirmBtn.dispatchEvent('tap')
      await simulate.sleep(10)

      checkComponentHidden()
      expect(confirmFn).toHaveBeenCalled()

      component.instance.show()
      await simulate.sleep(10)
      checkComponentVisible()
    })
  })

  describe('should not trigger events when btn is disabled', () => {
    const myProps = Object.assign({}, baseProps, {
      type: 'confirm',
      confirmBtn: {
        text: '确认按钮',
        active: false,
        disabled: true
      },
      cancelBtn: {
        text: '取消按钮',
        active: false,
        disabled: true
      }
    })
    const component = newComponent(myProps)
    const btns = component.querySelectorAll('.cube-dialog-btn')
    it('matchSnapshot', () => {
      expect(component.dom.innerHTML).toMatchSnapshot() // 判断前后生成的dom是否一样
    })
    it('click "cancelBtn" showld not trigger event', async () => {
      const cancelFn = jest.fn()
      component.addEventListener('cancel', cancelFn)
      const originDomString = component.dom.innerHTML

      btns[0].dispatchEvent('tap')
      await simulate.sleep(10)

      expect(originDomString).toBe(component.dom.innerHTML)
      expect(cancelFn).not.toHaveBeenCalled()
    })
    it('click "confirmBtn" showld not trigger event', async () => {
      const confirmFn = jest.fn()
      component.addEventListener('confirm', confirmFn)
      const originDomString = component.dom.innerHTML

      btns[1].dispatchEvent('tap')
      await simulate.sleep(10)

      expect(originDomString).toBe(component.dom.innerHTML)
      expect(confirmFn).not.toHaveBeenCalled()
    })
  })
})

const simulate = require('@mpxjs/miniprogram-simulate')

describe('component modal unit test', () => {
  const componentId = simulate.loadMpx('src/components/modal/index.mpx')
  const baseProps = {
    title: '标题',
    content: '正文'
  }

  function _createComponent(props) {
    const component = simulate.render(componentId, props)
    const containerDom = document.createElement('parent')
    component.attach(containerDom)
    return component
  }

  // 快照功能
  async function _snapTest(component) {
    expect(component.dom.innerHTML).toMatchSnapshot()
  }

  describe('base props', () => {
    const component = _createComponent(baseProps)

    _snapTest(component)

    test('check the text of title', () => {
      const view = component.querySelector('.cube-modal-title')
      expect(view.dom.innerHTML)
        .toBe(baseProps.title)
    })

    test('check the text of content', () => {
      const view = component.querySelector('.cube-modal-content')
      expect(view.dom.innerHTML)
        .toBe(`<wx-rich-text><wx-view class="rich-text">${baseProps.content}</wx-view></wx-rich-text>`)
    })
  })

  function _getButtonGroup (propsObj) {
    const component = _createComponent(propsObj)
    const buttonGroupCom = component.querySelector('.cube-modal-confirm-button-group')
    const optionsBtnCom = buttonGroupCom.querySelectorAll('.cube-option-cancel-button')
    const confirmBtnCom = buttonGroupCom.querySelectorAll('.cube-option-confirm-button')
    return {
      component,
      buttonGroupCom,
      optionsBtnCom,
      confirmBtnCom
    }
  }

  describe('props:type=optional', () => {
    const propsObj = {
      type: 'optional',
      confirmBtn: {
        text: '确认按钮',
        active: false,
        disabled: false
      },
      cancelBtn: {
        text: '取消按钮',
        active: false,
        disabled: false
      },
      ...baseProps
    }
    const {
      component,
      buttonGroupCom,
      confirmBtnCom,
      optionsBtnCom
    } = _getButtonGroup(propsObj)

    _snapTest(component)

    it('button rendering', () => {
      // the number of button
      expect(optionsBtnCom)
        .toHaveLength(1)
      expect(confirmBtnCom)
        .toHaveLength(1)

      // the text of button
      const optionsBtn = optionsBtnCom[0]
      const confirmBtn = confirmBtnCom[0]
      expect(optionsBtn.querySelector('.cube-btn-content').dom.innerHTML)
        .toBe(propsObj.cancelBtn.text)
      expect(confirmBtn.querySelector('.cube-btn-content').dom.innerHTML)
        .toBe(propsObj.confirmBtn.text)
    })

    it('check data', () => {
      expect(buttonGroupCom.instance.isOptional)
        .toBeTruthy()
    })

    it('check events: confirm & cancel', () => {
      checkEvent('confirm', confirmBtnCom[0].querySelector('.cube-btn'), 'tap', component)
      checkEvent('cancel', optionsBtnCom[0].querySelector('.cube-btn'), 'tap', component)
    })
  })

  describe('props:type=optional when btns disabled', () => {
    const propsObj = {
      type: 'optional',
      confirmBtn: {
        disabled: true
      },
      cancelBtn: {
        disabled: true
      },
      ...baseProps
    }
    const {
      component,
      confirmBtnCom,
      optionsBtnCom
    } = _getButtonGroup(propsObj)

    _snapTest(component)

    it('check events: confirm & cancel when its disabled', async() => {
      checkEvent('confirm', confirmBtnCom[0].querySelector('.cube-btn'), 'tap', component, true)
      checkEvent('cancel', optionsBtnCom[0].querySelector('.cube-btn'), 'tap', component, true)
    })
  })

  describe('props:type=confirm', () => {
    const {
      component,
      optionsBtnCom,
      confirmBtnCom
    } = _getButtonGroup({
      type: 'confirm',
      confirmBtn: {
        text: '确认按钮',
        active: false,
        disabled: false
      },
      ...baseProps
    })

    _snapTest(component)

    it('number of button rendering', () => {
      expect(optionsBtnCom).toHaveLength(0)
      expect(confirmBtnCom).toHaveLength(1)
    })

    it('check events: confirm', () => {
      checkEvent('confirm', confirmBtnCom[0].querySelector('.cube-btn'), 'tap', component)
    })
  })

  describe('props:type=confirm when btn disabled', () => {
    const {
      component,
      confirmBtnCom
    } = _getButtonGroup({
      type: 'confirm',
      confirmBtn: {
        text: '确认按钮',
        active: false,
        disabled: true
      },
      ...baseProps
    })

    _snapTest(component)

    it('check events: confirm', () => {
      checkEvent('confirm', confirmBtnCom[0].querySelector('.cube-btn'), 'tap', component, true)
    })
  })

  describe('props:direction=vertical', () => {
    const component = _createComponent({
      direction: 'vertical',
      ...baseProps
    })
    const buttonGroupCom = component.querySelector('.cube-modal-confirm-button-group')

    _snapTest(component)

    it('data correct', () => {
      expect(buttonGroupCom.data.direction)
        .toBe('vertical')
    })

    it('render correct', () => {
      const buttonVerticalView = buttonGroupCom.querySelector('.cube-confirm-button-group_vertical')
      expect(buttonGroupCom.data.typeClass)
        .toBe('cube-confirm-button-group_vertical')
      expect(buttonVerticalView)
        .toBeTruthy()
    })
  })

  describe('props:direction=horizontal', () => {
    const component = _createComponent({
      direction: 'horizontal',
      ...baseProps
    })
    const buttonGroupCom = component.querySelector('.cube-modal-confirm-button-group')

    _snapTest(component)

    it('data correct', () => {
      expect(buttonGroupCom.data.direction)
        .toBe('horizontal')
    })
    it('render correct', () => {
      expect(buttonGroupCom.data.typeClass)
        .toBe('')
    })
  })

  describe('props:layout=horizontal', () => {
    const component = _createComponent({
      layout: 'horizontal',
      ...baseProps
    })

    _snapTest(component)

    it('render correct', () => {
      const view = component.querySelector('.cube-modal-section').dom.querySelector('.main--horizontal')
      expect(view)
        .toBeTruthy()
    })
  })

  describe('props:noBuiltInBtns=true', () => {
    const component = _createComponent({
      noBuiltInBtns: true,
      ...baseProps
    })

    _snapTest(component)

    it('render correct', () => {
      expect(component.querySelectorAll('.cube-modal-confirm-button-group')).toHaveLength(0)
    })
  })

  describe('close', () => {
    const {
      component
    } = _getButtonGroup({
      maskClosable: true,
      showCloseIcon: true,
      ...baseProps
    })

    _snapTest(component)

    it('events: close', async () => {
      const closeBtnCom = component.querySelector('.cube-modal-close')
      checkEvent('close', closeBtnCom, 'tap', component)
    })
  })

  describe('mask', () => {
    const {
      component,
      confirmBtnCom
    } = _getButtonGroup({
      maskClosable: true,
      type: 'optional',
      showCloseIcon: true,
      confirmBtn: {
        text: '确认按钮'
      },
      cancelBtn: {
        text: '取消按钮'
      },
      ...baseProps
    })

    _snapTest(component)

    it('events: mask & toggle', async() => {
      const maskDOM = component.querySelector('.cube-modal').querySelector('.cube-popup-mask')
      const cb = jest.fn()
      component.addEventListener('confirm', cb)
      component.addEventListener('toggle', cb)
      confirmBtnCom[0].querySelector('.cube-btn').dispatchEvent('tap')
      await simulate.sleep(10)
      expect(cb)
        .toHaveBeenCalled()
      checkEvent('maskClick', maskDOM, 'touchend', component)
      expect(component.data.isVisible)
        .toBe(false)
    })
  })

  // 顶部取消
  describe('header cancel', () => {
    const props = {
      cancelBtnAlign: 'right',
      cancelText: '确认取消',
      ...baseProps
    }
    const component = _createComponent(props)
    const cancelBtnCom = component.querySelector('.cube-modal-cancel-btn')

    _snapTest(component)

    it('render: cancel btn text', () => {
      const cancelBtnText = cancelBtnCom.dom.innerHTML
      expect(cancelBtnText)
        .toBe(props.cancelText)
    })

    it('render: cancel btn align', () => {
      const cancelInstance = component.querySelector('.cube-modal-cancel')
      expect(cancelInstance.instance.classList.contains('algin-right')).toBe(true)
    })

    it('event: cancel', () => {
      checkEvent('cancel', cancelBtnCom, 'tap', component)
    })
  })

  describe('slot check', () => {
    const data = {
      headerText: '我是slot header',
      titleText: '我是slot title',
      contentText: '我是slot content',
      footerText: '我是slot footer'

    }
    const component = simulate.render(simulate.load({
      usingComponents: {
        'cube-modal': componentId
      },
      template: `
        <cube-modal class="modal" wx:ref="modal">
          <view slot="header" class="modal-header-slot">${data.headerText}</view>
          <view slot="title" class="modal-title-slot">${data.titleText}</view>
          <view slot="content" class="modal-content-slot">${data.contentText}</view>
          <view slot="icon" class="modal-icon-slot" src="https://ut-static.udache.com/webx/mpx-cube-ui/06UBoCw3t0hVzCurBpcKs.png"></view>
          <view slot="footer" class="modal-footer-slot">${data.footerText}</view>
        </cube-modal>
      `
    }
    ))
    const container = document.createElement('container')
    component.attach(container)

    _snapTest(component)

    it('render correct', () => {
      expect(_getDOMInnerHTML('.modal-header-slot'))
        .toBe(data.headerText)
      expect(_getDOMInnerHTML('.modal-title-slot'))
        .toBe(data.titleText)
      expect(_getDOMInnerHTML('.modal-content-slot'))
        .toBe(data.contentText)
      expect(_getDOMInnerHTML('.modal-footer-slot'))
        .toBe(data.footerText)
      expect(component.querySelector('.modal').querySelector('.cube-modal-body').dom.querySelector('.modal-icon-slot'))
        .toBeTruthy()
    })

    function _getDOMInnerHTML(selector) {
      return component.querySelector(selector).dom.innerHTML
    }
  })

  async function checkEvent(listenerEvent, dispatchDOM, dispatchEvent, component, disabled = false) {
    const cb = jest.fn()
    component.addEventListener(listenerEvent, cb)
    dispatchDOM.dispatchEvent(dispatchEvent)
    await simulate.sleep(10)
    if (!disabled) {
      expect(cb)
        .toHaveBeenCalled()
    } else {
      expect(cb)
        .not.toHaveBeenCalled()
    }
  }
})

const simulate = require('@mpxjs/miniprogram-simulate')

describe('component checkbox-modal unit test', function() {
  const componentId = simulate.loadMpx('src/components/checkbox-modal/index.mpx')

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
    visible: false,
    maskClosable: false,
    cancelBtnAlign: 'left',
    showCloseIcon: false,
    confirmBtn: '确定'
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
      await snapTest(componentId, BASE_PROPS)
      await snapTest(
        componentId,
        {
          visible: true,
          ...BASE_PROPS
        }
      )
      await snapTest(
        componentId,
        {
          maskClosable: true,
          ...BASE_PROPS
        }
      )
      await snapTest(
        componentId,
        {
          cancelBtnAlign: 'right',
          ...BASE_PROPS
        }
      )
      await snapTest(
        componentId,
        {
          showCloseIcon: true,
          ...BASE_PROPS
        }
      )
      await snapTest(
        componentId,
        {
          confirmBtn: 'OK',
          ...BASE_PROPS
        }
      )
    })
  })

  describe('prop check', () => {
    it('prop default', () => {
      const component = newComponent(componentId, BASE_PROPS)
      const that = component.instance

      expect(that.options).toEqual(BASE_PROPS.options)
      expect(that.values).toEqual(BASE_PROPS.values)
      expect(that.visible).toBe(DEFAULT_PROPS.visible)
      expect(that.maskClosable).toBe(DEFAULT_PROPS.maskClosable)
      expect(that.cancelBtnAlign).toBe(DEFAULT_PROPS.cancelBtnAlign)
      expect(that.showCloseIcon).toBe(DEFAULT_PROPS.showCloseIcon)
      expect(that.confirmBtn).toBe(DEFAULT_PROPS.confirmBtn)

      const popup = component.querySelector('cube-modal').querySelector('cube-popup')
      const showDom = popup.querySelector('.cube-popup').dom
      expect(showDom.className).not.toMatch('show')
    })
    it('prop visible', () => {
      const component = newComponent(componentId, {
        visible: true,
        ...BASE_PROPS
      })
      const that = component.instance
      expect(that.visible).toBe(true)

      const popup = component.querySelector('cube-modal').querySelector('cube-popup')
      const showDom = popup.querySelector('.cube-popup').dom
      expect(showDom.className).toMatch('show')
    })

    it('prop maskClosable', async () => {
      const component = newComponent(componentId, {
        visible: true,
        maskClosable: true,
        ...BASE_PROPS
      })
      const that = component.instance
      expect(that.visible).toBe(true)

      const popup = component.querySelector('cube-modal').querySelector('cube-popup')
      const showDom = popup.querySelector('.cube-popup').dom
      const maskDom = popup.querySelector('.cube-popup-mask')
      maskDom.dispatchEvent('touchend')
      await simulate.sleep(10)
      expect(showDom.className).not.toMatch('show')
    })

    it('prop title', () => {
      const titleText = 'this is title'
      const component = newComponent(componentId, {
        title: titleText,
        ...BASE_PROPS
      })
      const that = component.instance
      expect(that.title).toBe(titleText)

      const modal = component.querySelector('cube-modal')
      const dom = modal.querySelector('.cube-modal-title').dom
      expect(dom.innerHTML).toBe(titleText)
    })

    it('prop cancelText', () => {
      const cancelText = 'this is cancelText'
      const component = newComponent(componentId, {
        cancelText,
        ...BASE_PROPS
      })
      const that = component.instance
      expect(that.cancelText).toBe(cancelText)

      const modal = component.querySelector('cube-modal')
      const dom = modal.querySelector('.cube-modal-cancel').dom
      expect(dom.firstChild.innerHTML).toBe(cancelText)
    })

    it('prop cancelBtnAlign', () => {
      const component = newComponent(componentId, {
        cancelText: 'cancelText',
        cancelBtnAlign: 'right',
        ...BASE_PROPS
      })
      const that = component.instance
      expect(that.cancelBtnAlign).toBe('right')

      const modal = component.querySelector('cube-modal')
      const dom = modal.querySelector('.cube-modal-cancel').dom
      expect(dom.className).toMatch('algin-right')
    })

    it('prop showCloseIcon', () => {
      const component = newComponent(componentId, {
        showCloseIcon: true,
        ...BASE_PROPS
      })
      const that = component.instance
      expect(that.showCloseIcon).toBe(true)

      const modal = component.querySelector('cube-modal')
      const dom = modal.querySelector('.cube-modal-close-icon').dom
      expect(dom).toBeTruthy()
    })
    it('prop subtitle', () => {
      const titleText = 'this is title'
      const component = newComponent(componentId, {
        subtitle: titleText,
        ...BASE_PROPS
      })
      const that = component.instance
      expect(that.subtitle).toBe(titleText)

      const dom = component.querySelector('.cube-checkbox-modal-subtitle').dom
      expect(dom.innerHTML).toBe(titleText)
    })
    it('prop options', () => {
      const options = [
        {
          value: '苹果value',
          text: '苹果desc'
        },
        {
          value: '桃子value',
          text: '桃子desc'
        }
      ]
      const component = newComponent(componentId, { options })
      const that = component.instance
      expect(that.options).toEqual(options)
    })
    it('prop values', () => {
      const values = ['桃子value']
      const component = newComponent(componentId, {
        ...BASE_PROPS,
        values
      })
      const that = component.instance
      expect(that.values).toEqual(values)
    })
  })

  describe('click check', () => {
    it('maskClick event', async () => {
      const component = newComponent(componentId, {
        maskClosable: true,
        ...BASE_PROPS
      })
      const maskFn = jest.fn()

      component.addEventListener('close', maskFn)
      const popup = component.querySelector('cube-modal').querySelector('cube-popup')
      const maskDom = popup.querySelector('.cube-popup-mask')
      maskDom.dispatchEvent('touchend')
      await simulate.sleep(10)
      expect(maskFn).toHaveBeenCalled()
    })
  })

  describe('slot check', () => {
    const subtitle = '我是subtitle-slot'
    const component = simulate.render(simulate.load({
      usingComponents: {
        'cube-checkbox-modal': componentId
      },
      template: `
        <cube-checkbox-modal class="chekbox-modal" wx:ref="modal">
          <view slot="subtitle" class="subtitle-slot">${subtitle}</view>
        </cube-chekbox-cmodal>
      `
    }
    ))
    const container = document.createElement('container')
    component.attach(container)

    it('render correct', async () => {
      expect(component.dom.innerHTML).toMatchSnapshot()
      const slotDom = component.querySelector('.subtitle-slot').dom.innerHTML
      expect(slotDom).toBe(subtitle)
    })
  })
})

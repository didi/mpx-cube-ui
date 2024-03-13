import { cascadeData } from '../../common/data/cascade-picker-data'

const simulate = require('@mpxjs/miniprogram-simulate')

const selectedIndex = [1, 1, 2]
describe('component cascade-picker unit test', function() {
  const componentId = simulate.loadMpx('src/components/cascade-picker-modal/index.mpx')
  const templateComponentId = simulate.loadMpx('test/components/cascade-picker-modal/template/value-change.mpx')
  function getBaseProps(setProps = false) {
    let props = {
      selectedIndex,
      list: cascadeData
    }
    if (setProps) {
      props = {
        ...props,
        pending: false,
        cancelBtnAlign: 'left',
        noBuiltInBtns: true,
        maskClosable: false,
        showCloseIcon: true,
        cancelText: '这是取消文案',
        layout: 'horizontal',
        title: '选择器',
        content: '内容',
        visible: true
      }
    }
    return props
  }

  function newComponent(props, noTemplate = true) {
    let component
    if (noTemplate) {
      component = simulate.render(componentId, props)
    } else {
      component = simulate.render(templateComponentId)
    }
    component.attach(document.createElement('parent')) // 会触发 attach 生命周期
    return component
  }

  describe('base props check', () => {
    const baseProps = getBaseProps()
    const component = newComponent(baseProps)
    it('matchSnapshot', async () => {
      await simulate.sleep(100)
      expect(component.dom.innerHTML).toMatchSnapshot() // 判断前后生成的dom是否一样 todo
    })
    // cascadePicker 正常传入
    const cascadePicker = component.querySelector('cube-cascade-picker').instance.data
    expect(cascadePicker.selectedIndex).toEqual(baseProps.selectedIndex)
    expect(cascadePicker.list).toEqual(baseProps.list)
    // expect(cascadePicker.value).toBe(baseProps.value)

    const that = component.instance.data
    expect(that.title).toBe('')
    expect(that.showCloseIcon).toBe(true)
    expect(that.maskClosable).toBe(true)
    expect(that.cancelText).toBe('')
    expect(that.noBuiltInBtns).toBe(false)
    expect(that.cancelBtnAlign).toBe('left')
    expect(that.layout).toBe('vertical')
  })

  describe('base props check', () => {
    const baseProps = getBaseProps()
    const component = newComponent(baseProps)
    it('matchSnapshot', async () => {
      await simulate.sleep(100)
      expect(component.dom.innerHTML).toMatchSnapshot() // 判断前后生成的dom是否一样 todo
    })
    // cascadePicker 正常传入
    const cascadePicker = component.querySelector('cube-cascade-picker').instance.data
    expect(cascadePicker.selectedIndex).toEqual(baseProps.selectedIndex)
    expect(cascadePicker.list).toEqual(baseProps.list)
    // expect(cascadePicker.value).toBe(baseProps.value)

    const that = component.instance.data
    expect(that.title).toBe('')
    expect(that.showCloseIcon).toBe(true)
    expect(that.maskClosable).toBe(true)
    expect(that.cancelText).toBe('')
    expect(that.noBuiltInBtns).toBe(false)
    expect(that.cancelBtnAlign).toBe('left')
    expect(that.layout).toBe('vertical')
  })
  describe('base set props check', () => {
    const baseProps = getBaseProps(true)
    const component = newComponent(baseProps)
    it('matchSnapshot', async () => {
      await simulate.sleep(100)
      expect(component.dom.innerHTML).toMatchSnapshot() // 判断前后生成的dom是否一样 todo
    })
    // cascadePicker 正常传入
    const cascadePicker = component.querySelector('cube-cascade-picker').instance.data
    expect(cascadePicker.selectedIndex).toEqual(baseProps.selectedIndex)
    expect(cascadePicker.list).toEqual(baseProps.list)
    // expect(cascadePicker.value).toBe(baseProps.value)

    const that = component.instance.data
    expect(that.title).toBe(baseProps.title)
    expect(that.showCloseIcon).toBe(baseProps.showCloseIcon)
    expect(that.maskClosable).toBe(baseProps.maskClosable)
    expect(that.cancelText).toBe(baseProps.cancelText)
    expect(that.noBuiltInBtns).toBe(baseProps.noBuiltInBtns)
    expect(that.cancelBtnAlign).toBe(baseProps.cancelBtnAlign)
    expect(that.layout).toBe(baseProps.layout)
  })

  describe('api check', () => {
    it('test change event', async () => {
      const baseProps = getBaseProps()
      // 需要写在 it 里面，不清楚为啥写 it 外面时, picker-view 的 change 事件
      const component = newComponent(baseProps)
      // picker attached 生命周期中有nextTick逻辑
      // 需要通过sleep(0)使得先执行掉picker逻辑后，再执行测试代码
      await simulate.sleep(0)

      // cascadePicker 事件触发
      const columnChange = jest.fn()
      const change = jest.fn()
      component.addEventListener('columnChange', columnChange)
      component.addEventListener('change', change)

      const pickerView = component.querySelector('cube-cascade-picker').querySelector('.cube-cascade-picker').querySelector('.cube-picker-wheel-wrapper')

      // 从0开始，下方意味着：滚动第一列，选中第一列的第3项
      const changeColumn = 0
      const changeIndex = 2
      pickerView.instance.scroll(changeColumn, changeIndex)

      await simulate.sleep(10)
      expect(columnChange).toHaveBeenCalled()
      expect(change).toHaveBeenCalled()
      // modal 事件触发
      const confirm = jest.fn()
      const cancel = jest.fn()
      component.addEventListener('confirm', confirm)
      component.addEventListener('cancel', cancel)

      const pickerModal = component.querySelector('.cube-cascade-picker-modal')
      pickerModal.dispatchEvent('confirm')
      pickerModal.dispatchEvent('cancel')
      await simulate.sleep(10)
      expect(confirm).toHaveBeenCalled()
      expect(cancel).toHaveBeenCalled()
    })

    it('test valueChange event', async () => {
      const component = newComponent({}, false)
      await simulate.sleep(0)

      const confirm = jest.fn()
      const change = jest.fn()
      const valueChange = jest.fn()
      const modalComponent = component.querySelector('cube-cascade-picker-modal')
      modalComponent.addEventListener('confirm', confirm)
      modalComponent.addEventListener('valueChange', valueChange)
      modalComponent.addEventListener('change', change)
      // 滑动picker
      const pickerView = modalComponent.querySelector('cube-cascade-picker').querySelector('.cube-cascade-picker').querySelector('.cube-picker-wheel-wrapper')
      // 从0开始，下方意味着：滚动第一列，选中第一列的第二项
      const changeColumn = 1
      const changeIndex = 2
      pickerView.instance.scroll(changeColumn, changeIndex)
      await simulate.sleep(100)

      // 触发确认按钮cube-cascade-picker-modal
      const pickerModal = component.querySelector('cube-cascade-picker-modal').querySelector('.cube-cascade-picker-modal')
      pickerModal.dispatchEvent('confirm')
      await simulate.sleep(10)

      const valueChangeDetail = valueChange.mock.calls[0][0].detail
      expect(change).toHaveBeenCalled()
      expect(confirm).toHaveBeenCalled()
      expect(valueChange).toHaveBeenCalled()
      expect(valueChangeDetail).toEqual({
        selectedText: ['Fruit text', 'Lemon', 'Three'],
        selectedIndex: [0, 2, 2],
        selectedVal: ['Fruit value', 'Lemon', 3] // 因为第三列数据不变
      })
    })
  })
  describe('slot check', () => {
    const headerMessage = 'head'
    const footerMessage = 'footer'

    const component = simulate.render(simulate.load({
      usingComponents: {
        'cube-cascade-picker-modal': componentId
      },
      template: `
      <cube-cascade-picker-modal>
        <view class="header-slot" slot="header">${headerMessage}</view>
        <view class="footer-slot" slot="footer">${footerMessage}</view>
      </cube-cascade-picker-modal>
    `
    }))
    component.attach(document.createElement('parent'))

    it('matchSnapshot', () => {
      expect(component.dom.innerHTML).toMatchSnapshot()
    })
    it('slot render', () => {
      const header = component.querySelector('.header-slot').dom
      const footer = component.querySelector('.footer-slot').dom
      expect(header.innerHTML).toBe(headerMessage)
      expect(footer.innerHTML).toBe(footerMessage)
    })
  })
})

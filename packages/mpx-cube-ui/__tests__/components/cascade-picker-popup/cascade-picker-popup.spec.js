import { cascadeData } from '../../common/data/cascade-picker-data'

const simulate = require('@mpxjs/miniprogram-simulate')

const selectedIndex = [1, 1, 2]
describe('component cascade-picker unit test', function() {
  const componentId = simulate.loadMpx('src/components/cascade-picker-popup/index.mpx')
  const templateComponentId = simulate.loadMpx('test/components/cascade-picker-popup/template/value-change.mpx')
  function getBaseProps(setProps = false) {
    let props = {
      selectedIndex,
      list: cascadeData
    }
    if (setProps) {
      props = {
        ...props,
        pending: false,
        maskClosable: false,
        cancelTxt: 'cancel',
        confirmTxt: 'ok',
        title: '选择器',
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

    const that = component.instance.data
    expect(that.title).toBe('')
    expect(that.maskClosable).toBe(true)
    expect(that.cancelTxt).toBe('取消')
    expect(that.confirmTxt).toBe('确认')
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

    const that = component.instance.data
    expect(that.title).toBe('')
    expect(that.maskClosable).toBe(true)
    expect(that.cancelTxt).toBe('取消')
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

    const that = component.instance.data
    expect(that.title).toBe(baseProps.title)
    expect(that.maskClosable).toBe(baseProps.maskClosable)
    expect(that.cancelTxt).toBe(baseProps.cancelTxt)
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
      // popup 事件触发
      const confirm = jest.fn()
      const cancel = jest.fn()
      component.addEventListener('confirm', confirm)
      component.addEventListener('cancel', cancel)

      const pickerPopup = component.querySelector('.cube-cascade-picker-popup')
      pickerPopup.dispatchEvent('confirm')
      pickerPopup.dispatchEvent('cancel')
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
      const popupComponent = component.querySelector('cube-cascade-picker-popup')
      popupComponent.addEventListener('confirm', confirm)
      popupComponent.addEventListener('valueChange', valueChange)
      popupComponent.addEventListener('change', change)
      // 滑动picker
      const pickerView = popupComponent.querySelector('cube-cascade-picker').querySelector('.cube-cascade-picker').querySelector('.cube-picker-wheel-wrapper')
      // 从0开始，下方意味着：滚动第一列，选中第一列的第二项
      const changeColumn = 1
      const changeIndex = 2
      pickerView.instance.scroll(changeColumn, changeIndex)
      await simulate.sleep(100)

      // 触发确认按钮cube-cascade-picker-popup
      const pickerPopup = component.querySelector('cube-cascade-picker-popup').querySelector('.cube-cascade-picker-popup')
      pickerPopup.dispatchEvent('confirm')
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
        'cube-cascade-picker-popup': componentId
      },
      template: `
      <cube-cascade-picker-popup>
        <view class="header-slot" slot="header">${headerMessage}</view>
        <view class="footer-slot" slot="footer">${footerMessage}</view>
      </cube-cascade-picker-popup>
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

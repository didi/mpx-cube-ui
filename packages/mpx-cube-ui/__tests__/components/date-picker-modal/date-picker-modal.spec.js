const simulate = require('@mpxjs/miniprogram-simulate')

describe('component picker unit test', function () {
  const componentId = simulate.loadMpx('src/components/date-picker-modal/index.mpx')
  const templateComponentId = simulate.loadMpx('test/components/date-picker-modal/template/value-change.mpx')

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
  function generateData(year, month, day) {
    return +new Date(year, month, day)
  }
  function getBaseProps(defualt = false) {
    let prop = {
      title: '日期选择器',
      min: generateData(2010, 7, 8),
      max: generateData(2022, 9, 20),
      value: generateData(2010, 7, 8),
      tile: '这是标题'
    }
    if (defualt) {
      prop = {
        ...prop,
        format: {
          year: 'YY年',
          month: 'MM月',
          date: '第 D 日'
        },
        columnOrder: ['date', 'month', 'year'],
        cancelBtnAlign: 'left',
        noBuiltInBtns: true,
        maskClosable: false,
        showCloseIcon: false,
        cancelText: '这是取消文案',
        visible: true,
        columnCount: 2,
        startColumn: 'year',
        layout: 'horizontal'
      }
    }
    return prop
  }

  describe('base defaul props check', () => {
    const baseProps = getBaseProps()
    const component = newComponent(baseProps)
    it('matchSnapshot', () => {
      expect(component.dom.innerHTML).toMatchSnapshot() // 判断前后生成的dom是否一样
    })

    // datePicker 正常传入
    const datePicker = component.querySelector('cube-date-picker').instance.data
    expect(datePicker.mix).toBe(baseProps.mix)
    expect(datePicker.max).toBe(baseProps.max)
    expect(datePicker.value).toBe(baseProps.value)

    const that = component.instance.data
    expect(that.title).toBe(baseProps.title)
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
    it('matchSnapshot', () => {
      expect(component.dom.innerHTML).toMatchSnapshot() // 判断前后生成的dom是否一样
    })
    const that = component.instance.data
    // datePicker 正常传入
    const datePicker = component.querySelector('cube-date-picker').instance.data
    expect(datePicker.columnOrder).toEqual(baseProps.columnOrder)
    expect(datePicker.format).toEqual(baseProps.format)
    expect(datePicker.columnCount).toEqual(baseProps.columnCount)
    expect(datePicker.startColumn).toEqual(baseProps.startColumn)

    expect(that.showCloseIcon).toBe(false)
    expect(that.maskClosable).toBe(false)
    expect(that.cancelText).toBe('这是取消文案')
    expect(that.noBuiltInBtns).toBe(true)
    expect(that.cancelBtnAlign).toBe('left')
    expect(that.layout).toBe('horizontal')
  })

  describe('api check', () => {
    it('test change event', async () => {
      const baseProps = getBaseProps()
      // 需要写在 it 里面，不清楚为啥写 it 外面时, picker-view 的 change 事件
      const component = newComponent(baseProps)
      // picker attached 生命周期中有nextTick逻辑
      // 需要通过sleep(0)使得先执行掉picker逻辑后，再执行测试代码
      await simulate.sleep(0)

      // datePicker 事件触发
      const columnChange = jest.fn()
      const change = jest.fn()
      component.addEventListener('columnChange', columnChange)
      component.addEventListener('change', change)
      const pickerView = component.querySelector('cube-date-picker').querySelector('.cube-date-picker').querySelector('.cube-picker-wheel-wrapper')
      // 从0开始，下方意味着：滚动第一列，选中第一列的第二项
      const changeColumn = 0
      const changeIndex = 12
      pickerView.instance.scroll(changeColumn, changeIndex)

      await simulate.sleep(10)
      expect(columnChange).toHaveBeenCalled()
      expect(change).toHaveBeenCalled()
      // modal 事件触发
      const confirm = jest.fn()
      const cancel = jest.fn()
      component.addEventListener('confirm', confirm)
      component.addEventListener('cancel', cancel)

      const pickerModal = component.querySelector('.cube-date-picker-modal')
      pickerModal.dispatchEvent('confirm')
      pickerModal.dispatchEvent('cancel')
      await simulate.sleep(10)
      expect(confirm).toHaveBeenCalled()
      expect(cancel).toHaveBeenCalled()
    })
    it('test valueChange event', async () => {
      const baseProps = getBaseProps()
      // 需要写在 it 里面，不清楚为啥写 it 外面时, picker-view 的 change 事件
      const component = newComponent(baseProps, false)
      // picker attached 生命周期中有nextTick逻辑
      // 需要通过sleep(0)使得先执行掉picker逻辑后，再执行测试代码
      await simulate.sleep(0)

      const confirm = jest.fn()
      const valueChange = jest.fn()
      component.querySelector('cube-date-picker-modal').addEventListener('confirm', confirm)
      component.querySelector('cube-date-picker-modal').addEventListener('valueChange', valueChange)

      // 滑动picker
      const pickerView = component.querySelector('cube-date-picker-modal').querySelector('cube-date-picker').querySelector('.cube-date-picker').querySelector('.cube-picker-wheel-wrapper')
      // 从0开始，下方意味着：滚动第一列，选中第一列的第二项
      const changeColumn = 0
      const changeIndex = 3
      pickerView.instance.scroll(changeColumn, changeIndex)
      await simulate.sleep(10)

      // 触发确认按钮cube-date-picker-modal
      const pickerModal = component.querySelector('cube-date-picker-modal').querySelector('.cube-date-picker-modal')
      pickerModal.dispatchEvent('confirm')
      await simulate.sleep(10)
      const valueChangeDetail = valueChange.mock.calls[0][0].detail
      delete valueChangeDetail.date
      expect(confirm).toHaveBeenCalled()
      expect(valueChange).toHaveBeenCalled()
      expect(valueChangeDetail).toEqual({
        selectedText: ['2013', '8', '8'],
        selectedVal: [2013, 8, 8]
      })
    })
  })
  describe('slot check', () => {
    const headerMessage = 'head'
    const footerMessage = 'footer'

    const component = simulate.render(simulate.load({
      usingComponents: {
        'cube-date-picker-modal': componentId
      },
      template: `
        <cube-date-picker-modal value="{{${+new Date('2023-02-10')}}}" max="{{${+new Date('2024/12/31 23:59:59')}}}">
          <view class="header-slot" slot="header">${headerMessage}</view>
          <view class="footer-slot" slot="footer">${footerMessage}</view>
        </cube-date-picker-modal>
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

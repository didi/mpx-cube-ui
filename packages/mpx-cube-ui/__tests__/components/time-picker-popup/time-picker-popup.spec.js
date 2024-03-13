const simulate = require('@mpxjs/miniprogram-simulate')

describe('component picker unit test', function () {
  const componentId = simulate.loadMpx('src/components/time-picker-popup/index.mpx')
  const templateComponentId = simulate.loadMpx('test/components/time-picker-popup/template/value-change.mpx')
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
    const baseProps = {
      title: '我是标题',
      subtitle: '副标题',
      cancelTxt: '取消文案',
      confirmTxt: '确认文案',
      min: +new Date(2022, 11, 11, 12, 37)
    }
    const component = newComponent(baseProps)

    const data = component.instance.data

    it('matchSnapshot', () => {
      expect(component.dom.innerHTML).toMatchSnapshot() // 判断前后生成的dom是否一样
    })
    // popup
    expect(data.title).toEqual('我是标题')
    expect(data.subtitle).toEqual('副标题')
    expect(data.cancelTxt).toEqual('取消文案')
    expect(data.confirmTxt).toEqual('确认文案')
    expect(data.maskClosable).toEqual(true)
    expect(data.confirmTxt).toEqual('确认文案')

    // time-picker 接收参数
    const timePicker = component.querySelector('cube-time-picker').instance.data
    expect(timePicker.day).toEqual({
      len: 3
    })
    expect(timePicker.delay).toBe(15)
    expect(timePicker.showNow).toEqual(true)
    expect(timePicker.minuteStep).toEqual(10)
    expect(timePicker.format).toEqual('YYYY/M/D hh:mm')
    //  0 还是 null
    expect(timePicker.min).toEqual(baseProps.min)
    expect(timePicker.max).toEqual(0)
  })

  describe('props:minuteStep check', () => {
    // 和时间有关，所以设置min，否则快照会改变
    const baseProps = {
      minuteStep: {
        rule: 'floor',
        step: 5
      },
      min: +new Date(2022, 11, 11, 12, 37)
    }
    const component = newComponent(baseProps)
    it('matchSnapshot', () => {
      expect(component.dom.innerHTML).toMatchSnapshot() // 判断前后生成的dom是否一样
    })
    // 部分检测
    it('value Right', () => {
      const timePicker = component.querySelector('cube-time-picker').instance.data
      expect(timePicker.minuteStep).toEqual(baseProps.minuteStep)
    })
  })
  describe(' props:day check ', () => {
    const baseProps = {
      day: {
        len: 4,
        filter: ['今', '明'],
        format: 'M月份D号'
      },
      min: +new Date(2022, 11, 11, 12, 37)
    }
    const component = newComponent(baseProps)
    it('matchSnapshot', () => {
      expect(component.dom.innerHTML).toMatchSnapshot() // 判断前后生成的dom是否一样
    })
    // 部分检测
    it('value Right', () => {
      const timePicker = component.querySelector('cube-time-picker').instance.data
      expect(timePicker.day).toEqual(baseProps.day)
    })
  })
  describe(' props:delay check ', () => {
    const baseProps = {
      delay: 3,
      min: +new Date(2022, 11, 11, 12, 2)
    }
    const component = newComponent(baseProps)
    it('matchSnapshot', () => {
      expect(component.dom.innerHTML).toMatchSnapshot() // 判断前后生成的dom是否一样
    })
    // 部分检测
    it('value Right', () => {
      const timePicker = component.querySelector('cube-time-picker').instance.data
      expect(timePicker.delay).toEqual(baseProps.delay)
    })
  })
  describe(' props:showNow check ', () => {
    const baseProps = {
      showNow: false,
      min: +new Date(2022, 11, 11, 12, 2)
    }
    const component = newComponent(baseProps)
    it('matchSnapshot', () => {
      expect(component.dom.innerHTML).toMatchSnapshot() // 判断前后生成的dom是否一样
    })
    it('value Right', () => {
      const timePicker = component.querySelector('cube-time-picker').instance.data
      expect(timePicker.showNow).toEqual(baseProps.showNow)
    })
  })
  describe('props: min check ', () => {
    const baseProps = {
      min: +new Date(2022, 11, 11, 12, 37)
    }
    const component = newComponent(baseProps)
    it('matchSnapshot', () => {
      expect(component.dom.innerHTML).toMatchSnapshot() // 判断前后生成的dom是否一样
    })
    it('value Right', () => {
      const timePicker = component.querySelector('cube-time-picker').instance.data
      expect(timePicker.min).toEqual(baseProps.min)
    })
  })
  describe('props: max check ', () => {
    const baseProps = {
      delay: 0,
      min: +new Date(2023, 11, 7, 12, 37),
      max: +new Date(2023, 11, 11, 12, 37)
    }
    const component = newComponent(baseProps)
    it('matchSnapshot', () => {
      expect(component.dom.innerHTML).toMatchSnapshot() // 判断前后生成的dom是否一样
    })
    it('value Right', () => {
      const timePicker = component.querySelector('cube-time-picker').instance.data
      expect(timePicker.delay).toEqual(baseProps.delay)
      expect(timePicker.max).toEqual(baseProps.max)
    })
  })

  describe('api check', () => {
    it('test  change event', async () => {
      // 需要写在 it 里面，不清楚为啥写 it 外面时, picker-view 的 change 事件
      const component = newComponent({
        min: +new Date(2022, 11, 11, 12, 30)
      })
      // picker attached 生命周期中有nextTick逻辑
      // 需要通过sleep(0)使得先执行掉picker逻辑后，再执行测试代码
      await simulate.sleep(0)
      const confirm = jest.fn()
      const cancel = jest.fn()
      component.addEventListener('confirm', confirm)
      component.addEventListener('cancel', cancel)
      const pickerModal = component.querySelector('.cube-time-picker-popup')
      pickerModal.dispatchEvent('confirm')
      pickerModal.dispatchEvent('cancel')
      await simulate.sleep(10)
      expect(confirm).toHaveBeenCalled()
      expect(cancel).toHaveBeenCalled()

      // timePicker 事件触发
      const columnChange = jest.fn()
      const change = jest.fn()
      const pickerView = component.querySelector('cube-time-picker').querySelector('.cube-time-picker').querySelector('.cube-cascade-picker').querySelector('.cube-picker-wheel-wrapper')
      // 从0开始，下方意味着：滚动第一列，选中第一列的第二项
      const changeColumn = 0
      const changeIndex = 1
      pickerView.instance.scroll(changeColumn, changeIndex)
      component.addEventListener('columnChange', columnChange)
      component.addEventListener('change', change)
      await simulate.sleep(10)
      expect(columnChange).toHaveBeenCalled()
      expect(change).toHaveBeenCalled()
    })
    it('test methods api', async () => {
      const component = newComponent({}, false)
      // picker attached 生命周期中有nextTick逻辑
      // 需要通过sleep(0)使得先执行掉picker逻辑后，再执行测试代码
      await simulate.sleep(0)

      // 从0开始，下方意味着：滚动第一列，选中第一列的第二项
      const confirm = jest.fn()
      const valueChange = jest.fn()
      component.querySelector('cube-time-picker-popup').addEventListener('confirm', confirm)
      component.querySelector('cube-time-picker-popup').addEventListener('valueChange', valueChange)

      // 滑动picker
      const pickerView = component.querySelector('cube-time-picker-popup').querySelector('cube-time-picker').querySelector('.cube-time-picker').querySelector('.cube-cascade-picker').querySelector('.cube-picker-wheel-wrapper')

      // 从0开始，下方意味着：滚动第一列，选中第一列的第二项
      const changeColumn = 0
      const changeIndex = 1
      pickerView.instance.scroll(changeColumn, changeIndex)
      await simulate.sleep(10)

      // 触发确认按钮cube-time-picker-popup
      const pickerModal = component.querySelector('cube-time-picker-popup').querySelector('.cube-time-picker-popup')
      pickerModal.dispatchEvent('confirm')
      await simulate.sleep(10)
      const valueChangeDetail = valueChange.mock.calls[0][0].detail
      delete valueChangeDetail.date
      expect(confirm).toHaveBeenCalled()
      expect(valueChange).toHaveBeenCalled()
      expect(valueChangeDetail).toEqual({
        formatedTime: '2022/12/12 12:00',
        selectedText: '12月12日 12点:00分',
        selectedTime: 1670817600000
      })
    })
  })
})

const simulate = require('@mpxjs/miniprogram-simulate')

describe('component picker unit test', function () {
  const componentId = simulate.loadMpx('src/components/time-picker/index.mpx')
  function newComponent(props) {
    const component = simulate.render(componentId, props)
    component.attach(document.createElement('parent')) // 会触发 attach 生命周期
    return component
  }
  function minuteArray() {
    const arr = []
    for (let i = 0; i < 12; i++) {
      if (i < 2) {
        arr.push({ text: `0${i * 5}分`, value: i * 5 })
      } else {
        arr.push({ text: `${i * 5}分`, value: i * 5 })
      }
    }
    return arr
  }
  describe('base props check', () => {
    const component = newComponent({
      min: +new Date(2022, 11, 11, 12, 37)
    })

    const data = component.instance.data
    it('matchSnapshot', () => {
      expect(component.dom.innerHTML).toMatchSnapshot() // 判断前后生成的dom是否一样
    })

    it('selectedIndex check', () => {
      // 顶部
      expect(data.selectedIndex).toEqual([0, 0, 0])
      // 尾部
    })
    it('should render correct column', () => {
      const column = component.querySelector('.cube-time-picker').querySelector('.cube-cascade-picker').querySelectorAll('.cube-picker-wheel-scroll')
      expect(column.length).toBe(data.cascadeData.length)
      // 初始状态
      expect(column[0].dom.children.length).toBe(data.cascadeData.length)
      expect(column[1].dom.children.length).toBe(data.cascadeData[0].children.length)
      expect(column[2].dom.children.length).toBe(3)
    })
    it('delay check', async () => {
      expect(data.delay).toBe(15)
    })
    it(' day check ', async () => {
      expect(data.day).toEqual({
        len: 3
      })
    })
    it(' showNow check ', async () => {
      expect(data.showNow).toEqual(true)
    })
    it(' minuteStep check ', async () => {
      expect(data.minuteStep).toEqual(10)
    })
    it(' format check ', async () => {
      expect(data.format).toEqual('YYYY/M/D hh:mm')
    })
    it('   max check ', async () => {
      expect(data.max).toEqual(0)
    })
    it('min Right', () => {
      const data = component.instance.data.cascadeData[0].children[0]
      const min = data.children[0].text
      expect(min).toEqual('30分')
    })
  })

  describe('props:minuteStep check', () => {
    const baseProps = {
      minuteStep: {
        rule: 'floor',
        step: 5
      },
      min: +new Date(2022, 11, 11, 12, 2)
    }
    const component = newComponent(baseProps)
    it('matchSnapshot', () => {
      expect(component.dom.innerHTML).toMatchSnapshot() // 判断前后生成的dom是否一样
    })
    // 部分检测
    it('value Right', () => {
      const data = component.instance.data.cascadeData[0]

      const prediction = minuteArray()
      expect(data.children[0].children).toEqual(prediction)
    })
  })
  describe(' props:day check ', () => {
    const baseProps = {
      day: {
        len: 4,
        filter: ['今', '明'],
        format: 'M月份D号'
      }
    }
    const component = newComponent(baseProps)
    // 不同时间会生成不同内容，所以 快照注释了, 设置固定时间不行
    // it('matchSnapshot', () => {
    //     expect(component.dom.innerHTML).toMatchSnapshot() // 判断前后生成的dom是否一样
    // })
    // 部分检测
    it('value Right', () => {
      const data = component.instance.data.cascadeData
      expect(data.length).toBe(baseProps.day.len)
      expect(data[0].text).toBe(baseProps.day.filter[0])
      expect(data[1].text).toBe(baseProps.day.filter[1])
      const date = new Date()
      expect(data[2].text).toBe(`${date.getMonth() + 1}月份${date.getDate() + 2}号`)
    })
  })
  describe(' props:showNow check ', () => {
    const baseProps = {
      showNow: false,
      min: +new Date(2022, 11, 11, 12, 37)
    }
    const component = newComponent(baseProps)
    it('matchSnapshot', () => {
      expect(component.dom.innerHTML).toMatchSnapshot() // 判断前后生成的dom是否一样
    })
    it('value Right', () => {
      const data = component.instance.data.cascadeData[0]
      expect(data.children[0].value).not.toBe('now')
    })
  })
  describe('props: min check ', () => {

  })
  describe('props: max check ', () => {
    let futureTime = Date.now() + 10 * 24 * 60 * 60 * 1000
    futureTime = new Date(futureTime).setMinutes(37)
    const baseProps = {
      delay: 0,
      max: futureTime
    }
    const component = newComponent(baseProps)
    it('value Right', () => {
      const cascadeData = component.instance.data.cascadeData
      const maxChildren = cascadeData[cascadeData.length - 1].children
      const maxValue = maxChildren[maxChildren.length - 1].children
      expect(maxValue[maxValue.length - 1].text).toEqual('30分')
    })
  })
  // format 需要借助于点击才能显现，在api中进行验证了
  describe('api check', () => {
    it('test  change event', async () => {
      // 写死数据
      const baseProps = {
        min: +new Date(2022, 11, 11, 12, 30),
        format: 'YYYY/M/D hh:mmformat测试'
      }
      // 需要写在 it 里面，不清楚为啥写 it 外面时, picker-view 的 change 事件
      const component = newComponent(baseProps)
      // picker attached 生命周期中有nextTick逻辑
      // 需要通过sleep(0)使得先执行掉picker逻辑后，再执行测试代码
      await simulate.sleep(0)
      const columnChange = jest.fn()
      const change = jest.fn()
      component.addEventListener('columnChange', columnChange)
      component.addEventListener('change', change)
      const pickerView = component.querySelector('.cube-time-picker').querySelector('.cube-cascade-picker').querySelector('.cube-picker-wheel-wrapper')
      // 从0开始，下方意味着：滚动第一列，选中第一列的第二项
      const changeColumn = 0
      const changeIndex = 1
      pickerView.instance.scroll(changeColumn, changeIndex)

      await simulate.sleep(10)
      expect(change).toHaveBeenCalled()
      expect(columnChange).toBeCalledTimes(3)
      const columnChangeDetail1 = columnChange.mock.calls[0][0].detail
      const columnChangeDetail2 = columnChange.mock.calls[1][0].detail
      const columnChangeDetail3 = columnChange.mock.calls[2][0].detail
      const changeDetail = change.mock.calls[0][0].detail
      expect(columnChangeDetail1).toEqual({
        column: 0, index: 1, text: '12月12日', value: 1670819400000
      })
      expect(columnChangeDetail2).toEqual({ column: 1, index: 12, text: '12点', value: 12 })
      expect(columnChangeDetail3).toEqual({ column: 2, index: 3, text: '30分', value: 30 })
      expect(changeDetail).toEqual({
        selectedTime: 1670819400000,
        selectedText: '12月12日 12点:30分',
        formatedTime: '2022/12/12 12:30format测试', // 同时也测下format
        selectedIndex: [1, 12, 3]
      })
    })
    it('test methods api', async () => {
      const baseProps = {
        min: +new Date(2022, 11, 11, 12, 30)
      }
      const component = newComponent(baseProps)
      // picker attached 生命周期中有nextTick逻辑
      // 需要通过sleep(0)使得先执行掉picker逻辑后，再执行测试代码
      await simulate.sleep(0)

      const pickerView = component.querySelector('.cube-time-picker').querySelector('.cube-cascade-picker').querySelector('.cube-picker-wheel-wrapper')
      // 从0开始，下方意味着：滚动第一列，选中第一列的第二项
      const changeColumn = 0
      const changeIndex = 1
      pickerView.instance.scroll(changeColumn, changeIndex)
      await simulate.sleep(10)
      // getSelectedInfo
      const info = component.instance.getSelectedInfo()
      const changeProps = {
        selectedTime: 1670819400000,
        selectedText: '12月12日 12点:30分',
        formatedTime: '2022/12/12 12:30',
        selectedIndex: [1, 12, 3]
      }
      expect(info.selectedTime).toEqual(changeProps.selectedTime)
      expect(info.selectedText).toEqual(changeProps.selectedText)
      expect(info.formatedTime).toEqual(changeProps.formatedTime)
      expect(info.selectedIndex).toEqual(changeProps.selectedIndex)

      // setTime
      component.instance.setTime(new Date(2022, 11, 11, 12, 32).valueOf())
      const data = component.instance.data
      const yearAndMonth = data.cascadeData[0].text
      const hour = data.cascadeData[0].children[0].text
      const minute = data.cascadeData[0].children[0].children[0].text
      expect(data.selectedIndex).toEqual([0, 0, 0])
      expect(yearAndMonth).toEqual('12月11日')
      expect(hour).toEqual('12点')
      expect(minute).toEqual('30分')
    })
  })
})

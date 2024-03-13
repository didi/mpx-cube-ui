const simulate = require('@mpxjs/miniprogram-simulate')

describe('component picker unit test', function () {
  const componentId = simulate.loadMpx('src/components/date-picker/index.mpx')
  function newComponent(props) {
    const component = simulate.render(componentId, props)
    component.attach(document.createElement('parent')) // 会触发 attach 生命周期
    return component
  }
  function generateData(year, month, day) {
    return +new Date(year, month, day)
  }
  function getBaseProps(position = true, format = false, columnOrder = false, columnCount = false, startColumn = false) {
    const prop = {
      title: '日期选择器',
      min: generateData(2010, 7, 8),
      max: position ? generateData(2022, 3, 2) : generateData(2022, 9, 20),
      value: position ? generateData(2010, 7, 8) : generateData(2022, 9, 20)
    }
    if (format) {
      prop.format = {
        year: 'YY年',
        month: 'MM月',
        date: '第 D 日'
      }
    }
    if (columnOrder) {
      prop.columnOrder = ['date', 'month', 'year']
    }
    if (columnCount) {
      prop.columnCount = 1
    }
    if (startColumn) {
      prop.startColumn = 'date'
    }
    return prop
  }

  describe('base props check', () => {
    const baseProps = getBaseProps()
    const component = newComponent(baseProps)
    const basePropsTwo = getBaseProps(false)
    const componentTwo = newComponent(basePropsTwo)
    it('matchSnapshot', () => {
      expect(component.dom.innerHTML).toMatchSnapshot() // 判断前后生成的dom是否一样
    })

    it('selectedIndex check', () => {
      const data = component.instance.data
      const dataTwo = componentTwo.instance.data
      // 顶部
      expect(data.pickerSelectedIndex).toEqual([0, 0, 0])
      // 尾部
      expect(dataTwo.pickerSelectedIndex).toEqual([dataTwo.pickerList[0].length - 1, dataTwo.pickerList[1].length - 1, dataTwo.pickerList[2].length - 1])
    })
    it('should render correct column', () => {
      const column = component.querySelector('.cube-date-picker').querySelectorAll('.cube-picker-wheel-scroll')
      const data = component.instance.data
      expect(column.length).toBe(data.pickerList.length)
      for (let i = 0; i < data.pickerList.length; i++) {
        expect(column[i].dom.children.length).toBe(data.pickerList[i].length)
      }
    })
    it('format check', async () => {
      const baseProps = getBaseProps(false, true)
      const component = newComponent(baseProps)
      await simulate.sleep(0)
      const info = component.instance.getSelectedInfo()

      const changeProps = {
        text: ['22年', '10月', '第 20 日'],
        selectedIndex: [12, 9, 19],
        value: [2022, 10, 20]
      }
      expect(info.selectedIndex).toEqual(changeProps.selectedIndex)
      expect(info.selectedText).toEqual(changeProps.text)
      expect(info.selectedVal).toEqual(changeProps.value)
    })
    it(' columnOrder check ', async () => {
      const baseProps = getBaseProps(false, true, true)
      const component = newComponent(baseProps)
      await simulate.sleep(0)
      const data = component.instance.data
      expect(data.pickerList[0][0].order).toEqual(2)
      expect(data.pickerList[1][0].order).toEqual(1)
      expect(data.pickerList[2][0].order).toEqual(0)
    })
    it(' startColumn check ', async () => {
      const baseProps = getBaseProps(false, false, false, false, true)
      const component = newComponent(baseProps)
      await simulate.sleep(0)
      const data = component.instance.data
      expect(data.pickerList[0][0].order).toEqual(2)
    })
    it(' columnCount check ', async () => {
      const baseProps = getBaseProps(true, false, false, true)
      const component = newComponent(baseProps)
      await simulate.sleep(0)
      const data = component.instance.data
      expect(data.pickerList.length).toEqual(1)
    })
  })

  describe('api check', () => {
    it('test change event', async () => {
      const baseProps = getBaseProps()
      // 需要写在 it 里面，不清楚为啥写 it 外面时, picker-view 的 change 事件
      const component = newComponent(baseProps)
      // picker attached 生命周期中有nextTick逻辑
      // 需要通过sleep(0)使得先执行掉picker逻辑后，再执行测试代码
      await simulate.sleep(0)

      const columnChange = jest.fn()
      const change = jest.fn()
      component.addEventListener('columnChange', columnChange)
      component.addEventListener('change', change)

      const pickerView = component.querySelector('.cube-date-picker').querySelector('.cube-picker-wheel-wrapper')
      // 从0开始，下方意味着：滚动第一列，选中第一列的第二项
      const changeColumn = 0
      const changeIndex = 12

      pickerView.instance.scroll(changeColumn, changeIndex)

      await simulate.sleep(10)

      // jest 语法 https://jestjs.io/docs/mock-function-api#mockfnmockcalls
      const columnChangeParams = columnChange.mock.calls
      const changeParams = change.mock.lastCall[0]
      const prediction = {
        columnChange: [{
          detail: {
            column: 0, index: 12, text: '2022', value: 2022
          }
        },
        {
          detail: {
            column: 1, index: 0, text: '1', value: 1
          }
        },
        {
          detail: {
            column: 2, index: 7, text: '8', value: 8
          }
        }],
        change: {
          selectedIndex: [12, 0, 7],
          selectedText: ['2022', '1', '8'],
          selectedVal: [2022, 1, 8]
        }
      }
      expect(columnChange).toHaveBeenCalledTimes(3)
      expect(change).toHaveBeenCalledTimes(1)
      expect(columnChangeParams[0][0].detail).toEqual(prediction.columnChange[0].detail)
      expect(columnChangeParams[1][0].detail).toEqual(prediction.columnChange[1].detail)
      expect(columnChangeParams[2][0].detail).toEqual(prediction.columnChange[2].detail)
      delete changeParams.detail.date
      expect(changeParams.detail).toEqual(prediction.change)
    })
    it('test methods api', async () => {
      const baseProps = getBaseProps()
      // 需要写在 it 里面，不清楚为啥写 it 外面时, picker-view 的 change 事件
      const component = newComponent(baseProps)
      // picker attached 生命周期中有nextTick逻辑
      // 需要通过sleep(0)使得先执行掉picker逻辑后，再执行测试代码
      await simulate.sleep(0)

      const pickerView = component.querySelector('.cube-date-picker').querySelector('.cube-picker-wheel-wrapper')
      // 从0开始，下方意味着：滚动第一列，选中第一列的第二项
      const changeColumn = 0
      const changeIndex = 12

      pickerView.instance.scroll(changeColumn, changeIndex)

      await simulate.sleep(10)
      const info = component.instance.getSelectedInfo()

      const changeProps = {
        list: [2022, 1, 8],
        selectedIndex: [12, 0, 7]
      }
      expect(info.selectedIndex).toEqual(changeProps.selectedIndex)
      expect(info.selectedVal).toEqual(changeProps.list)
    })
  })
})

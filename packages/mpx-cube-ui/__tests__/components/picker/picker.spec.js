const simulate = require('@mpxjs/miniprogram-simulate')

describe('component picker unit test', function() {
  const componentId = simulate.loadMpx('src/components/picker/index.mpx')
  function newComponent(props) {
    const component = simulate.render(componentId, props)
    component.attach(document.createElement('parent')) // 会触发 attach 生命周期
    return component
  }
  function generateData(start, end) {
    const data = []
    for (let i = start; i <= end; i++) {
      data.push({
        text: i,
        value: i
      })
    }
    return data
  }
  function getBaseProps() {
    return {
      list: [generateData(1, 3), generateData(4, 7), generateData(8, 10)],
      selectedIndex: [0, 1, 2]
    }
  }

  function getPrediction(props, change) {
    const originList = props.list
    const originIndex = [...props.selectedIndex]
    const changeColumn = change.column
    const changeIndex = change.index
    const scrollToItem = originList[changeColumn][changeIndex]
    const changeItem = {
      column: change.column,
      index: change.index,
      text: scrollToItem.text,
      value: scrollToItem.value
    }
    originIndex.splice(changeColumn, 1, changeIndex)
    const changePrediction = {
      selectedIndex: [],
      selectedText: [],
      selectedVal: []
    }
    originIndex.forEach((item, index) => {
      changePrediction.selectedIndex.push(item)
      changePrediction.selectedText.push(originList[index][item].text)
      changePrediction.selectedVal.push(originList[index][item].value)
    })
    return {
      columnChange: changeItem,
      change: changePrediction
    }
  }

  describe('base props check', () => {
    const baseProps = getBaseProps()
    const component = newComponent(baseProps)

    it('matchSnapshot', () => {
      expect(component.dom.innerHTML).toMatchSnapshot() // 判断前后生成的dom是否一样
    })

    it('selectedIndex check', () => {
      const data = component.instance.data
      expect(data.finalIndex).toEqual(baseProps.selectedIndex)
    })

    it('should render correct column', () => {
      const column = component.querySelectorAll('.cube-picker-wheel-scroll')
      expect(column.length).toBe(baseProps.list.length)

      for (let i = 0; i < baseProps.length; i++) {
        expect(column[i].dom.children.length).toBe(baseProps.list[i].length)
      }
    })
  })

  describe('api check', () => {
    it('test change event', async () => {
      const baseProps = getBaseProps()
      // 需要写在 it 里面，不清楚为啥写 it 外面时, picker-view 的 change 事件不执行
      const component = newComponent(baseProps)
      // picker attached 生命周期中有nextTick逻辑
      // 需要通过sleep(0)使得先执行掉picker逻辑后，再执行测试代码
      await simulate.sleep(0)

      const columnChange = jest.fn()
      const change = jest.fn()
      component.addEventListener('columnChange', columnChange)
      component.addEventListener('change', change)

      const pickerView = component.querySelector('.cube-picker-wheel-wrapper')
      // 从0开始，下方意味着：滚动第一列，选中第一列的第二项
      const changeColumn = 0
      const changeIndex = 1
      const prediction = getPrediction({
        list: component.instance.data.finalList,
        selectedIndex: component.instance.data.finalIndex
      }, { column: changeColumn, index: changeIndex })

      // 方法实现在 setup picker-view 的 methods 里
      pickerView.instance.scroll(changeColumn, changeIndex)

      await simulate.sleep(10)

      // jest 语法 https://jestjs.io/docs/mock-function-api#mockfnmockcalls
      const columnChangeParams = columnChange.mock.lastCall[0]
      expect(columnChangeParams.detail).toEqual(prediction.columnChange)

      const changeParams = change.mock.lastCall[0]
      expect(changeParams.detail).toEqual(prediction.change)

      // 上面只做了一次滚动，看情况可以做多次滚动
    })
    it('test methods api', async () => {
      const baseProps = getBaseProps()
      // 需要写在 it 里面，不清楚为啥写 it 外面时, picker-view 的 change 事件不响应
      const component = newComponent(baseProps)
      // picker attached 生命周期中有nextTick逻辑
      // 需要通过sleep(0)使得先执行掉picker逻辑后，再执行测试代码
      await simulate.sleep(0)

      const changeProps = {
        list: [generateData(95, 100), generateData(85, 90), generateData(75, 80), generateData(65, 70)],
        selectedIndex: [1, 1, 1, 1]
      }
      component.instance.updateData(changeProps.list, changeProps.selectedIndex)
      await simulate.sleep(10)
      const info = component.instance.getSelectedInfo() // 拿到当前picker的值

      // 判断拿到的值，是否和传入一样
      expect(info.selectedIndex).toEqual(changeProps.selectedIndex)

      const changeProps2 = {
        list: [generateData(950, 1000), generateData(850, 900)],
        selectedIndex: [2, 2]
      }
      component.instance.updateList(changeProps2.list)
      await simulate.sleep(10)
      component.instance.updateIndex(changeProps2.selectedIndex)
      await simulate.sleep(10)
      const info2 = component.instance.getSelectedInfo()
      expect(info2.selectedIndex).toEqual(changeProps2.selectedIndex)
      expect(info2.selectedVal).toEqual([changeProps2.list[0][2].value, changeProps2.list[1][2].value])
    })
  })
})

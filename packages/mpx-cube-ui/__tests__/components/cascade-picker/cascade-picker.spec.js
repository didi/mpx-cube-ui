import { cascadeData } from '../../common/data/cascade-picker-data'

const simulate = require('@mpxjs/miniprogram-simulate')

const selectedIndex = [1, 1, 2]
describe('component cascade-picker unit test', function() {
  const componentId = simulate.loadMpx('src/components/cascade-picker/index.mpx')
  const componentPickerId = simulate.loadMpx('src/components/picker/index.mpx')
  const baseProps = {
    selectedIndex,
    list: cascadeData
  }

  function newComponent(props) {
    const component = simulate.render(componentId, props)
    const componentPicker = simulate.render(componentPickerId, props)
    const parent = document.createElement('parent')
    component.attach(parent) // 会触发 attach 生命周期
    componentPicker.attach(parent)
    return component
  }

  describe('base props check', () => {
    const component = newComponent(baseProps)
    it('matchSnapshot', async () => {
      await simulate.sleep(10)
      expect(component.dom.innerHTML).toMatchSnapshot() // 判断前后生成的dom是否一样
    })
    it('selectedIndex check', () => {
      const data = component.instance.data
      expect(data.pickerSelectedIndex).toEqual(baseProps.selectedIndex)
    })
    it('should render correct contents: list', () => {
      const column = component.querySelector('.cube-cascade-picker').querySelectorAll('.cube-picker-wheel-scroll')
      const list = baseProps.list
      const length = list.length
      // 第一列
      for (let i = 0; i < length; i++) {
        const text = list[i].text // 数据
        const htmlTest = column[0].dom.childNodes[i].innerHTML // dom
        expect(text).toBe(htmlTest)
      }
      // 第二列
      const secondcolumn = list[baseProps.selectedIndex[0]].children
      for (let i = 0; i < secondcolumn.length; i++) {
        const text = secondcolumn[i].text // 数据
        const htmlTest = column[1].dom.childNodes[i].innerHTML // dom
        expect(text).toBe(htmlTest)
      }
      // 第三列
      const thirdcolumn = secondcolumn[baseProps.selectedIndex[1]].children
      for (let i = 0; i < thirdcolumn.length; i++) {
        const text = thirdcolumn[i].text // 数据
        const htmlTest = column[2].dom.childNodes[i].innerHTML // dom
        expect(text).toBe(htmlTest)
      }
    })
  })

  describe('api check', () => {
    const component = newComponent(baseProps)
    const instance = component.instance
    const fakeEvent = { detail: {} }
    simulate.sleep(10)
    it('test pickstart event', async () => {
      const onPickstart = jest.fn()
      component.addEventListener('pickstart', onPickstart)
      instance.onPickstart(fakeEvent)
      // dom[2].dispatchEvent('touchstart', fakeEvent)
      simulate.sleep(10)
      expect(onPickstart).toHaveBeenCalled()
    })

    it('test pickend event', async () => {
      const onPickend = jest.fn()
      component.addEventListener('pickend', onPickend)
      instance.onPickend(fakeEvent)
      expect(onPickend).toHaveBeenCalled()
    })
    it('test change event', async () => {
      // await simulate.sleep(0)
      const component = newComponent({
        selectedIndex: [0, 1, 0], // 这默认是滚动第一列，会影响到第一列和第二列（如果改变后的第三列没有改变前的数据，才会变化）
        list: cascadeData
      })
      const columnChange = jest.fn()
      const change = jest.fn()

      component.addEventListener('columnChange', columnChange)
      component.addEventListener('change', change)
      const pickerView = component.querySelector('.cube-cascade-picker').querySelector('.cube-picker-wheel-wrapper')

      // 从0开始，下方意味着：滚动第一列，选中第一列的第2项
      const changeColumn = 0
      const changeIndex = 1
      pickerView.instance.scroll(changeColumn, changeIndex)

      await simulate.sleep(10)
      expect(change).toHaveBeenCalledTimes(1)
      expect(columnChange).toBeCalledTimes(3)
      const columnChangeDetail1 = columnChange.mock.calls[0][0].detail
      const columnChangeDetail2 = columnChange.mock.calls[1][0].detail
      const columnChangeDetail3 = columnChange.mock.calls[2][0].detail
      const changeDetail = change.mock.calls[0][0].detail
      expect(columnChangeDetail1).toEqual({
        column: 0, index: 1, text: 'Drink', value: 'Drink'
      })
      expect(columnChangeDetail2).toEqual({ column: 1, index: 0, text: 'Coffee', value: 'Coffee' })
      expect(columnChangeDetail3).toEqual({ column: 2, index: 2, text: 'Three', value: 3 })
      expect(changeDetail).toEqual({
        selectedIndex: [1, 0, 2],
        selectedText: ['Drink', 'Coffee', 'Three'],
        selectedVal: ['Drink', 'Coffee', 3]
      })
    })
    it('test methods api', async () => {
      // 需要写在 it 里面，不清楚为啥写 it 外面时, picker-view 的 change 事件不响应
      const component = newComponent(baseProps)
      // picker attached 生命周期中有nextTick逻辑
      // 需要通过sleep(0)使得先执行掉picker逻辑后，再执行测试代码
      await simulate.sleep(0)
      const data = []
      cascadeData.forEach(item => {
        data.unshift(item)
      })
      const changeProps = {
        list: data,
        selectedIndex: [1, 1, 1]
      }
      component.instance.updateData(changeProps.list, changeProps.selectedIndex)
      await simulate.sleep(10)
      const info = component.instance.getSelectedInfo() // 拿到当前picker的值
      // 判断拿到的值，是否和传入一样
      expect(info.selectedIndex).toEqual(changeProps.selectedIndex)

      const changeProps2 = {
        list: data,
        selectedIndex: [0, 0, 0]
      }
      component.instance.updateList(changeProps2.list)
      await simulate.sleep(10)
      component.instance.updateIndex(changeProps2.selectedIndex)
      await simulate.sleep(10)
      const info2 = component.instance.getSelectedInfo()
      expect(info2.selectedIndex).toEqual(changeProps2.selectedIndex)
      expect(info2.selectedVal).toEqual(['Dessert', 'Chocolate', 1])
    })
    it('test props async', async () => {
      const asyncData = []
      cascadeData.forEach((item, index) => {
        if (index !== 0) {
          asyncData.push({
            value: item.value,
            text: item.text
          })
        } else {
          asyncData.push(item)
        }
      })
      const asyncComponent = newComponent({
        selectedIndex: [0, 0, 0],
        list: asyncData
      })
      const columnChange = jest.fn()
      const change = jest.fn()

      asyncComponent.addEventListener('columnChange', columnChange)
      asyncComponent.addEventListener('change', change)
      const pickerView = asyncComponent.querySelector('.cube-cascade-picker').querySelector('.cube-picker-wheel-wrapper')

      // 从0开始，下方意味着：滚动第一列，选中第一列的第2项
      const changeColumn = 0
      const changeIndex = 1

      const changeAsyncData = []
      asyncData.forEach((item, index) => {
        if (index === changeIndex) {
          changeAsyncData.push({
            ...item,
            children: cascadeData[changeIndex].children
          })
        } else {
          changeAsyncData.push(item)
        }
      })
      asyncComponent.instance.updateData(changeAsyncData, [0, 0, 0])
      await simulate.sleep(10)
      pickerView.instance.scroll(changeColumn, changeIndex)

      await simulate.sleep(10)
      // updateData 会跟据原来的各列的下标不同 多触发，所以不校验次数了
      expect(change).toHaveBeenCalled()
      expect(columnChange).toHaveBeenCalled()
      const info = asyncComponent.instance.getSelectedInfo() // 拿到当前picker的值
      expect(info).toEqual({
        selectedIndex: [1, 0, 0],
        selectedText: ['Drink', 'Coffee', 'One'],
        selectedVal: ['Drink', 'Coffee', 1]
      })
    })
  })
})

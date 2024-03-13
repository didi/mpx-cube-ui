const simulate = require('@mpxjs/miniprogram-simulate')

describe('component picker unit test', function () {
  const componentId = simulate.loadMpx('src/components/segment-picker/index.mpx')
  const templateComponentId = simulate.loadMpx('test/components/segment-picker/template/event.mpx')
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
  describe('default props check', () => {
    const component = newComponent({})

    const data = component.instance.data

    it('matchSnapshot', () => {
      expect(component.dom.innerHTML).toMatchSnapshot() // 判断前后生成的dom是否一样
    })

    expect(data.visible).toEqual(false)
    expect(data.zIndex).toBe(100)
    expect(data.maskClosable).toEqual(false)
    expect(data.maskFadeTransition).toEqual(false)
    expect(data.list).toEqual([])
    expect(data.nextTxt).toEqual('')
    expect(data.prevTxt).toEqual('')
    expect(data.index).toEqual(0)
  })
  describe(' set props check', () => {
    const baseProps = {
      visible: true,
      maskClosable: true,
      maskFadeTransition: true,
      nextTxt: '下一步',
      prevTxt: '上一步',
      zIndex: 1,
      index: 0,
      cancelTxt: 'Cancel',
      confirmTxt: 'Confirm'
    }
    const component = newComponent(baseProps)
    const data = component.instance.data
    it('matchSnapshot', () => {
      expect(component.dom.innerHTML).toMatchSnapshot() // 判断前后生成的dom是否一样
    })

    expect(data.visible).toEqual(baseProps.visible)
    expect(data.zIndex).toBe(baseProps.zIndex)
    expect(data.maskClosable).toEqual(baseProps.maskClosable)
    expect(data.maskFadeTransition).toEqual(baseProps.maskFadeTransition)
    expect(data.nextTxt).toEqual(baseProps.nextTxt)
    expect(data.prevTxt).toEqual(baseProps.prevTxt)
    expect(data.index).toEqual(baseProps.index)
    expect(data.confirmTxt).toEqual(baseProps.confirmTxt)
  })

  async function fatherAndEvent() {
    const component = newComponent({}, false)
    // picker attached 生命周期中有nextTick逻辑
    // 需要通过sleep(0)使得先执行掉picker逻辑后，再执行测试代码
    await simulate.sleep(0)

    const segment = component.querySelector('cube-segment-picker')
    const selectSegment = jest.fn()
    const cancelSegment = jest.fn()
    const changeSegment = jest.fn()
    segment.addEventListener('select', selectSegment)
    segment.addEventListener('cancel', cancelSegment)
    segment.addEventListener('change', changeSegment)

    const pickerView = component.querySelector('cube-segment-picker').querySelectorAll('cube-cascade-picker-popup')
    const confirmOne = jest.fn()
    const cancelOne = jest.fn()
    const confirmTwo = jest.fn()
    const cancelTwo = jest.fn()

    const listOne = pickerView[0]
    listOne.addEventListener('confirm', confirmOne)
    listOne.addEventListener('cancel', cancelOne)

    const listTwo = pickerView[1]
    listTwo.addEventListener('confirm', confirmTwo)
    listTwo.addEventListener('cancel', cancelTwo)
    return ({ listOne, listTwo, segment, selectSegment, cancelSegment, confirmOne, cancelOne, confirmTwo, cancelTwo, changeSegment })
  }
  describe('api check', () => {
    it('test  cancel event', async () => {
      const { listOne, cancelSegment, cancelOne } = await fatherAndEvent() || {}
      // list【0】 触发confirm
      listOne.querySelector('cube-picker-popup-base').querySelector('.cube-picker-popup-cancel').dispatchEvent('tap')

      await simulate.sleep(10)
      expect(cancelOne).toHaveBeenCalled()
      expect(cancelSegment).toHaveBeenCalled()
    })
    it('test  select And change  event', async () => {
      const { listOne, confirmOne, listTwo, confirmTwo, selectSegment, changeSegment } = await fatherAndEvent() || {}

      const toScroll = listOne.querySelector('cube-cascade-picker').querySelector('.cube-cascade-picker').querySelector('.cube-picker-wheel-wrapper')
      // list【0】 修改值
      const changeColumn = 0
      const changeIndex = 1
      toScroll.instance.scroll(changeColumn, changeIndex)
      await simulate.sleep(10)
      // list【0】 触发confirm（相当于是next）cube-picker-popup-panel
      listOne.querySelector('cube-picker-popup-base').querySelector('.cube-picker-popup-confirm').dispatchEvent('tap')
      await simulate.sleep(10)
      expect(confirmOne).toHaveBeenCalled()

      // list【1】 触发confirm（即cancel）
      listTwo.querySelector('cube-picker-popup-base').querySelector('.cube-picker-popup-confirm').dispatchEvent('tap')

      await simulate.sleep(10)
      expect(confirmTwo).toHaveBeenCalled()
      expect(selectSegment).toHaveBeenCalled()
      expect(changeSegment).toHaveBeenCalledTimes(3)
      const changeDetail = changeSegment.mock.calls
      expect(changeDetail[0][0].detail.column).toBe(0)
      expect(changeDetail[1][0].detail.column).toBe(1)
      expect(changeDetail[2][0].detail.column).toBe(2)
      const selectDetail = selectSegment.mock.calls[0][0].detail
      expect(selectDetail.selectedIndex).toEqual([[1, 0, 0], [0, 0, 0]])
      expect(selectDetail.selectedText).toEqual([
        ['120000', '120100', '120101'], ['110000', '110100', '110101']
      ])
      expect(selectDetail.selectedVal).toEqual([
        ['天津市', '天津市', '和平区'], ['北京市', '北京市', '东城区']
      ])
    })
    it('next  select And prev event', async () => {
      const { listOne, confirmOne, listTwo, cancelTwo } = await fatherAndEvent() || {}
      // list【0】 触发confirm（相当于是next）
      listOne.querySelector('cube-picker-popup-base').querySelector('.cube-picker-popup-confirm').dispatchEvent('tap')

      await simulate.sleep(10)
      expect(confirmOne).toHaveBeenCalled()

      // list【1】 触发confirm（即pre）
      listTwo.querySelector('cube-picker-popup-base').querySelector('.cube-picker-popup-cancel').dispatchEvent('tap')

      await simulate.sleep(10)
      expect(cancelTwo).toHaveBeenCalled()
    })
  })
})

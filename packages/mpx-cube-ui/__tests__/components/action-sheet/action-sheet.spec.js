const simulate = require('@mpxjs/miniprogram-simulate')

describe('component action-sheet unit test', function () {
  const componentId = simulate.loadMpx('src/components/action-sheet/index.mpx')
  const componentTemplateId = simulate.loadMpx('test/components/action-sheet/template/test.mpx')

  function changeProps() {
    const baseProps = {
      inputData: [
        {
          content: 'align-center',
          class: 'cube-foo'
        },
        {
          content: 'align-left',
          align: 'left'
        },
        {
          content: 'align-right',
          align: 'right'
        }
      ],
      title: '我是标题',
      cancelTxt: '取消按钮',
      active: 1
    }
    return baseProps
  }

  function newComponent(id, props) {
    const component = simulate.render(id, props)
    const parent = document.createElement('parent')
    component.attach(parent) // 会触发 attach 生命周期
    return component
  }

  describe('correct props check', () => {
    const component = newComponent(componentId, changeProps())

    it('matchSnapshot', () => {
      expect(component.dom.innerHTML).toMatchSnapshot()
    })

    it(' props to action ', async () => {
      const actionSheetItems = component.querySelectorAll('.cube-action-sheet-item')
      const itemOneAttribute = actionSheetItems[0].instance.getAttribute('data-align')
      const itemTwoAttribute = actionSheetItems[1].instance.getAttribute('data-align')
      expect(actionSheetItems.length).toBe(3)
      expect(itemOneAttribute).toBe('')
      expect(itemTwoAttribute).toBe('left')

      const itemThreeAttribute = actionSheetItems[2].instance.getAttribute('data-align')
      expect(itemThreeAttribute).toBe('right')

      const titleDom = component.querySelector('.cube-action-sheet-title').dom
      expect(titleDom.innerHTML).toBe('我是标题')

      const itemOneClassAttribute = actionSheetItems[0].dom.className
      expect(itemOneClassAttribute).toBe('main--cube-action-sheet-item main--cube-foo')

      const itemTwoClassAttribute = actionSheetItems[1].dom.className
      expect(itemTwoClassAttribute).toBe('main--cube-action-sheet-item main--cube-action-sheet-item_active')

      const cancelTxtDom = component.querySelector('.cube-action-sheet-cancel').dom
      expect(cancelTxtDom.innerHTML).toBe('取消按钮')
    })
  })

  describe('event trigger check', () => {
    const component = newComponent(componentTemplateId)

    it('matchSnapshot', () => {
      expect(component.dom.innerHTML).toMatchSnapshot() // 判断前后生成的dom是否一样
    })

    it(' wx:model ', async () => {
      // 确保 actionSheet 首次显示符合预期
      const actionSheetItems = component.querySelector('cube-action-sheet').querySelectorAll('.cube-action-sheet-item')
      expect(component.instance.active).toBe(0)
      expect(component.instance.pickerStyle).toBe(true)
      expect(actionSheetItems.length).toBe(3)
      expect(actionSheetItems[0].dom.className).toBe('cube-action-sheet--cube-action-sheet-item cube-action-sheet--cube-action-sheet-item_active')

      // 触发事件
      const itemsTwo = actionSheetItems[1]
      itemsTwo.dispatchEvent('tap')
      await simulate.sleep(10)

      expect(actionSheetItems[0].dom.className).toBe('cube-action-sheet--cube-action-sheet-item')
      expect(actionSheetItems[1].dom.className).toBe('cube-action-sheet--cube-action-sheet-item cube-action-sheet--cube-action-sheet-item_active')
      expect(component.instance.active).toBe(1)
    })
  })
})

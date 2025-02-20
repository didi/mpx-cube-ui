const simulate = require('@mpxjs/miniprogram-simulate')

describe('component switch unit test', function () {
  function newComponent(componentId, props) {
    const component = simulate.render(componentId, props)
    const parent = document.createElement('parent')
    component.attach(parent) // 会触发 attach 生命周期
    return component
  }
  describe('wx:model check', () => {
    const componentId = simulate.loadMpx(
      'test/components/switch/template/wx-model.mpx'
    )
    const component = newComponent(componentId)
    it('matchSnapshot', () => {
      expect(component.dom.innerHTML).toMatchSnapshot() // 判断前后生成的dom是否一样
    })
    const switchComponent = component.querySelector('.cube-switch')
    it('wx:model', async () => {
      // 确保 switchValue 首次显示符合预期
      expect(component.instance.switchValue).toBe(false)
      expect(switchComponent.instance.value).toBe(false)

      switchComponent.querySelector('.cube-switch').dispatchEvent('tap')
      await simulate.sleep(10)

      // 点击开关后，状态改变为打开
      expect(switchComponent.instance.value).toBe(true)
      expect(component.instance.switchValue).toBe(true)

      // 改变父组件的值，switch的值也会改变
      component.instance.switchValue = false
      await simulate.sleep(10)
      expect(component.instance.switchValue).toBe(false)
      expect(switchComponent.instance.value).toBe(false)
    })
  })

  const componentId1 = simulate.loadMpx('src/components/switch/index.mpx')
  describe('correct render check', () => {
    const component = newComponent(componentId1, {})

    it('matchSnapshot', () => {
      expect(component.dom.innerHTML).toMatchSnapshot() // 判断前后生成的dom是否一样
    })

    it('correct render  check', async () => {
      // 正确渲染
      const isCloseSwitch = component.querySelector('.cube-switch-on')
      expect(component.instance.disabled).toBe(false)
      expect(isCloseSwitch).toBeUndefined()
    })
  })

  describe('disabled check', () => {
    const component = newComponent(componentId1, {
      disabled: true
    })
    it('matchSnapshot', () => {
      expect(component.dom.innerHTML).toMatchSnapshot() // 判断前后生成的dom是否一样
    })

    it('disabled check', async () => {
      // 正确渲染
      const isCloseSwitchOne = component.querySelector('.cube-switch-on')
      expect(isCloseSwitchOne).toBeUndefined()
      component.querySelector('.cube-switch').dispatchEvent('tap')
      await simulate.sleep(10)

      const isCloseSwitchTwo = component.querySelector('.cube-switch-on')
      expect(isCloseSwitchTwo).toBeUndefined()
    })
  })
})

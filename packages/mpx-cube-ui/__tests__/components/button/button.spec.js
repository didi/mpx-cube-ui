const simulate = require('@mpxjs/miniprogram-simulate')

describe('component button unit test', () => {
  const componentId = simulate.loadMpx('src/components/button/index.mpx')

  beforeEach(() => {
    jest.resetModules()
  })

  function newComponent(props) {
    const component = simulate.render(componentId, props)
    component.attach(document.createElement('parent'))

    it('matchSnapshot', () => {
      expect(component.dom.innerHTML).toMatchSnapshot()
    })
    return component
  }

  describe('event click check', () => {
    const component = newComponent()

    it('click event', async () => {
      const clickFn = jest.fn()
      // 触发组件树中的节点自定义事件
      component.addEventListener('click', clickFn)
      component.querySelector('.cube-btn').dispatchEvent('tap')
      await simulate.sleep(10)
      expect(clickFn).toHaveBeenCalled()
    })
  })

  describe('props primary check', () => {
    const component = newComponent({ primary: true })
    const instance = component.instance

    const primaryDom = component.querySelector('.cube-btn-primary')

    it('should render primary component', () => {
      expect(primaryDom).toBeTruthy()
      expect(instance.data.primary).toBe(true)
      expect(instance.data.btnClass['cube-btn-primary']).toBe(true)
    })
  })

  describe('props inline check', () => {
    const component = newComponent({ inline: true })
    const instance = component.instance

    const inlineDom = component.querySelector('.cube-btn-inline')

    it('should render inline component', () => {
      expect(inlineDom).toBeTruthy()
      expect(instance.data.inline).toBe(true)
      expect(instance.data.btnClass['cube-btn-inline']).toBe(true)
    })
  })

  describe('props outline check', () => {
    const component = newComponent({ outline: true })
    const instance = component.instance

    const outlineDom = component.querySelector('.cube-btn-outline')

    it('should render outline component', () => {
      expect(outlineDom).toBeTruthy()
      expect(instance.data.outline).toBe(true)
      expect(instance.data.btnClass['cube-btn-outline']).toBe(true)
    })
  })

  describe('props outline primary check', () => {
    const component = newComponent({ outline: true, primary: true })
    const instance = component.instance

    const outlinePrimaryDom = component.querySelector('.cube-btn-outline-primary')

    it('should render outline-primary component', () => {
      expect(outlinePrimaryDom).toBeTruthy()
      expect(instance.data.outline).toBe(true)
      expect(instance.data.primary).toBe(true)
      expect(instance.data.btnClass['cube-btn-outline-primary']).toBe(true)
    })
  })

  describe('props light check', () => {
    const component = newComponent({ light: true })
    const instance = component.instance

    const lightDom = component.querySelector('.cube-btn-light')

    it('should render light component', () => {
      expect(lightDom).toBeTruthy()
      expect(instance.data.light).toBe(true)
      expect(instance.data.btnClass['cube-btn-light']).toBe(true)
    })
  })

  describe('props bolder check', () => {
    const component = newComponent({ bolder: true })
    const instance = component.instance

    const bolderDom = component.querySelector('.cube-btn_bolder')

    it('should render bolder component', () => {
      expect(bolderDom).toBeTruthy()
      expect(instance.data.bolder).toBe(true)
      expect(instance.data.btnClass['cube-btn_bolder']).toBe(true)
    })
  })

  describe('props active check', () => {
    const component = newComponent({ active: true })
    const instance = component.instance

    const activeDom = component.querySelector('.cube-btn_active')

    it('should render active component', () => {
      expect(activeDom).toBeTruthy()
      expect(instance.data.active).toBe(true)
      expect(instance.data.btnClass['cube-btn_active']).toBe(true)
    })
  })

  describe('props disabled check', () => {
    const component = newComponent({ disabled: true })
    const instance = component.instance

    const disabledDom = component.querySelector('.cube-btn_disabled')

    it('should render disabled component', () => {
      expect(disabledDom).toBeTruthy()
      expect(instance.data.disabled).toBe(true)
      expect(instance.data.btnClass['cube-btn_disabled']).toBe(true)
    })

    it('click event', async () => {
      const clickFn = jest.fn()
      component.addEventListener('click', clickFn)
      disabledDom.dispatchEvent('tap')
      await simulate.sleep(10)
      expect(clickFn).not.toHaveBeenCalled()
    })
  })

  describe('props icon="like" check', () => {
    const component = newComponent({ icon: 'like' })
    const instance = component.instance

    const iconDom = component.querySelector('.cube-btn-icon').querySelector('.cubeic-like')

    it('should render like icon', () => {
      expect(iconDom).toBeTruthy()
      expect(instance.data.icon).toBe('like')
    })
  })

  describe('props tip="辅助文案" check', () => {
    const component = newComponent({ tip: '辅助文案' })
    const instance = component.instance

    const tipDom = component.querySelector('.cube-btn-with-tip')
    const tipText = component.querySelector('.cube-btn-tip-text').dom.innerHTML

    it('should render correct tip', () => {
      expect(tipDom).toBeTruthy()
      expect(tipText).toBe('辅助文案')
      expect(instance.data.tip).toBe('辅助文案')
      expect(instance.data.btnClass['cube-btn-with-tip']).toBe('辅助文案')
    })
  })

  describe('props loading check', () => {
    const component = newComponent({ loading: true })
    const instance = component.instance

    const loadingDom = component.querySelector('loading').querySelector('.cube-loading-middle-dot')

    it('should render loading', () => {
      expect(loadingDom).toBeTruthy()
      expect(instance.data.loading).toBe(true)
      expect(instance.data.btnClass['cube-btn-loading']).toBe(true)
    })
  })

  describe('props lang check', () => {
    const component = newComponent({ lang: 'en' })
    const instance = component.instance

    it('should render lang en', () => {
      expect(instance.data.lang).toBe('en')
    })
  })

  describe('props openType="share" check', () => {
    const component = newComponent({ openType: 'share' })
    const instance = component.instance

    it('should render share openType', () => {
      expect(instance.data.openType).toBe('share')
    })
  })

  describe('props openType="contact" check', () => {
    const component = newComponent({
      openType: 'contact',
      showMessageCard: true,
      sendMessageTitle: '点击返回mpx-cube-ui组件库',
      sendMessagePath: '/pages/button/index',
      sendMessageImg: 'https://dpubstatic.udache.com/static/dpubimg/e7207fae-28de-4b5f-b082-329ff0b01ce0.png',
      sessionFrom: 'xx'
    })
    const instance = component.instance

    it('should render contact openType', () => {
      expect(instance.data.openType).toBe('contact')
      expect(instance.data.showMessageCard).toBe(true)
      expect(instance.data.sendMessageTitle).toBe('点击返回mpx-cube-ui组件库')
      expect(instance.data.sendMessagePath).toBe('/pages/button/index')
      expect(instance.data.sendMessageImg).toBe('https://dpubstatic.udache.com/static/dpubimg/e7207fae-28de-4b5f-b082-329ff0b01ce0.png')
      expect(instance.data.sessionFrom).toBe('xx')
    })

    it('contact event', async () => {
      const contactFn = jest.fn()
      component.addEventListener('contact', contactFn)
      component.querySelector('.cube-btn').dispatchEvent('contact')
      await simulate.sleep(10)
      expect(contactFn).toHaveBeenCalled()
    })
  })

  describe('props openType="getPhoneNumber" check', () => {
    const component = newComponent({ openType: 'getPhoneNumber' })
    const instance = component.instance

    it('should render getPhoneNumber openType', () => {
      expect(instance.data.openType).toBe('getPhoneNumber')
    })

    it('getPhoneNumber event', async () => {
      const getPhoneNumberFn = jest.fn()
      // 触发组件树中的节点自定义事件
      component.addEventListener('getphonenumber', getPhoneNumberFn)
      component.querySelector('.cube-btn').dispatchEvent('getphonenumber')
      await simulate.sleep(10)
      expect(getPhoneNumberFn).toHaveBeenCalled()
    })
  })

  describe('props openType="getUserInfo" check', () => {
    const component = newComponent({ openType: 'getUserInfo' })
    const instance = component.instance

    it('should render getUserInfo openType', () => {
      expect(instance.data.openType).toBe('getUserInfo')
    })

    it('getUserInfo event', async () => {
      const getUserInfoFn = jest.fn()
      // 触发组件树中的节点自定义事件
      component.addEventListener('getuserinfo', getUserInfoFn)
      component.querySelector('.cube-btn').dispatchEvent('getuserinfo')
      await simulate.sleep(10)
      expect(getUserInfoFn).toHaveBeenCalled()
    })
  })

  describe('props openType="getAuthorize" check', () => {
    const component = newComponent({ openType: 'getAuthorize', scope: 'phoneNumber' })
    const component2 = newComponent({ openType: 'getAuthorize', scope: 'userInfo' })

    it('should render getAuthorize openType', () => {
      expect(component.instance.data.openType).toBe('getAuthorize')
      expect(component.instance.data.scope).toBe('phoneNumber')
      expect(component2.instance.data.scope).toBe('userInfo')
    })
  })

  describe('props openType="openSetting" check', () => {
    const component = newComponent({ openType: 'openSetting' })
    const instance = component.instance

    it('should render openSetting openType', () => {
      expect(instance.data.openType).toBe('openSetting')
    })

    it('openSetting event', async () => {
      const openSettingFn = jest.fn()
      // 触发组件树中的节点自定义事件
      component.addEventListener('opensetting', openSettingFn)
      component.querySelector('.cube-btn').dispatchEvent('opensetting')
      await simulate.sleep(10)
      expect(openSettingFn).toHaveBeenCalled()
    })
  })

  describe('props openType="chooseAvatar" check', () => {
    const component = newComponent({ openType: 'chooseAvatar' })
    const instance = component.instance

    it('should render chooseAvatar openType', () => {
      expect(instance.data.openType).toBe('chooseAvatar')
    })

    it('chooseAvatar event', async () => {
      const chooseAvatarFn = jest.fn()
      // 触发组件树中的节点自定义事件
      component.addEventListener('chooseavatar', chooseAvatarFn)
      component.querySelector('.cube-btn').dispatchEvent('chooseavatar')
      await simulate.sleep(10)
      expect(chooseAvatarFn).toHaveBeenCalled()
    })
  })

  describe('props openType="launchApp" check', () => {
    const component = newComponent({ openType: 'launchApp', appParameter: 'wechat' })
    const instance = component.instance

    it('should render launchApp', () => {
      expect(instance.data.openType).toBe('launchApp')
      expect(instance.data.appParameter).toBe('wechat')
    })

    it('launchApp event', async () => {
      const launchAppFn = jest.fn()
      component.addEventListener('launchapp', launchAppFn)
      component.querySelector('.cube-btn').dispatchEvent('launchapp')
      await simulate.sleep(10)
      expect(launchAppFn).toHaveBeenCalled()
    })
  })

  describe('props openType="lifestyle" check', () => {
    const component = newComponent({ openType: 'lifestyle', publicId: '1' })
    const instance = component.instance

    it('should render lifestyle', () => {
      expect(instance.data.openType).toBe('lifestyle')
      expect(instance.data.publicId).toBe('1')
    })

    it('lifestyle event', async () => {
      const lifestyleFn = jest.fn()
      component.addEventListener('followlifestyle', lifestyleFn)
      component.dispatchEvent('followlifestyle')
      await simulate.sleep(10)
      expect(lifestyleFn).toHaveBeenCalled()
    })
  })
})

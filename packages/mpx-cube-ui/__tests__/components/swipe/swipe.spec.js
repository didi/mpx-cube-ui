const simulate = require('@mpxjs/miniprogram-simulate')

describe('component swipe unit test', function () {
  const componentId = simulate.loadMpx('src/components/swipe/index.mpx')

  function newComponent(props) {
    const component = simulate.render(componentId, props)
    const parent = document.createElement('parent')
    component.attach(parent)
    return component
  }

  function getBaseData() {
    return [
      {
        item: {
          text: '测试1',
          value: 1
        },
        btns: [
          {
            action: 'clear',
            text: '不再关注',
            color: '#c8c7cd'
          },
          {
            action: 'delete',
            text: '删除',
            color: '#ff3a32'
          }
        ]
      },
      {
        item: {
          text: '测试2',
          value: 2
        },
        btns: [
          {
            action: 'delete',
            text: '删除',
            color: '#ff3a32'
          }
        ]
      }
    ]
  }

  describe('render check', () => {
    it('render by data', async () => {
      const component = newComponent({
        list: getBaseData()
      })
      await simulate.sleep(10)
      const items = component.querySelectorAll('cube-swipe-item')
      const btns = component.querySelectorAll('.cube-swipe-btn')
      expect(items.length).toBe(2)
      expect(btns.length).toBe(3)
    })
  })

  describe('event check', () => {
    it('item-click', async () => {
      const component = newComponent({
        list: getBaseData()
      })
      const handler = jest.fn()
      component.addEventListener('item-click', handler)
      const firstItem = component.querySelector('.cube-swipe-item-scroller')
      firstItem.dispatchEvent('tap')
      await simulate.sleep(10)
      expect(handler).toHaveBeenCalled()
      expect(handler.mock.calls[0][0].detail.index).toBe(0)
      expect(handler.mock.calls[0][0].detail.item.text).toBe('测试1')
    })

    it('btn-click', async () => {
      const component = newComponent({
        list: getBaseData()
      })
      const handler = jest.fn()
      component.addEventListener('btn-click', handler)
      const firstBtn = component.querySelector('.cube-swipe-btn')
      firstBtn.dispatchEvent('tap')
      await simulate.sleep(10)
      expect(handler).toHaveBeenCalled()
      expect(handler.mock.calls[0][0].detail.index).toBe(0)
      expect(handler.mock.calls[0][0].detail.btn.action).toBe('clear')
      expect(handler.mock.calls[0][0].detail.item.text).toBe('测试1')
    })
  })

  describe('slot check', () => {
    it('custom slot', async () => {
      const slotComponent = simulate.render(simulate.load({
        usingComponents: {
          'cube-swipe': componentId,
          'cube-swipe-item': simulate.loadMpx('src/components/swipe-item/index.mpx')
        },
        template: `
          <cube-swipe>
            <cube-swipe-item item="{{ {text: 'slot'} }}" btns="{{ [{ text: '删除', color: '#ff3a32', action: 'delete' }] }}" index="{{0}}" use-slot="{{ true }}">
              <view class="custom-inner">slot-content</view>
            </cube-swipe-item>
          </cube-swipe>
        `
      }))
      slotComponent.attach(document.createElement('parent'))
      await simulate.sleep(10)
      expect(slotComponent.querySelector('.custom-inner')).toBeTruthy()
      expect(slotComponent.querySelectorAll('.cube-swipe-btn').length).toBe(1)
    })
  })
})

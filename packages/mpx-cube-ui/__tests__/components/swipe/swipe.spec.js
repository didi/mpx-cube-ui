const simulate = require('@mpxjs/miniprogram-simulate')

describe('component swipe unit test', function () {
  const swipeId = simulate.loadMpx('src/components/swipe/index.mpx')
  const swipeItemId = simulate.loadMpx('src/components/swipe-item/index.mpx')

  function newComponent(componentId, props) {
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

  describe('swipe-item check', () => {
    it('render by data', async () => {
      const component = newComponent(swipeItemId, {
        item: getBaseData()[0].item,
        btns: getBaseData()[0].btns,
        index: 0
      })
      await simulate.sleep(10)
      const btns = component.querySelectorAll('.cube-swipe-btn')
      expect(component.querySelector('.cube-swipe-item-scroller')).toBeTruthy()
      expect(btns.length).toBe(2)
    })

    it('item-click', async () => {
      const component = newComponent(swipeItemId, {
        item: getBaseData()[0].item,
        btns: getBaseData()[0].btns,
        index: 0
      })
      const handler = jest.fn()
      component.addEventListener('item-click', handler)
      const scroller = component.querySelector('.cube-swipe-item-scroller')
      scroller.dispatchEvent('tap')
      await simulate.sleep(10)
      expect(handler).toHaveBeenCalled()
      expect(handler.mock.calls[0][0].detail.index).toBe(0)
      expect(handler.mock.calls[0][0].detail.item.text).toBe('测试1')
    })

    it('btn-click', async () => {
      const component = newComponent(swipeItemId, {
        item: getBaseData()[0].item,
        btns: getBaseData()[0].btns,
        index: 0
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

    it('custom slot', async () => {
      const slotComponent = simulate.render(simulate.load({
        usingComponents: {
          'cube-swipe-item': swipeItemId
        },
        template: `
          <cube-swipe-item item="{{ {text: 'slot'} }}" btns="{{ [{ text: '删除', color: '#ff3a32', action: 'delete' }] }}" index="{{0}}" use-slot="{{ true }}">
            <view class="custom-inner">slot-content</view>
          </cube-swipe-item>
        `
      }))
      slotComponent.attach(document.createElement('parent'))
      await simulate.sleep(10)
      const swipeItem = slotComponent.querySelector('cube-swipe-item')
      expect(slotComponent.querySelector('.custom-inner')).toBeTruthy()
      expect(swipeItem.querySelectorAll('.cube-swipe-btn').length).toBe(1)
    })
  })

  describe('swipe api check', () => {
    it('render list to swipe-item', async () => {
      const component = newComponent(swipeId, {
        list: getBaseData()
      })
      await simulate.sleep(10)
      const items = component.querySelectorAll('cube-swipe-item')
      expect(items.length).toBe(2)
    })

    it('forward item-click event', async () => {
      const component = newComponent(swipeId, {
        list: getBaseData()
      })
      const handler = jest.fn()
      component.addEventListener('item-click', handler)
      const firstItem = component.querySelector('cube-swipe-item')
      firstItem.dispatchEvent('item-click', {
        detail: {
          item: getBaseData()[0].item,
          index: 0
        }
      })
      await simulate.sleep(10)
      expect(handler).toHaveBeenCalled()
      expect(handler.mock.calls[0][0].detail.index).toBe(0)
      expect(handler.mock.calls[0][0].detail.item.text).toBe('测试1')
    })

    it('forward btn-click event and fill item from list', async () => {
      const component = newComponent(swipeId, {
        list: getBaseData()
      })
      const handler = jest.fn()
      component.addEventListener('btn-click', handler)
      const firstItem = component.querySelector('cube-swipe-item')
      firstItem.dispatchEvent('btn-click', {
        detail: {
          btn: getBaseData()[0].btns[0],
          index: 0
        }
      })
      await simulate.sleep(10)
      expect(handler).toHaveBeenCalled()
      expect(handler.mock.calls[0][0].detail.index).toBe(0)
      expect(handler.mock.calls[0][0].detail.btn.action).toBe('clear')
      expect(handler.mock.calls[0][0].detail.item.text).toBe('测试1')
    })
  })
})

const simulate = require('@mpxjs/miniprogram-simulate')
const mpx = require('@mpxjs/core').default
const apiProxy = require('@mpxjs/api-proxy').default

mpx.use(apiProxy, { usePromise: true, platform: { from: 'wx' } })

require('../packages/mpx-cube-ui/__tests__/common/get-components-by-tag-name')

simulate.load({
  id: 'rich-text',
  tagName: 'wx-rich-text',
  template: '<view class="rich-text">{{nodes}}</view>',
  properties: {
    nodes: {
      type: String,
      value: ''
    }
  }
})

simulate.load({
  id: 'image',
  tagName: 'wx-image',
  template: '<view class="my-image">{{ src }}</view>',
  properties: {
    src: {
      type: String,
      value: ''
    }
  }
})

simulate.load({
  id: 'picker-view',
  tagName: 'wx-picker-view',
  template: '<slot/>',
  properties: {
    value: {
      type: Array,
      value: []
    }
  },
  data: {
    _value: []
  },
  observers: {
    value(newV) {
      this.setData({
        _value: newV
      })
    }
  },
  methods: {
    /**
     * @param { number } column 滚动的列
     * @param { number } index 滚动到第几项
     */
    scroll(column, index) {
      const value = this.data._value
      if (!value.length) {
        const children = this._exparserNode.$$.children
        const columnNum = children.length
        for (let i = 0; i < columnNum; i++) value[i] = 0
      }
      const nowIndex = [...value]
      nowIndex[column] = index
      this.setData({
        _value: [...nowIndex]
      })
      // https://developers.weixin.qq.com/miniprogram/dev/component/picker-view.html 模拟原生 change 事件
      this.triggerEvent('change', {
        value: nowIndex
      })
    }
  }
})


simulate.load({
  id: 'picker-view-column',
  tagName: 'wx-picker-view-column',
  template: '<slot/>'
})

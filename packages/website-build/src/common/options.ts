const renderOptions = {
  props: [
    {
      type: 'Name',
      zh: '参数',
      en: 'Name'
    },
    {
      type: 'Description',
      zh: '说明',
      en: 'Description'
    },
    {
      type: 'Type',
      zh: '类型',
      en: 'Type'
    },
    {
      type: 'Optional',
      zh: '可选值',
      en: 'Optional'
    },
    {
      type: 'Default',
      zh: '默认值',
      en: 'Default'
    }
    // {
    //   type: 'Wx',
    //   zh: '微信',
    //   en: 'WeChat'
    // },
    // {
    //   type: 'Web',
    //   zh: 'web',
    //   en: 'web'
    // },
    // {
    //   type: 'Ali',
    //   zh: '支付宝',
    //   en: 'Alipay'
    // }
  ],
  slots: [
    {
      type: 'Name',
      zh: '插槽名',
      en: 'Name'
    },
    {
      type: 'Description',
      zh: '说明',
      en: 'Description'
    }
    // {
    //   type: 'Default',
    //   zh: '默认值',
    //   en: 'Default Slot Content'
    // }
  ],
  methods: [
    {
      type: 'Name',
      zh: '组件实例方法',
      en: 'Method Name'
    },
    {
      type: 'Description',
      zh: '说明',
      en: 'Description'
    },
    {
      type: 'Parameters',
      zh: '参数',
      en: 'Parameters'
    },
    {
      type: 'Return',
      zh: '返回值',
      en: 'Return'
    }
  ],
  events: [
    {
      type: 'Name',
      zh: '事件名',
      en: 'Method Name'
    },
    {
      type: 'Description',
      zh: '说明',
      en: 'Description'
    },
    {
      type: 'Parameters',
      zh: '参数',
      en: 'Parameters'
    }
  ],
  mixIns: [
    {
      type: 'Name',
      zh: '参数',
      en: 'Name'
    }
  ],
  cssVariables: [
    {
      type: 'Name',
      zh: '变量名',
      en: 'Name'
    },
    {
      type: 'Default',
      zh: '默认值',
      en: 'Default'
    },
    {
      type: 'Description',
      zh: '含义',
      en: 'Description'
    }
  ]
}

const designTokesnContent = `
## 设计变量

<card>

### 什么是设计变量
变量实际上是将设计中的基础元素与具体的样式进行解耦，用以提供在设计规范和技术上的灵活样式自定义化，从而满足业务和品牌上多样化的视觉需求。

</card>

`

export {
  renderOptions,
  designTokesnContent
}

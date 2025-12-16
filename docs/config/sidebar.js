module.exports = [
  {
    title: '概览',
    collapsable: false,
    children: [
      {
        title: '介绍',
        path: '/guide/intro'
      },
      {
        title: '快速上手',
        path: '/guide/quick-start'
      },
      {
        title: '更新日志',
        path: '/guide/changelog'
      },
      {
        title: '主题与样式',
        path: '/guide/theme'
      },
      {
        title: '设计变量',
        path: '/guide/design-tokens'
      },
      {
        title: '联系我们',
        path: '/guide/contact'
      }
    ]
  },
  {
    title: '组件',
    collapsable: false,
    children: [
      {
        title: '基础',
        collapsable: false,
        children: [
          {
            title: 'Button 按钮',
            path: '/components/base/button'
          },
          {
            title: 'ButtonGroup 按钮组',
            path: '/components/base/button-group'
          },
          {
            title: 'Icon 图标',
            path: '/components/base/icon'
          },
          {
            title: 'Divider 分割线',
            path: '/components/base/divider'
          },
          {
            title: 'FloatBall 悬浮球',
            path: '/components/base/float-ball'
          },
          {
            title: 'Loading 加载',
            path: '/components/base/loading'
          },
          {
            title: 'Collapse 展开收起',
            path: '/components/base/collapse'
          },
          {
            title: 'Calendar 日历',
            path: '/components/base/calendar'
          }
          // {
          //   title: 'Style 内置样式'
          // }
          // {
          //   title: '其他基础组件'
          // }
        ]
      },
      {
        title: '表单',
        collapsable: false,
        children: [
          {
            title: 'Checkbox 复选框',
            path: '/components/base/checkbox'
          },
          {
            title: 'CheckboxGroup 复选框组',
            path: '/components/base/checkbox-group'
          },
          {
            title: 'Radio 单选框',
            path: '/components/base/radio'
          },
          {
            title: 'RadioGroup 单选框组',
            path: '/components/base/radio-group'
          },
          {
            title: 'Textarea 文本输入框',
            path: '/components/base/textarea'
          },
          {
            title: 'Picker 选择器',
            path: '/components/base/picker'
          },
          {
            title: 'CascadePicker 级联选择器',
            path: '/components/base/cascade-picker'
          },
          {
            title: 'DatePicker 日期选择器',
            path: '/components/base/date-picker'
          },
          {
            title: 'TimePicker 时间选择器',
            path: '/components/base/time-picker'
          },
          {
            title: 'Rate 评分',
            path: '/components/base/rate'
          },
          {
            title: 'Switch 滑动开关',
            path: '/components/base/switch'
          },
          {
            title: 'CalendarModal 日历弹框',
            path: '/components/base/calendar-modal'
          }
        ]
      },
      {
        title: '弹出层',
        collapsable: false,
        children: [
          {
            title: 'Popup 弹出层',
            path: '/components/popup/popup'
          },
          {
            title: 'Toast 轻提示',
            path: '/components/popup/toast'
          },
          {
            title: 'Dialog 弹出框',
            path: '/components/popup/dialog'
          },
          {
            title: 'Modal 半浮层弹窗',
            path: '/components/popup/modal'
          },
          {
            title: 'Tip 提示',
            path: '/components/base/tip'
          }
        ]
      },
      {
        title: '组合组件',
        collapsable: false,
        children: [
          {
            title: 'RadioModal',
            path: '/components/popup/radio-modal'
          },
          {
            title: 'CheckboxModal',
            path: '/components/popup/checkbox-modal'
          },
          {
            title: 'PickerModal',
            path: '/components/popup/picker-modal'
          },
          {
            title: 'CascadePickerModal',
            path: '/components/popup/cascade-picker-modal'
          },
          {
            title: 'DatePickerModal',
            path: '/components/popup/date-picker-modal'
          },
          {
            title: 'TimePickerModal',
            path: '/components/popup/time-picker-modal'
          },
          {
            title: 'PickerPopup',
            path: '/components/popup/picker-popup'
          },
          {
            title: 'CascadePickerPopup',
            path: '/components/popup/cascade-picker-popup'
          },
          {
            title: 'DatePickerPopup',
            path: '/components/popup/date-picker-popup'
          },
          {
            title: 'TimePickerPopup',
            path: '/components/popup/time-picker-popup'
          }
        ]
      }
    ]
  }
]

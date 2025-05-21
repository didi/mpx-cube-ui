## Cube-Date-Picker-Popup

<card>

### 介绍

内置了日期选择器的半浮层模态框。通过把基础组件 Modal 及 DatePicker 相互结合，提供了一种从弹出浮层的形式来使用。

DatePickerModal 选择器的部分与 DatePicker 完全一致，通过配置 min、max 设定选择的日期范围，还可以通过 value 设置当前选择的日期等。

DatePickerModal 中的弹出部分与 Modal 完全一致，通过实例的 show 、hide 来控制显示、隐藏；通过 title、maskClosable 来控制标题、点击蒙层是否关闭等。

</card>

## 示例

<card>

### 基础用法

基础日期选择弹窗。

可以从下方的例子中看到，通过调用 DatePickerModal 实例方法 show 进行显示，同时也可以传入 title、content 来控制 Modal 的文案；而 DatePickerModal 选择器的数则据通过传入的 min、max 来控制。在例子中，还额外使用了 columnCount 属性来控制生成的列数。

DatePickerModal 保留了 DatePicker 和 Modal 原有的事件，比如 columnChange、change、maskClick 等，同时还新增 valueChange 事件，此事件在点击确认按钮后且选择的数据发生变化时触发。


<collapse-wrapper>

```vue
<template>
  <view>
    <cube-button bindclick="showPicker">Date-Picker</cube-button>
    <cube-date-picker-modal
      wx:ref="picker"
      title="日期选择器"
      content="请选择具体的时间"
      columnCount="{{ 4 }}"
      min="{{min}}"
      max="{{max}}"
      value="{{value}}"
      bindtoggle="onToggle"
      bindclose="onClose"
      bindchange="onChange"
      bindcolumnChange="onColumnChange"
      bindconfirm="onConfirm"
      bindvalueChange="onValueChange"
    />
    <view class="demo-data" wx:if="{{ confirmParams.length || valueChangeParams.length }}">
      <view class="key">其他事件可打开控制台查看输出</view>
      <block wx:if="{{ confirmParams.length }}">
        <view class="key">confirmParams 事件参数：</view>
        <view class="value">
          <view class="value-item" wx:for="{{confirmParams}}" wx:key="index">
            <view class="item-key">{{item[0]}}</view>
            <view class="item-value">{{item[1]}}</view>
          </view>
        </view>
      </block>
      <block wx:if="{{ valueChangeParams.length }}">
        <view class="key">valueChange 事件触发次数：{{ valueChangeCount }}</view>
        <view class="key">valueChangeParams 事件参数：</view>
        <view class="value">
          <view class="value-item" wx:for="{{valueChangeParams}}" wx:key="index">
            <view class="item-key">{{item[0]}}</view>
            <view class="item-value">{{item[1]}}</view>
          </view>
        </view>
      </block>
    </view>
  </view>
</template>

<script>
import { createComponent } from '@mpxjs/core'
import { beauty } from '../../common/utils'

createComponent({
  data: {
    min: +new Date(2010, 7, 8),
    max: +new Date(2022, 9, 20),
    value: +new Date(2021, 11, 31),
    confirmParams: '',
    valueChangeParams: '',
    valueChangeCount: 0
  },
  methods: {
    showPicker() {
      this.confirmParams = '',
      this.valueChangeParams = '',
      this.$refs.picker.show()
    },
    onColumnChange(e) {
      console.log('columnChange 事件触发：')
      console.log(beauty(e.detail))
    },
    onChange(e) {
      console.log('change 事件触发：')
      console.log(beauty(e.detail))
    },
    onToggle(e) {
      console.log('toggle 事件触发，当前状态是否显示：', e.detail.value)
    },
    onClose() {
      console.log('close 事件触发')
    },
    onMaskClick() {
      console.log('maskClick 事件触发')
    },
    onConfirm(e) {
      const detail = e.detail
      console.log(beauty(detail))

      console.log(detail.date)
      detail.date = '时间戳：' + Date.parse(detail.date)
      console.log(detail)
      this.confirmParams = Object.entries(detail)
    },
    onValueChange(e) {
      const detail = e.detail
      console.log('valueChange 事件触发：')
      console.log(beauty(detail))

      detail.date = '时间戳：' + Date.parse(detail.date)
      this.valueChangeCount = this.valueChangeCount + 1
      this.valueChangeParams = Object.entries(detail)
    }
  }
})
</script>
```

</collapse-wrapper>


</card>

<card>

### 使用 slot

CascadePickerModal 提供了两个具名插槽，header 和 footer。 header 是顶部位置插槽，在标题上方； footer 是尾部插槽，在按钮下方。

除去slot，例子中还通过 format 属性配置日期格式，并通过 columnOrder 来修改展示顺序为 “日-月-年” ['date', 'month', 'year']。


<collapse-wrapper>

```vue
<template>
  <view>
    <cube-button bindclick="showPicker">slot-Picker</cube-button>
    <cube-date-picker-modal
      wx:ref="picker"
      title="标题"
      min="{{min}}"
      max="{{max}}"
      value="{{value}}"
      format="{{format}}"
      columnOrder="{{columnOrder}}"
    >
      <view slot="header" class="demo-slot-header-wrapper">
        <image class="demo-slot-header" src="https://ut-static.udache.com/webx/mpx-cube-ui/1GyZ1gVbkoNIDOtGNwyUh.jpg" style="background-size: 100%"></image>
      </view>
      <view slot="footer" class="demo-slot-footer" bindtap="clickCustomBtn">时间不在范围内</view>
    </cube-date-picker-modal>
  </view>
</template>

<script>
  import { createComponent } from '@mpxjs/core'
  import { beauty } from '../../common/utils'

  createComponent({
    data: {
      min: +new Date(2010, 7, 8),
      max: +new Date(2022, 9, 20),
      value: +new Date(),
      format: {
        year: 'YY年',
        month: 'MM月',
        date: '第 D 日'
      },
      columnOrder: ['date', 'month', 'year']
    },
    methods: {
      showPicker() {
        this.confirmParams = '{ /* selectedIndex, selectedVal, selectedText */ }',
        this.valueChangeParams = '{ /* selectedIndex, selectedVal, selectedText */ }',
        this.$refs.picker.show()
      },
      clickCustomBtn() {
        this.$refs.picker.hide()
      }
    }
  })
</script>
```

</collapse-wrapper>


</card>

<card> 
 
 ### Props

<!-- @vuese:[name]:props:start -->
|参数|说明|类型|可选值|默认值|
|---|---|---|---|---|
|themeType|用于生成最外层类名 如原类名为 cube-component，添加 themeType = demo 后，类名变为 cube-component cube-component-demo|`String`|-|-|
|visible|遮盖层初始状态是否可见|`Boolean`|-|false|
|indicatorStyle|设置选择器中间选中框的样式|`String`|-|-|
|immediateChange||`Boolean`|-|false|
|title|标题|`String`|-|-|
|cancelText|顶部取消按钮文案配置|`String`|-|-|
|cancelBtnAlign|顶部取消按钮对齐方式|`String`|left/right|left|
|hideOnConfirm|触发 confirm 事件时是否需要主动关闭弹窗|`Boolean`|-|true|
|hideOnCancel|触发 cancel 事件时是否需要主动关闭弹窗|`Boolean`|-|true|
|hideOnClose|触发 close 事件时是否需要主动关闭弹窗|`Boolean`|-|true|
|content|内容文本|`String`|-|-|
|layout|icon 与 title、content的排列方向(vertical/horizontal)|`String`|-|vertical|
|noBuiltInBtns|是否不使用内置的底部按钮|`Boolean`|-|false|
|maskClosable|是否点击蒙层隐藏|`Boolean`|-|true|
|showCloseIcon|是否显示关闭按钮|`Boolean`|-|true|
|fullyStop|点击确认时，是否需要滚动选项完全停止|`Boolean`|-|false|
|min|可选范围的最小值|Array, Number（时间戳，毫秒单位）|-|[2010, 0, 1]|
|max|可选范围的最大值|Array, Number（时间戳，毫秒单位）|-|[new Date().getFullYear() + 1, 12, 31, 23, 59, 59]，表示为当前时间未来一年的12月31日|
|startColumn|起始列|`String`|year/month/date/hour/minute/second|year|
|columnCount|列数|`Number`|-|3|
|format|日期格式配置|`Object`|-|{ year: 'YYYY', month: 'M', date: 'D', hour: 'hh', minute: 'mm', second: 'ss' }|
|value|当前选择的日期|Array, Number（时间戳，毫秒单位）|-|+new Date()|
|columnOrder|列的展示顺序|`Array`|-|['year', 'month', 'date', 'hour', 'minute', 'second']|

<!-- @vuese:[name]:props:end -->


  
</card> 
 
 
 
<card> 
 
 ### Events

<!-- @vuese:[name]:events:start -->
|事件名|说明|参数|
|---|---|---|
|toggle|显示/隐藏时触发|event.detail = { value }， 表当前状态是显示还是隐藏|
|maskClick|点击遮盖层触发事件|-|
|ready|组件 ready 生命周期事件|-|
|close|点击顶部关闭icon或遮盖层触发事件|-|
|pickstart|当滚动选择开始时候触发事件|-|
|pickend|当滚动选择结束时候触发事件|-|
|columnChange|列变化事件，某列选中的 value 及 index 任意一个变化后触发事件|event.detail = { column, index, text, value } column 是发生变化的列；index, text, value 分别是变化后的索引、文案、值|
|change|滚动后触发|event.detail = { date, selectedIndex, selectedText, selectedVal } date 表当前选中日期，Date 类型；其他每个属性都是数组，是当前所有列的选中信息； 分别表示被选中的索引、文案、值|
|valueChange|所确认的值变化时触发此事件|同上|
|confirm|点击确认按钮触发此事件|同上|
|cancel|点击取消按钮时触发|-|

<!-- @vuese:[name]:events:end -->


  
</card> 
 
<card> 
 
 ### Slots

<!-- @vuese:[name]:slots:start -->
|插槽名|说明|
|---|---|
|header|顶部位置插槽|
|pickerHeader|picker选择器头部位置插槽|
|footer|尾部位置插槽|

<!-- @vuese:[name]:slots:end -->


  
</card> 
 
<card> 
 
 ### Methods

<!-- @vuese:[name]:methods:start -->
|组件实例方法|说明|参数|返回值|
|---|---|---|---|
|show|显示|-|-|
|hide|隐藏|-|-|

<!-- @vuese:[name]:methods:end -->


  
</card> 
 
 
 

## Cube-Date-Picker-Popup

<card>

### 介绍

通过把基础组件 Popup 及 DatePicker 相互结合，提供了一种从弹出浮层的形式来使用。

DatePickerPopup 选择器的部分与 DatePicker 完全一致，通过 list、selectedIndex 来控制选择数据的显示。其中 list 需要传入的是一个树形结构，第一列数组的每个选项的children属性，对应着切换到该选项时后续列的数据，从而实现对后续列的改变。

DatePickerPopup 中的弹出层可以分别设置：title 控制标题、subtitle控制子标题、cancelTxt控制顶部取消按钮文案、confirmTxt控制顶部确定按钮文案、maskClosable控制是否点击蒙层隐藏。

</card>

## 示例

<card>

### 基础用法

可以从下方的例子中看到，通过调用 DatePickerPopup 实例方法 show 进行显示，同时也可以传入 title、subtitle、cancelText、confirmText 来控制弹层的文案；而 DatePickerPopup 选择器的数则据通过传入的 list、selectedIndex 来控制。

DatePickerPopup 保留了 Picker 原有的事件，比如 columnChange、change、maskClick 等，同时还新增 valueChange 事件，此事件在点击确认按钮后且选择的数据发生变化时触发。


<collapse-wrapper>

```vue
<template>
  <view>
    <cube-button bindclick="showPicker">basic-picker</cube-button>
    <cube-date-picker-popup
      wx:ref="picker"
      title="日期选择器"
      sub-title="请选择具体的时间"
      cancel-txt="返回"
      confirm-txt="确定"
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
      this.confirmParams = ''
      this.valueChangeParams = ''
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

### 基础用法

DatePickerPopup 有一个非常灵活的能力，就是可以配置列，总共是年、月、日、时、分、秒六种的列，你可以通过 startColumn 和 columnCount 来配置起始列和列数，比如默认的“年月日”选择，是从“年”开始的“三列”，而时分秒，则是从“时”开始的“三列”。


<collapse-wrapper>

```vue
<template>
  <view>
    <cube-button bindclick="showPicker">time-picker</cube-button>
    <cube-date-picker-popup
      wx:ref="picker"
      title="日期选择器"
      sub-title="请选择具体的时间"
      cancel-txt="返回"
      confirm-txt="确定"
      min="{{min}}"
      max="{{max}}"
      value="{{value}}"
      startColumn="{{startColumn}}"
      bindchange="onChange"
      bindcolumnChange="onColumnChange"
    />
    <view class="event-params" wx:if="{{ changeParams.length }}">
    <view class="key">change 事件参数：</view>
      <view class="value">
        <view class="value-item" wx:for="{{changeParams}}" wx:key="index">
          <view class="item-key">{{item[0]}}</view>
          <view class="item-value">{{changeTimeStanp(item)}}</view>
        </view>
      </view>
      <view class="key">columnChange 事件参数：</view>
      <view class="value">
        <view class="value-item" wx:for="{{columnChangeParams}}"  wx:key="index">
          <view class="item-key">{{item[0]}}</view>
          <view class="item-value">{{item[1]}}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { createComponent } from '@mpxjs/core'
import { beauty } from '../../common/utils'

createComponent({
  data: {
    min: [8, 0, 0],
    max: [20, 59, 59],
    value: +new Date(),
    startColumn: 'hour',
    columnChangeParams: '',
    changeParams: '',
  },
  methods: {
    changeTimeStanp(data) {
      if (data[0] === 'date') {
        return  '时间戳：' + Date.parse(data[1])
      }
      return  data[1]
    },
    showPicker() {
      this.$refs.picker.show()
    },
    onColumnChange(e) {
      this.columnChangeParams = Object.entries(e.detail)
    },
    onChange(e) {
      this.changeParams = Object.entries(e.detail)
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
|subtitle|子标题|`String`|-|-|
|cancelTxt|顶部取消按钮文案|`String`|-|取消|
|confirmTxt|顶部确定按钮文案|`String`|-|确认|
|maskClosable|是否点击蒙层隐藏|`Boolean`|-|true|
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
|pickerHeader|picker选择器头部位置插槽|

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
 
 
 

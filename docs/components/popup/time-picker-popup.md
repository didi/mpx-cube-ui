## Cube-Time-Picker-Modal

<card>

### 介绍

内置了时间选择器的半浮层模态框。通过把基础组件 Popup 及 TimePicker 相互结合，提供了一种从弹出浮层的形式来使用。

TimePickerPopup 选择器的部分与 TimePicker 完全一致，通过 list、selectedIndex 来控制选择数据的显示。其中 list 需要传入的是一个树形结构，第一列数组的每个选项的children属性，对应着切换到该选项时后续列的数据，从而实现对后续列的改变。

TimePickerPopup 中的弹出层可以分别设置：title 控制标题、subtitle控制子标题、cancelTxt控制顶部取消按钮文案、confirmTxt控制顶部确定按钮文案、maskClosable控制是否点击蒙层隐藏。

</card>

## 示例

<card>

### 基础用法

基础日期选择弹窗

可以从下方的例子中看到，通过调用 TimePickerPopup 实例方法 show 进行显示，同时也可以传入 title、subtitle、cancelText、confirmText 来控制弹层的文案；而 TimePickerPopup 选择器的数则据通过传入的 min、max 来控制。在例子中，还额外使用了 columnCount 属性来控制生成的列数。

TimePickerPopup 保留了 TimePicker 和 Modal 原有的事件，比如 columnChange、change、maskClick 等，同时还新增 valueChange 事件，此事件在点击确认按钮后且选择的数据发生变化时触发。


<collapse-wrapper>

```vue
<template>
  <view>
    <cube-button bindclick="showPicker">basic-picker</cube-button>
    <cube-time-picker-popup
      wx:ref="picker"
      title="时间选择器"
      sub-title="请选择具体的时间"
      cancel-txt="返回"
      confirm-txt="确定"
      min="{{min}}"
      max="{{max}}"
      show-now="{{ showNow }}"
      bindchange="onChange"
      bindcolumnChange="onColumnChange"
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
    min: Date.now(),
    max: Date.now() + 3 * 24 * 60 * 60 * 1000,
    showNow: true,
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
      this.confirmParams = Object.entries(detail)
      console.log('confirm 事件触发：')
      console.log(beauty(detail))
      
    },
    onValueChange(e) {
      const detail = e.detail
      this.valueChangeCount = this.valueChangeCount + 1
      this.valueChangeParams = Object.entries(detail)
      console.log('valueChange 事件触发：')
      console.log(beauty(detail))
    }
  }
})
</script>
```

</collapse-wrapper>


</card>

<card>

### 手动设置显示时间

timePicker实例向外暴露setTime方法用以手动设置时间，时间格式为时间戳。当时间戳小于当前时间戳时，timePicker实例会默认显示当前时间。

如例子所示，3秒后会选中未来1天后的时间。


<collapse-wrapper>

```vue
<template>
  <view>
    <cube-button bindclick="showPickerWithSetTime">Use setTime</cube-button>
    <cube-time-picker-popup
      title="时间选择器"
      wx:ref="picker"
    />
  </view>
</template>

<script>
import { createComponent } from '@mpxjs/core'

createComponent({
  methods: {
    showPickerWithSetTime() {
      const time = Date.now() + 1 * 60 * 60 * 1000 * 24
      this.$refs.picker.show()
      setTimeout(() => {
        this.$refs.picker.setTime(time)
      }, 3000)
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
|delay|将当前时间向后推算的分钟数，决定了最小可选时间（注：仅当未设置 min 时有效）|`Number`|-|15|
|day|日期配置|`Object`|-|{ len: 3 }|
|showNow|是否显示现在（需当前时间在可选范围内）；以及现在选项的文案|boolean, { text: string }|-|true|
|minuteStep|分钟数的步长|number, { rule?: string, step?: number }|rule 可选:floor/ceil/round, step 默认10|10|
|format|时间格式|`String`|-|YYYY/M/D hh:mm|
|min|最小可选时间|`Number`|-|根据 delay、minuteStep、hourSpan等计算 默认为 当前时间 + 15 分钟|
|max|最大可选时间|`Number`|-|根据 min、minuteStep、hourSpan、day 等计算 默认为 min + 3天|
|hourSpan|小时范围 [0, 24]，右开区间 最小值0，最大值24|`Array`|-|HourSpan|

<!-- @vuese:[name]:props:end -->


  
</card> 
 
<card> 
 
 ### TsType

<!-- @vuese:[name]:tsType:start -->
|Name|Type|
|---|---|
|DayConfig|<pre v-pre class="language-typescript inside-td"><code>{<br>  <span class="hljs-attr">filter?</span>: <span class="hljs-built_in">string</span>[];<br>  <span class="hljs-attr">format?</span>: <span class="hljs-built_in">string</span>;<br>  <span class="hljs-attr">len?</span>: <span class="hljs-built_in">number</span>;<br>}</code></pre>|
|NowConfig|<pre v-pre class="language-typescript inside-td"><code>{<br>  <span class="hljs-attr">text?</span>: <span class="hljs-built_in">string</span>;<br>}</code></pre>|
|MinuteStepConfig|<pre v-pre class="language-typescript inside-td"><code>{<br>  <span class="hljs-attr">rule?</span>: <span class="hljs-built_in">string</span>;<br>  <span class="hljs-attr">step?</span>: <span class="hljs-built_in">number</span>;<br>}</code></pre>|
|HourSpan|<pre v-pre class="language-typescript inside-td"><code><span class="hljs-built_in">number</span>[]</code></pre>|

<!-- @vuese:[name]:tsType:end -->


  
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
|change|滚动后触发|event.detail = { selectedTime, selectedText, formatedTime, selectedIndex }。 selectedTime: 当前选中的timestamp；selectedText: 当前选中的时间文案； formatedTime: 格式化日期；selectedIndex: 当前选中的索引。|
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
 
 
 

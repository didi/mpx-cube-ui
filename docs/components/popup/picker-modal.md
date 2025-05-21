## Cube-Picker-Modal

<card>

### 介绍

通过把基础组件 Modal 及 Picker 相互结合，提供了一种从弹出浮层的形式来使用。

PickerModal 选择器的部分与 Picker 完全一致，通过 list、selectedIndex 来控制选择数据的显示。

PickerModal 中的弹出部分与 Modal 完全一致，通过实例的 show 、hide 来控制显示、隐藏；通过 title、maskClosable 来控制标题、点击蒙层是否关闭等。

</card>

## 示例

<card>

### 基础用法

可以从下方的例子中看到，通过调用 PickerModal 实例方法 show 进行显示，同时也可以传入 title、content 来控制 Modal 的文案；而 Picker 选择器的数则据通过传入的 list、selectedIndex 来控制。

PickerModal 保留了 Picker 和 Modal 原有的事件，比如 columnChange、change、maskClick 等，同时还新增 valueChange 事件，此事件在点击确认按钮后且选择的数据发生变化时触发。


<collapse-wrapper>

```vue
<template>
  <view>
    <cube-button bindclick="showPicker">base-picker</cube-button>
    <cube-picker-modal
      wx:ref="picker"
      title="请选择你的组合"
      content="content 内容"
      list="{{ dataList }}"
      selected-index="{{ selectedIndex }}"
      fully-stop="{{ true }}"
      bindchange="onChange"
      bindcolumnChange="onColumnChange"
      bindtoggle="onToggle"
      bindclose="onClose"
      bindcancel="onCancel"
      bindconfirm="onConfirm"
      bindmaskClick="onMaskClick"
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
    selectedIndex: [0, 1, 0],
    dataList: [
      [ { text: '剧毒', value: '剧毒' }, { text: '蚂蚁', value: '蚂蚁' }, { text: '幽鬼', value: '幽鬼' }, { text: '剧毒1', value: '剧毒1' }, { text: '蚂蚁1', value: '蚂蚁1' }, { text: '幽鬼1', value: '幽鬼1' }, { text: '剧毒2', value: '剧毒2' }, { text: '蚂蚁2', value: '蚂蚁2' }, { text: '幽鬼2', value: '幽鬼2' } ],
      [ { text: '输出', value: '输出' }, { text: '控制', value: '控制' }, { text: '核心', value: '核心' } ],
      [ { text: '梅肯', value: '梅肯' }, { text: '假腿', value: '假腿' }, { text: '飞鞋', value: '飞鞋' } ]
    ],
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
    onCancel() {
      console.log('cancel 事件触发')
    },
    onClose() {
      console.log('close 事件触发')
    },
    onMaskClick() {
      console.log('maskClick 事件触发')
    },
    onConfirm(e) {
      this.confirmParams = Object.entries(e.detail)
      console.log('confirm 事件触发：')
      console.log(beauty(e.detail))
    },
    onValueChange(e) {
      this.valueChangeCount = this.valueChangeCount + 1
      this.valueChangeParams = Object.entries(e.detail)
      console.log('valueChange 事件触发：')
      console.log(beauty(e.detail))
    }
  }
})
</script>
```

</collapse-wrapper>


</card>

<card>

### 使用 wx:model

可以使用 wx:model 来控制选择器的显示与隐藏


<collapse-wrapper>

```vue
<template>
  <view>
    <view>通过 wx:model 控制显隐藏，当前值：</view>
    <cube-radio-group
      col-num="{{ 2 }}"
      options="{{ options }}"
      wx:model="{{ radioVal }}"
    />
    <cube-button bindclick="showPicker">wx-model-picker</cube-button>
    <cube-picker-modal
      wx:model="{{ isVisible }}"
      wx:model-prop="visible"
      wx:model-event="toggle"
      wx:ref="picker"
      title="wx:model 控制"
      content="content 内容"
      list="{{ dataList }}"
      selected-index="{{ selectedIndex }}"
    />
  </view>
</template>

<script>
import { createComponent } from '@mpxjs/core'
import { beauty } from '../../common/utils'

createComponent({
  data: {
    selectedIndex: [0, 1, 0],
    dataList: [
      [ { text: '剧毒', value: '剧毒' }, { text: '蚂蚁', value: '蚂蚁' }, { text: '幽鬼', value: '幽鬼' } ],
      [ { text: '输出', value: '输出' }, { text: '控制', value: '控制' }, { text: '核心', value: '核心' } ],
      [ { text: '梅肯', value: '梅肯' }, { text: '假腿', value: '假腿' }, { text: '飞鞋', value: '飞鞋' } ]
    ],
    options: [{
      value: 1,
      text: 'true'
    }, {
      value: 0,
      text: 'false'
    }],
    radioVal: 0,
    isVisible: false
  },
  watch: {
    radioVal(newV) {
      if (this.isVisible === Boolean(newV)) return
      this.isVisible = Boolean(newV)
    },
    isVisible(newV) {
      if (this.radioVal === Number(newV)) return
      this.radioVal = Number(newV)
    }
  },
  methods: {
    showPicker() {
      this.$refs.picker.show()
    }
  }
})
</script>
```

</collapse-wrapper>


</card>

<card>

### 使用 slot

PickerModal 提供了两个具名插槽，header 和 footer。 header 是顶部位置插槽，在标题上方； footer 是尾部插槽，在按钮下方。


<collapse-wrapper>

```vue
<template>
  <view>
    <cube-button bindclick="showPicker">slot-Picker</cube-button>
    <cube-picker-modal
      wx:ref="picker"
      title="标题"
      list="{{dataList}}"
      selected-index="{{selectedIndex}}"
    >
      <view slot="header" class="demo-slot-header-wrapper">
        <image class="demo-slot-header" src="https://ut-static.udache.com/webx/mpx-cube-ui/1GyZ1gVbkoNIDOtGNwyUh.jpg" style="background-size: 100%"></image>
      </view>
      <view slot="footer" class="demo-slot-footer" bindtap="clickCustomBtn">起点不在此机场</view>
    </cube-picker-modal>
  </view>
</template>

<script>
import { createComponent } from '@mpxjs/core'

createComponent({
  data: {
    selectedIndex: [0, 1, 0],
    dataList: [
      [ { text: '剧毒', value: '剧毒' }, { text: '蚂蚁', value: '蚂蚁' }, { text: '幽鬼', value: '幽鬼' } ],
      [ { text: '输出', value: '输出' }, { text: '控制', value: '控制' }, { text: '核心', value: '核心' } ],
      [ { text: '梅肯', value: '梅肯' }, { text: '假腿', value: '假腿' }, { text: '飞鞋', value: '飞鞋' } ]
    ]
  },
  methods: {
    showPicker() {
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

### 更新数据

和 Picker 一致，当你需要修改 PickerModal 某些配置项时，你可以使用实例方法 updateData，传入你需要更新的属性。

下方例子可以发现每次打开 PickerModal 时，都会选择第一项的“剧毒”，3秒后自动切换成第三项的“核心”。


<collapse-wrapper>

```vue
<template>
  <view>
    <cube-button bindclick="showPickerWithUpdate">Use updateData</cube-button>
    <cube-picker-modal
      wx:ref="picker"
      title="更新数据"
      list="{{ dataList }}"
      selected-index="{{ selectedIndex }}"
    />
  </view>
</template>

<script>
import { createComponent } from '@mpxjs/core'
createComponent({
  data: {
    selectedIndex: [0],
    dataList: [[ { text: '剧毒', value: '剧毒' }, { text: '蚂蚁', value: '蚂蚁' }, { text: '幽鬼', value: '幽鬼' } ]],
  },
  methods: {
    showPickerWithUpdate() {
      this.$refs.picker.show()
      this.dataList = [[ { text: '剧毒', value: '剧毒' }, { text: '蚂蚁', value: '蚂蚁' }, { text: '幽鬼', value: '幽鬼' } ]],
      this.selectedIndex = [0]
      setTimeout(() => {
        this.$refs.picker.updateData(
          [[ { text: '输出', value: '输出' }, { text: '控制', value: '控制' }, { text: '核心', value: '核心' } ]],
          [2]
        )
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
|list|传入 picker 数据，数组的长度决定了 picker 的列数|`Array`|-|PickerColumn[]|
|selectedIndex|被选中的索引值，拉起 picker 后显示这个索引值对应的内容|`Array`|-|number[]|
|fullyStop|点击确认时，是否需要滚动选项完全停止|`Boolean`|-|false|

<!-- @vuese:[name]:props:end -->


  
</card> 
 
<card> 
 
 ### TsType

<!-- @vuese:[name]:tsType:start -->
|Name|Type|
|---|---|
|PickerColumn|<pre v-pre class="language-typescript inside-td"><code>{<br>  <span class="hljs-attr">id?</span>: <span class="hljs-built_in">string</span>;<br>  <span class="hljs-attr">order?</span>: <span class="hljs-built_in">number</span>;<br>  <span class="hljs-attr">richText?</span>: <span class="hljs-built_in">string</span>;<br>  <span class="hljs-attr">text</span>: <span class="hljs-built_in">string</span>\|<span class="hljs-built_in">number</span>;<br>  <span class="hljs-attr">value</span>: <span class="hljs-built_in">any</span>;<br>}[]&amp;{<br>  <span class="hljs-attr">id?</span>: <span class="hljs-built_in">string</span>;<br>}</code></pre>|

<!-- @vuese:[name]:tsType:end -->


  
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
|change|滚动后触发|event.detail = { selectedIndex, selectedText, selectedVal } 每个属性都是数组，是当前所有列的选中信息； 分别表示被选中的索引、文案、值|
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
|pickerHeader|-|
|footer|尾部位置插槽|

<!-- @vuese:[name]:slots:end -->


  
</card> 
 
<card> 
 
 ### Methods

<!-- @vuese:[name]:methods:start -->
|组件实例方法|说明|参数 1|参数 2|返回值|
|---|---|---|---|---|
|show|显示|-|-|-|
|hide|隐藏|-|-|-|
|updateData|更新 picker 的数据及选中值|list 为每一列的数据|index 为每一列的数据选中的索引|-|
|updateList|更新 picker 的数据|list 为每一列的数据|-|-|
|updateIndex|更新 picker 的选中值|index 为每一列的数据选中的索引|-|-|

<!-- @vuese:[name]:methods:end -->


  
</card> 
 
<card> 
 
 ### CSS Variable
|变量名|默认值|含义|
|---|---|---|
|<span id="picker-modal-body-padding-left" class="css-var-name">$picker-modal-body-padding-left</span>|<div>0</div>|modal body 部分的左内边距|
|<span id="picker-modal-body-padding-right" class="css-var-name">$picker-modal-body-padding-right</span>|<div>0</div>|modal body 部分的右内边距|
|<span id="picker-modal-content-color" class="css-var-name">$picker-modal-content-color</span>|<div>#757575</div>|modal 内容区域的文字颜色|
|<span id="picker-modal-content-margin-top" class="css-var-name">$picker-modal-content-margin-top</span>|<div>30px</div>|-|
|<span id="picker-modal-content-left" class="css-var-name">$picker-modal-content-left</span>|<div>0 - <span>$modal-body-padding-left</span></div>|-|
|<span id="picker-modal-header-border-radius" class="css-var-name">$picker-modal-header-border-radius</span>|<div>5px 5px 0 0</div>|-|
|<span id="picker-modal-slide-color" class="css-var-name">$picker-modal-slide-color</span>|<div>rgba(0,0,0,0.08)</div>|-|
|<span id="picker-modal-slide-top" class="css-var-name">$picker-modal-slide-top</span>|<div>-15px</div>|-|
|<span id="picker-modal-slide-bottom" class="css-var-name">$picker-modal-slide-bottom</span>|<div>-15px</div>|-|
  
</card> 
 

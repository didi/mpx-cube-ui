## Cube-Picker-Popup

<card>

### 介绍

内置了基础选择器 picker 的弹出层。

</card>

## 示例

<card>

### 单列

从下方例子可以看到，通过调用自身的实例方法show展示组件。可以传入title、cancelTxt、confirmTxt来控制标题、取消和确认文案。

list是二维数组，其包含多少个一维数组就有多少单列picker与之对应，每一个一维数组的值都是对应picker可以选择的值。

selected-index是一维数组形式，其每一项都是list中相对应每一个一维数组当前展示值的下标。

当滑动选择其他值的时候，也会触发对应的change函数。


<collapse-wrapper>

```vue
<template>
  <view>
    <cube-button bindclick="showPicker">base-picker</cube-button>
    <cube-picker-popup
      wx:ref="picker"
      title="{{'标题'}}"
      cancelTxt="取消"
      confirmTxt="确认"
      list="{{ dataList }}"
      selected-index="{{ selectedIndex }}"
      bindchange="onChange"
      bindcolumnChange="onColumnChange"
      bindtoggle="onToggle"
      bindclose="onClose"
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
    selectedIndex: [1],
    dataList: [[ 
      { text: '剧毒', value: '剧毒' }, 
      { text: '蚂蚁', value: '蚂蚁' }, 
      { text: '幽鬼', value: '幽鬼' } 
    ]],
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

### 多列

多列和单列的区别在于多列的list中存储的一维数组有两个及两个以上，且selected-index中数组长度不再是1。


<collapse-wrapper>

```vue
<template>
  <view>
    <cube-button bindclick="showPicker">multi-column-picker</cube-button>
    <cube-picker-popup
      wx:ref="picker"
      title="多列选择器"
      list="{{dataList}}"
      cancelTxt="取消"
      selected-index="{{selectedIndex}}"
      confirmTxt="确认"
      bindchange="onChange"
      bindcolumnChange="onColumnChange"
    />
  </view>
  <view class="event-params" wx:if="{{ changeParams.length }}">
    <view class="key">change 事件参数：</view>
      <view class="value">
        <view class="value-item" wx:for="{{changeParams}}" wx:key="index">
          <view class="item-key">{{item[0]}}</view>
          <view class="item-value">{{item[1]}}</view>
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
    ],
    columnChangeParams: '',
    changeParams: '',
  },
  methods: {
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

### 配置副标题


<collapse-wrapper>

```vue
<template>
  <view>
    <cube-button bindclick="showPicker">use-subtitle</cube-button>
    <cube-picker-popup
      wx:ref="picker"
      title="主标题"
      subtitle="子标题"
      list="{{ dataList }}"
      cancelTxt="取消"
      selected-index="{{ selectedIndex }}"
      confirmTxt="确认"
    />
  </view>
</template>

<script>
import { createComponent } from '@mpxjs/core'

createComponent({
  data: {
    selectedIndex: [1],
    dataList: [[ 
      { text: '剧毒', value: '剧毒' }, 
      { text: '蚂蚁', value: '蚂蚁' }, 
      { text: '幽鬼', value: '幽鬼' } 
    ]]
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

### 更新数据

点击按钮1s左右会自动更新，无需自己选择。

更新的方法是实例自身的updateDate方法，传入要更新的list和selected-idx，也可以使用updateList只是更新list和updateIndex更新selected-idx。


<collapse-wrapper>

```vue
<template>
  <view>
    <cube-button bindclick="showPickerWithUpdate">use-update-data</cube-button>
    <cube-picker-popup
      wx:ref="picker"
      title="数据更新"
      list="{{ dataList }}"
      cancelTxt="取消"
      selected-index="{{ selectedIndex }}"
      confirmTxt="确认"
    />
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
    showPickerWithUpdate() {
      this.$refs.picker.show()

      setTimeout(() => {
        this.$refs.picker.updateData([
          [ { text: '剧毒', value: '剧毒' }, { text: '蚂蚁', value: '蚂蚁' }, { text: '幽鬼', value: '幽鬼' } ],
          [ { text: '输出', value: '输出' }, { text: '控制', value: '控制' }, { text: '核心', value: '核心' } ],
          [ { text: '梅肯', value: '梅肯' }, { text: '假腿', value: '假腿' }, { text: '飞鞋', value: '飞鞋' } ]
        ], [2, 0, 2])
      }, 1000)
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
|pickerHeader|-|

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
|<span id="picker-popup-header-height" class="css-var-name">$picker-popup-header-height</span>|<div>60px</div>|-|
|<span id="picker-popup-title-line-height" class="css-var-name">$picker-popup-title-line-height</span>|<div>1.389</div>|-|
|<span id="picker-popup-subtitle-line-height" class="css-var-name">$picker-popup-subtitle-line-height</span>|<div>1.339</div>|-|
|<span id="picker-popup-content-margin" class="css-var-name">$picker-popup-content-margin</span>|<div>20px 0</div>|-|
|<span id="picker-popup-subtitle-margin-top" class="css-var-name">$picker-popup-subtitle-margin-top</span>|<div>2px</div>|-|
|<span id="picker-popup-btn-padding" class="css-var-name">$picker-popup-btn-padding</span>|<div>0 16px</div>|-|
|<span id="picker-popup-operate-font-size" class="css-var-name">$picker-popup-operate-font-size</span>|<div><RouterLink to="/guide/design-tokens.html#font-size-sm" v-slot="{href}"> <a :href="href">$font-size-sm</a> </RouterLink></div>|-|
|<span id="picker-popup-title-font-size" class="css-var-name">$picker-popup-title-font-size</span>|<div><RouterLink to="/guide/design-tokens.html#font-size-lg" v-slot="{href}"> <a :href="href">$font-size-lg</a> </RouterLink></div>|-|
|<span id="picker-popup-subtitle-font-size" class="css-var-name">$picker-popup-subtitle-font-size</span>|<div><RouterLink to="/guide/design-tokens.html#font-size-xs" v-slot="{href}"> <a :href="href">$font-size-xs</a> </RouterLink></div>|-|
|<span id="picker-popup-title-color" class="css-var-name">$picker-popup-title-color</span>|<div><RouterLink to="/guide/design-tokens.html#text-color" v-slot="{href}"> <a :href="href">$var(text-color)</a> </RouterLink></div>|-|
|<span id="picker-popup-subtitle-color" class="css-var-name">$picker-popup-subtitle-color</span>|<div><RouterLink to="/guide/design-tokens.html#text-color-hint" v-slot="{href}"> <a :href="href">$var(text-color-hint)</a> </RouterLink></div>|-|
|<span id="picker-popup-confirm-btn-color" class="css-var-name">$picker-popup-confirm-btn-color</span>|<div><RouterLink to="/guide/design-tokens.html#color-primary" v-slot="{href}"> <a :href="href">$var(color-primary)</a> </RouterLink></div>|-|
|<span id="picker-popup-cancel-btn-color" class="css-var-name">$picker-popup-cancel-btn-color</span>|<div><RouterLink to="/guide/design-tokens.html#text-color-hint" v-slot="{href}"> <a :href="href">$var(text-color-hint)</a> </RouterLink></div>|-|
|<span id="picker-popup-confirm-btn-active-color" class="css-var-name">$picker-popup-confirm-btn-active-color</span>|<div>#fdc2a5</div>|-|
|<span id="picker-popup-cancel-btn-active-color" class="css-var-name">$picker-popup-cancel-btn-active-color</span>|<div>#ccc</div>|-|
  
</card> 
 

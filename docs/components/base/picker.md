## Cube-Picker

<card>

### 介绍

Picker 组件也就是选择器，可以用于实现单列或多列选项的选择。

对于选择器，最基本的是需要定义它可以选择的选项，定义选项的属性是 list ，它是一个二维数组，第一维度代表了有多少列，第二维度则代表了每列有哪些选项。

</card>

## 示例

<card>

### 单列选择器

通过配置`list`并传入一组数据，则生成一列选择器。


<collapse-wrapper>

```vue
<template>
  <view class="picker-wrapper">
    <view class="picker-demo-title">basic-picker:</view>
    <cube-picker
      list="{{dataList}}"
      selected-index="{{selectedIndex}}"
      bindcolumnChange="onColumnChange"
      bindchange="onChange"
    />
    <view class="event-params" wx:if="{{ changeParams.length }}">
      <view class="key">columnChange 事件参数：</view>
      <view class="value">
        <view class="value-item" wx:for="{{columnChangeParams}}"  wx:key="index">
          <view class="item-key">{{item[0]}}</view>
          <view class="item-value">{{item[1]}}</view>
        </view>
      </view>
      <view class="key">change 事件参数：</view>
      <view class="value">
        <view class="value-item" wx:for="{{changeParams}}" wx:key="index">
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
    selectedIndex: [1],
    dataList: [
      [ { text: '剧毒', value: '剧毒' }, { text: '蚂蚁', value: '蚂蚁' }, { text: '幽鬼', value: '幽鬼' } ]
    ],
    columnChangeParams: '',
    changeParams: ''
  },
  computed: {
    isShow() {
      return  !this.columnChangeParams && !this.changeParams
    }
  },
  methods: {
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

### 多列选择器

如果传入了多列数据，则会生成相应的多列选择器。比如以下是一个三列的选择器：


<collapse-wrapper>

```vue
<template>
  <view class="multi-picker-wrapper">
    <view class="picker-demo-title">multi-picker:</view>
    <cube-picker
      list="{{dataList}}"
      selected-index="{{selectedIndex}}"
      bindcolumnChange="onColumnChange"
      bindchange="onChange"
    />
    <view class="event-params" wx:if="{{ changeParams.length }}">
      <view class="key">columnChange 事件参数：</view>
      <view class="value">
        <view class="value-item" wx:for="{{columnChangeParams}}"  wx:key="index">
          <view class="item-key">{{item[0]}}</view>
          <view class="item-value">{{item[1]}}</view>
        </view>
      </view>
      <view class="key">change 事件参数：</view>
      <view class="value">
        <view class="value-item" wx:for="{{changeParams}}" wx:key="index">
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
    selectedIndex: [0, 1, 0],
    dataList: [
      [ { text: '剧毒', value: '剧毒' }, { text: '蚂蚁', value: '蚂蚁' }, { text: '幽鬼', value: '幽鬼' } ],
      [ { text: '输出', value: '输出' }, { text: '控制', value: '控制' }, { text: '核心', value: '核心' } ],
      [ { text: '梅肯', value: '梅肯' }, { text: '假腿', value: '假腿' }, { text: '飞鞋', value: '飞鞋' } ]
    ],
    columnChangeParams: '',
    changeParams: ''
  },
  computed: {
    isShow() {
      return  !this.columnChangeParams && !this.changeParams
    }
  },
  methods: {
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

### 更新数据及获取数据

当你需要修改 Picker 某些配置项时，你可以使用实例方法 updateData，传入你需要更新的属性。

当你需要获取 Picker 当前选择项时，你可以使用实例方法 getSelectedInfo。


<collapse-wrapper>

```vue
<template>
  <view class="update-data-picker-wrapper">
    <view class="picker-demo-title">update-data-picker:</view>
    <cube-picker
      wx:ref="picker"
      list="{{dataList}}"
      selected-index="{{selectedIndex}}"
    />
    <view class="button-wrapper">
      <cube-button bindclick="update">更新选项</cube-button>
    </view>
    <view class="button-wrapper">
      <cube-button bindclick="getSelected">获取选中值</cube-button>
    </view>
    <view class="demo-data" wx:if="{{ selectedInfo.length }}">
      <view class="value">
        <view class="value-item" wx:for="{{selectedInfo}}" wx:key="index">
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
    dataList: [
      [ { text: '剧毒', value: '剧毒' }, { text: '蚂蚁', value: '蚂蚁' }, { text: '幽鬼', value: '幽鬼' } ],
      [ { text: '输出', value: '输出' }, { text: '控制', value: '控制' }, { text: '核心', value: '核心' } ],
    ],
    selectedIndex: [1, 2],
    selectedInfo: ''
  },
  computed: {
    isShow() {
      return  !this.selectedInfo
    }
  },
  methods: {
    update() {
      this.$refs.picker.updateData([
        [ { text: '输出', value: '输出' }, { text: '控制', value: '控制' }, { text: '核心', value: '核心' } ],
        [ { text: '梅肯', value: '梅肯' }, { text: '假腿', value: '假腿' }, { text: '飞鞋', value: '飞鞋' } ]
      ], [2, 0])
    },
    getSelected() {
      this.selectedInfo = Object.entries(this.$refs.picker.getSelectedInfo())
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
|indicatorStyle|设置选择器中间选中框的样式|`String`|-|-|
|immediateChange||`Boolean`|-|false|
|list|传入 picker 数据，数组的长度决定了 picker 的列数|`Array`|-|PickerColumn[]|
|selectedIndex|被选中的索引值，拉起 picker 后显示这个索引值对应的内容|`Array`|-|number[]|
|numberOfLines|选项超长时 numberOfLines 可以设置为 1，表示显示一行，超出部分显示省略号|`Number`|0/1|0|

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
|pickstart|当滚动选择开始时候触发事件|-|
|pickend|当滚动选择结束时候触发事件|-|
|change|滚动后触发|event.detail = { selectedIndex, selectedText, selectedVal } 每个属性都是数组，是当前所有列的选中信息； 分别表示被选中的索引、文案、值|

<!-- @vuese:[name]:events:end -->


  
</card> 
 
<card> 
 
 ### Slots

<!-- @vuese:[name]:slots:start -->
|插槽名|说明|
|---|---|
|header|用于修改微信原生的选中框，|

<!-- @vuese:[name]:slots:end -->


  
</card> 
 
<card> 
 
 ### Methods

<!-- @vuese:[name]:methods:start -->
|组件实例方法|说明|参数 1|参数 2|返回值|
|---|---|---|---|---|
|updateData|更新 picker 的数据及选中值|list 为每一列的数据|index 为每一列的数据选中的索引|-|
|updateList|更新 picker 的数据|list 为每一列的数据|-|-|
|updateIndex|更新 picker 的选中值|index 为每一列的数据选中的索引|-|-|
|getSelectedInfo|获取当前所有列的选中信息|-|-|{ selectedIndex, selectedText, selectedVal } 每个属性都是数组，是当前所有列的选中信息； 分别表示被选中的索引、文案、值。|

<!-- @vuese:[name]:methods:end -->


  
</card> 
 
<card> 
 
 ### CSS Variable
|变量名|默认值|含义|
|---|---|---|
|<span id="picker-wheel-item-font-size" class="css-var-name">$picker-wheel-item-font-size</span>|<div><RouterLink to="/guide/design-tokens.html#font-size-xl" v-slot="{href}"> <a :href="href">$font-size-xl</a> </RouterLink></div>|picker 可选项字体大小|
|<span id="picker-bgc" class="css-var-name">$picker-bgc</span>|<div><RouterLink to="/guide/design-tokens.html#color-white" v-slot="{href}"> <a :href="href">$var(color-white)</a> </RouterLink></div>|picker 面板的颜色|
|<span id="picker-color" class="css-var-name">$picker-color</span>|<div><RouterLink to="/guide/design-tokens.html#color-black" v-slot="{href}"> <a :href="href">$var(color-black)</a> </RouterLink></div>|picker 可选项字体颜色|
|<span id="picker-content-height" class="css-var-name">$picker-content-height</span>|<div>173px</div>|picker 面板的高度|
|<span id="picker-wheel-item-height" class="css-var-name">$picker-wheel-item-height</span>|<div>36px</div>|picker 可选项高度|
  
</card> 
 

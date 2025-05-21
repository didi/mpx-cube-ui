## Cube-Cascade-Picker

<card>

### 介绍

CascadePicker 组件是级联选择器，用于实现多列选择之间的级联变化。比如，在选择省市区时，当省切换到了江苏省，城市列应该变成江苏省的各个城市，同理，如果城市切换到苏州市，区列的选项也应变成苏州市的各个区，这就级联的意义。

</card>

## 示例

<card>

### 基础用法

相比普通选择器，级联选择器需要传入的数据结构是不一样的。普通选择器的数据结构是一个二维数组，每一列对应一个固定的数组，而级联选择器，则需要传入的是一个树形结构，第一列数组的每个选项的children属性，对应着切换到该选项时后续列的数据，从而实现对后续列的改变。

如 Picker 组件一样，当你需要获取 CascadePicker 当前选择项时，你可以使用实例方法 getSelectedInfo。


<collapse-wrapper>

```vue
<template>
  <view>
    <view class="picker-demo-title">basic-cascade-picker:</view>
    <cube-cascade-picker
      wx:ref="picker"
      list="{{dataList}}"
      selectedIndex="{{selectedIndex}}"
      bindcolumnChange="onColumnChange"
      bindchange="onChange"
    />
    <view class="button-wrapper">
      <cube-button bindclick="getSelected">获取当前选中项</cube-button>
    </view>

    <view class="demo-data" wx:if="{{ selectedInfo.length || changeParams.length }}">
      <block wx:if="{{ selectedInfo.length }}">
        <view class="key">getSelectedInfo 事件返回值：</view>
        <view class="value">
          <view class="value-item" wx:for="{{selectedInfo}}" wx:key="index">
            <view class="item-key">{{item[0]}}</view>
            <view class="item-value">{{item[1]}}</view>
          </view>
        </view>
      </block>
      <block wx:if="{{ changeParams.length }}">
        <view class="key">change 事件参数：</view>
        <view class="value">
          <view class="value-item" wx:for="{{changeParams}}" wx:key="index">
            <view class="item-key">{{item[0]}}</view>
            <view class="item-value">{{item[1]}}</view>
          </view>
        </view>
      </block>
      <block wx:if="{{ changeParams.length }}">
        <view class="key">columnChange 事件参数：</view>
        <view class="value">
          <view wx:for="{{ columnChangeParams }}" wx:key="index">
            <view class="value-number">第{{ index+1 }}次：</view>
            <view class="value-item" wx:for="{{item}}" wx:for-item="itemChild" wx:for-index="itemIndex" wx:key="itemIndex">
              <view class="item-key">{{itemChild[0]}}</view>
              <view class="item-value">{{itemChild[1]}}</view>
            </view>
          </view>
        </view>
      </block>
    </view>
  </view>
</template>
<script>
  import { createComponent } from '@mpxjs/core'
  import { beauty } from '../../common/utils'
  let columnChangeArr = []
  createComponent({
    data: {
      selectedIndex: [0, 1, 0],
      columnChangeParams: [],
      changeParams: '',
      selectedInfo: '',
      dataList: [{
        value: 'Fruit',
        text: 'Fruit',
        children: [{
          value: 'Apple',
          text: 'Apple',
          children: [{ value: 1, text: 'One' }, { value: 2, text: 'Two' }]
        }, {
          value: 'Orange',
          text: 'Orange',
          children: [{ value: 3, text: 'Three'}, { value: 4, text: 'Four' }]
        }]
      }, {
        value: 'Drink',
        text: 'Drink',
        children: [{
          value: 'Coffee',
          text: 'Coffee',
          children: [{ value: 1, text: 'One' }, { value: 2, text: 'Two' }]
        }, {
          value: 'Tea',
          text: 'Tea',
          children: [{ value: 1, text: 'One' }, { value: 3, text: 'Three'}]
        }]
      }]
    },
    computed: {
     isShowSelectedInfo() {
        return  !this.selectedInfo
      },
      isShowOther() {
        return  !this.columnChangeParams[0] &&  !this.changeParams
      }
    },
    methods: {
      onColumnChange(e) {
        columnChangeArr.push(Object.entries(e.detail))
      },
      onChange(e) {
        this.columnChangeParams = [...columnChangeArr]
        columnChangeArr = []

        this.changeParams = Object.entries(e.detail)
      },
      getSelected() {
        this.selectedInfo = Object.entries(this.$refs.picker.getSelectedInfo())
      }
    }
  })
</script>
```

</collapse-wrapper>


当第一列选中`Fruit`时，第二列的选项是`Apple`、`Orange`。以此类推，当第二列选中`Orange`时，第三列的选项是`Three`、`Four`。

</card>

<card>

### 异步加载数据

当数据量太大时，可能难以在最开始就生成完整的级联数据树。这时，你可以配置 async 属性开启异步加载级联数据，在 columnChange 事件时去更新数据，并且在你更新完数据之前，用户点击确认会是无效的。

数据的更新可以使用实例方法 updateData，传入你需要更新的属性。同时因 async 属性，例子有以下表现：

1. 分别有两组数据 Fruit 和 Drink，同时只有一组和子数据。
2. 切换一级选项后，有对数据进行更新，所以在更新后 cascade-picker 派发 change 事件。
3. 切换二级选项后，没有对数据进行更新，所以二级选项变化后 change 事件不会触发。
4. 切换最后一级后，因不涉及到子数据的变化，所以会触发 change 事件。


<collapse-wrapper>

```vue
<template>
  <view>
    <view class="picker-demo-title">async-cascade-picker:</view>
    <cube-cascade-picker
      wx:ref="asyncPicker"
      list="{{dataList}}"
      selectedIndex="{{selectedIndex}}"
      async="{{true}}"
      bindcolumnChange="onColumnChange"
      bindchange="onChange"
    />
    <view class="event-params m-t-10"  wx:if="{{ changeParams || introduce }}">
      <view class="key-introduce">{{introduce}}</view>
      <view class="desc-text m-t-10 m-b-10">
        因设置 async 为true，change 事件会在用户更新数据后才相应；例子里第二例滚动时没有更新数据，所以无 change 事件。
      </view>
      <block wx:if="{{ changeParams }}">
        <view class="m-b-10">change 事件参数：</view>
        <view class="value m-b-10">
          <view view class="value-item" wx:for="{{changeParams}}" wx:key="index">
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
  const Fruit = [{
    value: 'Fruit',
    text: 'Fruit',
    children: [{
      value: 'Apple',
      text: 'Apple',
      children: [{ value: 1, text: 'One' }, { value: 2, text: 'Two' }]
    }, {
      value: 'Orange',
      text: 'Orange',
      children: [{ value: 3, text: 'Three'}, { value: 4, text: 'Four' }]
    }]
  }, {
    value: 'Drink',
    text: 'Drink'
  }]

  const Drink = [{
    value: 'Fruit',
    text: 'Fruit'
  }, {
    value: 'Drink',
    text: 'Drink',
    children: [{
      value: 'Coffee',
      text: 'Coffee',
      children: [{ value: 1, text: 'One' }, { value: 2, text: 'Two' }]
    }, {
      value: 'Tea',
      text: 'Tea',
      children: [{ value: 1, text: 'One' }, { value: 3, text: 'Three'}]
    }]
  }]
  createComponent({
    data: {
      dataList: Fruit,
      selectedIndex: [0, 1, 1],
      changeParams: '',
      introduce: '',
      load: false
    },
    computed: {
    isShow() {
      return !this.changeParams
    },
    isShowLoad() {
      return this.load
    }
  },
    methods: {
      onColumnChange(e) {
        this.changeParams = ''
        this.introduce = 'change 事件未触发'
        const { column, index, value } = e.detail
        if (column === 0) {
          this.introduce = '数据更新中...'
          this.load = true
          // 模拟1.5秒后返回数据
          setTimeout(() => {
            this.$refs.asyncPicker.updateData(index === 0 ? Fruit : Drink, [index, 0, 0])
            this.load = false
          }, 1500)
        }
      },
      onChange(e) {
        this.introduce = ''
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
|indicatorStyle|设置选择器中间选中框的样式|`String`|-|-|
|immediateChange||`Boolean`|-|false|
|selectedIndex|被选中的索引值，拉起 picker 后显示这个索引值对应的内容|`Array`|-|number[]|
|list|级联选择器的树形数据，用于初始化选项|`Array`|-|CascadePickerSubTree[]|
|async|是否异步加载数据|`Boolean`|-|false|

<!-- @vuese:[name]:props:end -->


  
</card> 
 
<card> 
 
 ### TsType

<!-- @vuese:[name]:tsType:start -->
|Name|Type|
|---|---|
|PickerColumn|<pre v-pre class="language-typescript inside-td"><code>{<br>  <span class="hljs-attr">id?</span>: <span class="hljs-built_in">string</span>;<br>  <span class="hljs-attr">order?</span>: <span class="hljs-built_in">number</span>;<br>  <span class="hljs-attr">richText?</span>: <span class="hljs-built_in">string</span>;<br>  <span class="hljs-attr">text</span>: <span class="hljs-built_in">string</span>\|<span class="hljs-built_in">number</span>;<br>  <span class="hljs-attr">value</span>: <span class="hljs-built_in">any</span>;<br>}[]&amp;{<br>  <span class="hljs-attr">id?</span>: <span class="hljs-built_in">string</span>;<br>}</code></pre>|
|CascadePickerSubTree|<pre v-pre class="language-typescript inside-td"><code>{<br>  <span class="hljs-attr">text</span>: <span class="hljs-built_in">string</span>\|<span class="hljs-built_in">number</span>;<br>  <span class="hljs-attr">value</span>: <span class="hljs-built_in">any</span>;<br>  <span class="hljs-attr">order?</span>: <span class="hljs-built_in">number</span>;<br>  <span class="hljs-attr">children?</span>: <span class="hljs-title class_">CascadePickerSubTree</span>[]<br>}</code></pre>|

<!-- @vuese:[name]:tsType:end -->


  
</card> 
 
<card> 
 
 ### Events

<!-- @vuese:[name]:events:start -->
|事件名|说明|参数|
|---|---|---|
|pickstart|当滚动选择开始时候触发事件|-|
|pickend|当滚动选择结束时候触发事件|-|
|pendingChange|async 为 true 时使用，组件等待数据及数据更新时触发|e.detail = { pending }，pending 为 true/false。更新时为 false，等待时为 true|
|columnChange|列变化事件，某列选中的 value 及 index 任意一个变化后触发事件|event.detail = { column, index, text, value } column 是发生变化的列；index, text, value 分别是变化后的索引、文案、值|

<!-- @vuese:[name]:events:end -->


  
</card> 
 
<card> 
 
 ### Slots

<!-- @vuese:[name]:slots:start -->
|插槽名|说明|
|---|---|
|header|-|

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
 
 
 

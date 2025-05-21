## Cube-Cascade-Picker-Modal

<card>

### 介绍

通过把基础组件 Modal 及 CascadePicker 相互结合，提供了一种从弹出浮层的形式来使用。

CascadePickerModal 选择器的部分与 CascadePicker 完全一致，通过 list、selectedIndex 来控制选择数据的显示。其中 list 需要传入的是一个树形结构，第一列数组的每个选项的children属性，对应着切换到该选项时后续列的数据，从而实现对后续列的改变。

CascadePickerModal 中的弹出部分与 Modal 完全一致，通过实例的 show 、hide 来控制显示、隐藏；通过 title、maskClosable 来控制标题、点击蒙层是否关闭等。

</card>

## 示例

<card>

### 基础用法

可以从下方的例子中看到，通过调用 CascadePickerModal 实例方法 show 进行显示，同时也可以传入 title、content 来控制 Modal 的文案；而 CascadePickerModal 选择器的数则据通过传入的 list、selectedIndex 来控制。

CascadePickerModal 保留了 Picker 和 Modal 原有的事件，比如 columnChange、change、maskClick 等，同时还新增 valueChange 事件，此事件在点击确认按钮后且选择的数据发生变化时触发。


<collapse-wrapper>

```vue
<template>
  <view>
    <cube-button bindclick="showPicker">basic-picker</cube-button>
    <cube-cascade-picker-modal
      wx:ref="picker"
      title="请选择你的组合"
      content="content 内容"
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
      selectedIndex: [0, 1, 0],
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
      }],
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

### 使用 slot

CascadePickerModal 提供了两个具名插槽，header 和 footer。 header 是顶部位置插槽，在标题上方； footer 是尾部插槽，在按钮下方。


<collapse-wrapper>

```vue
<template>
  <view>
    <cube-button bindclick="showPicker">slot-Picker</cube-button>
    <cube-cascade-picker-modal
      wx:ref="picker"
      title="标题"
      list="{{dataList}}"
      selected-index="{{selectedIndex}}"
    >
      <view slot="header" class="demo-slot-header-wrapper">
        <image class="demo-slot-header" src="https://ut-static.udache.com/webx/mpx-cube-ui/1GyZ1gVbkoNIDOtGNwyUh.jpg" style="background-size: 100%"></image>
      </view>
      <view slot="footer" class="demo-slot-footer" bindtap="clickCustomBtn">起点不在此机场</view>
    </cube-cascade-picker-modal>
  </view>
</template>

<script>
  import { createComponent } from '@mpxjs/core'
  import { beauty } from '../../common/utils'

  createComponent({
    data: {
      selectedIndex: [0, 1, 0],
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

### 异步加载数据

当数据量太大时，可能难以在最开始就生成完整的级联数据树。这时，你可以配置 async 属性开启异步加载级联数据，在 columnChange 事件时去更新数据，并且在你更新完数据之前，用户点击确认会是无效的。

数据的更新可以使用实例方法 updateData，传入你需要更新的属性。同时因 async 属性，例子有以下表现：

1. 分别有两组数据 Fruit 和 Drink，同时只有一组和子数据。
2. 切换一级选项后，有对数据进行更新，所以在更新后 cascade-picker 派发 change 事件，此时可以关闭弹层。
3. 切换二级选项后，没有对数据进行更新，所以二级选项变化后 change 事件不会触发，此时无法关闭弹层。
4. 切换最后一级后，因不涉及到子数据的变化，所以会触发 change 事件，此时可以关闭弹层。


<collapse-wrapper>

```vue
<template>
  <view>
    <cube-button bindclick="showPicker">async-cascade-picker</cube-button>
    <cube-cascade-picker-modal
      wx:ref="asyncPicker"
      title="{{'标题'}}"
      list="{{ dataList }}"
      selectedIndex="{{ selectedIndex }}"
      async="{{ true }}"
      bindcolumnChange="onColumnChange"
      bindconfirm="onConfirm"
    />
    <view class="event-params m-t-10">
      <view class="desc-text m-t-10 m-b-10">
        因设置 async 为true，change 事件会在用户更新数据后才相应；例子里第二例滚动时没有更新数据，所以无法点击确认
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
    },
    methods: {
      showPicker() {
        this.confirmParams = ''
        this.$refs.asyncPicker.show()
      },
      onColumnChange(e) {
        this.changeParams = ''
        const { column, index, value } = e.detail
        if (column === 0) {
          this.load = true
          // 模拟1.5秒后返回数据
          setTimeout(() => {
            this.$refs.asyncPicker.updateData(index === 0 ? Fruit : Drink, [index, 0, 0])
            this.load = false
          }, 1500)
        }
      },
      onConfirm(e) {
        this.changeParams = Object.entries(e.detail)
        console.log('confirm 事件触发：')
        console.log(beauty(e.detail))
      },
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
|selectedIndex|被选中的索引值，拉起 picker 后显示这个索引值对应的内容|`Array`|-|number[]|
|fullyStop|点击确认时，是否需要滚动选项完全停止|`Boolean`|-|false|
|async|是否异步加载数据|`Boolean`|-|false|
|list||`Array`|-|CascadePickerSubTree[]|

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
 
 
 

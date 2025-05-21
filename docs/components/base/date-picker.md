## Cube-Date-Picker

<card>

### 介绍

日期选择器，可用于日期选择，选择粒度的灵活配置，如年月日、时分秒、年月日时分秒、年月等。

</card>

## 示例

<card>

### 基础用法

配置 min、max 设定选择的日期范围，还可以通过 value 设置当前选择的日期。

如 Picker 组件一样，当你需要获取 DatePicker 当前选择项时，你可以使用实例方法 getSelectedInfo。


<collapse-wrapper>

```vue
<template>
  <view>
    <view class="picker-demo-title">basic-picker:</view>
    <cube-date-picker
      wx:ref="picker"
      min="{{min}}"
      max="{{max}}"
      value="{{value}}"
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
        <view class="key">columnChange 事件参数：</view>
        <view class="value">
          <view wx:for="{{ columnChangeParams }}" wx:key="index">
            <view class="value-number">第{{ index+1 }}次：</view>
            <view class="value-item" wx:for={{item}} wx:for-item="itemChild" wx:for-key="itemIndex" wx:key="itemIndex">
              <view class="item-key">{{itemChild[0]}}</view>
              <view class="item-value">{{itemChild[1]}}</view>
            </view>
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
    </view>
  </view>
</template>

<script>
import { createComponent } from '@mpxjs/core'
import { beauty } from '../../common/utils'
let columnChangeArr = []
createComponent({
  data: {
    title: '日期选择器',
    min: +new Date(2010, 7, 8),
    max: +new Date(2022, 9, 20),
    value: +new Date(2021, 11, 31),
    columnChangeParams: [''],
    changeParams: '',
    selectedInfo: ''
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
      const detail = e.detail
      detail.date = '时间戳：' + Date.parse(detail.date)
      this.changeParams = Object.entries(detail)
    },
    getSelected() {
      const info = this.$refs.picker.getSelectedInfo()
      info.date = '时间戳：' + Date.parse(info.date)
      this.selectedInfo = Object.entries(info)
    }
  }
})
</script>
```

</collapse-wrapper>


</card>

<card>

### 选择“时分秒”

DatePicker 有一个非常灵活的能力，就是可以配置列，总共是年、月、日、时、分、秒六种的列，你可以通过 startColumn 和 columnCount 来配置起始列和列数，比如默认的”年月日“选择，是从“年”开始的“三列”，而时分秒，则是从“时”开始的“三列”。


<collapse-wrapper>

```vue
<template>
  <view>
    <view class="picker-demo-title">time-picker:</view>
    <cube-date-picker
      wx:ref="picker"
      min="{{min}}"
      max="{{max}}"
      value="{{value}}"
      startColumn="{{startColumn}}"
      bindchange="onChange"
    />
    <view class="demo-data" wx:if="{{ changeParams }}">
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
    title: '时间选择器',
    min: [8, 0, 0],
    max: [20, 59, 59],
    value: +new Date(),
    startColumn: 'hour',
    changeParams: ''
  },
  computed: {
    isShow() {
      return  !this.changeParams
    }
  },
  methods: {
    onChange(e) {
      const detail = e.detail
      detail.date = '时间戳：' + Date.parse(detail.date)
      this.changeParams = Object.entries(detail)
    },
    getSelected() {
      const info = this.$refs.picker.getSelectedInfo()
      info.date = '时间戳：' + Date.parse(info.date)
      this.selectedInfo = Object.entries(info)
    }
  }
})
</script>
```

</collapse-wrapper>


</card>

<card>

### 选择“年月日时分秒”

同理，如果想要年月日时分秒选择器，则是以“年”开始的六列。


<collapse-wrapper>

```vue
<template>
  <view>
    <view class="picker-demo-title">date-time-picker:</view>
    <cube-date-picker
      min="{{min}}"
      max="{{max}}"
      value="{{value}}"
      columnCount="{{columnCount}}"
    />
  </view>
</template>



<script>
import { createComponent } from '@mpxjs/core'

createComponent({
  data: {
    title: 'Date Time Picker',
    min: +new Date(2010, 7, 8, 8, 0, 0),
    max: +new Date(2022, 9, 20, 20, 59, 59),
    value: +new Date(),
    columnCount: 6
  }
})
</script>
```

</collapse-wrapper>


</card>

<card>

### 自定义顺序

针对日期展示格式顺序不是 "年-月-日 小时-分钟-秒" 的场景，可以通过 columnOrder 来修改展示顺序。例如日期展示顺序为 “日-月-年”，可配置 columnOrder 值为 ['date', 'month', 'year']。


<collapse-wrapper>

```vue
<template>
  <view>
    <view class="picker-demo-title">order-picker:</view>
    <cube-date-picker
      min="{{min}}"
      max="{{max}}"
      value="{{value}}"
      columnOrder="{{ columnOrder }}"
    />
  </view>
</template>



<script>
import { createComponent } from '@mpxjs/core'

createComponent({
  data: {
    title: '日期选择器',
    min: +new Date(2010, 7, 8),
    max: +new Date(2022, 9, 20),
    value: +new Date(2021, 11, 31),
    columnOrder: ['date', 'month', 'year']
  }
})
</script>
```

</collapse-wrapper>


</card>

<card>

### 格式化

你还可以通过 format 属性配置日期格式。


<collapse-wrapper>

```vue
<template>
  <view>
    <view class="picker-demo-title">Use format:</view>
    <cube-date-picker
      min="{{min}}"
      max="{{max}}"
      value="{{value}}"
      format="{{format}}"
    />
  </view>
</template>



<script>
import { createComponent } from '@mpxjs/core'

createComponent({
  data: {
    min: +new Date(2010, 7, 8),
    max: +new Date(2022, 9, 20),
    value: +new Date(),
    format: {
      year: 'YY年',
      month: 'MM月',
      date: '第 D 日'
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
|pickstart|当滚动选择开始时候触发事件|-|
|pickend|当滚动选择结束时候触发事件|-|
|change|滚动后触发|event.detail = { date, selectedIndex, selectedText, selectedVal } date 表当前选中日期，Date 类型；其他每个属性都是数组，是当前所有列的选中信息； 分别表示被选中的索引、文案、值|
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
|组件实例方法|说明|参数|返回值|
|---|---|---|---|
|getSelectedInfo|获取当前所有列的选中信息|-|{ date, selectedIndex, selectedText, selectedVal } date 表当前选中日期，Date 类型；其他每个属性都是数组，是当前所有列的选中信息；分别表示被选中的索引、文案、值|

<!-- @vuese:[name]:methods:end -->


  
</card> 
 
 
 

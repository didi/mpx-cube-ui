## Cube-Time-Picker

<card>

### 介绍

TimePicker 组件提供了常用的日期选择功能。

</card>

## 示例

<card>

### 基础用法

min 和 max 直接控制时间的可选范围，showNow 用于控制是否显示“现在”时间。如下方例子可选当前时间及未来3天的时间。


<collapse-wrapper>

```vue
<template>
  <view>
    <view class="picker-demo-title">basic-picker:</view>
    <cube-time-picker
      wx:ref="picker"
      min="{{ min }}"
      max="{{ max }}"
      show-now="{{ showNow }}"
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
            <view class="value-item" wx:for={{item}} wx:for-item="itemChild" wx:key="twoIndex">
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
      min: Date.now() - 1 * 60 * 60 * 1000,
      max: Date.now() + 3 * 24 * 60 * 60 * 1000,
      showNow: true,
      columnChangeParams: [''],
      changeParams: '',
      selectedInfo: ''
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
        const info = this.$refs.picker.getSelectedInfo()
        this.selectedInfo = Object.entries(info)
      }
    }
  })
</script>



<style lang="stylus" scoped>
.button-wrapper
  margin-top: 10px
.picker-demo-title
  margin-bottom 8px
.demo-data
  margin-top: 10px
  padding: 10px 10px
  background-color: white
  border: 1px solid  white
  border-radius: 10px

  .key
    margin-bottom: 10px
    font-size: 16px
  .key-introduce
    margin-bottom: 10px
    line-height: 20px
  .value
    margin-bottom: 20px
    white-space: break-spaces
    .value-number
      margin-top: 20px
    .value-item
      display flex
      justify-content: space-between
      height: 25px
      line-height: 25px
      font-size: 15px
      .item-value
        margin-left: 10px
        white-space nowrap
</style>
```

</collapse-wrapper>


</card>

<card>

### Config Day

day字段的len属性可以设置第一列需要展示的日期长度；

filer属性设置第一列日期展示的文案，当len的数量大于filter的数组长度时，会以M月d日的格式显示文案；

format属性用以格式化日期显示的方式。


<collapse-wrapper>

```vue
<template>
  <view>
    <view class="picker-demo-title">Config day options:</view>
    <cube-time-picker day="{{day}}" />
  </view>
</template>

<script>
  import { createComponent } from '@mpxjs/core'

  createComponent({
    data: {
      day: {
        len: 5,
        filter: ['今天', '明天'],
        format: 'M月D日'
      }
    }
  })
</script>
```

</collapse-wrapper>


</card>

<card>

### Config MinuteStep

通过 minuteStep 属性可配置分钟数的步长，默认为 10 分钟，这样的话，可选的分钟就是 10、20、30、40、50。另外 minuteStep 还支持传入一个对象，你可以通过子属性 rule 配置取整的规则，是向上取整 ceil，向下取整 floor，又或是四舍五入round。而子属性 step 则代表步长。


<collapse-wrapper>

```vue
<template>
  <view>
    <view class="picker-demo-title">Config minute step:</view>
    <cube-time-picker minuteStep="{{minuteStep}}" />
  </view>
</template>

<script>
import { createComponent } from '@mpxjs/core'

createComponent({
  data: {
    minuteStep: {
      rule: 'ceil',
      step: 15
    }
  }
})
</script>
```

</collapse-wrapper>


</card>

<card>

### Config Format

通过 format 属性可配置 select 事件的 formatedTime 参数的格式。


<collapse-wrapper>

```vue
<template>
  <view>
    <view class="picker-demo-title">Config format:</view>
    <cube-time-picker format="{{format}}" bindchange="onChange" />
    <view class="demo-data" wx:if="{{ changeParams.length }}">
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
    format: 'hh:mm',
    changeParams: ''
  },
  methods: {
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

### Config Delay

delay 则表示的是当前时间向后推迟的时间，决定了最小可选时间（注：仅当未设置 min 时有效）。

在例子中配置了30，代表第一个可选时间在当前时间的30分之后。


<collapse-wrapper>

```vue
<template>
  <view>
    <view class="picker-demo-title">Config delay step:</view>
    <cube-time-picker delay="{{delay}}" />
  </view>
</template>

<script>
import { createComponent } from '@mpxjs/core'

createComponent({
  data: {
    delay: 30
  }
})
</script>
```

</collapse-wrapper>


</card>

<card>

### 手动设置显示时间

timePicker实例向外暴露setTime方法用以手动设置时间，时间格式为时间戳。当时间戳小于当前时间戳时，timePicker实例会默认显示当前时间。


<collapse-wrapper>

```vue
<template>
  <view>
    <cube-button bindclick="showPickerWithSetTime">Use setTime</cube-button>
    <cube-time-picker wx:ref="picker"/>
    </cube-time-picker>
  </view>
</template>

<script>
import { createComponent } from '@mpxjs/core'
import { beauty } from '../../common/utils'

createComponent({
  methods: {
    showPickerWithSetTime() {
      const time = new Date().valueOf() + 1 * 60 * 60 * 1000 * 24
      this.$refs.picker.setTime(time)
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
|delay|将当前时间向后推算的分钟数，决定了最小可选时间（注：仅当未设置 min 时有效）|`Number`|-|15|
|day|日期配置|`Object`|-|{ len: 3 }|
|showNow|是否显示现在（需当前时间在可选范围内）；以及现在选项的文案|boolean, { text: string }|-|true|
|minuteStep|分钟数的步长|number, { rule?: string, step?: number }|rule 可选:floor/ceil/round, step 默认10|10|
|format|时间格式|`String`|-|YYYY/M/D hh:mm|
|min|最小可选时间|`Number`|-|根据 delay、minuteStep、hourSpan等计算 默认为 当前时间 + 15 分钟|
|max|最大可选时间|`Number`|-|根据 min、minuteStep、hourSpan、day 等计算 默认为 min + 3天|
|hourSpan|小时范围 [0, 24]，右开区间 最小值0，最大值24|`Array`|-|HourSpan|
|immediateChange|是否在手指松开时立即触发 change 事件。若不开启则会在滚动动画结束后触发 change 事件。 微信 webview 特有属性，基础库 2.21.1 及以上； 支付宝需基础库 2.8.7 及以上|`Boolean`|-|false|

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
|pickstart|当滚动选择开始时候触发事件|-|
|pickend|当滚动选择结束时候触发事件|-|
|change|滚动后触发|event.detail = { selectedTime, selectedText, formatedTime, selectedIndex }。 selectedTime: 当前选中的timestamp； selectedText: 当前选中的时间文案； formatedTime: 格式化日期； selectedIndex: 当前选中的索引。|
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
|setTime|手动设置time-picker组件显示的时间，数据格式为时间戳|time：时间戳|-|
|getSelectedInfo|获取当前所有列的选中信息|-|{ selectedTime, selectedText, formatedTime, selectedIndex }。 selectedTime: 当前选中的timestamp； selectedText: 当前选中的时间文案； formatedTime: 格式化日期； selectedIndex: 当前选中的索引。|

<!-- @vuese:[name]:methods:end -->


  
</card> 
 
 
 

## Cube-Segment-Picker

<card>

### 介绍

段选择器，用于实现多段的选择，比如选择时间段：2010年9月1日 - 2014年6月30日。

</card>

## 示例

<card>

### 城市选择器

可以配置多段城市选择。


<collapse-wrapper>

```vue
<template>
  <view>
    <cube-button bindclick="showPicker">Express - From - To</cube-button>
    <cube-segment-picker
      wx:ref="picker"
      title="选择器"
      list="{{list}}"
      cancelTxt="{{cancelTxt}}"
      confirmTxt="{{confirmTxt}}"
      nextTxt="{{nextTxt}}"
      prevTxt="{{prevTxt}}"
      bindchange="change"
      bindcancel="cancel"
      bindselect="select"
      bindvalueChange="valueChange"
    >
    </cube-segment-picker>
  </view>
</template>

<script>
  import { createComponent } from '@mpxjs/core'
  import { provinceList, cityList, areaList } from '../../data/area'

  const cityData = provinceList
  cityData.forEach((province) => {
    province.children = cityList[province.value]
    province.children.forEach((city) => {
      city.children = areaList[city.value]
    })
  })
  createComponent({
    data: {
      list: [
        {
          is: 'cube-cascade-picker-popup',
          title: '寄件地址',
          list: cityData,
          selectedIndex: [0, 0, 0],
          cancelTxt: 'back'
        },
        {
          is: 'cube-cascade-picker-popup',
          title: '收件地址',
          list: cityData,
          cancelTxt: 'back',
          confirmTxt: 'Confirm11',
          selectedIndex: [0, 0, 0]
        }
      ],
      nextTxt: '下一步',
      prevTxt: '上一步'
    },
    methods: {
      showPicker() {
        this.$refs.picker.show()
      },
      change(e) {
        const { column, current, index, text, value } = e.detail
        console.log(
          `change event —- column: ${column}, current: ${current} index: ${index}, text: ${text} value: ${value}`
        )
      },
      cancel() {
        console.log('cancel event')
      },
      select(e) {
        console.log('select event', e.detail)
      },
      valueChange(e) {
        console.log('value-change event', e.detail)
      }
    }
  })
</script>
```

</collapse-wrapper>


</card>

<card>

### 日期选择器


<collapse-wrapper>

```vue
<template>
  <view>
    <cube-button bindclick="showPicker">StartDate - 1EndDate</cube-button>
    <cube-segment-picker
      wx:ref="picker"
      title="选择器"
      list="{{list}}"
      cancelTxt="{{cancelTxt}}"
      confirmTxt="{{confirmTxt}}"
      bindchange="change"
      bindcancel="cancel"
      bindselect="select"
      bindvalueChange="valueChange"
    >
    </cube-segment-picker>
  </view>
</template>

<script>
  import { createComponent } from '@mpxjs/core'

  createComponent({
    data: {
      list: [
        {
          is: 'cube-date-picker-popup',
          title: '毕业时间',
          min: +new Date(2000, 0, 1),
          max: +new Date(2000, 11, 31)
        }
      ]
    },
    methods: {
      showPicker() {
        this.$refs.picker.show()
      },
      change(e) {
        const { column, selectedIndex } = e.detail
        console.log(`change event —- column: ${column}, selectedIndex: ${selectedIndex}`)
      },
      cancel() {
        console.log('cancel event')
      },
      select(e) {
        console.log('select event', e.detail)
      },
      valueChange(e) {
        console.log('value-change event', e.detail)
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
|visible|遮盖层初始状态是否可见|`Boolean`|-|false|
|zIndex|弹出层 z-index|`Number`|-|100|
|maskClosable|遮罩是否可点击|`Boolean`|-|false|
|maskFadeTransition|遮罩是否渐显|`Boolean`|-|false|
|themeType|用于生成最外层类名 如原类名为 cube-component，添加 themeType = demo 后，类名变为 cube-component cube-component-demo|`String`|-|-|
|list|定义各个选择器的组件名和属性|`Array`|-|[]|
|nextTxt|下一步按钮文案|`String`|-|-|
|confirmTxt||`String`|-|确认|
|cancelTxt||`String`|-|取消|
|prevTxt|上一步按钮文案|`String`|-|-|
|index||`Number`|-|0|

<!-- @vuese:[name]:props:end -->


  
</card> 
 
<card> 
 
 ### Events

<!-- @vuese:[name]:events:start -->
|事件名|说明|参数|
|---|---|---|
|toggle|显示/隐藏时触发|event.detail = { value }， 表当前状态是显示还是隐藏|
|next|-|-|
|select|-|-|
|prev|-|-|
|cancel|-|-|
|change|-|-|
|pickstart|不能通过 pickstart 及 pickend 来判断 web 单独点击时，不触发 pickstart 事件，只派发 change 和 pickend 事件 小程序点击当前选中值时，派发 pickstart，但不派发 pickend 事件 这令人头大的差异 ！！|-|
|pickend|-|-|

<!-- @vuese:[name]:events:end -->


  
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
 
 
 

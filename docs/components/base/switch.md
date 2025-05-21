## Cube-Switch

<card>

## 介绍

滑动开关，用于切换 on/off 状态。

</card>

### 示例

<card>

### 基本用法

<collapse-wrapper>

```vue
<template>
  <view>
    <view>通过wx：model控制开关</view>
    <cube-switch wx:model="{{value}}"/>
    <view>通过设置value属性控制开关</view>
    <cube-switch disabled="{{true}}" value="{{true}}"/>
    <view>通过change事件获取当前开关状态</view>
    <cube-switch bindchange="getValue"/>
  </view>
</template>

<script>
  import { createComponent } from '@mpxjs/core'

  createComponent({
    data() {
      return {
        value: false,
        currentValue: true
      }
    },
    methods: {
      getValue(data) {
        this.currentValue = data.detail.value
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
|value|开关状态，可直接赋值|`Boolean`|true/false|false|
|disabled|是否禁用|`Boolean`|true/false|false|

<!-- @vuese:[name]:props:end -->


  
</card> 
 
 
 
<card> 
 
 ### Events

<!-- @vuese:[name]:events:start -->
|事件名|说明|参数|
|---|---|---|
|change|当开关状态变化时触发|-|
|input|当开关状态变化时触发|-|

<!-- @vuese:[name]:events:end -->


  
</card> 
 
 
 
<card> 
 
 ### CSS Variable
|变量名|默认值|含义|
|---|---|---|
|<span id="switch-width" class="css-var-name">$switch-width</span>|<div>40px</div>|容器宽度|
|<span id="switch-height" class="css-var-name">$switch-height</span>|<div>24px</div>|容器高度|
|<span id="switch-bgc" class="css-var-name">$switch-bgc</span>|<div>#EAEAEA</div>|容器背景颜色|
|<span id="switch-border-radius" class="css-var-name">$switch-border-radius</span>|<div>15px</div>|边框圆角|
|<span id="switch-transition" class="css-var-name">$switch-transition</span>|<div>background-color 0.3s</div>|容器颜色过渡|
|<span id="switch-handle-top" class="css-var-name">$switch-handle-top</span>|<div>2px</div>|小球上偏移|
|<span id="switch-handle-left" class="css-var-name">$switch-handle-left</span>|<div>2px</div>|小球左偏移|
|<span id="switch-handle-width" class="css-var-name">$switch-handle-width</span>|<div>20px</div>|小球宽度|
|<span id="switch-handle-height" class="css-var-name">$switch-handle-height</span>|<div>20px</div>|小球高度|
|<span id="switch-handle-bgc" class="css-var-name">$switch-handle-bgc</span>|<div>#fff</div>|小球颜色|
|<span id="switch-handle-border-radius" class="css-var-name">$switch-handle-border-radius</span>|<div>50%</div>|小球边框圆角|
|<span id="switch-handle-transition" class="css-var-name">$switch-handle-transition</span>|<div>left 0.3s</div>|小球left过渡|
|<span id="switch-bgc-on" class="css-var-name">$switch-bgc-on</span>|<div>#FF6435</div>|开关状态为true时，背景颜色|
|<span id="switch-handle-left-on" class="css-var-name">$switch-handle-left-on</span>|<div>18px</div>|开关状态为true时，距左边界距离|
  
</card> 
 

## Cube-Toast 轻提示

<card>

### 介绍

Toast 组件常用于用于非模态信息提醒，无需用户交互。

</card>

## 示例

<card>

### 基础用法

通过调用组件的 `show`、`hide` 方法来控制组件的显示与隐藏。

<collapse-wrapper>

```vue
<template>
  <view class="toast-example-demo">
    <cube-button  bindclick="clickToast">Toast - 基本使用</cube-button>
    <cube-toast
      txt="toast"
      wx:ref="toast">
    </cube-toast>
  </view>
</template>

<script>
  import { createComponent } from '@mpxjs/core'

  createComponent({
    methods: {
      clickToast() {
        this.$refs.toast.show()
      }
    }
  })
</script>
```

</collapse-wrapper>


</card>



<card>

### 自定义图标

通过设置 `icon` 属性可以使用组件库自带的 `icon`，组件自身还提供了默认的插槽，也可以用以自定义 `icon` 图标的插入。

<collapse-wrapper>

```vue
<template>
  <view class="mt-20 toast-with-self-defined-icon-demo">
    <cube-button  bindclick="clickToast">Toast - use system icon</cube-button>
    <cube-toast

      txt="预约暂不支持多车型，部分车型无法预约"
      icon="delete"
      wx:ref="toast">
    </cube-toast>
    <cube-button  bindclick="clickToast('img')" class="mt-20">Toast - use image icon</cube-button>
    <cube-toast

      txt="请输入乘车人手机号"
      wx:ref="toastImg">
      <image class="custom-img" src="https://dpubstatic.udache.com/static/dpubimg/c40384a2-25ef-4781-8e08-44447823d861.png" mode="aspectFit"></image>
    </cube-toast>
  </view>
</template>

<script>
  import { createComponent } from '@mpxjs/core'

  createComponent({
    options: {
      styleIsolation: 'shared'
    },
    methods: {
      clickToast(type) {
        if (type === 'img') {
          this.$refs.toastImg.show()
        } else {
          this.$refs.toast.show()
        }
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
|maskClosable|遮罩是否可点击|`Boolean`|-|false|
|maskFadeTransition|遮罩是否渐显|`Boolean`|-|false|
|icon|图标类型（自动添加`cubeic-`前缀）|`String`|图标 Icon，更多选择参见[内置 Icon](https://www.mpxjs.cn/mpx-cube-ui/demo-theme-default/index.html#/pages/icon/index)|-|
|mask|遮罩|`Boolean`|-|false|
|time|显示时间（设置为 0 时不会自动消失，需要手动隐藏）|`Number`|-|1500|
|zIndex|样式 z-index 的值|`Number`|-|900|
|txt|提示信息文案（一行最多只能展示十二个文字最多展示两行）|`String`|-|-|

<!-- @vuese:[name]:props:end -->


  
</card> 
 
 
 
<card> 
 
 ### Events

<!-- @vuese:[name]:events:start -->
|事件名|说明|参数|
|---|---|---|
|toggle|显示/隐藏时触发|event.detail = { value }， 表当前状态是显示还是隐藏|
|ready|组件 ready 生命周期事件|-|
|timeout|达到超时时间后触发|-|

<!-- @vuese:[name]:events:end -->


  
</card> 
 
<card> 
 
 ### Slots

<!-- @vuese:[name]:slots:start -->
|插槽名|说明|
|---|---|
|— (默认插槽)|-|

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
 
<card> 
 
 ### CSS Variable
|变量名|默认值|含义|
|---|---|---|
|<span id="toast-dark-opacity-bgc" class="css-var-name">$toast-dark-opacity-bgc</span>|<div>rgba(0, 0, 0, 0.8)</div>|背景颜色|
|<span id="toast-z-index" class="css-var-name">$toast-z-index</span>|<div>900</div>|叠层上下文|
|<span id="toast-color" class="css-var-name">$toast-color</span>|<div><RouterLink to="/guide/design-tokens.html#color-white" v-slot="{href}"> <a :href="href">$var(color-white)</a> </RouterLink></div>|文字颜色|
|<span id="toast-bgc" class="css-var-name">$toast-bgc</span>|<div><a class="css-var-default" href="#toast-dark-opacity-bgc">$toast-dark-opacity-bgc</a></div>|背景颜色|
|<span id="toast-content-direction" class="css-var-name">$toast-content-direction</span>|<div>unset</div>|内容布局方向|
|<span id="toast-content-padding-top" class="css-var-name">$toast-content-padding-top</span>|<div>15px</div>|-|
|<span id="toast-content-padding-right" class="css-var-name">$toast-content-padding-right</span>|<div>13px</div>|-|
|<span id="toast-content-padding-bottom" class="css-var-name">$toast-content-padding-bottom</span>|<div>15px</div>|-|
|<span id="toast-content-padding-left" class="css-var-name">$toast-content-padding-left</span>|<div>13px</div>|-|
|<span id="toast-content-padding" class="css-var-name">$toast-content-padding</span>|<div><a class="css-var-default" href="#toast-content-padding-top">$toast-content-padding-top</a> <a class="css-var-default" href="#toast-content-padding-right">$toast-content-padding-right</a> <a class="css-var-default" href="#toast-content-padding-bottom">$toast-content-padding-bottom</a> <a class="css-var-default" href="#toast-content-padding-left">$toast-content-padding-left</a></div>|文本框内边距|
|<span id="toast-content-border-radius" class="css-var-name">$toast-content-border-radius</span>|<div>7px</div>|文本框圆角|
|<span id="toast-icon-width" class="css-var-name">$toast-icon-width</span>|<div>24px</div>|icon-宽度|
|<span id="toast-icon-height" class="css-var-name">$toast-icon-height</span>|<div><a class="css-var-default" href="#toast-icon-width">$toast-icon-width</a></div>|icon-高度|
|<span id="toast-icon-font-size" class="css-var-name">$toast-icon-font-size</span>|<div><RouterLink to="/guide/design-tokens.html#font-size-3xl" v-slot="{href}"> <a :href="href">$font-size-3xl</a> </RouterLink></div>|icon-字号|
|<span id="toast-icon-line-height" class="css-var-name">$toast-icon-line-height</span>|<div>1</div>|icon-行高|
|<span id="toast-slot-icon-margin" class="css-var-name">$toast-slot-icon-margin</span>|<div>0 8px 0 0</div>|icon插槽-外边距|
|<span id="toast-icon-margin-bottom" class="css-var-name">$toast-icon-margin-bottom</span>|<div>unset</div>|icon-底部边距|
|<span id="toast-tip-font-size" class="css-var-name">$toast-tip-font-size</span>|<div><RouterLink to="/guide/design-tokens.html#font-size-sm" v-slot="{href}"> <a :href="href">$font-size-sm</a> </RouterLink></div>|文字字号|
|<span id="toast-tip-line-height" class="css-var-name">$toast-tip-line-height</span>|<div>1.43</div>|文字行高|
|<span id="toast-tip-margin-left" class="css-var-name">$toast-tip-margin-left</span>|<div>8px</div>|文字左边距|
|<span id="toast-tip-margin-bottom" class="css-var-name">$toast-tip-margin-bottom</span>|<div>0px</div>|文字底部边距|
|<span id="toast-tip-max-width" class="css-var-name">$toast-tip-max-width</span>|<div>12em</div>|文字最大宽度|
|<span id="toast-tip-max-height" class="css-var-name">$toast-tip-max-height</span>|<div>40px</div>|文字最大高度|
|<span id="toast-tip-font-weight" class="css-var-name">$toast-tip-font-weight</span>|<div>unset</div>|文字字重|
|<span id="toast-tip-text-align" class="css-var-name">$toast-tip-text-align</span>|<div>unset</div>|文字对齐方式|
  
</card> 
 

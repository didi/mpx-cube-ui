## Cube-float-ball

<card>

### 介绍

悬浮球，吸附停靠在窗口的指定位置，可以用手指拖动改变位置。

</card>

## 示例

<card>

### 基础用法

通过设置`name`属性渲染文本内容，通过设置`initialPosition`属性改变悬浮球的初始位置。


<collapse-wrapper>

```vue
<template>
  <cube-float-ball
    name="default"
    initialPosition="{{ defaultPos }}" />
</template>

<script>
  import { createComponent } from '@mpxjs/core'

  createComponent({
    data() {
      return {
        defaultPos: {
          left: 0,
          top: 200
        }
      }
    }
  })
</script>
```

</collapse-wrapper>


</card>

<card>

### slot 用法

通过默认插槽，我们可以渲染自定义内容，如一张图片。


<collapse-wrapper>

```vue
<template>
  <cube-float-ball
    bindclick="handleClick">
    <image
      class="float-ball-demo"
      src="https://dpubstatic.udache.com/static/dpubimg/TRSp1qfRVjgrDF9Lr-OyN_service-assist.png"></image>
  </cube-float-ball>
</template>

<script>
  import { createComponent } from '@mpxjs/core'

  createComponent({
    methods: {
      handleClick() {
        console.log('click')
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
|name|小球文案。若引用时未提供文案则显示插槽内用户自定义内容|`String`|-|-|
|dockDistance|屏幕边框停靠距离。默认为零，吸附停靠为左右屏幕边框|`Number`|-|0|
|initialPosition|指定小球初始距离屏幕原点的 left/top 位置。该属性未指定的话则默认在屏幕右侧居中位置。|`Object`|-|{}|

<!-- @vuese:[name]:props:end -->


  
</card> 
 
 
 
<card> 
 
 ### Events

<!-- @vuese:[name]:events:start -->
|事件名|说明|参数|
|---|---|---|
|touchstart|手指接触小球时触发|event 事件对象|
|touchmove|手指移动小球时触发|event 事件对象|
|touchend|手指抬起小球时触发|event 事件对象|
|click|手指点击小球触发|event 事件对象|

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
 
 ### CSS Variable
|变量名|默认值|含义|
|---|---|---|
|<span id="ball-content-width" class="css-var-name">$ball-content-width</span>|<div>50px</div>|悬浮球默认宽度|
|<span id="ball-content-height" class="css-var-name">$ball-content-height</span>|<div>50px</div>|悬浮球默认高度|
|<span id="ball-content-padding" class="css-var-name">$ball-content-padding</span>|<div>8px</div>|悬浮球默认状态下的内边距|
|<span id="ball-content-border-radius" class="css-var-name">$ball-content-border-radius</span>|<div>50%</div>|悬浮球默认边框圆角半径|
|<span id="ball-content-bxsh" class="css-var-name">$ball-content-bxsh</span>|<div>0 2px 15px 1px rgba(113, 88, 74, 0.3)</div>|悬浮球默认状态下的阴影|
|<span id="ball-content-font-size" class="css-var-name">$ball-content-font-size</span>|<div><RouterLink to="/guide/design-tokens.html#font-size-sm" v-slot="{href}"> <a :href="href">$var(font-size-sm)</a> </RouterLink></div>|悬浮球默认状态下字体大小|
|<span id="ball-content-color" class="css-var-name">$ball-content-color</span>|<div><RouterLink to="/guide/design-tokens.html#color-white" v-slot="{href}"> <a :href="href">$var(color-white)</a> </RouterLink></div>|悬浮球默认状态下字体颜色|
|<span id="ball-content-background" class="css-var-name">$ball-content-background</span>|<div>linear-gradient(-149deg, #FF9143 12%, #FF5303 96%)</div>|悬浮球默认状态下背景颜色|
|<span id="ball-transition-delay" class="css-var-name">$ball-transition-delay</span>|<div>0</div>|悬浮球移动动画延迟时间|
|<span id="ball-transition-duration" class="css-var-name">$ball-transition-duration</span>|<div>.3s</div>|悬浮球移动动画时间|
|<span id="ball-transition-timing-function" class="css-var-name">$ball-transition-timing-function</span>|<div>ease-out</div>|悬浮球移动动画函数|
  
</card> 
 

## Cube-Dialog 弹出框

<card>

### 介绍

Dialog 模态框组件，提供了多种样式及交互形式，常用于消息的提示及确认。

</card>


## 示例







<card>

### 基础用法

通过 `type` 属性来选择使用 `alert` 提示框类型，还是 `confirm` 确认框类型，通过调用组件暴露的 `show`、`hide` 方法来控制组件的显示与隐藏。


<collapse-wrapper>

```vue
<template>
  <view class="dialog-alert-passenger-demo">
    <cube-button  bind:click="onClickDialog">Dialog - alert</cube-button>
    <cube-dialog

      wx:ref="dialogAlert"
      title="我是标题"
      content="正文行文符合话术规范，表意清晰可多行展示，单行居中对齐，多行居左"
      confirmBtn="引导文案"
    ></cube-dialog>
  </view>
</template>

<script>
import { createComponent } from '@mpxjs/core'

createComponent({
  methods: {
    onClickDialog () {
      const dialogRef = this.$refs.dialogAlert
      dialogRef.show()
    }
  }
})
</script>
```

</collapse-wrapper>



<collapse-wrapper>

```vue
<template>
  <view class="dialog-confirm-passenger-demo">
    <cube-button  bind:click="onClickDialog">Dialog - confirm</cube-button>
    <cube-dialog

      wx:ref="dialogConfirm"
      class="custom-dialog-confirm"
      type="confirm"
      title="我是标题要精简"
      content="正文行文符合话术规范，表意清晰可多行展示，单行居中对齐，多行居左"
      confirm-btn="引导文案"
      cancel-btn="按钮文案"
    ></cube-dialog>
  </view>
</template>

<script>
import { createComponent } from '@mpxjs/core'

createComponent({
  options: {
    styleIsolation: 'shared'
  },
  methods: {
    onClickDialog () {
      const dialogRef = this.$refs.dialogConfirm
      dialogRef.show()
    }
  }
})
</script>
```

</collapse-wrapper>


</card>

<card>

### 自定义 head icon

通过设置 `headIcon` 的 `url`地址，将会在模态框头部显示该图标。


<collapse-wrapper>

```vue
<template>
  <view class="dialog-icon-passenger-demo">
    <cube-button  bind:click="onClickDialog">Dialog - head-icon</cube-button>
    <cube-dialog

      wx:ref="dialogWithHeadIcon"
      type="alert"
      headIcon="https://dpubstatic.udache.com/static/dpubimg/f6abf7d7-e7a9-4c2b-8fc5-78085691220b.png"
      title="我是标题"
      content="我是内容"
      confirmBtn="我知道了"
    ></cube-dialog>
  </view>
</template>
```

</collapse-wrapper>


</card>

<card>

### 自定义垂直排列按钮


<collapse-wrapper>

```vue
<template>
  <view class="dialog-btn-vertical-passenger-demo">
    <cube-button  bind:click="onClickDialog">Dialog - vertical btns</cube-button>
    <cube-dialog  wx:ref="dialogWithVerticalBtns">
      <view slot="title" class="dialog-vertical-btns-title">测试标题</view>
      <view slot="content" class="dialog-btn-content">测试content</view>
      <view slot="btns" class="dialog-btn-slot-vertical">
        <view class="lead-btn" bind:tap="onCloseDialog">引导文案</view>
        <view class="lead-btn" bind:tap="onCloseDialog">按钮文案</view>
        <view class="lead-btn" bind:tap="onCloseDialog">按钮文案</view>
      </view>
    </cube-dialog>
  </view>
</template>

<script>
import { createComponent } from '@mpxjs/core'

createComponent({
  methods: {
    onClickDialog () {
      const dialogRef = this.$refs.dialogWithVerticalBtns
      dialogRef.show()
    },
    onCloseDialog () {
      const dialogRef = this.$refs.dialogWithVerticalBtns
      dialogRef.hide()
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
|zIndex|弹出层 z-index|`Number`|-|100|
|maskClosable|遮罩是否可点击|`Boolean`|-|false|
|maskFadeTransition|遮罩是否渐显|`Boolean`|-|false|
|type|类型|`String`|alert/confirm|alert|
|icon|图标类型（自动添加`cubeic-`前缀）|`String`|图标 Icon，更多选择参见[内置 Icon](https://www.mpxjs.cn/mpx-cube-ui/demo-theme-default/index.html#/pages/icon/index)|-|
|title|标题|`String`|-|-|
|content|正文内容|`String`|-|-|
|headIcon|顶部居中的小圆图标|`String`|-|-|
|showClose|是否显示关闭 Icon 按钮|`Boolean`|-|false|
|confirmBtn|确认按钮参数配置|`Object`|DialogBtn|DialogBtn|
|cancelBtn|取消按钮参数配置|`Object`|DialogBtn|DialogBtn|
|styleConfig|通过 wx:style透传样式, 里面的每项分别修改对应位置的样式|`Object`|styleConfig = { headIcon: '' }|{}|

<!-- @vuese:[name]:props:end -->


  
</card> 
 
<card> 
 
 ### TsType

<!-- @vuese:[name]:tsType:start -->
|Name|Type|
|---|---|
|DialogBtn|<pre v-pre class="language-typescript inside-td"><code>{<br>  <span class="hljs-attr">active?</span>: <span class="hljs-built_in">boolean</span>;<br>  <span class="hljs-attr">disabled?</span>: <span class="hljs-built_in">boolean</span>;<br>  <span class="hljs-attr">text</span>: <span class="hljs-built_in">string</span>;<br>}</code></pre>|

<!-- @vuese:[name]:tsType:end -->


  
</card> 
 
<card> 
 
 ### Events

<!-- @vuese:[name]:events:start -->
|事件名|说明|参数|
|---|---|---|
|toggle|显示/隐藏时触发|event.detail = { value }， 表当前状态是显示还是隐藏|
|ready|组件 ready 生命周期事件|-|
|maskClick|-|-|
|confirm|点击确认按钮后触发|-|
|cancel|点击取消按钮后触发|-|
|close|点击关闭按钮后触发|-|

<!-- @vuese:[name]:events:end -->


  
</card> 
 
<card> 
 
 ### Slots

<!-- @vuese:[name]:slots:start -->
|插槽名|说明|
|---|---|
|title|标题插槽|
|content|内容插槽|
|btns|按钮插槽|

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
|<span id="dialog-container-width" class="css-var-name">$dialog-container-width</span>|<div>270px</div>|容器宽度|
|<span id="dialog-container-border-top-left-radius" class="css-var-name">$dialog-container-border-top-left-radius</span>|<div>2px</div>|-|
|<span id="dialog-container-border-top-right-radius" class="css-var-name">$dialog-container-border-top-right-radius</span>|<div>2px</div>|-|
|<span id="dialog-container-border-bottom-left-radius" class="css-var-name">$dialog-container-border-bottom-left-radius</span>|<div>2px</div>|-|
|<span id="dialog-container-border-bottom-right-radius" class="css-var-name">$dialog-container-border-bottom-right-radius</span>|<div>2px</div>|-|
|<span id="dialog-container-border-radius" class="css-var-name">$dialog-container-border-radius</span>|<div><a class="css-var-default" href="#dialog-container-border-top-left-radius">$dialog-container-border-top-left-radius</a> <a class="css-var-default" href="#dialog-container-border-top-right-radius">$dialog-container-border-top-right-radius</a> <a class="css-var-default" href="#dialog-container-border-bottom-left-radius">$dialog-container-border-bottom-left-radius</a> <a class="css-var-default" href="#dialog-container-border-bottom-right-radius">$dialog-container-border-bottom-right-radius</a></div>|容器圆角|
|<span id="dialog-bgc" class="css-var-name">$dialog-bgc</span>|<div><RouterLink to="/guide/design-tokens.html#color-white" v-slot="{href}"> <a :href="href">$var(color-white)</a> </RouterLink></div>|背景颜色|
|<span id="dialog-btn-secondary-active-bgc" class="css-var-name">$dialog-btn-secondary-active-bgc</span>|<div>rgba(0, 0, 0, .08)</div>|-|
|<span id="dialog-btn-secondary-highlight-active-bgc" class="css-var-name">$dialog-btn-secondary-highlight-active-bgc</span>|<div>rgba(252, 145, 83, .04)</div>|-|
|<span id="dialog-icon-color" class="css-var-name">$dialog-icon-color</span>|<div><RouterLink to="/guide/design-tokens.html#color-secondary" v-slot="{href}"> <a :href="href">$var(color-secondary)</a> </RouterLink></div>|icon-颜色|
|<span id="dialog-icon-bgc" class="css-var-name">$dialog-icon-bgc</span>|<div><RouterLink to="/guide/design-tokens.html#fill-bgc" v-slot="{href}"> <a :href="href">$var(fill-bgc)</a> </RouterLink></div>|icon-背景颜色|
|<span id="dialog-icon-container-margin-top" class="css-var-name">$dialog-icon-container-margin-top</span>|<div>20px</div>|icon-上边距|
|<span id="dialog-icon-container-margin-bottom" class="css-var-name">$dialog-icon-container-margin-bottom</span>|<div>16px</div>|icon-底部边距|
|<span id="dialog-icon-container-width" class="css-var-name">$dialog-icon-container-width</span>|<div>30px</div>|icon-宽度|
|<span id="dialog-icon-container-height" class="css-var-name">$dialog-icon-container-height</span>|<div>30px</div>|icon-高度|
|<span id="dialog-icon-container-padding-top" class="css-var-name">$dialog-icon-container-padding-top</span>|<div>10px</div>|-|
|<span id="dialog-icon-container-padding-right" class="css-var-name">$dialog-icon-container-padding-right</span>|<div>10px</div>|-|
|<span id="dialog-icon-container-padding-bottom" class="css-var-name">$dialog-icon-container-padding-bottom</span>|<div>10px</div>|-|
|<span id="dialog-icon-container-padding-left" class="css-var-name">$dialog-icon-container-padding-left</span>|<div>10px</div>|-|
|<span id="dialog-icon-container-padding" class="css-var-name">$dialog-icon-container-padding</span>|<div><a class="css-var-default" href="#dialog-icon-container-padding-top">$dialog-icon-container-padding-top</a> <a class="css-var-default" href="#dialog-icon-container-padding-right">$dialog-icon-container-padding-right</a> <a class="css-var-default" href="#dialog-icon-container-padding-bottom">$dialog-icon-container-padding-bottom</a> <a class="css-var-default" href="#dialog-icon-container-padding-left">$dialog-icon-container-padding-left</a></div>|icon-内边距|
|<span id="dialog-icon-container-border-radius" class="css-var-name">$dialog-icon-container-border-radius</span>|<div>50%</div>|icon-圆角|
|<span id="dialog-icon-line-height" class="css-var-name">$dialog-icon-line-height</span>|<div>1</div>|icon-行高|
|<span id="dialog-icon-next-title-margin-top" class="css-var-name">$dialog-icon-next-title-margin-top</span>|<div>0px</div>|icon距离标题的上边距|
|<span id="dialog-title-default-margin-top" class="css-var-name">$dialog-title-default-margin-top</span>|<div>25px</div>|-|
|<span id="dialog-title-default-margin-right" class="css-var-name">$dialog-title-default-margin-right</span>|<div>16px</div>|-|
|<span id="dialog-title-default-margin-bottom" class="css-var-name">$dialog-title-default-margin-bottom</span>|<div>0</div>|-|
|<span id="dialog-title-default-margin-left" class="css-var-name">$dialog-title-default-margin-left</span>|<div>16px</div>|-|
|<span id="dialog-title-default-margin" class="css-var-name">$dialog-title-default-margin</span>|<div><a class="css-var-default" href="#dialog-title-default-margin-top">$dialog-title-default-margin-top</a> <a class="css-var-default" href="#dialog-title-default-margin-right">$dialog-title-default-margin-right</a> <a class="css-var-default" href="#dialog-title-default-margin-bottom">$dialog-title-default-margin-bottom</a> <a class="css-var-default" href="#dialog-title-default-margin-left">$dialog-title-default-margin-left</a></div>|标题边距|
|<span id="dialog-title-color" class="css-var-name">$dialog-title-color</span>|<div><RouterLink to="/guide/design-tokens.html#color-dark-grey-s" v-slot="{href}"> <a :href="href">$var(color-dark-grey-s)</a> </RouterLink></div>|标题颜色|
|<span id="dialog-title-margin-top" class="css-var-name">$dialog-title-margin-top</span>|<div>24px</div>|标题上边距|
|<span id="dialog-title-font-size" class="css-var-name">$dialog-title-font-size</span>|<div><RouterLink to="/guide/design-tokens.html#font-size-3xl" v-slot="{href}"> <a :href="href">$var(font-size-3xl)</a> </RouterLink></div>|标题字号|
|<span id="dialog-title-def-color" class="css-var-name">$dialog-title-def-color</span>|<div><RouterLink to="/guide/design-tokens.html#text-color" v-slot="{href}"> <a :href="href">$var(text-color)</a> </RouterLink></div>|标题默认颜色|
|<span id="dialog-title-line-height" class="css-var-name">$dialog-title-line-height</span>|<div>1</div>|标题行高|
|<span id="dialog-icon-next-content-margin-top" class="css-var-name">$dialog-icon-next-content-margin-top</span>|<div>-4px</div>|内容距离icon的上边距|
|<span id="dialog-title-next-content-margin-top" class="css-var-name">$dialog-title-next-content-margin-top</span>|<div>12px</div>|内容距离标题的上边距|
|<span id="dialog-content-container-margin" class="css-var-name">$dialog-content-container-margin</span>|<div>16px 0</div>|内容边框的上下边距|
|<span id="dialog-content-container-line-height" class="css-var-name">$dialog-content-container-line-height</span>|<div>22px</div>|内容边框的行高|
|<span id="dialog-content-def-padding-top" class="css-var-name">$dialog-content-def-padding-top</span>|<div>0</div>|-|
|<span id="dialog-content-def-padding-right" class="css-var-name">$dialog-content-def-padding-right</span>|<div>25px</div>|-|
|<span id="dialog-content-def-padding-bottom" class="css-var-name">$dialog-content-def-padding-bottom</span>|<div>0</div>|-|
|<span id="dialog-content-def-padding-left" class="css-var-name">$dialog-content-def-padding-left</span>|<div>25px</div>|-|
|<span id="dialog-content-def-padding" class="css-var-name">$dialog-content-def-padding</span>|<div><a class="css-var-default" href="#dialog-content-def-padding-top">$dialog-content-def-padding-top</a> <a class="css-var-default" href="#dialog-content-def-padding-right">$dialog-content-def-padding-right</a> <a class="css-var-default" href="#dialog-content-def-padding-bottom">$dialog-content-def-padding-bottom</a> <a class="css-var-default" href="#dialog-content-def-padding-left">$dialog-content-def-padding-left</a></div>|内容边框内边距|
|<span id="dialog-content-font-size" class="css-var-name">$dialog-content-font-size</span>|<div><RouterLink to="/guide/design-tokens.html#font-size-lg" v-slot="{href}"> <a :href="href">$var(font-size-lg)</a> </RouterLink></div>|内容文本字号|
|<span id="dialog-content-color" class="css-var-name">$dialog-content-color</span>|<div><RouterLink to="/guide/design-tokens.html#text-color" v-slot="{href}"> <a :href="href">$var(text-color)</a> </RouterLink></div>|内容文本颜色|
|<span id="dialog-content-margin-top" class="css-var-name">$dialog-content-margin-top</span>|<div>10px</div>|-|
|<span id="dialog-content-margin-right" class="css-var-name">$dialog-content-margin-right</span>|<div>0</div>|-|
|<span id="dialog-content-margin-bottom" class="css-var-name">$dialog-content-margin-bottom</span>|<div>20px</div>|-|
|<span id="dialog-content-margin-left" class="css-var-name">$dialog-content-margin-left</span>|<div>0</div>|-|
|<span id="dialog-content-margin" class="css-var-name">$dialog-content-margin</span>|<div><a class="css-var-default" href="#dialog-content-margin-top">$dialog-content-margin-top</a> <a class="css-var-default" href="#dialog-content-margin-right">$dialog-content-margin-right</a> <a class="css-var-default" href="#dialog-content-margin-bottom">$dialog-content-margin-bottom</a> <a class="css-var-default" href="#dialog-content-margin-left">$dialog-content-margin-left</a></div>|内容文本边距|
|<span id="dialog-content-def-text-align" class="css-var-name">$dialog-content-def-text-align</span>|<div>justify</div>|内容文本对齐方式|
|<span id="dialog-button-padding-top" class="css-var-name">$dialog-button-padding-top</span>|<div>17px</div>|-|
|<span id="dialog-button-padding-right" class="css-var-name">$dialog-button-padding-right</span>|<div>10px</div>|-|
|<span id="dialog-button-padding-bottom" class="css-var-name">$dialog-button-padding-bottom</span>|<div>17px</div>|-|
|<span id="dialog-button-padding-left" class="css-var-name">$dialog-button-padding-left</span>|<div>10px</div>|-|
|<span id="dialog-button-padding" class="css-var-name">$dialog-button-padding</span>|<div><a class="css-var-default" href="#dialog-button-padding-top">$dialog-button-padding-top</a> <a class="css-var-default" href="#dialog-button-padding-right">$dialog-button-padding-right</a> <a class="css-var-default" href="#dialog-button-padding-bottom">$dialog-button-padding-bottom</a> <a class="css-var-default" href="#dialog-button-padding-left">$dialog-button-padding-left</a></div>|按钮内边距|
|<span id="dialog-btn-color" class="css-var-name">$dialog-btn-color</span>|<div><RouterLink to="/guide/design-tokens.html#color-primary" v-slot="{href}"> <a :href="href">$var(color-primary)</a> </RouterLink></div>|按钮颜色|
|<span id="dialog-btn-bgc" class="css-var-name">$dialog-btn-bgc</span>|<div><RouterLink to="/guide/design-tokens.html#color-white" v-slot="{href}"> <a :href="href">$var(color-white)</a> </RouterLink></div>|按钮背景色|
|<span id="dialog-btn-active-bgc" class="css-var-name">$dialog-btn-active-bgc</span>|<div><RouterLink to="/guide/design-tokens.html#color-light-grey-opacity" v-slot="{href}"> <a :href="href">$var(color-light-grey-opacity)</a> </RouterLink></div>|按钮激活态背景色|
|<span id="dialog-btn-highlight-color" class="css-var-name">$dialog-btn-highlight-color</span>|<div><RouterLink to="/guide/design-tokens.html#color-primary" v-slot="{href}"> <a :href="href">$var(color-primary)</a> </RouterLink></div>|按钮高亮颜色|
|<span id="dialog-btn-highlight-active-bgc" class="css-var-name">$dialog-btn-highlight-active-bgc</span>|<div><a class="css-var-default" href="#dialog-btn-secondary-highlight-active-bgc">$var(dialog-btn-secondary-highlight-active-bgc)</a></div>|按钮高亮激活态背景色|
|<span id="dialog-btn-disabled-color" class="css-var-name">$dialog-btn-disabled-color</span>|<div><RouterLink to="/guide/design-tokens.html#color-disabled" v-slot="{href}"> <a :href="href">$var(color-disabled)</a> </RouterLink></div>|按钮禁用态颜色|
|<span id="dialog-btn-disabled-active-bgc" class="css-var-name">$dialog-btn-disabled-active-bgc</span>|<div>transparent</div>|按钮禁用态背景色|
|<span id="dialog-btns-split-color" class="css-var-name">$dialog-btns-split-color</span>|<div><RouterLink to="/guide/design-tokens.html#border-color-normal" v-slot="{href}"> <a :href="href">$var(border-color-normal)</a> </RouterLink></div>|按钮分割线颜色|
|<span id="dialog-btn-line-height" class="css-var-name">$dialog-btn-line-height</span>|<div>21px</div>|按钮行高|
|<span id="dialog-close-width" class="css-var-name">$dialog-close-width</span>|<div>32px</div>|关闭按钮宽度|
|<span id="dialog-close-height" class="css-var-name">$dialog-close-height</span>|<div>32px</div>|关闭按钮高度|
|<span id="dialog-close-color" class="css-var-name">$dialog-close-color</span>|<div><RouterLink to="/guide/design-tokens.html#text-color" v-slot="{href}"> <a :href="href">$var(text-color)</a> </RouterLink></div>|关闭按钮颜色|
|<span id="dialog-head-icon-width" class="css-var-name">$dialog-head-icon-width</span>|<div>85px</div>|head-icon 宽度|
|<span id="dialog-head-icon-height" class="css-var-name">$dialog-head-icon-height</span>|<div><a class="css-var-default" href="#dialog-head-icon-width">$dialog-head-icon-width</a></div>|head-icon 高度|
|<span id="dialog-head-icon-border-top-left-radius" class="css-var-name">$dialog-head-icon-border-top-left-radius</span>|<div>50%</div>|-|
|<span id="dialog-head-icon-border-top-right-radius" class="css-var-name">$dialog-head-icon-border-top-right-radius</span>|<div>50%</div>|-|
|<span id="dialog-head-icon-border-bottom-left-radius" class="css-var-name">$dialog-head-icon-border-bottom-left-radius</span>|<div>50%</div>|-|
|<span id="dialog-head-icon-border-bottom-right-radius" class="css-var-name">$dialog-head-icon-border-bottom-right-radius</span>|<div>50%</div>|-|
|<span id="dialog-head-icon-border-radius" class="css-var-name">$dialog-head-icon-border-radius</span>|<div><a class="css-var-default" href="#dialog-head-icon-border-top-left-radius">$dialog-head-icon-border-top-left-radius</a> <a class="css-var-default" href="#dialog-head-icon-border-top-right-radius">$dialog-head-icon-border-top-right-radius</a> <a class="css-var-default" href="#dialog-head-icon-border-bottom-left-radius">$dialog-head-icon-border-bottom-left-radius</a> <a class="css-var-default" href="#dialog-head-icon-border-bottom-right-radius">$dialog-head-icon-border-bottom-right-radius</a></div>|head-icon 圆角|
|<span id="dialog-head-icon-margin-top" class="css-var-name">$dialog-head-icon-margin-top</span>|<div>-42.5px</div>|head-icon 上边距|
|<span id="dialog-zoom-animation-name" class="css-var-name">$dialog-zoom-animation-name</span>|<div>dialog-zoom</div>|-|
|<span id="dialog-zoom-animation-duration" class="css-var-name">$dialog-zoom-animation-duration</span>|<div>.3s</div>|-|
|<span id="dialog-zoom-animation-fn" class="css-var-name">$dialog-zoom-animation-fn</span>|<div>ease-in-out</div>|-|
|<span id="dialog-zoom-transform-from" class="css-var-name">$dialog-zoom-transform-from</span>|<div>scale(0)</div>|-|
|<span id="dialog-zoom-opacity-from" class="css-var-name">$dialog-zoom-opacity-from</span>|<div>1</div>|-|
|<span id="dialog-zoom-transform-mid" class="css-var-name">$dialog-zoom-transform-mid</span>|<div>scale(1.1)</div>|-|
|<span id="dialog-zoom-opacity-mid" class="css-var-name">$dialog-zoom-opacity-mid</span>|<div>1</div>|-|
|<span id="dialog-zoom-transform-to" class="css-var-name">$dialog-zoom-transform-to</span>|<div>scale(1)</div>|-|
|<span id="dialog-zoom-opacity-to" class="css-var-name">$dialog-zoom-opacity-to</span>|<div>1</div>|-|
|<span id="dialog-zoom-hide-opacity-from" class="css-var-name">$dialog-zoom-hide-opacity-from</span>|<div>1</div>|-|
|<span id="dialog-zoom-hide-opacity-to" class="css-var-name">$dialog-zoom-hide-opacity-to</span>|<div>0</div>|-|
|<span id="dialog-hide-animation-name" class="css-var-name">$dialog-hide-animation-name</span>|<div>dialog-hide-animation</div>|-|
|<span id="dialog-hide-animation-duration" class="css-var-name">$dialog-hide-animation-duration</span>|<div>.3s</div>|-|
|<span id="dialog-hide-animation-fn" class="css-var-name">$dialog-hide-animation-fn</span>|<div>cubic-bezier(0, 0, 0.07, 1.00)</div>|-|
|<span id="dialog-hide-animation-mode" class="css-var-name">$dialog-hide-animation-mode</span>|<div>forwards</div>|-|
  
</card> 
 

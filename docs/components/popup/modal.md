## Cube-Modal 半浮层弹窗

<card>

### 介绍

在弹出层中展示的模态对话框，引导用户进行相关操作。

</card>


## 示例

<card>

### 基础用法

通过调用组件的 `show`、`hide` 方法来控制组件的显示与隐藏。


<collapse-wrapper>

```vue
<template>
  <cube-modal
    wx:ref="modal"
    type="confirm"
    title="我是标题~"
    content="我是正文正文"
    confirm-btn="一个按钮"
    mask-closable="{{ true }}"
    bind:maskClick="onMaskClick"
    bind:confirm="onConfirm"
    bind:cancel="onCancel"
  />
  <cube-button  bind:click="onTap">modal-one-button</cube-button>
</template>

<script>
  import { createComponent } from '@mpxjs/core'

  createComponent({
    methods: {
      onTap() {
        this.$refs.modal.show()
      },
      onConfirm() {
        console.log('click the onConfirm btn')
      },
      onCancel() {
        console.log('click the onCancel btn')
      },
      onMaskClick() {
        console.log('click mask')
      }
    }
  })
</script>
```

</collapse-wrapper>


</card>

<card>

### 按钮排列方式

设置属性 `direction` 来控制底部按钮排列布局方式，目前提供了水平/垂直两种不同的排列。


<collapse-wrapper>

```vue
<template>
  <cube-modal
    wx:ref="modal"
    title="我是标题~"
    content="我是正文我是正文我是正文我是正文我是正文我是正文"
    direction="horizontal"
    confirm-btn="确认按钮"
    cancel-btn="取消按钮"
    mask-closable="{{ true }}"
    bind:confirm="onConfirm"
    bind:cancel="onCancel"
  />
  <cube-button  bind:click="onTap">modal-水平两个按钮</cube-button>
</template>
```

</collapse-wrapper>


</card>





<card>

### Slot的使用

Modal 组件按结构进行拆分，分别提供了包括 顶部、标题、内容、尾部、Icon 等插槽用以自定义组件的样式内容。


<collapse-wrapper>

```vue
<template>
  <view class="modal-header-slot-demo">
    <cube-modal
      wx:ref="modal"
      content="我是正文正文"
      direction="horizontal"
      confirm-btn="确认继续接单"
      cancel-btn="取消"
      mask-closable="{{ true }}"
      bind:confirm="onConfirm"
      bind:cancel="onCancel"
    >
      <view slot="header">
        <image class="slot-header" src="https://ut-static.udache.com/webx/mpx-cube-ui/tKQimxwHlkY8nSSqpmGE9_111.jpg"></image>
      </view>
    </cube-modal>
    <cube-button  bind:click="onTap">modal-header-slot</cube-button>
  </view>
</template>

<script>
  import { createComponent } from '@mpxjs/core'

  createComponent({
    methods: {
      onTap() {
        this.$refs.modal.show()
      },
      onConfirm() {
        console.log('click the confirm btn')
      },
      onCancel() {
        console.log('click the cancel btn')
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
|maskClosable|是否点击蒙层隐藏|`Boolean`|-|false|
|title|标题|`String`|-|-|
|cancelText|顶部取消按钮文案配置|`String`|-|-|
|cancelBtnAlign|顶部取消按钮对齐方式|`String`|left/right|left|
|showCloseIcon|是否展示关闭按钮X|`Boolean`|-|false|
|hideOnCancel|触发 cancel 事件时是否需要主动关闭弹窗|`Boolean`|-|true|
|hideOnClose|触发 close 事件时是否需要主动关闭弹窗|`Boolean`|-|true|
|type|按钮类型|`String`|optional/confirm|optional|
|direction|按钮方向|`String`|vertical/horizontal|vertical|
|confirmBtn|确定按钮|`Object`|vertical/horizontal|BtnOptions|
|cancelBtn|取消按钮|`Object`|-|BtnOptions|
|content|内容文本|`String`|-|-|
|layout|icon 与 title、content的排列方向|`String`|vertical/horizontal|ModalDirection.VERTICAL|
|noBuiltInBtns|是否不使用内置的底部按钮|`Boolean`|-|false|
|styleConfig|通过 wx:style透传样式, 里面的每项分别修改对应位置的样式|`Object`|styleConfig = { header: '', body: '', footer: '', section: '' }|{}|
|popupStyleConfig|通过 wx:style 透传样式给popup, 里面的每项分别修改对应位置的样式|`Object`|styleConfig = { content: '' }|{}|
|callbackHideModal|是否自动关闭弹窗|`Boolean`|-|true|
|hideOnConfirm|点击确定是否自动关闭弹窗|`Boolean`|-|true|
|removeCatchTouch||`Boolean`|-|false|

<!-- @vuese:[name]:props:end -->


  
</card> 
 
<card> 
 
 ### TsType

<!-- @vuese:[name]:tsType:start -->
|Name|Type|
|---|---|
|BtnOptions|<pre v-pre class="language-typescript inside-td"><code>{<br>  <span class="hljs-attr">disabled?</span>: <span class="hljs-built_in">boolean</span>;<br>  <span class="hljs-attr">text</span>: <span class="hljs-built_in">string</span>;<br>}&amp;<span class="hljs-title class_">Partial</span>&lt;{<br>  <span class="hljs-attr">appParameter</span>: <span class="hljs-built_in">string</span>;<br>  <span class="hljs-attr">formType</span>: <span class="hljs-built_in">string</span>;<br>  <span class="hljs-attr">lang</span>: <span class="hljs-built_in">string</span>;<br>  <span class="hljs-attr">openType</span>: <span class="hljs-built_in">string</span>;<br>  <span class="hljs-attr">scope</span>: <span class="hljs-built_in">string</span>;<br>  <span class="hljs-attr">sendMessageImg</span>: <span class="hljs-built_in">string</span>;<br>  <span class="hljs-attr">sendMessagePath</span>: <span class="hljs-built_in">string</span>;<br>  <span class="hljs-attr">sendMessageTitle</span>: <span class="hljs-built_in">string</span>;<br>  <span class="hljs-attr">sessionFrom</span>: <span class="hljs-built_in">string</span>;<br>  <span class="hljs-attr">showMessageCard</span>: <span class="hljs-built_in">boolean</span>;<br>}&gt;</code></pre>|

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
|confirm|点击底部确定按钮触发事件|-|
|cancel|点击顶部/底部取消按钮触发事件|-|
|close|点击顶部关闭icon或遮盖层触发事件|-|

<!-- @vuese:[name]:events:end -->


  
</card> 
 
<card> 
 
 ### Slots

<!-- @vuese:[name]:slots:start -->
|插槽名|说明|
|---|---|
|closeIcon|-|
|header|顶部位置插槽|
|icon|图标位置插槽|
|title|标题位置插槽|
|content|内容位置插槽|
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
 
<card> 
 
 ### CSS Variable
|变量名|默认值|含义|
|---|---|---|
|<span id="modal-border-top-left-radius" class="css-var-name">$modal-border-top-left-radius</span>|<div>7px</div>|-|
|<span id="modal-border-top-right-radius" class="css-var-name">$modal-border-top-right-radius</span>|<div>7px</div>|-|
|<span id="modal-border-bottom-right-radius" class="css-var-name">$modal-border-bottom-right-radius</span>|<div>0</div>|-|
|<span id="modal-border-bottom-left-radius" class="css-var-name">$modal-border-bottom-left-radius</span>|<div>0</div>|-|
|<span id="modal-border-radius" class="css-var-name">$modal-border-radius</span>|<div><a class="css-var-default" href="#modal-border-top-left-radius">$modal-border-top-left-radius</a> <a class="css-var-default" href="#modal-border-top-right-radius">$modal-border-top-right-radius</a> <a class="css-var-default" href="#modal-border-bottom-right-radius">$modal-border-bottom-right-radius</a> <a class="css-var-default" href="#modal-border-bottom-left-radius">$modal-border-bottom-left-radius</a></div>|边框圆角|
|<span id="modal-bgc" class="css-var-name">$modal-bgc</span>|<div><RouterLink to="/guide/design-tokens.html#color-white" v-slot="{href}"> <a :href="href">$var(color-white)</a> </RouterLink></div>|背景色|
|<span id="modal-cancel-margin" class="css-var-name">$modal-cancel-margin</span>|<div>35px</div>|取消按钮外边距|
|<span id="modal-cancel-height" class="css-var-name">$modal-cancel-height</span>|<div>55px</div>|取消按钮高度|
|<span id="modal-cancel-line-height" class="css-var-name">$modal-cancel-line-height</span>|<div>55px</div>|取消按钮行高|
|<span id="modal-cancel-padding-top" class="css-var-name">$modal-cancel-padding-top</span>|<div>0</div>|-|
|<span id="modal-cancel-padding-right" class="css-var-name">$modal-cancel-padding-right</span>|<div>25px</div>|-|
|<span id="modal-cancel-padding-bottom" class="css-var-name">$modal-cancel-padding-bottom</span>|<div>0</div>|-|
|<span id="modal-cancel-padding-left" class="css-var-name">$modal-cancel-padding-left</span>|<div>25px</div>|-|
|<span id="modal-cancel-padding" class="css-var-name">$modal-cancel-padding</span>|<div><a class="css-var-default" href="#modal-cancel-padding-top">$modal-cancel-padding-top</a> <a class="css-var-default" href="#modal-cancel-padding-right">$modal-cancel-padding-right</a> <a class="css-var-default" href="#modal-cancel-padding-bottom">$modal-cancel-padding-bottom</a> <a class="css-var-default" href="#modal-cancel-padding-left">$modal-cancel-padding-left</a></div>|取消按钮内边距|
|<span id="modal-cancel-font-size" class="css-var-name">$modal-cancel-font-size</span>|<div><RouterLink to="/guide/design-tokens.html#font-size-md" v-slot="{href}"> <a :href="href">$var(font-size-md)</a> </RouterLink></div>|取消按钮字号|
|<span id="modal-cancel-font-weight" class="css-var-name">$modal-cancel-font-weight</span>|<div>500</div>|取消按钮字重|
|<span id="modal-cancel-color" class="css-var-name">$modal-cancel-color</span>|<div><RouterLink to="/guide/design-tokens.html#color-black" v-slot="{href}"> <a :href="href">$var(color-black)</a> </RouterLink></div>|取消按钮颜色|
|<span id="modal-cancel-border-bottom-color" class="css-var-name">$modal-cancel-border-bottom-color</span>|<div><RouterLink to="/guide/design-tokens.html#border-color-normal" v-slot="{href}"> <a :href="href">$var(border-color-normal)</a> </RouterLink></div>|底部边框颜色|
|<span id="modal-body-padding-top" class="css-var-name">$modal-body-padding-top</span>|<div>0</div>|上内边距|
|<span id="modal-body-padding-right" class="css-var-name">$modal-body-padding-right</span>|<div>25px</div>|右内边距|
|<span id="modal-body-padding-bottom" class="css-var-name">$modal-body-padding-bottom</span>|<div>0</div>|底部边距|
|<span id="modal-body-padding-left" class="css-var-name">$modal-body-padding-left</span>|<div>25px</div>|左内边距|
|<span id="modal-header-default-height" class="css-var-name">$modal-header-default-height</span>|<div>35px</div>|header区域高度|
|<span id="modal-title-font-size" class="css-var-name">$modal-title-font-size</span>|<div><RouterLink to="/guide/design-tokens.html#font-size-3xl" v-slot="{href}"> <a :href="href">$var(font-size-3xl)</a> </RouterLink></div>|标题字号|
|<span id="modal-title-line-height" class="css-var-name">$modal-title-line-height</span>|<div>133%</div>|-|
|<span id="modal-title-color" class="css-var-name">$modal-title-color</span>|<div><RouterLink to="/guide/design-tokens.html#color-black" v-slot="{href}"> <a :href="href">$var(color-black)</a> </RouterLink></div>|标题颜色|
|<span id="modal-title-margin-bottom" class="css-var-name">$modal-title-margin-bottom</span>|<div>12px</div>|标题下边距|
|<span id="modal-title-default-font-weight" class="css-var-name">$modal-title-default-font-weight</span>|<div>500</div>|标题字重|
|<span id="modal-close-icon-top" class="css-var-name">$modal-close-icon-top</span>|<div>5px</div>|关闭icon距离顶部距离|
|<span id="modal-close-icon-right" class="css-var-name">$modal-close-icon-right</span>|<div>5px</div>|关闭icon距离右部距离|
|<span id="modal-close-icon-padding-top" class="css-var-name">$modal-close-icon-padding-top</span>|<div>5px</div>|-|
|<span id="modal-close-icon-padding-right" class="css-var-name">$modal-close-icon-padding-right</span>|<div>5px</div>|-|
|<span id="modal-close-icon-padding-bottom" class="css-var-name">$modal-close-icon-padding-bottom</span>|<div>5px</div>|-|
|<span id="modal-close-icon-padding-left" class="css-var-name">$modal-close-icon-padding-left</span>|<div>5px</div>|-|
|<span id="modal-close-icon-padding" class="css-var-name">$modal-close-icon-padding</span>|<div><a class="css-var-default" href="#modal-close-icon-padding-top">$modal-close-icon-padding-top</a> <a class="css-var-default" href="#modal-close-icon-padding-right">$modal-close-icon-padding-right</a> <a class="css-var-default" href="#modal-close-icon-padding-bottom">$modal-close-icon-padding-bottom</a> <a class="css-var-default" href="#modal-close-icon-padding-left">$modal-close-icon-padding-left</a></div>|关闭icon内边距|
|<span id="modal-close-icon-font-size" class="css-var-name">$modal-close-icon-font-size</span>|<div><RouterLink to="/guide/design-tokens.html#font-size-xl" v-slot="{href}"> <a :href="href">$var(font-size-xl)</a> </RouterLink></div>|关闭icon字号|
|<span id="modal-close-icon-color" class="css-var-name">$modal-close-icon-color</span>|<div><RouterLink to="/guide/design-tokens.html#color-black" v-slot="{href}"> <a :href="href">$var(color-black)</a> </RouterLink></div>|关闭icon颜色|
|<span id="modal-close-icon-font-weight" class="css-var-name">$modal-close-icon-font-weight</span>|<div>700</div>|关闭icon字重|
|<span id="modal-content-line-height" class="css-var-name">$modal-content-line-height</span>|<div>120%</div>|-|
|<span id="modal-content-font-size" class="css-var-name">$modal-content-font-size</span>|<div><RouterLink to="/guide/design-tokens.html#font-size-xl" v-slot="{href}"> <a :href="href">$var(font-size-xl)</a> </RouterLink></div>|内容区字号|
|<span id="modal-content-color" class="css-var-name">$modal-content-color</span>|<div><RouterLink to="/guide/design-tokens.html#text-color" v-slot="{href}"> <a :href="href">$var(text-color)</a> </RouterLink></div>|内容区颜色|
|<span id="modal-button-group-margin-top" class="css-var-name">$modal-button-group-margin-top</span>|<div>35px</div>|按钮顶部外边距|
|<span id="modal-button-font-size" class="css-var-name">$modal-button-font-size</span>|<div><RouterLink to="/guide/design-tokens.html#font-size-lg" v-slot="{href}"> <a :href="href">$var(font-size-lg)</a> </RouterLink></div>|按钮字号|
|<span id="modal-button-group-height" class="css-var-name">$modal-button-group-height</span>|<div>50px</div>|按钮组高度|
|<span id="modal-button-line-height" class="css-var-name">$modal-button-line-height</span>|<div>24px</div>|按钮行高|
|<span id="modal-button-padding-top" class="css-var-name">$modal-button-padding-top</span>|<div>13px</div>|按钮顶部内边距|
|<span id="modal-button-padding-bottom" class="css-var-name">$modal-button-padding-bottom</span>|<div>13px</div>|按钮底部内边距|
|<span id="modal-button-height" class="css-var-name">$modal-button-height</span>|<div><a class="css-var-default" href="#modal-button-line-height">$modal-button-line-height</a> + <a class="css-var-default" href="#modal-button-padding-top">$modal-button-padding-top</a> + <a class="css-var-default" href="#modal-button-padding-bottom">$modal-button-padding-bottom</a></div>|-|
|<span id="modal-footer-padding-top" class="css-var-name">$modal-footer-padding-top</span>|<div>0</div>|-|
|<span id="modal-footer-padding-right" class="css-var-name">$modal-footer-padding-right</span>|<div>25px</div>|-|
|<span id="modal-footer-padding-bottom" class="css-var-name">$modal-footer-padding-bottom</span>|<div>20px</div>|-|
|<span id="modal-footer-padding-left" class="css-var-name">$modal-footer-padding-left</span>|<div>25px</div>|-|
|<span id="modal-footer-padding" class="css-var-name">$modal-footer-padding</span>|<div><a class="css-var-default" href="#modal-footer-padding-top">$modal-footer-padding-top</a> <a class="css-var-default" href="#modal-footer-padding-right">$modal-footer-padding-right</a> <a class="css-var-default" href="#modal-footer-padding-bottom">$modal-footer-padding-bottom</a> <a class="css-var-default" href="#modal-footer-padding-left">$modal-footer-padding-left</a></div>|footer区域内边距|
|<span id="modal-footer-safe-padding" class="css-var-name">$modal-footer-safe-padding</span>|<div>25px</div>|footer区域安全内边距|
  
</card> 
 

## Cube-Radio-Modal

<card>

### 介绍

由 `Radio` 和 `Modal` 组件复合组成的组件。

内置单选组的半浮层模态框。

</card>

## 示例

<card>

### 基础用法

渲染一个单选弹窗。


<collapse-wrapper>

```vue
<template>
  <view class="radio-modal-default-demo">
    <cube-radio-modal
      wx:ref="radioModal"
      title="请选择支付方式"
      subtitle="将按已选择的支付方式优先支付，若不支持该支付方式的⻋型则默认为上次所选支付方式"
      show-close-icon="{{ true }}"
      options="{{ options }}"
      value="{{ checkedValue }}"
      bind:close="onClose"
      bind:confirm="onConfirm"
    />
    <cube-button bind:click="onTap">radio-modal-default</cube-button>
  </view>
</template>

<script>
  import { createComponent } from '@mpxjs/core'

  createComponent({
    data: {
      options: [
        {
          value: '1',
          text: '企业支付',
        },
        {
          value: '2',
          text: '亲友代付'
        },
        {
          value: '3',
          text: '个人支付'
        }
      ],
      checkedValue: '2'
    },
    methods: {
      onTap() {
        this.$refs.radioModal.show()
      },
      onConfirm(args) {
        console.log('当前选择的值是', args.detail)
      },
      onClose() {
        console.log('当前已取消选择')
      }
    }
  })
</script>
```

</collapse-wrapper>


</card>

<card>

### 自定义option

每一个单选项都可以进行单独配置，具体的配置内容见下文`ExtendOption`。我们可以通过`position`改变单选框的位置，通过`desc`配置每一项的描述。如果想将某一项单独设置为禁用状态，可以将`disabled`设置为`true`。

```vue
<script>
createComponent({
  data: {
    options: [
      {
        value: '1',
        position: 'right',
        disabled: true,
        text: '企业支付',
        desc: ''
      },
      {
        value: '2',
        text: '亲友代付',
        position: 'right',
        desc: '仅支持滴滴快车/优享/舒适型/豪华车型'
      },
      {
        value: '3',
        text: '个人支付',
        position: 'right',
        desc: '仅支持滴滴快车/优享/舒适型/豪华车型仅支持滴滴快车/优享/舒适型/豪华车型'
      }
    ]
  }
})
</script>
```

</card>

<card>

### 自定义关闭按钮

你可以通过设置`cancelText`来显示关闭文案，同时将`cancelBtnAlign`设置为`right`。


<collapse-wrapper>

```vue
<view class="radio-modal-cancel-btn-demo">
  <cube-radio-modal
    wx:ref="radioModal"
    title="关闭按钮配置"
    subtitle='你可以通过设置"cancelText"来显示关闭文案，同时将"cancelBtnAlign"设置为"right"'
    cancelText="关闭"
    cancelBtnAlign="right"
    options="{{ options }}"
    value="{{ checkedValue }}"
  />
  <cube-button bind:click="onTap">radio-modal-cancel-btn</cube-button>
</view>
```

</collapse-wrapper>


</card>

<card>

### 自定义插槽

你可以通过`title`插槽与`subtitle`插槽，自定义标题与副标题内容。


<collapse-wrapper>

```vue
<view class="radio-modal-slots-demo">
  <cube-radio-modal
    wx:ref="radioModal"
    show-close-icon="{{ true }}"
    options="{{ options }}"
    value="{{ checkedValue }}"
  >
    <view class="modal-title" slot="title">标题slot</view>
    <view class="modal-subtitle" slot="subtitle">副标题slot</view>
  </cube-radio-modal>
  <cube-button bind:click="onTap">radio-modal-slots</cube-button>
</view>
```

</collapse-wrapper>


<collapse-wrapper>

```vue
<style lang="stylus">
.modal-title
  font-size 20px
  font-weight bold
  margin-bottom 10px
.modal-subtitle
  margin-bottom 10px
</style>
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
|hideOnConfirm|触发 confirm 事件时是否需要主动关闭弹窗|`Boolean`|-|true|
|hideOnCancel|触发 cancel 事件时是否需要主动关闭弹窗|`Boolean`|-|true|
|hideOnClose|触发 close 事件时是否需要主动关闭弹窗|`Boolean`|-|true|
|subtitle|副标题|`String`|-|-|
|options|选项数据|`Array`|-|ExtendOption[]|
|value|选中值|`String`||-|

<!-- @vuese:[name]:props:end -->


  
</card> 
 
<card> 
 
 ### TsType

<!-- @vuese:[name]:tsType:start -->
|Name|Type|
|---|---|
|ExtendOption|<pre v-pre class="language-typescript inside-td"><code>{<br>  <span class="hljs-attr">desc?</span>: <span class="hljs-built_in">string</span>;<br>  <span class="hljs-attr">text</span>: <span class="hljs-built_in">string</span>;<br>}&amp;{<br>  <span class="hljs-attr">desc?</span>: <span class="hljs-built_in">string</span>;<br>  <span class="hljs-attr">disabled?</span>: <span class="hljs-built_in">boolean</span>;<br>  <span class="hljs-attr">position?</span>: <span class="hljs-built_in">left</span>\|<span class="hljs-built_in">right</span>;<br>  <span class="hljs-attr">text?</span>: <span class="hljs-built_in">string</span>;<br>  <span class="hljs-attr">value</span>: <span class="hljs-built_in">string</span>\|<span class="hljs-built_in">number</span>;<br>}</code></pre>|

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
|confirm|在选项值发生改变时触发|当前选项值|
|close|点击顶部关闭icon或遮盖层触发事件|-|
|cancel|点击顶部取消按钮触发事件|-|

<!-- @vuese:[name]:events:end -->


  
</card> 
 
<card> 
 
 ### Slots

<!-- @vuese:[name]:slots:start -->
|插槽名|说明|
|---|---|
|title|主标题|
|subtitle|副标题，可自定义说明描述等|

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
|<span id="radio-modal-subtitle-margin-bottom" class="css-var-name">$radio-modal-subtitle-margin-bottom</span>|<div>15px</div>|副标题下边距|
|<span id="radio-modal-subtitle-padding-right" class="css-var-name">$radio-modal-subtitle-padding-right</span>|<div><span>$var(modal-body-padding-right)</span></div>|副标题内右边距|
|<span id="radio-modal-subtitle-line-height" class="css-var-name">$radio-modal-subtitle-line-height</span>|<div>1.4</div>|副标题行高|
|<span id="radio-modal-subtitle-font-size" class="css-var-name">$radio-modal-subtitle-font-size</span>|<div><RouterLink to="/guide/design-tokens.html#font-size-sm" v-slot="{href}"> <a :href="href">$var(font-size-sm)</a> </RouterLink></div>|副标题字体大小|
|<span id="radio-modal-subtitle-color" class="css-var-name">$radio-modal-subtitle-color</span>|<div><RouterLink to="/guide/design-tokens.html#text-color-desc" v-slot="{href}"> <a :href="href">$var(text-color-desc)</a> </RouterLink></div>|副标题颜色|
|<span id="radio-modal-content-max-height" class="css-var-name">$radio-modal-content-max-height</span>|<div>214px</div>|内容区最大高度|
|<span id="radio-modal-item-height" class="css-var-name">$radio-modal-item-height</span>|<div>70px</div>|选项高度|
|<span id="radio-modal-item-padding-right" class="css-var-name">$radio-modal-item-padding-right</span>|<div><span>$var(modal-body-padding-right)</span></div>|选项内右边距|
|<span id="radio-modal-content-item-color_disabled" class="css-var-name">$radio-modal-content-item-color_disabled</span>|<div><RouterLink to="/guide/design-tokens.html#color-disabled" v-slot="{href}"> <a :href="href">$var(color-disabled)</a> </RouterLink></div>|选项禁用态颜色|
|<span id="radio-modal-item-bottom-border-color" class="css-var-name">$radio-modal-item-bottom-border-color</span>|<div><RouterLink to="/guide/design-tokens.html#border-color-normal" v-slot="{href}"> <a :href="href">$var(border-color-normal)</a> </RouterLink></div>|选项下边框颜色|
  
</card> 
 

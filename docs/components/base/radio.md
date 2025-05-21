## Cube-Radio

<card>

### 介绍

基本组件-单选框，用于设置单个选项的值。

</card>

## 示例

<card>

### 正常选项

`option`下的`value`属性表示选中后的值，通过 `wx:model`双向绑定该值。

在该示例中，两个单选框绑定了同一个响应式变量，在点击第一个单选框时，就会变为`Option1`，所以第一个单选框激活。


<collapse-wrapper>

```vue
<template>
  <view class="radio-demo">
    <view-desc>正常选项: {{ radioValue }}</view-desc>
    <view class="cube-radio-demos">
      <cube-radio  option="{{ radio1 }}" wx:model="{{ radioValue }}" wx:model-prop="value">Option1</cube-radio>
      <cube-radio  option="{{ radio2 }}" wx:model="{{ radioValue }}" wx:model-prop="value">Option2</cube-radio>
    </view>
  </view>
</template>
```

</collapse-wrapper>



<collapse-wrapper>

```vue
<script>
import { createComponent } from '@mpxjs/core'

createComponent({
  options: {
    styleIsolation: 'shared'
  },
  data: {
    radio1: {
      value: 'Option1'
    },
    radio2: {
      value: 'Option2'
    },
    radioValue: ''
  }
})
</script>
```

</collapse-wrapper>


</card>

<card>

### 禁用选项

通过 `disabled` 属性控制。

<collapse-wrapper>

```vue
<template>
  <view class="radio-disabled-demo">
    <view-desc>禁用选项: {{ radioValue }}</view-desc>
    <view class="cube-radio-demos">
      <cube-radio

        option="{{ radio }}"
        wx:model="{{ radioValue }}"
        wx:model-prop="value"
      >disabledOption</cube-radio>
    </view>
  </view>
</template>
```

</collapse-wrapper>



<collapse-wrapper>

```vue
<script>
import { createComponent } from '@mpxjs/core'

createComponent({
  options: {
    styleIsolation: 'shared'
  },
  data: {
    radio: {
      value: 'disabledOption',
      disabled: true
    },
    radioValue: ''
  }
})
</script>
```

</collapse-wrapper>


</card>

<card>

### 图标位置

通过`option`下的`position`属性控制图标展示方位，`right`表示图标展示在右侧。

<collapse-wrapper>

```vue
<template>
  <view class="radio-ui-right-demo">
    <view-desc>图标展示在右侧: {{ radioValue }}</view-desc>
    <view class="cube-radio-demos">
      <cube-radio  option="{{ radio1 }}" wx:model="{{ radioValue }}" wx:model-prop="value"></cube-radio>
      <cube-radio  option="{{ radio2 }}" wx:model="{{ radioValue }}" wx:model-prop="value"></cube-radio>
    </view>
  </view>
</template>
```

</collapse-wrapper>



<collapse-wrapper>

```vue
<script>
import { createComponent } from '@mpxjs/core'

createComponent({
  options: {
    styleIsolation: 'shared'
  },
  data: {
    radio1: {
      text: 'Option1',
      value: 'Option1',
      position: 'right'
    },
    radio2: {
      text: 'Option2',
      value: 'Option2',
      position: 'right'
    },
    radioValue: ''
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
|option|配置项|`Object`|Option|Option|
|value|双向绑定属性值|`String`|String/Number|-|

<!-- @vuese:[name]:props:end -->


  
</card> 
 
<card> 
 
 ### TsType

<!-- @vuese:[name]:tsType:start -->
|Name|Type|
|---|---|
|Option|<pre v-pre class="language-typescript inside-td"><code>{<br>  <span class="hljs-attr">desc?</span>: <span class="hljs-built_in">string</span>;<br>  <span class="hljs-attr">disabled?</span>: <span class="hljs-built_in">boolean</span>;<br>  <span class="hljs-attr">position?</span>: <span class="hljs-built_in">left</span>\|<span class="hljs-built_in">right</span>;<br>  <span class="hljs-attr">text?</span>: <span class="hljs-built_in">string</span>;<br>  <span class="hljs-attr">value</span>: <span class="hljs-built_in">string</span>\|<span class="hljs-built_in">number</span>;<br>}</code></pre>|

<!-- @vuese:[name]:tsType:end -->


  
</card> 
 
<card> 
 
 ### Events

<!-- @vuese:[name]:events:start -->
|事件名|说明|参数|
|---|---|---|
|input|绑定值变化时触发|事件对象 e，包含选中的单选框 value 值|

<!-- @vuese:[name]:events:end -->


  
</card> 
 
<card> 
 
 ### Slots

<!-- @vuese:[name]:slots:start -->
|插槽名|说明|
|---|---|
|— (默认插槽)|自定义文本插槽内容|

<!-- @vuese:[name]:slots:end -->


  
</card> 
 
 
 
<card> 
 
 ### CSS Variable
|变量名|默认值|含义|
|---|---|---|
|<span id="radio-color" class="css-var-name">$radio-color</span>|<div>#c8c9cc</div>|单选框主色|
|<span id="radio-inner-ui-bgc" class="css-var-name">$radio-inner-ui-bgc</span>|<div><RouterLink to="/guide/design-tokens.html#color-primary" v-slot="{href}"> <a :href="href">$var(color-primary)</a> </RouterLink></div>|内部主色|
|<span id="radio-ui-bgc" class="css-var-name">$radio-ui-bgc</span>|<div>#fff</div>|背景色|
|<span id="radio-ui-bgc_disabled" class="css-var-name">$radio-ui-bgc_disabled</span>|<div><RouterLink to="/guide/design-tokens.html#fill-bgc" v-slot="{href}"> <a :href="href">$var(fill-bgc)</a> </RouterLink></div>|禁用背景色|
|<span id="radio-ui-bgimg" class="css-var-name">$radio-ui-bgimg</span>|<div>none</div>|背景图|
|<span id="radio-ui-bgc-opacity" class="css-var-name">$radio-ui-bgc-opacity</span>|<div>.3</div>|背景色透明度|
|<span id="radio-ui-width" class="css-var-name">$radio-ui-width</span>|<div>18px</div>|宽度|
|<span id="radio-inner-ui-width" class="css-var-name">$radio-inner-ui-width</span>|<div>10px</div>|内部选中宽度|
|<span id="radio-inner-ui-scale-size" class="css-var-name">$radio-inner-ui-scale-size</span>|<div>1</div>|内部选中缩放比例|
|<span id="radio-ui-scale-size" class="css-var-name">$radio-ui-scale-size</span>|<div>1</div>|缩放比例|
|<span id="radio-ui-border" class="css-var-name">$radio-ui-border</span>|<div>1px solid <a class="css-var-default" href="#radio-color">$radio-color</a></div>|边框|
|<span id="radio-ui-border_disabled" class="css-var-name">$radio-ui-border_disabled</span>|<div>1px solid <RouterLink to="/guide/design-tokens.html#color-disabled" v-slot="{href}"> <a :href="href">$var(color-disabled)</a> </RouterLink></div>|禁用外边框|
|<span id="radio-ui-border_checked" class="css-var-name">$radio-ui-border_checked</span>|<div>1px solid <RouterLink to="/guide/design-tokens.html#color-primary" v-slot="{href}"> <a :href="href">$var(color-primary)</a> </RouterLink></div>|选中外边框|
|<span id="radio-ui-margin" class="css-var-name">$radio-ui-margin</span>|<div>0 0 0 10px</div>|外边距|
|<span id="radio-label-mr_left" class="css-var-name">$radio-label-mr_left</span>|<div>10px</div>|标签左边距|
|<span id="radio-label-mr_right" class="css-var-name">$radio-label-mr_right</span>|<div>28px</div>|标签右边距|
|<span id="radio-label-padding" class="css-var-name">$radio-label-padding</span>|<div>10px 0</div>|标签内边距|
|<span id="radio-inner-ui-tick" class="css-var-name">$radio-inner-ui-tick</span>|<div>tick-radio-passenger</div>|对勾图标|
|<span id="radio-ui_checked-transition" class="css-var-name">$radio-ui_checked-transition</span>|<div>none</div>|选中过渡|
|<span id="radio-ui-transform" class="css-var-name">$radio-ui-transform</span>|<div>none</div>|选中变换|
|<span id="radio-desc-margin-top" class="css-var-name">$radio-desc-margin-top</span>|<div>5px</div>|描述文案上边距|
|<span id="radio-text-desc-color_disabled" class="css-var-name">$radio-text-desc-color_disabled</span>|<div>unset</div>|描述文案禁用色值|
|<span id="radio-text-font-size" class="css-var-name">$radio-text-font-size</span>|<div>18px</div>|文案字号|
|<span id="radio-desc-font-size" class="css-var-name">$radio-desc-font-size</span>|<div>12px</div>|描述文案字号|
|<span id="radio-text-color" class="css-var-name">$radio-text-color</span>|<div><RouterLink to="/guide/design-tokens.html#text-color-desc" v-slot="{href}"> <a :href="href">$var(text-color-desc)</a> </RouterLink></div>|文案颜色|
|<span id="radio-desc-color" class="css-var-name">$radio-desc-color</span>|<div>#757575</div>|描述文案颜色|
|<span id="radio-text-line-height" class="css-var-name">$radio-text-line-height</span>|<div>1</div>|文案行高|
|<span id="radio-desc-line-height" class="css-var-name">$radio-desc-line-height</span>|<div>1.2</div>|描述文案行高|
  
</card> 
 

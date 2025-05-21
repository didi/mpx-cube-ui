## Cube-Checkbox

<card>

### 介绍

复选框，可设置其状态、传入特殊 class 以及复选框图标位置。

</card>

## 示例

<card>

### 基础用法

设置双向绑定的值为 `true`，此时复选框处于默认选中状态。


<collapse-wrapper>

```vue
<template>
  <view class="checkbox-demo">
    <view-desc>默认勾选：{{ checkboxValue }}</view-desc>
    <view class="cube-checkbox-example">
      <cube-checkbox  wx:model="{{ checkboxValue }}" wx:model-prop="value">Default Checked</cube-checkbox>
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
    checkboxValue: true
  }
})
</script>
```

</collapse-wrapper>


</card>

<card>

### 禁用选项

在 `option` 里配置 `disabled` 属性值为 `true`，当前选项将处于禁用状态。


<collapse-wrapper>

```vue
<template>
  <view class="checkbox-disabled-demo">
    <view-desc>禁用选项</view-desc>
    <view class="cube-checkbox-example">
      <cube-checkbox  option="{{ option }}" shape="square">Disabled</cube-checkbox>
    </view>

    <view-desc>禁用选项</view-desc>
    <view class="cube-checkbox-example">
      <cube-checkbox  option="{{ option }}">Disabled</cube-checkbox>
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
    option: {
      disabled: true
    }
  }
})
</script>
```

</collapse-wrapper>


</card>

<card>

### 支持描述文案

`option` 配置项除了可以设置 `text`，还可以设置 `desc` 作为描述文案显示在第二行。


<collapse-wrapper>

```vue
<template>
  <view class="checkbox-desc-support-demo">
    <view-desc>支持描述文案：{{ checkboxValue }}</view-desc>
    <view class="cube-checkbox-example">
      <cube-checkbox  option="{{ option }}" shape="square" wx:model="{{ checkboxValue }}" wx:model-prop="value">
      </cube-checkbox>
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
    option: {
      value: '橘子🍊',
      text: '选择一',
      desc: '橘子🍊',
      position: 'right'
    },
    checkboxValue: false
  }
})
</script>
```

</collapse-wrapper>


</card>

<card>

### 设置图标位置

在 `option` 里配置 `position` 属性值为 `right`，图标将会显示在右侧。


<collapse-wrapper>

```vue
<template>
  <view class="checkbox-styled-demo">
    <view-desc>圆形选项：{{ checkboxValue }}</view-desc>
    <view class="cube-checkbox-example">
      <cube-checkbox wx:model="{{ checkboxValue }}" wx:model-prop="value">Checkbox</cube-checkbox>
    </view>

    <view-desc>方形选择框：{{ checkboxValue }}</view-desc>
    <view class="cube-checkbox-example">
      <cube-checkbox
        option="{{ option }}"
        shape="square"
        wx:model="{{ checkboxValue }}"
        wx:model-prop="value"
      >Styled Checkbox</cube-checkbox>
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
    option: {
      position: 'right'
    },
    checkboxValue: false
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
|value|双向绑定是否选中|`Boolean`|true/false|false|
|shape|复选框形状|`String`|round/square|round|

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
|input|当绑定值变化时触发|事件对象 e，包含选中态 value，以及 option 里定义的 value|

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
|<span id="checkbox-checked-color" class="css-var-name">$checkbox-checked-color</span>|<div><RouterLink to="/guide/design-tokens.html#color-primary" v-slot="{href}"> <a :href="href">$var(color-primary)</a> </RouterLink></div>|复选框主色|
|<span id="checkbox-ui-round-width" class="css-var-name">$checkbox-ui-round-width</span>|<div>18px</div>|圆形复选框宽度|
|<span id="checkbox-ui-round-height" class="css-var-name">$checkbox-ui-round-height</span>|<div><a class="css-var-default" href="#checkbox-ui-round-width">$checkbox-ui-round-width</a></div>|圆形复选框高度|
|<span id="checkbox-ui-square-width" class="css-var-name">$checkbox-ui-square-width</span>|<div>18px</div>|方形复选框宽度|
|<span id="checkbox-ui-square-height" class="css-var-name">$checkbox-ui-square-height</span>|<div><a class="css-var-default" href="#checkbox-ui-square-width">$checkbox-ui-square-width</a></div>|方形复选框高度|
|<span id="checkbox-ui-width" class="css-var-name">$checkbox-ui-width</span>|<div><a class="css-var-default" href="#checkbox-ui-round-width">$checkbox-ui-round-width</a></div>|复选框宽度|
|<span id="checkbox-ui-height" class="css-var-name">$checkbox-ui-height</span>|<div><a class="css-var-default" href="#checkbox-ui-round-height">$checkbox-ui-round-height</a></div>|复选框高度|
|<span id="checkbox-inner-ui-width" class="css-var-name">$checkbox-inner-ui-width</span>|<div>7px</div>|复选框内部选中宽度|
|<span id="checkbox-inner-ui-height" class="css-var-name">$checkbox-inner-ui-height</span>|<div>4px</div>|复选框内部选中高度|
|<span id="checkbox-ui-round-border" class="css-var-name">$checkbox-ui-round-border</span>|<div>1px solid #C8C9CC</div>|圆形复选框边框|
|<span id="checkbox-ui-square-border" class="css-var-name">$checkbox-ui-square-border</span>|<div>1px solid #C8C9CC</div>|方形复选框边框|
|<span id="checkbox-ui-round-border_disabled" class="css-var-name">$checkbox-ui-round-border_disabled</span>|<div>2px solid <RouterLink to="/guide/design-tokens.html#color-disabled" v-slot="{href}"> <a :href="href">$var(color-disabled)</a> </RouterLink></div>|圆形复选框禁用边框|
|<span id="checkbox-ui-square-border_disabled" class="css-var-name">$checkbox-ui-square-border_disabled</span>|<div>1px solid <RouterLink to="/guide/design-tokens.html#color-disabled" v-slot="{href}"> <a :href="href">$var(color-disabled)</a> </RouterLink></div>|方形复选框禁用边框|
|<span id="checkbox-ui-round-border_checked" class="css-var-name">$checkbox-ui-round-border_checked</span>|<div>2px solid <RouterLink to="/guide/design-tokens.html#color-primary" v-slot="{href}"> <a :href="href">$var(color-primary)</a> </RouterLink></div>|圆形复选框选中边框|
|<span id="cube-checkbox-ui_checked" class="css-var-name">$cube-checkbox-ui_checked</span>|<div>2px solid <RouterLink to="/guide/design-tokens.html#color-primary" v-slot="{href}"> <a :href="href">$var(color-primary)</a> </RouterLink></div>|复选框选中边框|
|<span id="checkbox-ui-square-border_checked" class="css-var-name">$checkbox-ui-square-border_checked</span>|<div>none</div>|方形复选框选中边框|
|<span id="checkbox-inner-ui-border" class="css-var-name">$checkbox-inner-ui-border</span>|<div>2px solid <RouterLink to="/guide/design-tokens.html#color-primary" v-slot="{href}"> <a :href="href">$var(color-primary)</a> </RouterLink></div>|复选框内部选中边框|
|<span id="checkbox-ui-round-bgc" class="css-var-name">$checkbox-ui-round-bgc</span>|<div>#FAFAFA</div>|圆形复选框背景色|
|<span id="checkbox-ui-square-bgc" class="css-var-name">$checkbox-ui-square-bgc</span>|<div><RouterLink to="/guide/design-tokens.html#color-primary" v-slot="{href}"> <a :href="href">$var(color-primary)</a> </RouterLink></div>|方形复选框背景色|
|<span id="checkbox-ui-round-bgc_checked" class="css-var-name">$checkbox-ui-round-bgc_checked</span>|<div>#FFF8F4</div>|圆形复选框选中背景色|
|<span id="checkbox-ui-square-bgc_checked" class="css-var-name">$checkbox-ui-square-bgc_checked</span>|<div><RouterLink to="/guide/design-tokens.html#color-primary" v-slot="{href}"> <a :href="href">$var(color-primary)</a> </RouterLink></div>|方形复选框选中背景色|
|<span id="checkbox-ui-round-bgimg" class="css-var-name">$checkbox-ui-round-bgimg</span>|<div>url('data:image/svg+xml;base64...</div>|圆形复选框选中图形(对勾)|
|<span id="checkbox-ui-square-bgimg" class="css-var-name">$checkbox-ui-square-bgimg</span>|<div>url('data:image/svg+xml;base64...</div>|方形复选框选中图形(对勾)|
|<span id="checkbox-ui-bg_disabled" class="css-var-name">$checkbox-ui-bg_disabled</span>|<div><RouterLink to="/guide/design-tokens.html#fill-bgc" v-slot="{href}"> <a :href="href">$var(fill-bgc)</a> </RouterLink></div>|复选框禁用背景色|
|<span id="checkbox-ui-bg-opacity" class="css-var-name">$checkbox-ui-bg-opacity</span>|<div>.3</div>|复选框禁用透明度|
|<span id="checkbox-ui-square-radius" class="css-var-name">$checkbox-ui-square-radius</span>|<div>4px</div>|方形复选框圆角|
|<span id="checkbox-ui-round-radius" class="css-var-name">$checkbox-ui-round-radius</span>|<div>50%</div>|圆形复选框圆角|
|<span id="checkbox-ui-margin" class="css-var-name">$checkbox-ui-margin</span>|<div>0 0 0 10px</div>|复选框外边距|
|<span id="checkbox-ui-margin-right" class="css-var-name">$checkbox-ui-margin-right</span>|<div>10px</div>|复选框右边距|
|<span id="checkbox-ui-round-margin-right" class="css-var-name">$checkbox-ui-round-margin-right</span>|<div>10px</div>|圆形复选框右边距|
|<span id="checkbox-ui-square-margin-right" class="css-var-name">$checkbox-ui-square-margin-right</span>|<div>10px</div>|方形复选框右边距|
|<span id="checkbox-label-padding" class="css-var-name">$checkbox-label-padding</span>|<div>10px 0</div>|标签内边距|
|<span id="checkbox-text-desc-color_disabled" class="css-var-name">$checkbox-text-desc-color_disabled</span>|<div>unset</div>|禁用文本颜色|
|<span id="checkbox-text-font-size" class="css-var-name">$checkbox-text-font-size</span>|<div>18px</div>|文本字号|
|<span id="checkbox-text-font-weight" class="css-var-name">$checkbox-text-font-weight</span>|<div>700</div>|文本字重|
|<span id="checkbox-desc-font-size" class="css-var-name">$checkbox-desc-font-size</span>|<div>12px</div>|描述文本字号|
|<span id="checkbox-text-color" class="css-var-name">$checkbox-text-color</span>|<div><RouterLink to="/guide/design-tokens.html#text-color-desc" v-slot="{href}"> <a :href="href">$var(text-color-desc)</a> </RouterLink></div>|复文颜色|
|<span id="checkbox-desc-color" class="css-var-name">$checkbox-desc-color</span>|<div>#757575</div>|描述文本颜色|
|<span id="checkbox-text-line-height" class="css-var-name">$checkbox-text-line-height</span>|<div>1</div>|文本行高|
|<span id="checkbox-desc-line-height" class="css-var-name">$checkbox-desc-line-height</span>|<div>1.2</div>|描述文本行高|
|<span id="checkbox-inner-ui-transition" class="css-var-name">$checkbox-inner-ui-transition</span>|<div>transform .2s</div>|内部选中过渡|
  
</card> 
 

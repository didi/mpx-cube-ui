## Cube-Textarea

<card>

### 介绍

多行输入框组件，支持使用`wx:model`对数据双向绑定，根据是否有内容、是否聚焦有折叠、展开两种状态。

</card>

## 示例

<card>

### 基础用法

通过`wx:model`属性双向绑定文本数据。

<collapse-wrapper>

```vue
<template>
  <cube-textarea wx:model="{{ textareaValue }}" wx:model-prop="value"/>
  {{ textareaValue }}
</template>

<script>
  import { createPage } from '@mpxjs/core'

  createPage({
    data: {
      textareaValue: 'mpx-cube-ui'
    }
  })
</script>
```

</collapse-wrapper>


</card>

<card>

### 计数标识

配置`indicator`配置计数标识。

<collapse-wrapper>

```vue
<template>
  <cube-textarea wx:model="{{ textareaValue }}" wx:model-prop="value" indicator="{{ indicator }}" />
</template>

<script>
  import { createPage } from '@mpxjs/core'

  createPage({
    data: {
      textareaValue: '',
      indicator: {
        negative: true,
        remain: true
      }
    }
  })
</script>
```

</collapse-wrapper>


</card>

<card>

### 长度限制

通过`maxlength`配置最大长度等。

<collapse-wrapper>

```vue
<template>
  <cube-textarea
    value="{{ textareaValue }}"
    placeholder="{{ placeholder }}"
    maxlength="{{ maxlength }}"
    disabled="{{ disabled }}"
    focus="{{ focus }}"
  />
</template>

<script>
  import { createPage } from '@mpxjs/core'

  createPage({
    data: {
      textareaValue: '',
      placeholder: '请输入...',
      maxlength: 500,
      disabled: false,
      focus: false
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
|value|输入框的内容|`String`|-|-|
|placeholder|占位文本|`String`|-|-|
|placeholderStyle|指定 placeholder 的样式|`String`|-|color: #969699|
|placeholderClass|指定 placeholder 的样式类|`String`|-|textarea-placeholder|
|disabled|是否禁用|`Boolean`|-|false|
|maxlength|最大输入长度|`Number`|-|60|
|autoFocus|自动聚焦|`Boolean`|-|false|
|focus|获取焦点|`Boolean`|-|false|
|indicator|计数标示|`Object`|-|{}|
|width|文本框宽度|`String`|-|100%|
|height|文本框高度|`Number`|-|130|
|backgroundColor|文本框背景色|`String`|-|#F8F8F8|
|fixed|textarea 是在一个 position:fixed，需设置为true|`Boolean`|-|false|
|autoHeight|是否自动增高（web暂不支持）|`Boolean`|-|false|
|cursor|指定focus时的光标位置（web暂不支持）|`Number`|-|-1|
|cursorSpacing|指定光标与键盘的距离（web暂不支持）|`Number`|-|0|
|showConfirmBar|是否显示键盘上方带有”完成“按钮那一栏（web暂不支持）|`Boolean`|-|true|
|selectionStart|光标起始位置（web暂不支持）|`Number`|-|-1|
|selectionEnd|光标结束位置（web暂不支持）|`Number`|-|-1|
|adjustPosition|键盘弹起时，是否自动上推页面（web暂不支持）|`Boolean`|-|true|
|holdKeyboard|focus时，点击页面的时候不收起键盘（web暂不支持）|`Boolean`|-|false|
|disableDefaultPadding|是否去掉 iOS 下的默认内边距（web暂不支持）|`Boolean`|-|false|

<!-- @vuese:[name]:props:end -->


  
</card> 
 
 
 
<card> 
 
 ### Events

<!-- @vuese:[name]:events:start -->
|事件名|说明|参数|
|---|---|---|
|focus|输入框聚焦时触发|事件对象 e = { value, height }，height 为键盘高度|
|blur|输入框失去焦点时触发|事件对象 e = {value, cursor}|
|input|当键盘输入时，触发 input 事件|事件对象 e = event.detail = {value, cursor, keyCode}，keyCode 为键值|
|linechange|输入框行数变化时调用|事件对象 e = {height: 0, heightRpx: 0, lineCount: 0}|
|confirm|点击完成时， 触发 confirm 事件|事件对象 e = {value: value}|
|keyboardheightchange|键盘高度发生变化的时候触发此事件|事件对象 e = {height: height, duration: duration}|

<!-- @vuese:[name]:events:end -->


  
</card> 
 
 
 
<card> 
 
 ### CSS Variable
|变量名|默认值|含义|
|---|---|---|
|<span id="textarea-color" class="css-var-name">$textarea-color</span>|<div>#4B4B4D</div>|文本颜色|
|<span id="textarea-bgc" class="css-var-name">$textarea-bgc</span>|<div>transparent</div>|背景颜色|
|<span id="textarea-padding" class="css-var-name">$textarea-padding</span>|<div>13px 15px 21px 15px</div>|内边距|
|<span id="textarea-disable-bgc" class="css-var-name">$textarea-disable-bgc</span>|<div>#eee</div>|禁用颜色|
|<span id="textarea-border-color" class="css-var-name">$textarea-border-color</span>|<div>#E8E9EB</div>|边框颜色|
|<span id="textarea-border-radius" class="css-var-name">$textarea-border-radius</span>|<div>7px</div>|边框圆角|
|<span id="textarea-focus-border-color" class="css-var-name">$textarea-focus-border-color</span>|<div><RouterLink to="/guide/design-tokens.html#color-primary" v-slot="{href}"> <a :href="href">$var(color-primary)</a> </RouterLink></div>|边框颜色|
|<span id="textarea-indicator-color" class="css-var-name">$textarea-indicator-color</span>|<div>#969699</div>|指示器颜色|
|<span id="textarea-indicator-waring-color" class="css-var-name">$textarea-indicator-waring-color</span>|<div>#C73122</div>|指示器警告颜色|
|<span id="textarea-indicator-bottom" class="css-var-name">$textarea-indicator-bottom</span>|<div>5px</div>|指示器下边距|
|<span id="textarea-indicator-right" class="css-var-name">$textarea-indicator-right</span>|<div>10px</div>|指示器右边距|
|<span id="textarea-font-size" class="css-var-name">$textarea-font-size</span>|<div><RouterLink to="/guide/design-tokens.html#font-size-md" v-slot="{href}"> <a :href="href">$font-size-md</a> </RouterLink></div>|文本字号|
|<span id="textarea-indicator-font-size" class="css-var-name">$textarea-indicator-font-size</span>|<div><RouterLink to="/guide/design-tokens.html#font-size-sm" v-slot="{href}"> <a :href="href">$font-size-sm</a> </RouterLink></div>|指示器文本字号|
|<span id="textarea-indicator-line-height" class="css-var-name">$textarea-indicator-line-height</span>|<div>14px</div>|指示器行高|
  
</card> 
 

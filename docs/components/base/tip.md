## Cube-Tip 提示气泡

<card>

### 介绍

用于弹出提示气泡框，可以通过配置控制弹出位置。

</card>

## 示例

<card>

### 基础用法

通过在 Tip 组件上添加 ref 属性，获得对于组件的引用，然后调用 Tip 组件向外暴露出来的 show、hide 方法来控制组件的显示或隐藏。


<collapse-wrapper>

```vue
<template>
  <view class="tips-demo">
    <cube-icon
      class="cube-tip-icon"
      type="question"
      bind:click="onIconClick"
    />
    <cube-tip
      ext-class-tip="{{ direction }}"
      wx:ref="tip"
      direction="{{ direction }}"
      custom-style="{{ customStyle }}"
      bind:close="onTipClose"
    >
      <view>this is tips</view>
    </cube-tip>
  </view>
</template>

<script>
import { createComponent } from '@mpxjs/core'

createComponent({
  data: {
    index: 0,
    direction: 'top',
    customStyle: {}
  },
  methods: {
    onIconClick() {
      const dirs = ['top', 'right', 'bottom', 'left']
      this.direction = dirs[this.index++]
      if (this.index === 4) {
        this.index = 0
      }
      switch (this.direction) {
        case 'bottom':
          this.customStyle = {
            left: '96px',
            top: '-55px'
          }
          break
        case 'top':
          this.customStyle = {
            left: '96px',
            top: '40px'
          }
          break
        case 'right':
          this.customStyle = {
            left: '13px',
            top: '-8px'
          }
          break
        case 'left':
          this.customStyle = {
            left: '178px',
            top: '-9px'
          }
          break
      }
      this.$refs.tip.show()
    },
    onTipClose() {
      console.log('close the tip')
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
|direction|小三角的方向|`String`|top/bottom/left/right|top|
|customStyle|Tip 的行内样式|`Object`|-|-|
|angStyle|小三角的行内样式|`Object`|-|-|
|showClose|是否展示关闭 Icon|`Boolean`|-|true|

<!-- @vuese:[name]:props:end -->


  
</card> 
 
 
 
<card> 
 
 ### Events

<!-- @vuese:[name]:events:start -->
|事件名|说明|参数|
|---|---|---|
|toggle|显示/隐藏时触发|event.detail = { value }， 表当前状态是显示还是隐藏|
|click|点击时触发|-|
|close|点击关闭按钮触发|-|

<!-- @vuese:[name]:events:end -->


  
</card> 
 
<card> 
 
 ### Slots

<!-- @vuese:[name]:slots:start -->
|插槽名|说明|
|---|---|
|— (默认插槽)|默认插槽|

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
|<span id="tip-dark-opacity-bgc" class="css-var-name">$tip-dark-opacity-bgc</span>|<div>rgba(0, 0, 0, 0.8)</div>|-|
|<span id="tip-color" class="css-var-name">$tip-color</span>|<div><RouterLink to="/guide/design-tokens.html#color-white" v-slot="{href}"> <a :href="href">$var(color-white)</a> </RouterLink></div>|文字颜色|
|<span id="tip-bgc" class="css-var-name">$tip-bgc</span>|<div><a class="css-var-default" href="#tip-dark-opacity-bgc">$tip-dark-opacity-bgc</a></div>|背景颜色|
|<span id="tip-z-index" class="css-var-name">$tip-z-index</span>|<div>10</div>|叠层上下文层级|
|<span id="tip-padding" class="css-var-name">$tip-padding</span>|<div>14px 38px 14px 14px</div>|内边距|
|<span id="tip-max-height" class="css-var-name">$tip-max-height</span>|<div>60px</div>|最大高度|
|<span id="tip-border-radius" class="css-var-name">$tip-border-radius</span>|<div>7px</div>|圆角|
|<span id="tip-vertical-reverse-margin" class="css-var-name">$tip-vertical-reverse-margin</span>|<div>-6px</div>|水平方向三角外边距位置|
|<span id="tip-horizontal-reverse-margin" class="css-var-name">$tip-horizontal-reverse-margin</span>|<div>-9px</div>|竖直方向三角外边距位置|
|<span id="tip-angle-border-width" class="css-var-name">$tip-angle-border-width</span>|<div>0 6px 6px 6px</div>|三角边框线宽|
|<span id="tip-angle-border-style" class="css-var-name">$tip-angle-border-style</span>|<div>solid</div>|三角边框样式|
|<span id="tip-angle-border-color" class="css-var-name">$tip-angle-border-color</span>|<div><a class="css-var-default" href="#tip-dark-opacity-bgc">$tip-dark-opacity-bgc</a></div>|三角边框颜色|
|<span id="tip-close-right" class="css-var-name">$tip-close-right</span>|<div>14px</div>|关闭按钮距离右边框位置|
|<span id="tip-close-top" class="css-var-name">$tip-close-top</span>|<div>11px</div>|关闭按钮距离上边框位置|
|<span id="tip-close-width" class="css-var-name">$tip-close-width</span>|<div>12px</div>|关闭按钮宽度|
|<span id="tip-close-height" class="css-var-name">$tip-close-height</span>|<div>12px</div>|关闭按钮高度|
|<span id="tip-close-scale" class="css-var-name">$tip-close-scale</span>|<div>1.3</div>|关闭按钮缩放比|
|<span id="tip-content-min-height" class="css-var-name">$tip-content-min-height</span>|<div>18px</div>|内容最小高度|
|<span id="tip-content-line-height" class="css-var-name">$tip-content-line-height</span>|<div>18px</div>|内容行高|
  
</card> 
 

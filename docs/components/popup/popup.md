## Cube-Popup 弹出层

<card>

### 介绍

基础弹层组件，提供了功能：弹层类型、是否有背景层、显示内容以及是否居中等特性。类似于 `Dialog`、`Modal`、`Toast` 等弹层组件都是基于 `Popup` 进行的封装。

对于所有弹层组件来说都提供了基础的 `props` 属性及实例方法调用。例如 `visible` 属性控制是否展示和隐藏、`maskClosable` 遮罩是否可点击，组件实例的 `show`、`hide` 方法来展示和隐藏等，具体见每个弹层组件的文档。

</card>


## 示例

<card>

### 基础用法

通过组件暴露的 `show` 方法来控制组件的展示。当然也可以通过 `visible` 属性来控制组件的显示和隐藏。

<collapse-wrapper>

```vue
<template>
  <view>
    <cube-button bindclick="show">content-popup</cube-button>
    <cube-popup
      wx:ref="popup"
      maskClosable="{{ true }}"
      content="<i style='color:#fc9153'>Hello World</i>"
      class="cube-extend-popup">
    </cube-popup>
  </view>
</template>

<script>
import { createComponent } from '@mpxjs/core'

createComponent({
  options: {
    styleIsolation: 'shared'
  },
  data: {
    pos: '',
    trans: ''
  },
  methods: {
    show() {
      this.$refs.popup.show()
    }
  }
})
</script>
```

</collapse-wrapper>


</card>

<card>

### 自定义位置

通过 `position` 属性设置弹出位置，默认居中弹出，可以设置为 `top`、`bottom`、`left`、`right`。

<collapse-wrapper>

```vue
<template>
  <view>
    <cube-button bindclick="show">top/right/bottom-top-popup</cube-button>
    <cube-popup
      wx:ref="popup"
      position="{{ pos }}"
      maskClosable="{{ true }}"
      maskFadeTransition="{{ true }}"
      class="cube-extend-popup">
      <view class="popup-slot">This is position popup</view>
    </cube-popup>
  </view>
</template>

<script>
import { createComponent } from '@mpxjs/core'

let index = 0
const pos = ['top', 'right', 'bottom', 'left', 'center']

createComponent({
  options: {
    styleIsolation: 'shared'
  },
  data: {
    pos: ''
  },
  methods: {
    show() {
      this.pos = pos[index++]
      this.$refs.popup.show()
      if (index === 5) {
        index = 0
      }
    }
  }
})
</script>
```

</collapse-wrapper>


</card>

<card>

### 自定义过渡效果

通过 `transition` 属性可以设置弹窗的动画效果，目前组件提供了 `move-up`、`move-right`、`move-left`、`move-down`、`fade` 等效果，具体见示例 demo。

<collapse-wrapper>

```vue
<template>
  <view>
    <cube-button bindclick="show">top/right/bottom-top-transition</cube-button>
    <cube-popup
      wx:ref="popup"
      position="{{ pos }}"
      maskClosable="{{ true }}"
      maskFadeTransition="{{ true }}"
      transition="{{ trans }}"
      class="cube-extend-popup">
      <view class="popup-slot">This is transition popup</view>
    </cube-popup>
  </view>
</template>

<script>
import { createComponent } from '@mpxjs/core'

let index = 0
const posAndTrans = [
  {
    pos: 'top',
    trans: 'move-down'
  },
  {
    pos: 'right',
    trans: 'move-left'
  },
  {
    pos: 'bottom',
    trans: 'move-up'
  },
  {
    pos: 'left',
    trans: 'move-right'
  },
  {
    pos: 'center',
    trans: 'fade'
  }
]

createComponent({
  options: {
    styleIsolation: 'shared'
  },
  data: {
    pos: '',
    trans: ''
  },
  methods: {
    show() {
      const { pos, trans } = posAndTrans[index++]
      this.pos = pos
      this.trans = trans
      this.$refs.popup.show()
      if (index === 5) {
        index = 0
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
|zIndex|弹出层 z-index|`Number`|-|100|
|maskClosable|遮罩是否可点击|`Boolean`|-|false|
|maskFadeTransition|遮罩是否渐显|`Boolean`|-|false|
|visible|遮盖层初始状态是否可见|`Boolean`|-|false|
|themeType|用于生成最外层类名 如原类名为 cube-component，添加 themeType = demo 后，类名变为 cube-component cube-component-demo|`String`|-|-|
|type|拓展 class 属性，cube-${type}，可用于样式覆盖和定制|`String`|-|-|
|mask|是否显示遮罩|`Boolean`|-|true|
|content|文本内容，**微信&web** 支持 `html string` 的文本格式，**支付宝**目前不支持，所以需要自己转，具体见：支付宝 [rich-text文档](https://opendocs.alipay.com/mini/component/rich-text#%E5%B1%9E%E6%80%A7%E8%AF%B4%E6%98%8E)|`String`|-|-|
|center|是否居中显示|`Boolean`|-|true|
|position|todo 类型 内容位置|`String`|-|-|
|transition|todo 过渡动画|`String`|-|-|
|styleConfig||`Object`|-|{}|
|removeCatchTouch||`Boolean`|-|false|

<!-- @vuese:[name]:props:end -->


  
</card> 
 
<card> 
 
 ### Events

<!-- @vuese:[name]:events:start -->
|事件名|说明|参数|
|---|---|---|
|toggle|显示/隐藏时触发|event.detail = { value }， 表当前状态是显示还是隐藏|
|maskClick|点击遮罩|-|

<!-- @vuese:[name]:events:end -->


  
</card> 
 
<card> 
 
 ### Slots

<!-- @vuese:[name]:slots:start -->
|插槽名|说明|
|---|---|
|mask|遮罩插槽|
|— (默认插槽)|默认插槽|
|mask|遮罩插槽|
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
|<span id="popup-z-index" class="css-var-name">$popup-z-index</span>|<div>100</div>|-|
|<span id="popup-mask-opacity" class="css-var-name">$popup-mask-opacity</span>|<div>0.4</div>|遮罩透明度|
|<span id="popup-default-animation-time" class="css-var-name">$popup-default-animation-time</span>|<div>0.3s</div>|默认动画时间|
|<span id="popup-default-animation-fn" class="css-var-name">$popup-default-animation-fn</span>|<div>ease</div>|默认动画函数|
|<span id="popup-mask-transition" class="css-var-name">$popup-mask-transition</span>|<div>opacity .2s ease</div>|遮罩过渡|
|<span id="popup-mask-hide-transition" class="css-var-name">$popup-mask-hide-transition</span>|<div>opacity .2s ease</div>|遮罩隐藏过渡|
|<span id="popup-default-hide-animation-fn" class="css-var-name">$popup-default-hide-animation-fn</span>|<div>ease</div>|默认隐藏动画函数|
  
</card> 
 

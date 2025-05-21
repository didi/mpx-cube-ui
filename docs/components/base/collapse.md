## collapse

<card>

### 介绍

内置复选框组的半浮层模态框。

</card>

## 示例

<card>

### 基础用法

渲染一个多选弹窗。


<collapse-wrapper>

```vue
<template>
  <view>
    <view>通过默认slot 传入展开、收起的内容</view>
    <view class="bg-white">
      <cube-collapse>
        <view>内容文案，第一行</view>
        <view>内容文案，第二行</view>
        <view>内容文案，第三行</view>
        <view>内容文案，第四行</view>
      </cube-collapse>
    </view>
  </view>
</template>

<script>
import { createComponent } from '@mpxjs/core'

createComponent({})
</script>
```

</collapse-wrapper>


</card>

<card>

### 基础用法

渲染一个多选弹窗。


<collapse-wrapper>

```vue
<template>
  <view>
    <view>switch-text 属性修改展示、收起文案</view>
    <view class="bg-white">
      <cube-collapse switch-text="{{ switchText }}">
        <view>内容文案，第一行</view>
        <view>内容文案，第二行</view>
        <view>内容文案，第三行</view>
        <view>内容文案，第四行</view>
      </cube-collapse>
    </view>

    <view>switch-text 也可以是字符串</view>
    <view class="bg-white">
      <cube-collapse switch-text="{{ '如何做到早睡早起？' }}">
        <view>1. 吃好喝好</view>
        <view>2. 睡前少玩手机</view>
        <view>3. 定闹钟早起</view>
        <view>4. 上面的理论来自个人猜想</view>
      </cube-collapse>
    </view>
  </view>
</template>

<script>
import { createComponent } from '@mpxjs/core'

createComponent({
  data: {
    switchText: ['可以展示查看新内容', '收起内容']
  }
})
</script>
```

</collapse-wrapper>


</card>

<card>

### 基础用法

渲染一个多选弹窗。


<collapse-wrapper>

```vue
<template>
  <view>
    <view>min-height 属性最小内容展示高度</view>
    <view class="bg-white">
      <cube-collapse min-height="{{ '40px' }}">
        <view class="text">内容文案，第一行</view>
        <view class="text">内容文案，第二行</view>
        <view class="text">内容文案，第三行</view>
        <view class="text">内容文案，第四行</view>
        <view class="text">内容文案，第五行</view>
        <view class="text">内容文案，第六行</view>
        <view class="text">内容文案，第七行</view>
      </cube-collapse>
    </view>

    <view class="item">内容小于 min-height时，隐藏展开按钮 </view>
    <view class="bg-white">
      <cube-collapse min-height="{{ '100px' }}">
        <view class="text">内容文案，第一行</view>
        <view class="text">内容文案，第二行</view>
        <view class="text">内容文案，第三行</view>
      </cube-collapse>
    </view>
  </view>
</template>

<script>
import { createComponent } from '@mpxjs/core'

createComponent({
  data: {
    switchText: ['可以展示查看新内容', '收起内容']
  }
})
</script>
```

</collapse-wrapper>


</card>

<card>

### 基础用法

渲染一个多选弹窗。


<collapse-wrapper>

```vue
<template>
  <view>
    <view>switch-position 属性修改 switch 文案位置</view>
    <view class="bg-white">
      <cube-collapse switch-positon="{{ 'bottom' }}" switch-text="查看更多" min-height="{{ '40px' }}">
        <view class="text">1. 吃好喝好</view>
        <view class="text">2. 睡前少玩手机</view>
        <view class="text">3. 定闹钟早起</view>
        <view class="text">4. 上面的理论来自个人猜想</view>
      </cube-collapse>
    </view>
  </view>
</template>

<script>
import { createComponent } from '@mpxjs/core'

createComponent({})
</script>
```

</collapse-wrapper>


</card>

<card>

### 基础用法

渲染一个多选弹窗。


<collapse-wrapper>

```vue
<template>
  <view>
    <view>slot + wx:model来开展使用能力</view>
    <view class="bg-white">
      <cube-collapse
        switch-text="{{ [] }}"
        wx:model="{{ collapsed }}"
        wx:model-prop="collapsed"
      >
        <view>
          <view>内容，第一行</view>
          <view>内容，第二行</view>
          <view>内容，第三行</view>
        </view>
        <view slot="top-switch">点我使用组件的展开、收起</view>
      </cube-collapse>

      <view>-------</view>
      <view bindtap="collapsedHandler">点我通过wx:model进行展开、收起</view>
      <view>collapsed: {{ collapsed }}</view>
    </view>
  </view>
</template>

<script>
import { createComponent } from '@mpxjs/core'

createComponent({
  data: {
    collapsed: true
  },
  methods: {
    collapsedHandler() {
      this.collapsed = !this.collapsed
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
|minHeight|属性最小内容展示高度，需要写单位，如：100px。当内容高度小于该值时，不会出现收起展开按钮。|`String`|-|0|
|switchPositon|切换开关所在位置|`String`|top/bottom|top|
|switchText|切换开关文案，数组第一项为展开时文案，第二项为收起时文案。当为字符串时，展开收起文案不变|Array / String|-|['展开', '收起']|
|collapsed|是否默认收起|`Boolean`|-|true|

<!-- @vuese:[name]:props:end -->


  
</card> 
 
 
 
<card> 
 
 ### Events

<!-- @vuese:[name]:events:start -->
|事件名|说明|参数|
|---|---|---|
|input|当绑定值变化时触发|事件对象 e，包含 value 属性，表示当前展开收起状态|

<!-- @vuese:[name]:events:end -->


  
</card> 
 
<card> 
 
 ### Slots

<!-- @vuese:[name]:slots:start -->
|插槽名|说明|
|---|---|
|top-switch|上方开关插槽，可替换组件内置开关|
|top|内容上方插槽，位置在上方开关与内容之间|
|— (默认插槽)|默认插槽，用于展示需要展开收起的内容|
|bottom|内容下方插槽，位置在下方开关与内容之间|
|bottom-switch|下方开关插槽，可替换组件内置开关|

<!-- @vuese:[name]:slots:end -->


  
</card> 
 
 
 
 
 

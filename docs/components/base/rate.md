## Cube-Rate

<card>

## 介绍

评分组件。你可以自定义星星个数，可以禁用交互，以用作评价展示，可以通过插槽自定义星星样式。

#### 提示

右侧demo组件请在手机模式使用操作

</card>

### 示例

<card>

### 基本用法

<collapse-wrapper>

```vue
<template>
  <view>
    <cube-rate wx:model="{{value}}" wx:model-prop="value" max="{{max}}" />
  </view>
</template>

<script>
  import { createComponent } from '@mpxjs/core'
  createComponent({
    data() {
      return {
        value: false,
        max: 3
      }
    }
  })
</script>
```
</collapse-wrapper>


</card>

<card>

### 多项配置

例如，使用`disabled`使评分组件只读，使用`max`自定义评分等级，使用 `justify` 决定是否自动适应容器宽度，使用`allowHalf`代表是否需要半星 。

<collapse-wrapper>

```vue
<template>
  <view>
    <cube-rate
      wx:model="{{value}}"
      wx:model-prop="value"
      max="{{max}}"
      justify="{{justify}}"
      disabled="{{disabled}}"
      allowHalf="{{allowHalf}}"
    />
  </view>
</template>

<script>
  import { createComponent } from '@mpxjs/core'
  createComponent({
    data() {
      return {
        value: false,
        max: 3,
        justify: true,
        disabled: true,
        allowHalf: true
      }
    }
  })
</script>
```
</collapse-wrapper>


</card>

<card>

### 自定义星星样式

需要使用cube-rate-item组件，并且对自定义的星星元素定义两种样式——普通和活跃（在.cube-rate-item_active类之下, 如设置半星则也需修改.cube-rate-item_half_active类）
#### 注意
使用自定义插槽时，因微信与支付宝在wx:for以数字为参数时，起始索引不同，为避免此问题请在wx:for遍历生成cube-rate-item时以数组为参数。

<collapse-wrapper>

```vue
<template>
  <view>
    <cube-rate
      wx:model="{{value}}"
      wx:model-prop="value"
      isCustomize="{{customize}}"
      max="{{max}}"
    >
      <cube-rate-item
        wx:for="{{maxArray}}"
        wx:key="item"
        index="{{item}}"
        value="{{value}}"
      >
        <view class="cube-rate-item-demo"></view>
      </cube-rate-item>
    </cube-rate>
  </view>
</template>

<script>
  import { createComponent } from '@mpxjs/core'
  createComponent({
    data() {
      return {
        value: false,
        max: 3,
        customize: true
      }
    },
    computed: {
      maxArray() {
        return Array.from({ length: this.max }, (_, index) => index + 1)
      }
    }
  })
</script>

<style lang="stylus">
.rate-item-demo
  width: 100%
  height: 100%
  background-size: 100%
  background-color: grey
.cube-rate-item_active
  .cube-rate-item-demo
    background-color: orange
.cube-rate-item_half_active
  .cube-rate-item-demo
    background-color: blue
</style>

```
</collapse-wrapper>

</card>


<card>

### cube-rate-item 的插槽

| 名字 | 说明 | 作用域参数 |
| - | - | - |
| default | 自定义星星元素 | - |

</card>


<card> 
 
 ### Props

<!-- @vuese:[name]:props:start -->
|参数|说明|类型|可选值|默认值|
|---|---|---|---|---|
|value|双向绑定属性值|`Number`|-|0|
|max|星星个数|`Number`|-|0|
|disabled|是否禁止|`Boolean`|true/false|false|
|justify|是否自适应容器宽度（通过在星星之间增加空隙）|`Boolean`|true/false|false|
|allowHalf|是否支持半选|`Boolean`|true/false|false|
|isCustomize|是否需要自定义插槽|`Boolean`|true/false|false|

<!-- @vuese:[name]:props:end -->


  
</card> 
 
<card> 
 
 ### Events

<!-- @vuese:[name]:events:start -->
|事件名|说明|参数|
|---|---|---|
|input|当手指离开屏幕时触发|-|

<!-- @vuese:[name]:events:end -->


  
</card> 
 
<card> 
 
 ### Slots

<!-- @vuese:[name]:slots:start -->
|插槽名|说明|
|---|---|
|— (默认插槽)|自定义内容|

<!-- @vuese:[name]:slots:end -->


  
</card> 
 
<card> 
 
 ### CSS Variable
|变量名|默认值|含义|
|---|---|---|
|<span id="rate-max-width" class="css-var-name">$rate-max-width</span>|<div>100%</div>|最大宽度|
|<span id="rate-justify-width" class="css-var-name">$rate-justify-width</span>|<div>100%</div>|均匀分布时宽度|
|<span id="rate-item-width" class="css-var-name">$rate-item-width</span>|<div>32px</div>|星星容器宽度|
|<span id="rate-item-def-width" class="css-var-name">$rate-item-def-width</span>|<div>100%</div>|星星宽度|
|<span id="rate-item-def-height" class="css-var-name">$rate-item-def-height</span>|<div>100%</div>|星星高度|
|<span id="rate-item-def-background-size" class="css-var-name">$rate-item-def-background-size</span>|<div>100%</div>|背景图尺寸|
|<span id="rate-item-flex" class="css-var-name">$rate-item-flex</span>|<div>0 1 auto</div>|flex布局|
|<span id="rate-item-margin-right" class="css-var-name">$rate-item-margin-right</span>|<div>6px</div>|左边距|
|<span id="rate-item-after-padding" class="css-var-name">$rate-item-after-padding</span>|<div>50% 0</div>|伪元素padding|
|<span id="rate-item-star-default" class="css-var-name">$rate-item-star-default</span>|<div>url('data:image/png;base64,iVB...</div>|默认全星图|
|<span id="rate-item-star-active" class="css-var-name">$rate-item-star-active</span>|<div>url('data:image/png;base64,iVB...</div>|活跃全星图|
|<span id="rate-item-star-half-active" class="css-var-name">$rate-item-star-half-active</span>|<div>url('data:image/png;base64,iVB...</div>|半星活跃全星图|
  
</card> 
 

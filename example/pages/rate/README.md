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


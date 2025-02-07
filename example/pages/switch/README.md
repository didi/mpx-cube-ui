## Cube-Switch

<card>

## 介绍

滑动开关，用于切换 on/off 状态。

</card>

### 示例

<card>

### 基本用法

<collapse-wrapper>

```vue
<template>
  <view>
    <view>通过wx：model控制开关</view>
    <cube-switch wx:model="{{value}}"/>
    <view>通过设置value属性控制开关</view>
    <cube-switch disabled="{{true}}" value="{{true}}"/>
    <view>通过change事件获取当前开关状态</view>
    <cube-switch bindchange="getValue"/>
  </view>
</template>

<script>
  import { createComponent } from '@mpxjs/core'

  createComponent({
    data() {
      return {
        value: false,
        currentValue: true
      }
    },
    methods: {
      getValue(data) {
        this.currentValue = data.detail.value
      }
    }
  })
</script>
```
</collapse-wrapper>


</card>

 

 

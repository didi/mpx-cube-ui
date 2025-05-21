## Cube-Button-Group 按钮组

<card>

### 介绍

按钮组合容器，提供内部排列方向配置，常用于包裹一组具有关联性的按钮及内容。

</card>


## 示例

<card>

### 水平排列

通过设置`direction="horizontal"`将按钮水平排列。


<collapse-wrapper>

```vue
<cube-button-group direction="horizontal">
  <cube-button class="btn-item">取消按钮</cube-button>
  <cube-button class="btn-item" primary>确认按钮</cube-button>
</cube-button-group>
```

</collapse-wrapper>


<collapse-wrapper>

```vue
<style scoped lang="stylus">
.btn-item
  flex: 1
  margin-bottom 15px
  &:last-child
    margin-left: 10px
</style>
```

</collapse-wrapper>


</card>

<card>

### 垂直排列

按钮组的默认排列顺序为垂直排列。


<collapse-wrapper>

```vue
<cube-button-group class="btn-wrapper">
  <cube-button class="btn-item">取消按钮</cube-button>
  <cube-button class="btn-item" primary>确认按钮</cube-button>
</cube-button-group>
```

</collapse-wrapper>


</card>

<card>

### 图文结合

我们也可以在一行文字中插入按钮来实现图文混排效果。


<collapse-wrapper>

```vue
<template>
  <view class="button-groupwith-context-demo">
    <cube-button-group direction="horizontal">
      <view class="button-groupwith-title">图文结合示例</view>
      <cube-button inline>操作</cube-button>
    </cube-button-group>
  </view>
</template>

<script>
import { createComponent } from '@mpxjs/core'

createComponent({
  options: {
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
})
</script>

<style lang="stylus">
.button-groupwith-context-demo
  .cube-button-group
    display flex
    padding 20px 25px
    box-sizing border-box
    background-color #fff
    justify-content space-between
    align-items center
    border-radius 8px
  .button-groupwith-title
    line-height 27px
    font-size 21px
    color #282828
  .cube-btn
    padding 8px 26px
    font-size 16px
    line-height 24px
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
|direction|按钮方向|`String`|vertical/horizontal|ButtonGroupDirection.VERTICAL|

<!-- @vuese:[name]:props:end -->


  
</card> 
 
 
 
 
 
<card> 
 
 ### Slots

<!-- @vuese:[name]:slots:start -->
|插槽名|说明|
|---|---|
|— (默认插槽)|-|

<!-- @vuese:[name]:slots:end -->


  
</card> 
 
 
 
 
 

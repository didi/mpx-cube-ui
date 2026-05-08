## Cube-Scroll-Nav-Bar 滚动导航栏

<card>

### 介绍

用于展示一组可横向或纵向滚动切换的导航项，适合分类切换、服务入口切换等场景。

组件支持通过 `current` 控制当前激活项，支持 `labels` / `txts` / `list` 三种数据组织方式，并提供 `change` 事件及 `refresh`、`scrollToIndex` 实例方法。

</card>

## 示例

<card>

### 基础用法

通过 `labels` 定义每个导航项的值，`txts` 定义展示内容，`current` 控制当前激活项。`options` 可配置增强滚动相关能力，如 `scrollbar`、`bounce`、`enhanced`。

```vue
<template>
  <view>
    <cube-scroll-nav-bar
      labels="{{ serviceList }}"
      txts="{{ serviceTxts }}"
      current="{{ currentService }}"
      options="{{ navOptions }}"
      bindchange="onServiceChange"
    />
    <view>当前 active：{{ currentService }}</view>
  </view>
</template>

<script>
import { createComponent } from '@mpxjs/core'

createComponent({
  data: {
    serviceList: ['快车', '小巴', '专车'],
    serviceTxts: ['<span>快车</span>', '<span>小巴</span>', '<span>专车</span>'],
    currentService: '快车',
    navOptions: {
      bounce: false,
      scrollbar: false
    }
  },
  methods: {
    onServiceChange(e) {
      this.currentService = e.detail.active
    }
  }
})
</script>
```

`change` 事件返回的 `detail` 包含 `active`、`index`、`txt`、`label` 字段。

</card>

<card>

### 纵向导航

设置 `direction="vertical"` 可以切换为纵向布局，适合左侧分类导航等场景。

```vue
<cube-scroll-nav-bar
  direction="vertical"
  labels="{{ serviceList }}"
  current="{{ currentService }}"
  bindchange="onServiceChange"
/>
```

</card>

<card>

### 自定义 item 内容

设置 `use-item-slot="true"` 开启自定义 item 渲染。

Web 端可以直接使用作用域插槽；微信 / 支付宝小程序示例中通过 `generic:nav-item-content` 注入渲染组件。

```vue
<!-- web -->
<cube-scroll-nav-bar
  @_web
  direction="vertical"
  labels="{{ serviceList }}"
  current="{{ currentService }}"
  bindchange="onServiceChange"
  use-item-slot="true"
>
  <template slot-scope="props">
    <view class="slot-item {{ props.activeClass }}">
      <view class="slot-item-text">{{ props.index + 1 }}{{ props.txt }}</view>
    </view>
  </template>
</cube-scroll-nav-bar>

<!-- wx / ali -->
<cube-scroll-nav-bar
  @_wx|_ali
  generic:nav-item-content="scroll-nav-bar-item-renderer"
  direction="vertical"
  labels="{{ serviceList }}"
  current="{{ currentService }}"
  bindchange="onServiceChange"
  use-item-slot="true"
/>
```

自定义渲染时可使用 `txt`、`plainText`、`index`、`active`、`label`、`isActive`、`activeClass` 等字段。

</card>

<card>

### 使用 list 数据

除了 `labels` / `txts` 组合外，也可以直接传 `list`。组件兼容 `value`、`label`、`text`、`txt`、`disabled` 等字段。

```js
list: [
  { value: 1, txt: '<span>快车</span>' },
  { label: 2, text: '小巴', disabled: true },
  3
]
```

当某一项配置了 `disabled: true` 时，该项不会响应点击切换。

</card>

<card>

### 实例方法

组件对外暴露了以下方法：

- `refresh()`：重新计算当前状态与滚动位置
- `scrollToIndex(index)`：切换到指定项并滚动到对应位置

```vue
<cube-scroll-nav-bar
  wx:ref="navBar"
  labels="{{ serviceList }}"
/>
```

```js
this.$refs.navBar.scrollToIndex(2)
```

</card>

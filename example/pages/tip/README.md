## Cube-Tip 提示气泡

<card>

### 介绍

用于弹出提示气泡框，可以通过配置控制弹出位置。

<mark>已适配RN</mark>

### 注意

rn时，需要给组件添加 style="position: static"或者使用虚拟节点 autoVirtualHostRules。

```vue
<!-- 添加style -->
<template>
  <cube-tip style="position: static"></cube-tip>
</template>
```

```js
// mpx.config.js
module.exports = defineConfig({
  // ...
  pluginOptions: {
    mpx: {
      plugin: {
        // ...
        autoVirtualHostRules: {
          include: [resolve('node_modules/@mpxjs/mpx-cube-ui/lib/components/tip/index.mpx')]
        }
      },
    }
  }
})
```

</card>

## 示例

<card>

### 基础用法

通过在 Tip 组件上添加 ref 属性，获得对于组件的引用，然后调用 Tip 组件向外暴露出来的 show、hide 方法来控制组件的显示或隐藏。

<!-- @example: tip -->

</card>


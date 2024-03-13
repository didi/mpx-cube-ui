## 快速上手

<card>

### 背景知识

使用 mpx-cube-ui 前，请确保你已经学习过使用 [Mpx 小程序框架](https://www.mpxjs.cn/)。

</card>

## 安装

<card>

### 通过包管理器安装

你可以通过 `npm`、`yarn` 或 `pnpm` 进行安装。

```bash
# 使用 npm
npm i @mpxjs/mpx-cube-ui

# 使用 yarn
yarn add @mpxjs/mpx-cube-ui

# 使用 pnpm
pnpm add @mpxjs/mpx-cube-ui
```

</card>

## 使用

<card>

### 组件使用

以 Button 组件为例，在 `mpx` 文件的 `json` 配置当中引入 Button 路径即可。

> 各组件的基础路径为：`@mpxjs/mpx-cube-ui/lib/components/xxx/index.mpx `

```vue
// your-page.mpx
<template>
  <cube-button></cube-button>
</template>

<script>
import { createPage } from '@mpxjs/component'

createPage({})
</script>

<script type="application/json">
  {
    "usingComponents": {
      "cube-button": "@mpxjs/mpx-cube-ui/lib/components/button/index.mpx"
    }
  }
</script>
```

</card>

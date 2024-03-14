## 介绍

mpx-cube-ui 是基于 [Mpx 小程序框架](https://www.mpxjs.cn/)的移动端基础组件库，一份源码可以跨端输出所有小程序平台及 Web。

## 安装

```javascript
npm install @mpxjs/mpx-cube-ui
```

## 使用组件

以按钮组件为例，只需要在 mpx 单文件的 json 配置中引入按钮对应的自定义组件：

```javascript
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

## 组件库预览

```javascript
// 安装依赖
pnpm install

// 启动示例代码编译
pnpm run example:dev
```

在小程序开发者工具中导入 `dist` 目录下代码即可或者通过控制输出 url 地址在本地浏览器预览。

## 链接

* [意见反馈](/issues)
* [更新日志](/blob/main/docs/guide/changelog.md)
* [联系我们](/blob/main/docs/guide/contact.md)

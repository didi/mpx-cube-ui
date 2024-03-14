## 基本介绍

<card>

### 主题与样式

mpx-cube-ui 在设计开发过程中对于表现层的结构和样式进行抽离，利用预编译器（[Stylus](https://stylus-lang.com/)）和 [CSS 变量](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties)的能力来提供细粒度的样式定制能力。你可以利用样式定制能力去搭建更加成体系的小程序主题样式来满足特定业务产品的开发。

mpx-cube-ui 目前提供了一套默认的主题样式配置，具体见[主题样式配置](https://github.com/didi/mpx-cube-ui/tree/docs-improvement/packages/mpx-cube-ui/src/common/stylus/theme)文件。而在右方的模拟器当中你所看到的示例是使用了另外的主题样式文件覆盖了默认样式配置而生成的，你可以选择[乘客样式主题](https://github.com/didi/mpx-cube-ui/blob/docs-improvement/example/themes/passenger-variables.styl)或者[司机样式主题](https://github.com/didi/mpx-cube-ui/blob/docs-improvement/example/themes/driver-variables.styl)分别查看样式效果。

此外，考虑到不同小程序平台的样式隔离机制，mpx-cube-ui 也提供了几种样式覆盖策略来满足一些局部样式定制能力。

</card>


## 定制主题


<card>

### 步骤一：

按需编写组件需要使用的主题变量样式文件 `xxx.styl`：

```stylus
// stylus 变量语法
$btn-color = #333
$btn-border-radius = 10px
```


</card>

<card>

### 步骤二：

对于使用 `@mpxjs/cli@3.x` 脚手架生成的项目来说，首先在项目当中安装 `@mpxjs/vue-cli-plugin-mpx-theme` 插件：

```bash
npm install @mpxjs/vue-cli-plugin-mpx-theme -D
```

并在 `vue.config.js` 配置文件当中导入主题样式即可：

```javascript
module.exports = {
  pluginOptions: {
    // 指向自定义主题文件路径
    themeFilePath: [], // eg: [path.resolve('xxx.styl')]
    mpx: {
      // ...
    }
  }
}
```

::: tip

如果你的应用是通过 `@mpxjs/cli` 的脚手架生成的，请遵照如下的配置步骤

:::


首先需要安装 `postcss-css-variables` 插件：

```javascript
npm install postcss-css-variables -D
```

并在 `postcss.config.js` 中，增加配置如下：

```javascript
module.exports = {
  plugins: [
    // ...

    require('postcss-css-variables')({
      preserve: true
    })
  ]
}
```

然后在 `config/mpxLoader.conf.js` 中进行如下配置：

```javascript
module.exports = {
  loaders: {
    stylus: [
      'css-loader',
      {
        loader: 'stylus-loader',
        options: {
          // 在此处指定自定义主题文件
          import: [] // eg: [resolve('xxx.styl')]
        }
      }
    ]
  }
}
```

</card>


## 样式覆盖

<card>

### 方式一：使用 css 选择器权重机制

在微信小程序的使用场景当中，mpx-cube-ui 所有的组件都默认开启了 `addGlobalClass: true` 及 `styleIsolation: 'shared'` 配置选项，因此不管是在页面还是自定义组件当中想要覆盖 mpx-cube-ui 组件的样式都可以使用这种方式。

在支付宝小程序的使用场景当中，组件设计当中是默认没有样式隔离的策略，因此此方法同样生效。

</card>

<card>

### 方式二：使用 css 变量的能力

* 使用 class 属性：

```vue
<template>
  <cube-button class="extends"></cube-button>
</template>

<style>
  .extends {
    --cube-btn-color: red;
  }
</style>
```

* 使用 style 属性：

```vue
<template>
  <cube-button style="{{ style }}"></cube-button>
</template>

<script>
  import { createComponent } from '@mpxjs/core'

  createComponent({
    data: {
      extends: `
        --cube-btn-color: red;
        --cube-btn-font-size: 25px;
      `
    },
    created () {
      setTimeout(() => {
        this.extends = `
          --cube-btn-color: blue;
          --cube-btn-font-size: 10px;
        `
      }, 3000)
    }
  })
</script>
```

</card>

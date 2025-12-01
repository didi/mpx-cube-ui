## Cube-FloatingPanel

<card>

### 介绍

浮层组件，浮动在页面底部的面板，可以上下拖动来浏览内容，常用于提供额外的功能或信息。支持使用`wx:model`对数据双向绑定。

</card>

## 示例

<card>

### 基础用法

FloatingPanel 的默认高度为 `100px`，用户可以拖动来展开面板，使高度达到 `60%` 的屏幕高度。
<!-- @example: floating-panel-default -->

</card>

<card>

### 自定义锚点

你可以通过 `anchors` 属性来设置 FloatingPanel 的锚点位置，并通过 `wx:model` 来控制当前面板的显示高度。

比如，使面板的高度在 `100px`、`40%` 屏幕高度和 `70%` 屏幕高度三个位置停靠：
<!-- @example: floating-panel-anchors -->

</card>

<card>

### 仅头部拖拽

默认情况下，FloatingPanel 的头部区域和内容区域都可以被拖拽，你可以通过 `contentDraggable` 属性来禁用内容区域的拖拽。

<!-- @example: floating-panel-contentDraggable -->

</card>
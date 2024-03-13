## Cube-Dialog 弹出框

<card>

### 介绍

Dialog 模态框组件，提供了多种样式及交互形式，常用于消息的提示及确认。

</card>


## 示例

<!-- @theme: driver -> start -->

<card>

### `alert` 类型

`type` 可选的值为 `alert` (对应为提示框)、`confirm` (对应为确认框)、`prompt` （对应提示输入框）<sup>1.11.0</sup>。

<!-- @example: dialog-alert -->

<!-- @example: dialog-confirm -->

</card>

<card>

### 使用内置的 `icon` 图标

图标类型（自动添加`cubeic-`前缀），eye-invisible/eye-visible/...更多选择参见 `Cube-Icon` Demo示例

<!-- @example: dialog-alert-with-inner-icon -> template -->

<!-- @example: dialog-confirm-with-inner-icon -> template -->

</card>

### 关闭按钮

<card>

<!-- @example: dialog-show-close -> template -->

</card>

<card>

### 自定义 Slot

<!-- @example: dialog-show-slot -> template -->

</card>

### 自定义 btn slot

<card>

<!-- @example: dialog-btn-slot -> template -->

</card>

<!-- @theme: driver -> end -->



<!-- @theme: passenger -> start -->

<card>

### 基础用法

通过 `type` 属性来选择使用 `alert` 提示框类型，还是 `confirm` 确认框类型，通过调用组件暴露的 `show`、`hide` 方法来控制组件的显示与隐藏。

<!-- @example: dialog-alert -->

<!-- @example: dialog-confirm -->

</card>

<card>

### 自定义 head icon

通过设置 `headIcon` 的 `url`地址，将会在模态框头部显示该图标。

<!-- @example: dialog-head-icon -> template -->

</card>

<card>

### 自定义垂直排列按钮

<!-- @example: dialog-btn-vertical -->

</card>

<!-- @theme: passenger -> end -->

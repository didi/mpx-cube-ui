## Cube-Popup 弹出层

<card>

### 介绍

基础弹层组件，提供了功能：弹层类型、是否有背景层、显示内容以及是否居中等特性。类似于 `Dialog`、`Modal`、`Toast` 等弹层组件都是基于 `Popup` 进行的封装。

对于所有弹层组件来说都提供了基础的 `props` 属性及实例方法调用。例如 `visible` 属性控制是否展示和隐藏、`maskClosable` 遮罩是否可点击，组件实例的 `show`、`hide` 方法来展示和隐藏等，具体见每个弹层组件的文档。


<mark>已适配RN</mark>

</card>


## 示例

<card>

### 基础用法

通过组件暴露的 `show` 方法来控制组件的展示。当然也可以通过 `visible` 属性来控制组件的显示和隐藏。
<!-- @example: popup-content -->

</card>

<card>

### 自定义位置

通过 `position` 属性设置弹出位置，默认居中弹出，可以设置为 `top`、`bottom`、`left`、`right`。
<!-- @example: popup-position -->

</card>

<card>

### 自定义过渡效果

通过 `transition` 属性可以设置弹窗的动画效果，目前组件提供了 `move-up`、`move-right`、`move-left`、`move-down`、`fade` 等效果，具体见示例 demo。
<!-- @example: popup-transition -->

</card>

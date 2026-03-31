## Cube-Modal 半浮层弹窗

<card>

### 介绍 <span class="title-tag">已适配RN</span>

在弹出层中展示的模态对话框，引导用户进行相关操作。

</card>


## 示例

<card>

### 基础用法

通过调用组件的 `show`、`hide` 方法来控制组件的显示与隐藏。

<!-- @example: modal-one-btn  -->

</card>

<card>

### 按钮排列方式

设置属性 `direction` 来控制底部按钮排列布局方式，目前提供了水平/垂直两种不同的排列。

<!-- @example: modal-two-horizontal-btn -> template -->

</card>

<!-- @theme: driver -> start -->

<card>

### 两个竖直按钮

<!-- @example: modal-tow-vertical-btn -> template -->

</card>

<!-- @theme: driver -> end -->

<!-- @theme: driver -> start -->

<card>

#### 提供取消按钮

可通过属性 `cancelText` 设置按钮文本 和 `cancelBtnAlign` 设置按钮对齐方式，点击按钮，派发 `cancel` 事件

需要注意，`Modal` 分别针对取消和关闭做了不同的行为处理，目的是区分这两种行为含义的不同

关闭按钮的展示由属性 `showCloseIcon` 控制，点击按钮派发 `close` 事件

</card>

<card>

### 取消操作配置

<!-- @example: modal-with-cancel -> template -->

</card>

<!-- @theme: driver -> end -->

<card>

### Slot的使用

Modal 组件按结构进行拆分，分别提供了包括 顶部、标题、内容、尾部、Icon 等插槽用以自定义组件的样式内容。

<!-- @example: modal-header-slot -->

</card>

<!-- @theme: driver -> start -->

<card>

### 自定义图标(垂直布局)

<!-- @example: modal-with-vertical-icon -> template -->

</card>

<!-- @theme: driver -> end -->

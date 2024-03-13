## Cube-Checkbox-Group

<card>

### 介绍

复选框组是一组复选框，用来控制多个复选框状态，以及数据透传；有垂直和水平两种样式。

</card>

## 示例

<card>

### 基础用法

默认渲染为圆形。

<!-- @example: round -> template -->

<!-- @example: round -> script -->

`checkedValues` 是一个数组，代表的是选中的复选框 `value` 的值的集合。

勾选复选框组中的某一项时会触发 `checked` 事件，该事件会返回当前勾选的复选框值；同理，取消勾选复选框组中的某一项时触发会触发 `cancelChecked` 事件，该事件会返回当前取消勾选的复选框值。

</card>

<card>

### 使用插槽

除了使用内置的 `checkbox` 组件，您还可以使用插槽来自定义 `checkbox`。

<!-- @example: group-slot -> template -->

</card>

<card>

### 行内样式

默认情况下复选框是垂直排列的，如果设置 `inline` 属性值为 `true`，那么复选框将会水平均匀排列。

如果想控制一行排列的个数，那么还可以设置 `colNum` 属性值来指定一行需要排列的个数。

<!-- @example: round-inline -> template -->

</card>

<card>

### 禁用项

如果想禁用某几个复选框，那么可以在单个复选框的配置项里设置 `disabled` 属性值为 `true`。

<!-- @example: round-disabled -> template -->

<!-- @example: round-disabled -> script -->

</card>

<card>

### 方形选择框

默认情况下复选框为圆形，如果想设置复选框的形状为方形，可以设置 `shape` 属性值为 `square`。

<!-- @example: square -> template -->

</card>

<card>

### 默认选中

如果想设置某个选项为默认选中，那么可以直接在 `checkedValues` 里添加对应复选框的 `value` 值。

<!-- @example: square-selected -> template -->

<!-- @example: square-selected -> script -->

</card>

<card>

### 设置一行显示个数

在开启 `inline` 为 `true` 的前提下，可以设置 `colNum` 的值来控制每行显示的个数。

<!-- @example: square-column-num -> template -->

</card>

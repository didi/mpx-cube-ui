## Cube-Radio

<card>

### 介绍

基本组件-单选框，用于设置单个选项的值。

</card>

## 示例

<card>

### 正常选项

`option`下的`value`属性表示选中后的值，通过 `wx:model`双向绑定该值。

在该示例中，两个单选框绑定了同一个响应式变量，在点击第一个单选框时，就会变为`Option1`，所以第一个单选框激活。

<!-- @example: radio -> template -->

<!-- @example: radio -> script -->

</card>

<card>

### 禁用选项

通过 `disabled` 属性控制。
<!-- @example: radio-disabled -> template -->

<!-- @example: radio-disabled -> script -->

</card>

<card>

### 图标位置

通过`option`下的`position`属性控制图标展示方位，`right`表示图标展示在右侧。
<!-- @example: radio-ui-right -> template -->

<!-- @example: radio-ui-right -> script -->

</card>

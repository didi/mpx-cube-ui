## Cube-Input

<card>

### 介绍

输入框组件，支持使用`wx:model`对数据双向绑定，支持一键清空内容。

</card>

## 示例

<card>

### 基础用法

通过`wx:model`属性对于输入内容进行双向绑定。
<!-- @example: input-default -->

</card>

<card>

### 控制最大长度

通过`maxlength`配置最大长度等。
<!-- @example: input-maxlength -->

</card>

<card>

### 清空按钮

通过`clearable`配置清空按钮。
`clearable`可以为布尔类型，还可以配置为对象
<!-- @example: input-clearable -->
`clearable`配置的对象包含两个值：`visivle`和`blurHidden`分别代表当前是否展示以及当前Input元素离焦的时候是否隐藏。

</card>

<card>

### 密码配置

通过`eye`配置密码眼睛。
`eye`配置为对象
<!-- @example: input-password -->
`eye`配置的对象包含两个值：`open`和`reverse`分别代表当前是否展示以及当前眼睛展示是否反转。

</card>
## Cube-Tab-Bar

<card>

## 介绍

选项卡。

</card>

### 示例

<card>

### 基础用法

支持默认的点击高亮效果，又支持下划线跟随的效果，并且支持自定义的插槽，实现icon与label搭配的类似于app底部选项卡的样式。

- 默认样式

传入如下 tabs 的数据结构便能初始化 cube-tab-bar，必须使用 wx:model 指令来选中对应的 tab， wx:model 的参数的值必须与某一项 tab 的 value 属性对应，icon 属性是用做于 class 选择器，一般是用字体图标样式，cube-tab-bar 在不同的时机派发 click 与 change 事件，参数则是每次选中的 tab 对应的 value 值。

<!-- @example: tab-bar-default -->

</card>

<card>

### 自定义插槽

实际上我们更常见的需求是图标搭配文字效果，因此 cube-tab-bar 组件也支持了插槽的使用方式， 注意必须搭配 cube-tab 组件作为第一层级的子组件，来包裹你自定义插槽。

注意：由于转小程序不支持插槽默认值，所以需要传递`customize-content`和`customize-icon`来分别开启`默认插槽`和`icon插槽`。

<!-- @example: tab-bar-slot -> template -->

</card>
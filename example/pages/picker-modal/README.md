## Cube-Picker-Modal

<card>

### 介绍

通过把基础组件 Modal 及 Picker 相互结合，提供了一种从弹出浮层的形式来使用。

PickerModal 选择器的部分与 Picker 完全一致，通过 list、selectedIndex 来控制选择数据的显示。

PickerModal 中的弹出部分与 Modal 完全一致，通过实例的 show 、hide 来控制显示、隐藏；通过 title、maskClosable 来控制标题、点击蒙层是否关闭等。

</card>

## 示例

<card>

### 基础用法

可以从下方的例子中看到，通过调用 PickerModal 实例方法 show 进行显示，同时也可以传入 title、content 来控制 Modal 的文案；而 Picker 选择器的数则据通过传入的 list、selectedIndex 来控制。

PickerModal 保留了 Picker 和 Modal 原有的事件，比如 columnChange、change、maskClick 等，同时还新增 valueChange 事件，此事件在点击确认按钮后且选择的数据发生变化时触发。

<!-- @example: basic-picker -->

</card>

<card>

### 使用 wx:model

可以使用 wx:model 来控制选择器的显示与隐藏

<!-- @example: wx-model-picker -->

</card>

<card>

### 使用 slot

PickerModal 提供了两个具名插槽，header 和 footer。 header 是顶部位置插槽，在标题上方； footer 是尾部插槽，在按钮下方。

<!-- @example: slot-picker -->

</card>

<card>

### 更新数据

和 Picker 一致，当你需要修改 PickerModal 某些配置项时，你可以使用实例方法 updateData，传入你需要更新的属性。

下方例子可以发现每次打开 PickerModal 时，都会选择第一项的“剧毒”，3秒后自动切换成第三项的“核心”。

<!-- @example: update-data-picker -->

</card>

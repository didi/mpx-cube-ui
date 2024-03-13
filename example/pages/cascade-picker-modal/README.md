## Cube-Cascade-Picker-Modal

<card>

### 介绍

通过把基础组件 Modal 及 CascadePicker 相互结合，提供了一种从弹出浮层的形式来使用。

CascadePickerModal 选择器的部分与 CascadePicker 完全一致，通过 list、selectedIndex 来控制选择数据的显示。其中 list 需要传入的是一个树形结构，第一列数组的每个选项的children属性，对应着切换到该选项时后续列的数据，从而实现对后续列的改变。

CascadePickerModal 中的弹出部分与 Modal 完全一致，通过实例的 show 、hide 来控制显示、隐藏；通过 title、maskClosable 来控制标题、点击蒙层是否关闭等。

</card>

## 示例

<card>

### 基础用法

可以从下方的例子中看到，通过调用 CascadePickerModal 实例方法 show 进行显示，同时也可以传入 title、content 来控制 Modal 的文案；而 CascadePickerModal 选择器的数则据通过传入的 list、selectedIndex 来控制。

CascadePickerModal 保留了 Picker 和 Modal 原有的事件，比如 columnChange、change、maskClick 等，同时还新增 valueChange 事件，此事件在点击确认按钮后且选择的数据发生变化时触发。

<!-- @example: basic-picker -->

</card>

<card>

### 使用 slot

CascadePickerModal 提供了两个具名插槽，header 和 footer。 header 是顶部位置插槽，在标题上方； footer 是尾部插槽，在按钮下方。

<!-- @example: slot-picker -->

</card>

<card>

### 异步加载数据

当数据量太大时，可能难以在最开始就生成完整的级联数据树。这时，你可以配置 async 属性开启异步加载级联数据，在 columnChange 事件时去更新数据，并且在你更新完数据之前，用户点击确认会是无效的。

数据的更新可以使用实例方法 updateData，传入你需要更新的属性。同时因 async 属性，例子有以下表现：

1. 分别有两组数据 Fruit 和 Drink，同时只有一组和子数据。
2. 切换一级选项后，有对数据进行更新，所以在更新后 cascade-picker 派发 change 事件，此时可以关闭弹层。
3. 切换二级选项后，没有对数据进行更新，所以二级选项变化后 change 事件不会触发，此时无法关闭弹层。
4. 切换最后一级后，因不涉及到子数据的变化，所以会触发 change 事件，此时可以关闭弹层。

<!-- @example: async-picker -->

</card>

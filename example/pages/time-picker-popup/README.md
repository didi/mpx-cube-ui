## Cube-Time-Picker-Modal

<card>

### 介绍

内置了时间选择器的半浮层模态框。通过把基础组件 Popup 及 TimePicker 相互结合，提供了一种从弹出浮层的形式来使用。

TimePickerPopup 选择器的部分与 TimePicker 完全一致，通过 list、selectedIndex 来控制选择数据的显示。其中 list 需要传入的是一个树形结构，第一列数组的每个选项的children属性，对应着切换到该选项时后续列的数据，从而实现对后续列的改变。

TimePickerPopup 中的弹出层可以分别设置：title 控制标题、subtitle控制子标题、cancelTxt控制顶部取消按钮文案、confirmTxt控制顶部确定按钮文案、maskClosable控制是否点击蒙层隐藏。

</card>

## 示例

<card>

### 基础用法

基础日期选择弹窗

可以从下方的例子中看到，通过调用 TimePickerPopup 实例方法 show 进行显示，同时也可以传入 title、subtitle、cancelText、confirmText 来控制弹层的文案；而 TimePickerPopup 选择器的数则据通过传入的 min、max 来控制。在例子中，还额外使用了 columnCount 属性来控制生成的列数。

TimePickerPopup 保留了 TimePicker 和 Modal 原有的事件，比如 columnChange、change、maskClick 等，同时还新增 valueChange 事件，此事件在点击确认按钮后且选择的数据发生变化时触发。

<!-- @example: basic-picker -->

</card>

<card>

### 手动设置显示时间

timePicker实例向外暴露setTime方法用以手动设置时间，时间格式为时间戳。当时间戳小于当前时间戳时，timePicker实例会默认显示当前时间。

如例子所示，3秒后会选中未来1天后的时间。

<!-- @example: set-time-picker -->

</card>

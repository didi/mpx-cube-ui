## Cube-Date-Picker-Popup

<card>

### 介绍

通过把基础组件 Popup 及 DatePicker 相互结合，提供了一种从弹出浮层的形式来使用。

DatePickerPopup 选择器的部分与 DatePicker 完全一致，通过 list、selectedIndex 来控制选择数据的显示。其中 list 需要传入的是一个树形结构，第一列数组的每个选项的children属性，对应着切换到该选项时后续列的数据，从而实现对后续列的改变。

DatePickerPopup 中的弹出层可以分别设置：title 控制标题、subtitle控制子标题、cancelTxt控制顶部取消按钮文案、confirmTxt控制顶部确定按钮文案、maskClosable控制是否点击蒙层隐藏。

</card>

## 示例

<card>

### 基础用法

可以从下方的例子中看到，通过调用 DatePickerPopup 实例方法 show 进行显示，同时也可以传入 title、subtitle、cancelText、confirmText 来控制弹层的文案；而 DatePickerPopup 选择器的数则据通过传入的 list、selectedIndex 来控制。

DatePickerPopup 保留了 Picker 原有的事件，比如 columnChange、change、maskClick 等，同时还新增 valueChange 事件，此事件在点击确认按钮后且选择的数据发生变化时触发。

<!-- @example: basic-picker -->

</card>

<card>

### 基础用法

DatePickerPopup 有一个非常灵活的能力，就是可以配置列，总共是年、月、日、时、分、秒六种的列，你可以通过 startColumn 和 columnCount 来配置起始列和列数，比如默认的“年月日”选择，是从“年”开始的“三列”，而时分秒，则是从“时”开始的“三列”。

<!-- @example: time-picker -->

</card>

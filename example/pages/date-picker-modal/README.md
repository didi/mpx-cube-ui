## Cube-Date-Picker-Popup

<card>

### 介绍

内置了日期选择器的半浮层模态框。通过把基础组件 Modal 及 DatePicker 相互结合，提供了一种从弹出浮层的形式来使用。

DatePickerModal 选择器的部分与 DatePicker 完全一致，通过配置 min、max 设定选择的日期范围，还可以通过 value 设置当前选择的日期等。

DatePickerModal 中的弹出部分与 Modal 完全一致，通过实例的 show 、hide 来控制显示、隐藏；通过 title、maskClosable 来控制标题、点击蒙层是否关闭等。

</card>

## 示例

<card>

### 基础用法

基础日期选择弹窗。

可以从下方的例子中看到，通过调用 DatePickerModal 实例方法 show 进行显示，同时也可以传入 title、content 来控制 Modal 的文案；而 DatePickerModal 选择器的数则据通过传入的 min、max 来控制。在例子中，还额外使用了 columnCount 属性来控制生成的列数。

DatePickerModal 保留了 DatePicker 和 Modal 原有的事件，比如 columnChange、change、maskClick 等，同时还新增 valueChange 事件，此事件在点击确认按钮后且选择的数据发生变化时触发。

<!-- @example: basic-picker -->

</card>

<card>

### 使用 slot

CascadePickerModal 提供了两个具名插槽，header 和 footer。 header 是顶部位置插槽，在标题上方； footer 是尾部插槽，在按钮下方。

除去slot，例子中还通过 format 属性配置日期格式，并通过 columnOrder 来修改展示顺序为 “日-月-年” ['date', 'month', 'year']。

<!-- @example: slot-picker -->

</card>

## Cube-Time-Picker-Modal

<card>

### 介绍

内置了时间选择器的半浮层模态框。通过把基础组件 Modal 及 TimePicker 相互结合，提供了一种从弹出浮层的形式来使用。

TimePickerModal 选择器的部分与 TimePicker 完全一致，通过配置 min、max 设定选择的日期范围，还可以通过 value 设置当前选择的日期等。

TimePickerModal 中的弹出部分与 Modal 完全一致，通过实例的 show 、hide 来控制显示、隐藏；通过 title、maskClosable 来控制标题、点击蒙层是否关闭等。

</card>

## 示例

<card>

### 基础用法

基础日期选择弹窗。

可以从下方的例子中看到，通过调用 TimePickerModal 实例方法 show 进行显示，同时也可以传入 title、content 来控制 Modal 的文案；而 TimePickerModal 选择器的数则据通过传入的 min、max 来控制。在例子中，还额外使用了 columnCount 属性来控制生成的列数。

TimePickerModal 保留了 TimePicker 和 Modal 原有的事件，比如 columnChange、change、maskClick 等，同时还新增 valueChange 事件，此事件在点击确认按钮后且选择的数据发生变化时触发。

<!-- @example: basic-picker -->

</card>

<card>

### 使用 slot

TimePickerModal 提供了两个具名插槽，header 和 footer。 header 是顶部位置插槽，在标题上方； footer 是尾部插槽，在按钮下方。

除去slot，例子中还通过 minuteStep 来修改分钟数的步长，子属性 rule 配置取整的规则，是向上取整 ceil，向下取整 floor，又或是四舍五入round，而子属性 step 则代表步长。

<!-- @example: slot-picker -->

</card>

<card>

### 手动设置显示时间

timePicker实例向外暴露setTime方法用以手动设置时间，时间格式为时间戳。当时间戳小于当前时间戳时，timePicker实例会默认显示当前时间。

如例子所示，3秒后会选中未来1天后的时间。

<!-- @example: set-time-picker -->

</card>

## Cube-Time-Picker

<card>

### 介绍

TimePicker 组件提供了常用的日期选择功能。

</card>

## 示例

<card>

### 基础用法

min 和 max 直接控制时间的可选范围，showNow 用于控制是否显示“现在”时间。如下方例子可选当前时间及未来3天的时间。

<!-- @example: basic-picker -->

</card>

<card>

### Config Day

day字段的len属性可以设置第一列需要展示的日期长度；

filer属性设置第一列日期展示的文案，当len的数量大于filter的数组长度时，会以M月d日的格式显示文案；

format属性用以格式化日期显示的方式。

<!-- @example: config-day-picker -->

</card>

<card>

### Config MinuteStep

通过 minuteStep 属性可配置分钟数的步长，默认为 10 分钟，这样的话，可选的分钟就是 10、20、30、40、50。另外 minuteStep 还支持传入一个对象，你可以通过子属性 rule 配置取整的规则，是向上取整 ceil，向下取整 floor，又或是四舍五入round。而子属性 step 则代表步长。

<!-- @example: config-minute-picker -->

</card>

<card>

### Config Format

通过 format 属性可配置 select 事件的 formatedTime 参数的格式。

<!-- @example: config-format-picker -->

</card>

<card>

### Config Delay

delay 则表示的是当前时间向后推迟的时间，决定了最小可选时间（注：仅当未设置 min 时有效）。

在例子中配置了30，代表第一个可选时间在当前时间的30分之后。

<!-- @example: config-delay-picker -->

</card>

<card>

### 手动设置显示时间

timePicker实例向外暴露setTime方法用以手动设置时间，时间格式为时间戳。当时间戳小于当前时间戳时，timePicker实例会默认显示当前时间。

<!-- @example: set-time-picker -->

</card>

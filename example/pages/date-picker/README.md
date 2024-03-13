## Cube-Date-Picker

<card>

### 介绍

日期选择器，可用于日期选择，选择粒度的灵活配置，如年月日、时分秒、年月日时分秒、年月等。

</card>

## 示例

<card>

### 基础用法

配置 min、max 设定选择的日期范围，还可以通过 value 设置当前选择的日期。

如 Picker 组件一样，当你需要获取 DatePicker 当前选择项时，你可以使用实例方法 getSelectedInfo。

<!-- @example: basic-picker -->

</card>

<card>

### 选择“时分秒”

DatePicker 有一个非常灵活的能力，就是可以配置列，总共是年、月、日、时、分、秒六种的列，你可以通过 startColumn 和 columnCount 来配置起始列和列数，比如默认的”年月日“选择，是从“年”开始的“三列”，而时分秒，则是从“时”开始的“三列”。

<!-- @example: time-picker -->

</card>

<card>

### 选择“年月日时分秒”

同理，如果想要年月日时分秒选择器，则是以“年”开始的六列。

<!-- @example: date-time-picker -->

</card>

<card>

### 自定义顺序

针对日期展示格式顺序不是 "年-月-日 小时-分钟-秒" 的场景，可以通过 columnOrder 来修改展示顺序。例如日期展示顺序为 “日-月-年”，可配置 columnOrder 值为 ['date', 'month', 'year']。

<!-- @example: order-picker -->

</card>

<card>

### 格式化

你还可以通过 format 属性配置日期格式。

<!-- @example: formate-picker -->

</card>

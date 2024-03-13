## Cube-Picker-Popup

<card>

### 介绍

内置了基础选择器 picker 的弹出层。

</card>

## 示例

<card>

### 单列

从下方例子可以看到，通过调用自身的实例方法show展示组件。可以传入title、cancelTxt、confirmTxt来控制标题、取消和确认文案。

list是二维数组，其包含多少个一维数组就有多少单列picker与之对应，每一个一维数组的值都是对应picker可以选择的值。

selected-index是一维数组形式，其每一项都是list中相对应每一个一维数组当前展示值的下标。

当滑动选择其他值的时候，也会触发对应的change函数。

<!-- @example: basic-picker -->

</card>

<card>

### 多列

多列和单列的区别在于多列的list中存储的一维数组有两个及两个以上，且selected-index中数组长度不再是1。

<!-- @example: multi-picker -->

</card>

<card>

### 配置副标题

<!-- @example: subtitle-picker -->

</card>

<card>

### 更新数据

点击按钮1s左右会自动更新，无需自己选择。

更新的方法是实例自身的updateDate方法，传入要更新的list和selected-idx，也可以使用updateList只是更新list和updateIndex更新selected-idx。

<!-- @example: update-data-picker -->

</card>

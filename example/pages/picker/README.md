## Cube-Picker

<card>

### 介绍 <span class="title-tag">已适配RN</span>

Picker 组件也就是选择器，可以用于实现单列或多列选项的选择。

对于选择器，最基本的是需要定义它可以选择的选项，定义选项的属性是 list ，它是一个二维数组，第一维度代表了有多少列，第二维度则代表了每列有哪些选项。

</card>

## 示例

<card>

### 单列选择器

通过配置`list`并传入一组数据，则生成一列选择器。

<!-- @example: basic-picker -->

</card>

<card>

### 多列选择器

如果传入了多列数据，则会生成相应的多列选择器。比如以下是一个三列的选择器：

<!-- @example: multi-picker -->

</card>

<card>

### 更新数据及获取数据

当你需要修改 Picker 某些配置项时，你可以使用实例方法 updateData，传入你需要更新的属性。

当你需要获取 Picker 当前选择项时，你可以使用实例方法 getSelectedInfo。

<!-- @example: api-picker -->

</card>

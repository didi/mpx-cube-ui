## Cube-Slider

<card>

## 介绍 <span class="title-tag">已适配RN</span>

滑动选择器（基于touch事件拖动滑块儿，请在移动端环境下体验）。

**注意：RN模式下如果组件使用在[scroll-view](https://www.mpxjs.cn/guide/rn/component.html#scroll-view)中，那么change事件可能因为上下滚动不会触发**
- scroll-view 组件在滚动过程中，不会触发其自身或子组件的 touchend 事件响应，这是 RN 底层实现导致的问题，手势系统识别当前是 scroll-view 的滚动，就会取消掉 touchend 事件的响应。
- 安卓上如果触发了 scroll-view 组件默认的下拉刷新，binddragend可能不触发，只会触发 binddragstart

</card>

### 示例

<card>

### 基本用法

<!-- @example: slider-default -->

</card>

<card>

### 设置step

<!-- @example: slider-step -> template no-wrap -->

</card>

<card>

### 显示当前value

<!-- @example: slider-value -> template no-wrap -->

</card>

<card>

### 设置最小值/最大值

<!-- @example: slider-min-max -> template no-wrap -->

</card>

<card>

### 自定义滑块儿

设置
```vue
custom-content="{{true}}"
```
并添加自定义插槽。

<!-- @example: slider-slot show-style -->

</card>

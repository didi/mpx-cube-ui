## Cube-Icon

<card>

### 介绍

内置图标，使用的时候只需要加入对应的类名即可。

</card>

## 示例

<card>

### 基础用法

改变type类名渲染不同的图标，如：like、coin等。

<collapse-wrapper>

```vue
<cube-icon type="{{type}}" />
```

</collapse-wrapper>


</card>

<card> 
 
 ### Props

<!-- @vuese:[name]:props:start -->
|参数|说明|类型|可选值|默认值|
|---|---|---|---|---|
|themeType|用于生成最外层类名 如原类名为 cube-component，添加 themeType = demo 后，类名变为 cube-component cube-component-demo|`String`|-|-|
|type|图标类型（自动添加`cubeic-`前缀）|`String`|图标 Icon，更多选择参见[内置 Icon](https://www.mpxjs.cn/mpx-cube-ui/demo-theme-default/index.html#/pages/icon/index)|-|
|color|图标颜色|`String`|-|-|
|size|图标大小|`Number`|-|-|

<!-- @vuese:[name]:props:end -->


  
</card> 
 
 
 
<card> 
 
 ### Events

<!-- @vuese:[name]:events:start -->
|事件名|说明|参数|
|---|---|---|
|click|点击图标时触发|-|

<!-- @vuese:[name]:events:end -->


  
</card> 
 
 
 
<card> 
 
 ### CSS Variable
|变量名|默认值|含义|
|---|---|---|
|<span id="icon-font-size" class="css-var-name">$icon-font-size</span>|<div>16px</div>|-|
  
</card> 
 

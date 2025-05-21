## Cube-loading

<card>

### 介绍

加载，提供了可自定义大小的加载动画。

</card>

### 示例

<card>

### 基础用法

默认大小为`24px`，可通过`size`属性配置


<collapse-wrapper>

```vue
  <cube-loading size="{{36}}" />
```
</collapse-wrapper>

</card>

<card> 
 
 ### Props

<!-- @vuese:[name]:props:start -->
|参数|说明|类型|可选值|默认值|
|---|---|---|---|---|
|themeType|用于生成最外层类名 如原类名为 cube-component，添加 themeType = demo 后，类名变为 cube-component cube-component-demo|`String`|-|-|
|size|加载图标的大小，单位px|`Number`|-|24|

<!-- @vuese:[name]:props:end -->


  
</card> 
 
 
 
 
 
 
 
<card> 
 
 ### CSS Variable
|变量名|默认值|含义|
|---|---|---|
|<span id="loading-font-size" class="css-var-name">$loading-font-size</span>|<div>24px</div>|loading大小|
|<span id="loading-spinners-width" class="css-var-name">$loading-spinners-width</span>|<div>24px</div>|容器宽度|
|<span id="loading-spinners-height" class="css-var-name">$loading-spinners-height</span>|<div>24px</div>|容器高度|
|<span id="loading-spinners-animation" class="css-var-name">$loading-spinners-animation</span>|<div>spinner-fade <span>$loading-spinners-animation-duration</span> <span>$loading-spinners-animation-steps</span> <span>$loading-spinners-animation-count</span></div>|动画|
|<span id="loading-spinner-width" class="css-var-name">$loading-spinner-width</span>|<div>2px</div>|线条宽度|
|<span id="loading-spinner-height" class="css-var-name">$loading-spinner-height</span>|<div>25%</div>|线条高度|
|<span id="loading-spinner-normal-opacity" class="css-var-name">$loading-spinner-normal-opacity</span>|<div>0.25</div>|线条低透明度|
|<span id="loading-spinner-deep-opacity" class="css-var-name">$loading-spinner-deep-opacity</span>|<div>0.85</div>|线条高透明度|
  
</card> 
 

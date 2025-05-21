## Cube-Divider

<card>

### 介绍

分割线，用于分隔内容。

</card>

## 示例

<card>

### 基础用法

默认渲染一条水平分割线。


<collapse-wrapper>

```vue
<cube-divider />
```

</collapse-wrapper>


</card>

<card>

### 文本分割线

可以在分割线中植入文本内容。


<collapse-wrapper>

```vue
<cube-divider text="文本内容" />
```

</collapse-wrapper>


</card>

<card>

### 设置文本位置

通过设置`postion`，改变分割线中文本所在位置。

```vue
<cube-divider position="left" text="文本内容" />
```

</card>

<card>

### 分割线 Slot

也可以通过默认插槽渲染自定义内容。


<collapse-wrapper>

```vue
<cube-divider position="left">
  <view class="divider-slot">This is slot text</view>
</cube-divider>
```

</collapse-wrapper>


</card>

<card> 
 
 ### Props

<!-- @vuese:[name]:props:start -->
|参数|说明|类型|可选值|默认值|
|---|---|---|---|---|
|themeType|用于生成最外层类名 如原类名为 cube-component，添加 themeType = demo 后，类名变为 cube-component cube-component-demo|`String`|-|-|
|text|文本内容（会覆盖 slot）|`String`|-|-|
|position|文本/slot 的位置|`String`|left/center/right|DividerContentPosition.CENTER|

<!-- @vuese:[name]:props:end -->


  
</card> 
 
 
 
 
 
<card> 
 
 ### Slots

<!-- @vuese:[name]:slots:start -->
|插槽名|说明|
|---|---|
|— (默认插槽)|-|

<!-- @vuese:[name]:slots:end -->


  
</card> 
 
 
 
<card> 
 
 ### CSS Variable
|变量名|默认值|含义|
|---|---|---|
|<span id="divider-color" class="css-var-name">$divider-color</span>|<div>#ccc</div>|分割线文字颜色|
|<span id="divider-line-color" class="css-var-name">$divider-line-color</span>|<div>#d8d8d8</div>|分割线边框颜色|
|<span id="divider-bgc" class="css-var-name">$divider-bgc</span>|<div><RouterLink to="/guide/design-tokens.html#color-white" v-slot="{href}"> <a :href="href">$var(color-white)</a> </RouterLink></div>|分割线文字部分背景颜色|
|<span id="divider-padding" class="css-var-name">$divider-padding</span>|<div>0 10px</div>|分割线文字部分内边距|
|<span id="divider-left-line-width" class="css-var-name">$divider-left-line-width</span>|<div>10%</div>|分割线文字左边宽度|
|<span id="divider-right-line-width" class="css-var-name">$divider-right-line-width</span>|<div>10%</div>|分割线文字右边宽度|
|<span id="divider-font-size" class="css-var-name">$divider-font-size</span>|<div><RouterLink to="/guide/design-tokens.html#font-size-xs" v-slot="{href}"> <a :href="href">$var(font-size-xs)</a> </RouterLink></div>|分割线文字大小|
  
</card> 
 

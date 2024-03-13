
## 设计变量

<card>

### 基本介绍

设计变量是将组件样式当中的基础元素与具体业务产品的样式进行解耦，用以提供在设计规范和技术上的灵活样式自定义化，从而满足业务和品牌上多样化的视觉需求。

对于 mpx-cube-ui 组件的主题样式定制有个简单的逻辑关系：

* 全局基础样式变量：提供了基本色值、字号等，会影响到所有组件使用的样式；
* 组件样式变量：对于基本的色值、字号等继承于全局基础变量，涉及到组件自身的结构、样式变量会单独定义；
* 组件渲染样式：直接依赖组件样式变量；

![design-tokens](../assets/design-tokens.png)

通过定制**全局基础样式变量**和**组件样式变量**都能达到定制主题的目的，如果你的业务产品当中有明确的样式主题规范，那么更加推荐直接定制全局基础样式变量的方式。

当前文档可查阅全局基础样式变量，在每个组件文档底部的 `CSS Variable` 模块可以查阅每个组件所提供的所有可配置的组件样式变量。

</card>


<!-- @css-variable -> start -->

<card>

 ### color
|变量名|默认值|含义|
|---|---|---|
|<span id="color-white" class="css-var-name">$color-white</span>|<div>#fff</div>|基础-白色|
|<span id="color-black" class="css-var-name">$color-black</span>|<div>#323233</div>|基础-黑色|
|<span id="color-primary" class="css-var-name">$color-primary</span>|<div>#FF7E33</div>|基础-主要颜色|
|<span id="color-secondary" class="css-var-name">$color-secondary</span>|<div>#4F5E83</div>|基础-次要颜色|
|<span id="color-disabled" class="css-var-name">$color-disabled</span>|<div>#ccc</div>|基础-禁用色|
|<span id="color-dark-grey" class="css-var-name">$color-dark-grey</span>|<div>#333</div>|基础-灰色|
|<span id="color-dark-grey-s" class="css-var-name">$color-dark-grey-s</span>|<div>#323233</div>|基础-浅灰|
|<span id="color-light-grey-opacity" class="css-var-name">$color-light-grey-opacity</span>|<div>rgba(0, 0, 0, .04)</div>|基础-透明灰|
|<span id="mask-bgc_opacity" class="css-var-name">$mask-bgc_opacity</span>|<div>rgba(37, 38, 45, 0.4)</div>|遮罩层背景|
|<span id="fill-bgc" class="css-var-name">$fill-bgc</span>|<div>#f2f2f2</div>|基础-填充背景色|
|<span id="opacity_active" class="css-var-name">$opacity_active</span>|<div>0.6</div>|基础-透明度|
|<span id="text-color" class="css-var-name">$text-color</span>|<div><a class="css-var-default" href="#color-black">$color-black</a></div>|基础-正文、标题颜色|
|<span id="text-color-desc" class="css-var-name">$text-color-desc</span>|<div>#444</div>|基础-副标题、副文案、placeholder、提示性文字颜色|
|<span id="text-color-hint" class="css-var-name">$text-color-hint</span>|<div>#999</div>|基础-不希望显眼的文字（如“取消”文字按钮）颜色|
|<span id="border-color-normal" class="css-var-name">$border-color-normal</span>|<div>#ebebeb</div>|基础-1px边框颜色|


</card>


<card>

 ### size
|变量名|默认值|含义|
|---|---|---|
|<span id="font-size-6xl" class="css-var-name">$font-size-6xl</span>|<div>30px</div>|-|
|<span id="font-size-5xl" class="css-var-name">$font-size-5xl</span>|<div>28px</div>|-|
|<span id="font-size-4xl" class="css-var-name">$font-size-4xl</span>|<div>26px</div>|-|
|<span id="font-size-3xl" class="css-var-name">$font-size-3xl</span>|<div>24px</div>|-|
|<span id="font-size-2xl" class="css-var-name">$font-size-2xl</span>|<div>22px</div>|-|
|<span id="font-size-xl" class="css-var-name">$font-size-xl</span>|<div>20px</div>|-|
|<span id="font-size-lg" class="css-var-name">$font-size-lg</span>|<div>18px</div>|-|
|<span id="font-size-md" class="css-var-name">$font-size-md</span>|<div>16px</div>|-|
|<span id="font-size-sm" class="css-var-name">$font-size-sm</span>|<div>14px</div>|-|
|<span id="font-size-xs" class="css-var-name">$font-size-xs</span>|<div>12px</div>|-|
|<span id="font-size-2xs" class="css-var-name">$font-size-2xs</span>|<div>10px</div>|-|


</card>

<!-- @css-variable -> end -->

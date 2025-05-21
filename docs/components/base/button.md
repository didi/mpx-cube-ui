## Cube-Button 按钮

<card>

### 介绍

操作按钮，提供了不同的样式、状态以及小程序的按钮功能，常用于触发一个点击操作。

</card>

## 示例

<card>

### 样式

除了默认样式外，可以通过设置 `primary`、`bolder` 、`outline`、`inline`、`light`属性来改变按钮的样子，也可以组合多重属性呈现不同的效果。


<collapse-wrapper>

```vue
<cube-button>默认按钮</cube-button>
<cube-button primary>主要按钮</cube-button>
<cube-button bolder>粗体文字</cube-button>
<cube-button outline>细框按钮</cube-button>
<cube-button inline>内联按钮</cube-button>
<cube-button light>明亮按钮</cube-button>
<cube-button outline primary>outline - primary</cube-button>
<cube-button inline outline>inline - outline</cube-button>
<cube-button inline primary>inline - primary</cube-button>
```

</collapse-wrapper>


</card>

<card>

### 状态

除了默认的正常状态，还可以设置激活、禁用以及加载中等状态。


<collapse-wrapper>

```vue
<cube-button active>激活态</cube-button>
<cube-button disabled>置灰态</cube-button>
```

</collapse-wrapper>



<collapse-wrapper>

```vue
<template>
  <cube-button
    outline
    loading="{{ loading }}"
    bind:click="clickBtn"
  >加载按钮</cube-button>
</template>

<script>
import { createComponent } from '@mpxjs/core'

createComponent({
  data: {
    loading: false
  },
  methods: {
    clickBtn(index) {
      if (this.loading) {
        return
      }
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 5000)
    }
  }
})
</script>
```

</collapse-wrapper>


</card>

<card>

### 图标、辅助文案

可以设置 Icon 的 class，具体可以查看Icon demo。

可以设置 Tip 属性添加辅助文案。

- With Icon 按钮

<collapse-wrapper>

```vue
<cube-button primary icon="like">图标按钮</cube-button>
```

</collapse-wrapper>



- With Tip 按钮

<collapse-wrapper>

```vue
<cube-button
  class="mt10"
  icon="like"
  tip="辅助文案"
  primary
  outline
>主要文案</cube-button>
```

</collapse-wrapper>



</card>

<card>

### 功能

可以通过设置 `openType`、`formType` 等属性，使用小程序的功能并绑定回调。详情参阅[微信 Button 文档](https://developers.weixin.qq.com/miniprogram/dev/component/button.html)以及[支付宝 Button 文档](https://opendocs.alipay.com/mini/component/button)。使用方式如：

- 分享（微信、支付宝）

<collapse-wrapper>

```vue
<cube-button
  primary
  open-type="share"
  tip="需在小程序环境下预览"
>分享</cube-button>
```

</collapse-wrapper>


- 获取用户手机号（微信、支付宝）

  微信设置 `open-type` 为 `getPhoneNumber`；支付宝设置 ` open-type` 为 `getAuthorize`，设置 `scope` 为 `phoneNumber`。

  由于涉及用户隐私，手机号的获取需要满足一定的条件，详情参见[微信小程序获取手机号](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/getPhoneNumber.html)以及[支付宝小程序获取手机号](https://opendocs.alipay.com/mini/api/getphonenumber)。


<collapse-wrapper>

```vue
<cube-button
  outline
  primary
  open-type@wx="getPhoneNumber"
  open-type@ali="getAuthorize"
  scope="phoneNumber"
  tip="需在小程序环境下预览"
  bind:getPhoneNumber="onGetPhoneNumber"
>获取手机号</cube-button>
```

</collapse-wrapper>


- 获取用户信息（微信、支付宝）

  微信设置 `open-type` 为 `getUserInfo`；支付宝设置 ` open-type` 为 `getAuthorize`，设置 `scope` 为 `userInfo`。

  功能使用有一定的限制，详情参见[支付宝小程序获取基础信息](https://opendocs.alipay.com/mini/api/ch8chh)。


<collapse-wrapper>

```vue
<cube-button
  outline
  open-type@wx="getUserInfo"
  open-type@ali="getAuthorize"
  scope="userInfo"
  tip="需在小程序环境下预览"
  bind:getUserInfo="onGetUserInfo"
>获取用户信息</cube-button>
```

</collapse-wrapper>


- 打开授权设置页面（微信、支付宝）

<collapse-wrapper>

```vue
<cube-button
  open-type="openSetting"
  tip="需在微信小程序环境预览"
  bind:openSetting="onOpenSetting"
>打开授权设置页面</cube-button>
```

</collapse-wrapper>


- 打开客服会话（微信）

<collapse-wrapper>

```vue
<cube-button
  open-type="contact"
  show-message-card="{{ true }}"
  send-message-img="https://dpubstatic.udache.com/static/dpubimg/e7207fae-28de-4b5f-b082-329ff0b01ce0.png"
  send-message-title="点击返回mpx-cube-ui组件库"
  send-message-path="/pages/button/index"
  tip="需在微信小程序环境预览"
>客服会话</cube-button>
```

</collapse-wrapper>


- 获取用户头像（微信）

<collapse-wrapper>

```vue
<cube-button
  open-type="chooseAvatar"
  tip="需在微信小程序环境预览"
  bind:chooseAvatar="onChooseAvatar"
>获取头像</cube-button>
```

</collapse-wrapper>


- 打开 APP（微信）

<collapse-wrapper>

```vue
<cube-button
  open-type="launchApp"
  app-parameter="xxx"
  tip="需在微信小程序环境预览"
  bind:launchApp="onLaunchApp"
>打开 APP</cube-button>
```

</collapse-wrapper>


- 关注生活号（支付宝）

<collapse-wrapper>

```vue
<cube-button
  public-id="xxxxxx"
  open-type="lifestyle"
  tip="需在支付宝小程序环境预览"
  bind:followLifestyle="onFollowLifestyle"
>关注生活号</cube-button>
```

</collapse-wrapper>


</card>

<card> 
 
 ### Props

<!-- @vuese:[name]:props:start -->
|参数|说明|类型|可选值|默认值|
|---|---|---|---|---|
|themeType|用于生成最外层类名 如原类名为 cube-component，添加 themeType = demo 后，类名变为 cube-component cube-component-demo|`String`|-|-|
|active|激活状态|`Boolean`|true/false|false|
|disabled|禁用状态|`Boolean`|true/false|false|
|loading|加载状态|`Boolean`|true/false|false|
|primary|主要的|`Boolean`|true/false|false|
|outline|外边框|`Boolean`|true/false|false|
|light|轻按钮|`Boolean`|true/false|false|
|inline|是否内联|`Boolean`|true/false|false|
|icon|图标 Icon，参阅[内置 Icon](http://h5test.intra.xiaojukeji.com/driver-biz/mpx-cube-ui-demo_default/index.html#/pages/icon/index)|`String`|-|-|
|tip|辅助文案|`String`|-|-|
|bolder|文本粗体|`Boolean`|-|false|
|openType|微信相关的属性，具体参阅微信[Button文档](https://developers.weixin.qq.com/miniprogram/dev/component/button.html)和支付宝[Button文档](https://opendocs.alipay.com/mini/component/button)|`String`|-|-|
|appParameter|打开 APP 时，向 APP 传递的参数，open-type=launchApp时有效|`String`|-|-|
|lang|小程序语言|`String`|-|zh_CN|
|sessionFrom|会话来源，open-type="contact"时有效|`String`|-|-|
|sendMessageTitle|当前标题|`String`|-|-|
|sendMessagePath|当前分享路径|`String`|-|-|
|sendMessageImg|截图|`String`|-|-|
|showMessageCard|微信小程序客服会话卡片|`Boolean`|-|false|
|formType|用于 form 组件|`String`|-|-|
|scope|支付宝小程序中当 open-type 为 getAuthorize 时有效|`String`|phoneNumber/userInfo|-|
|publicId|支付宝生活号 id，必须是当前小程序同主体且已关联的生活号，open-type="lifestyle" 时有效|`String`|-|-|
|styleConfig||`Object`|-|{}|
|iconSize|图标大小|`Number`|-|-|

<!-- @vuese:[name]:props:end -->


  
</card> 
 
 
 
<card> 
 
 ### Events

<!-- @vuese:[name]:events:start -->
|事件名|说明|参数|
|---|---|---|
|error|-|-|
|openSetting|-|-|
|chooseAvatar|-|-|
|followLifestyle|-|-|
|contact|-|-|
|launchApp|-|-|
|getPhoneNumber|-|-|

<!-- @vuese:[name]:events:end -->


  
</card> 
 
<card> 
 
 ### Slots

<!-- @vuese:[name]:slots:start -->
|插槽名|说明|
|---|---|
|— (默认插槽)|-|
|tip|-|

<!-- @vuese:[name]:slots:end -->


  
</card> 
 
<card> 
 
 ### Methods

<!-- @vuese:[name]:methods:start -->
|组件实例方法|说明|参数|返回值|
|---|---|---|---|
|onClick|点击|-|-|
|onGetUserInfo|获取用户信息|-|-|
|onGetPhoneNumber|获取用户手机号|-|-|
|onError|失败回调|-|-|
|onContact|微信小程序打开客服会话|-|-|
|onOpenSetting|微信小程序中在打开授权设置页后回调，open-type="openSetting" 时有效|-|-|
|onLaunchApp|微信小程序打开 APP 成功的回调，open-type=launchApp时有效(参见[微信小程序打开 APP](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/launchApp.html))|-|-|
|onChooseAvatar|微信小程序获取用户头像回调，open-type=chooseAvatar时有效|-|-|
|onFollowLifestyle|支付宝小程序中当 open-type 为 lifestyle 时有效。当点击按钮时触发。|-|-|

<!-- @vuese:[name]:methods:end -->


  
</card> 
 
<card> 
 
 ### CSS Variable
|变量名|默认值|含义|
|---|---|---|
|<span id="btn-outline-secondary-color" class="css-var-name">$btn-outline-secondary-color</span>|<div>#666</div>|次要outline按钮文字颜色|
|<span id="btn-outline-secondary-bgc_active" class="css-var-name">$btn-outline-secondary-bgc_active</span>|<div>rgba(0, 0, 0, 0.08)</div>|次要outline按钮激活时背景颜色|
|<span id="btn-loading-dot-active-color" class="css-var-name">$btn-loading-dot-active-color</span>|<div><RouterLink to="/guide/design-tokens.html#color-white" v-slot="{href}"> <a :href="href">$var(color-white)</a> </RouterLink></div>|loading按钮激活时圆点颜色|
|<span id="btn-loading-dot-secondary-color" class="css-var-name">$btn-loading-dot-secondary-color</span>|<div>rgba(#ccc, .4)</div>|loading按钮圆点次要颜色|
|<span id="btn-loading-dot-normal-color" class="css-var-name">$btn-loading-dot-normal-color</span>|<div>#ccc</div>|loading按钮圆点常规颜色|
|<span id="btn-color" class="css-var-name">$btn-color</span>|<div><RouterLink to="/guide/design-tokens.html#color-white" v-slot="{href}"> <a :href="href">$var(color-white)</a> </RouterLink></div>|按钮文字颜色|
|<span id="btn-bgc" class="css-var-name">$btn-bgc</span>|<div><RouterLink to="/guide/design-tokens.html#color-secondary" v-slot="{href}"> <a :href="href">$var(color-secondary)</a> </RouterLink></div>|按钮背景颜色|
|<span id="btn-font-size" class="css-var-name">$btn-font-size</span>|<div><RouterLink to="/guide/design-tokens.html#font-size-lg" v-slot="{href}"> <a :href="href">$var(font-size-lg)</a> </RouterLink></div>|按钮字体大小|
|<span id="btn-bgc_active" class="css-var-name">$btn-bgc_active</span>|<div><a class="css-var-default" href="#btn-bgc">$btn-bgc</a></div>|按钮激活时背景颜色|
|<span id="btn-border-color" class="css-var-name">$btn-border-color</span>|<div>rgba(0, 0, 0, 0)</div>|按钮边框颜色|
|<span id="btn-border-radius" class="css-var-name">$btn-border-radius</span>|<div>7px</div>|按钮圆角大小|
|<span id="btn-block-line-height" class="css-var-name">$btn-block-line-height</span>|<div>1.389</div>|按钮行高|
|<span id="btn-block-padding-left" class="css-var-name">$btn-block-padding-left</span>|<div>14px</div>|-|
|<span id="btn-block-padding-right" class="css-var-name">$btn-block-padding-right</span>|<div>14px</div>|-|
|<span id="btn-block-padding-top" class="css-var-name">$btn-block-padding-top</span>|<div>15px</div>|-|
|<span id="btn-block-padding-bottom" class="css-var-name">$btn-block-padding-bottom</span>|<div>15px</div>|-|
|<span id="btn-block-padding" class="css-var-name">$btn-block-padding</span>|<div><a class="css-var-default" href="#btn-block-padding-top">$btn-block-padding-top</a> <a class="css-var-default" href="#btn-block-padding-right">$btn-block-padding-right</a> <a class="css-var-default" href="#btn-block-padding-bottom">$btn-block-padding-bottom</a> <a class="css-var-default" href="#btn-block-padding-left">$btn-block-padding-left</a></div>|按钮内边距|
|<span id="btn-opacity_active" class="css-var-name">$btn-opacity_active</span>|<div>.6</div>|按钮激活时背景透明度|
|<span id="btn-bxsh" class="css-var-name">$btn-bxsh</span>|<div>none</div>|按钮阴影|
|<span id="btn-font-family" class="css-var-name">$btn-font-family</span>|<div>inherit</div>|按钮字体|
|<span id="btn-font-weight" class="css-var-name">$btn-font-weight</span>|<div>inherit</div>|按钮字重|
|<span id="btn-display" class="css-var-name">$btn-display</span>|<div>block</div>|按钮显示方式|
|<span id="btn-height" class="css-var-name">$btn-height</span>|<div>auto</div>|按钮高度|
|<span id="btn-flex-direction" class="css-var-name">$btn-flex-direction</span>|<div>row</div>|按钮flex方向|
|<span id="btn-align-items" class="css-var-name">$btn-align-items</span>|<div>normal</div>|按钮对齐方式|
|<span id="btn-justify-content" class="css-var-name">$btn-justify-content</span>|<div>normal</div>|按钮内容对齐方式|
|<span id="btn-width" class="css-var-name">$btn-width</span>|<div>auto</div>|按钮宽度|
|<span id="btn-primary-color" class="css-var-name">$btn-primary-color</span>|<div><RouterLink to="/guide/design-tokens.html#color-white" v-slot="{href}"> <a :href="href">$var(color-white)</a> </RouterLink></div>|主要按钮文字颜色|
|<span id="btn-primary-bgc" class="css-var-name">$btn-primary-bgc</span>|<div><RouterLink to="/guide/design-tokens.html#color-primary" v-slot="{href}"> <a :href="href">$var(color-primary)</a> </RouterLink></div>|主要按钮背景颜色|
|<span id="btn-primary-bgc_active" class="css-var-name">$btn-primary-bgc_active</span>|<div><a class="css-var-default" href="#btn-primary-bgc">$btn-primary-bgc</a></div>|主要按钮激活时背景颜色|
|<span id="btn-primary-color_active" class="css-var-name">$btn-primary-color_active</span>|<div><RouterLink to="/guide/design-tokens.html#color-white" v-slot="{href}"> <a :href="href">$var(color-white)</a> </RouterLink></div>|主要按钮激活时文字颜色|
|<span id="btn-primary-font-weight" class="css-var-name">$btn-primary-font-weight</span>|<div>normal</div>|主要按钮字重|
|<span id="btn-primary-bxsh" class="css-var-name">$btn-primary-bxsh</span>|<div>none</div>|主要按钮阴影|
|<span id="btn-light-color" class="css-var-name">$btn-light-color</span>|<div><RouterLink to="/guide/design-tokens.html#color-white" v-slot="{href}"> <a :href="href">$var(color-white)</a> </RouterLink></div>|light按钮文字颜色|
|<span id="btn-light-bgc" class="css-var-name">$btn-light-bgc</span>|<div><RouterLink to="/guide/design-tokens.html#color-primary" v-slot="{href}"> <a :href="href">$var(color-primary)</a> </RouterLink></div>|light按钮背景颜色|
|<span id="btn-light-border-color" class="css-var-name">$btn-light-border-color</span>|<div><RouterLink to="/guide/design-tokens.html#color-primary" v-slot="{href}"> <a :href="href">$var(color-primary)</a> </RouterLink></div>|light按钮边框颜色|
|<span id="btn-light-bgc_active" class="css-var-name">$btn-light-bgc_active</span>|<div><a class="css-var-default" href="#btn-primary-bgc">$btn-primary-bgc</a></div>|light按钮激活时背景颜色|
|<span id="btn-light-font-weight" class="css-var-name">$btn-light-font-weight</span>|<div>normal</div>|light按钮字重|
|<span id="btn-light-bxsh" class="css-var-name">$btn-light-bxsh</span>|<div>none</div>|light按钮阴影|
|<span id="btn-outline-color" class="css-var-name">$btn-outline-color</span>|<div><a class="css-var-default" href="#btn-outline-secondary-color">$btn-outline-secondary-color</a></div>|outline按钮文字颜色|
|<span id="btn-outline-bgc" class="css-var-name">$btn-outline-bgc</span>|<div>rgba(0, 0, 0, 0)</div>|outline按钮背景颜色|
|<span id="btn-outline-border-color" class="css-var-name">$btn-outline-border-color</span>|<div><a class="css-var-default" href="#btn-outline-secondary-color">$btn-outline-secondary-color</a></div>|outline按钮边框颜色|
|<span id="btn-outline-bgc_active" class="css-var-name">$btn-outline-bgc_active</span>|<div><a class="css-var-default" href="#btn-outline-secondary-bgc_active">$btn-outline-secondary-bgc_active</a></div>|outline按钮激活时背景颜色|
|<span id="btn-outline-border-color_active" class="css-var-name">$btn-outline-border-color_active</span>|<div><a class="css-var-default" href="#btn-outline-secondary-color">$btn-outline-secondary-color</a></div>|outline按钮激活时边框颜色|
|<span id="btn-outline-font-weight" class="css-var-name">$btn-outline-font-weight</span>|<div>normal</div>|outline按钮字重|
|<span id="btn-outline-bxsh" class="css-var-name">$btn-outline-bxsh</span>|<div>none</div>|outline按钮阴影|
|<span id="btn-outline-primary-color" class="css-var-name">$btn-outline-primary-color</span>|<div><RouterLink to="/guide/design-tokens.html#color-primary" v-slot="{href}"> <a :href="href">$var(color-primary)</a> </RouterLink></div>|outline主按钮文字颜色|
|<span id="btn-outline-primary-bgc" class="css-var-name">$btn-outline-primary-bgc</span>|<div>rgba(0, 0, 0, 0)</div>|outline主按钮背景颜色|
|<span id="btn-outline-primary-border-color" class="css-var-name">$btn-outline-primary-border-color</span>|<div><RouterLink to="/guide/design-tokens.html#color-primary" v-slot="{href}"> <a :href="href">$var(color-primary)</a> </RouterLink></div>|outline主按钮边框颜色|
|<span id="btn-outline-primary-bgc_active" class="css-var-name">$btn-outline-primary-bgc_active</span>|<div>rgba(0, 0, 0, 0)</div>|outline主按钮激活时背景颜色|
|<span id="btn-outline-primary-bxsh" class="css-var-name">$btn-outline-primary-bxsh</span>|<div>none</div>|outline主按钮阴影|
|<span id="btn-disabled-color" class="css-var-name">$btn-disabled-color</span>|<div><RouterLink to="/guide/design-tokens.html#color-white" v-slot="{href}"> <a :href="href">$var(color-white)</a> </RouterLink></div>|按钮禁用时文字颜色|
|<span id="btn-disabled-bgc" class="css-var-name">$btn-disabled-bgc</span>|<div><RouterLink to="/guide/design-tokens.html#color-disabled" v-slot="{href}"> <a :href="href">$var(color-disabled)</a> </RouterLink></div>|按钮禁用时背景颜色|
|<span id="btn-disabled-border-color" class="css-var-name">$btn-disabled-border-color</span>|<div><RouterLink to="/guide/design-tokens.html#color-disabled" v-slot="{href}"> <a :href="href">$var(color-disabled)</a> </RouterLink></div>|按钮禁用时边框颜色|
|<span id="btn-disabled-font-weight" class="css-var-name">$btn-disabled-font-weight</span>|<div>normal</div>|按钮禁用时字重|
|<span id="btn-icon-margin-right" class="css-var-name">$btn-icon-margin-right</span>|<div>4px</div>|按钮图标右边距|
|<span id="btn-icon-font-size" class="css-var-name">$btn-icon-font-size</span>|<div>100%</div>|按钮图标字体大小|
|<span id="btn-icon-inline-margin-right" class="css-var-name">$btn-icon-inline-margin-right</span>|<div>2px</div>|内联按钮右边距|
|<span id="btn-inline-line-height" class="css-var-name">$btn-inline-line-height</span>|<div>1</div>|内联按钮行高|
|<span id="btn-inline-padding-left" class="css-var-name">$btn-inline-padding-left</span>|<div>10px</div>|-|
|<span id="btn-inline-padding-right" class="css-var-name">$btn-inline-padding-right</span>|<div>10px</div>|-|
|<span id="btn-inline-padding-top" class="css-var-name">$btn-inline-padding-top</span>|<div>9px</div>|-|
|<span id="btn-inline-padding-bottom" class="css-var-name">$btn-inline-padding-bottom</span>|<div>9px</div>|-|
|<span id="btn-inline-padding" class="css-var-name">$btn-inline-padding</span>|<div><a class="css-var-default" href="#btn-inline-padding-top">$btn-inline-padding-top</a> <a class="css-var-default" href="#btn-inline-padding-right">$btn-inline-padding-right</a> <a class="css-var-default" href="#btn-inline-padding-bottom">$btn-inline-padding-bottom</a> <a class="css-var-default" href="#btn-inline-padding-left">$btn-inline-padding-left</a></div>|内联按钮内边距|
|<span id="btn-inline-font-size" class="css-var-name">$btn-inline-font-size</span>|<div><RouterLink to="/guide/design-tokens.html#font-size-xs" v-slot="{href}"> <a :href="href">$var(font-size-xs)</a> </RouterLink></div>|内联按钮字体大小|
|<span id="btn-with-tip-padding-top" class="css-var-name">$btn-with-tip-padding-top</span>|<div>10px</div>|带tip按钮padding-top|
|<span id="btn-with-tip-padding-bottom" class="css-var-name">$btn-with-tip-padding-bottom</span>|<div>10px</div>|带tip按钮padding-bottom|
|<span id="btn-with-tip-line-height" class="css-var-name">$btn-with-tip-line-height</span>|<div>1</div>|带tip按钮行高|
|<span id="btn-with-tip-font-size" class="css-var-name">$btn-with-tip-font-size</span>|<div><RouterLink to="/guide/design-tokens.html#font-size-sm" v-slot="{href}"> <a :href="href">$var(font-size-sm)</a> </RouterLink></div>|带tip按钮字体大小|
|<span id="btn-tip-margin-top" class="css-var-name">$btn-tip-margin-top</span>|<div>6px</div>|带tip按钮上边距|
|<span id="btn-tip-font-size" class="css-var-name">$btn-tip-font-size</span>|<div>11px</div>|带tip按钮字体大小|
|<span id="btn-tip-family" class="css-var-name">$btn-tip-family</span>|<div>inherit</div>|带tip按钮字体|
|<span id="btn-tip-weight" class="css-var-name">$btn-tip-weight</span>|<div>inherit</div>|带tip按钮字重|
|<span id="btn-tip-color" class="css-var-name">$btn-tip-color</span>|<div>inherit</div>|带tip按钮文字颜色|
|<span id="btn-tip-line-height" class="css-var-name">$btn-tip-line-height</span>|<div>1.09</div>|带tip按钮文字高度|
|<span id="btn-loading-z-index" class="css-var-name">$btn-loading-z-index</span>|<div>2</div>|loading按钮层叠高度|
|<span id="btn-loading-dot-bgc" class="css-var-name">$btn-loading-dot-bgc</span>|<div><a class="css-var-default" href="#btn-loading-dot-normal-color">$btn-loading-dot-normal-color</a></div>|loading按钮圆点背景颜色|
|<span id="btn-loading-dot-size" class="css-var-name">$btn-loading-dot-size</span>|<div>8px</div>|loading按钮圆点尺寸|
|<span id="btn-loading-dot-spacing-size" class="css-var-name">$btn-loading-dot-spacing-size</span>|<div>8px</div>|loading按钮圆点间隙|
|<span id="btn-loading-duration" class="css-var-name">$btn-loading-duration</span>|<div>2s</div>|loading按钮动画时长|
|<span id="btn-loading-animation-name" class="css-var-name">$btn-loading-animation-name</span>|<div>cube-loading-animation</div>|loading按钮动画名称|
  
</card> 
 

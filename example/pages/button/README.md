## Cube-Button 按钮

<card>

### 介绍

操作按钮，提供了不同的样式、状态以及小程序的按钮功能，常用于触发一个点击操作。

</card>

## 示例

<card>

### 样式

除了默认样式外，可以通过设置 `primary`、`bolder` 、`outline`、`inline`、<!-- @theme: passenger -> start -->`light`<!-- @theme: passenger -> end -->属性来改变按钮的样子，也可以组合多重属性呈现不同的效果。

<!-- @group: btns -> start -->

<!-- @example: btn-secondary -> template no-wrap -->
<!-- @example: btn-primary -> template no-wrap -->
<!-- @example: btn-bolder -> template no-wrap -->
<!-- @example: btn-outline -> template no-wrap -->
<!-- @example: btn-inline -> template no-wrap -->
<!-- @example: btn-light -> template no-wrap -->
<!-- @example: btn-outline-primary -> template no-wrap -->
<!-- @example: btn-inline-outline -> template no-wrap -->
<!-- @example: btn-inline-primary -> template no-wrap -->

<!-- @group: btns -> end -->

</card>

<card>

### 状态

除了默认的正常状态，还可以设置激活、禁用<!-- @theme: passenger -> start -->以及加载中<!-- @theme: passenger -> end -->等状态。

<!-- @group: btns -> start -->

<!-- @example: btn-secondary-active -> template no-wrap -->
<!-- @example: btn-disabled -> template no-wrap -->

<!-- @group: btns -> end -->

<!-- @theme: passenger -> start --><!-- @example: btn-loading --><!-- @theme: passenger -> end -->

</card>

<card>

### 图标<!-- @theme: passenger -> start -->、辅助文案<!-- @theme: passenger -> end -->

可以设置 Icon 的 class，具体可以查看Icon demo。

<!-- @theme: passenger -> start -->可以设置 Tip 属性添加辅助文案。<!-- @theme: passenger -> end -->

- With Icon 按钮
<!-- @example: btn-icon -> template no-wrap -->

<!-- @theme: passenger -> start -->
- With Tip 按钮
<!-- @example: btn-with-tip -> template no-wrap -->
<!-- @theme: passenger -> end -->

</card>

<card>

### 功能

可以通过设置 `openType`、`formType` 等属性，使用小程序的功能并绑定回调。详情参阅[微信 Button 文档](https://developers.weixin.qq.com/miniprogram/dev/component/button.html)以及[支付宝 Button 文档](https://opendocs.alipay.com/mini/component/button)。使用方式如：

- 分享（微信、支付宝）
<!-- @example: btn-share -> template no-wrap -->

- 获取用户手机号（微信、支付宝）

  微信设置 `open-type` 为 `getPhoneNumber`；支付宝设置 ` open-type` 为 `getAuthorize`，设置 `scope` 为 `phoneNumber`。

  由于涉及用户隐私，手机号的获取需要满足一定的条件，详情参见[微信小程序获取手机号](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/getPhoneNumber.html)以及[支付宝小程序获取手机号](https://opendocs.alipay.com/mini/api/getphonenumber)。

<!-- @example: btn-get-phone-number -> template no-wrap -->

- 获取用户信息（微信、支付宝）

  微信设置 `open-type` 为 `getUserInfo`；支付宝设置 ` open-type` 为 `getAuthorize`，设置 `scope` 为 `userInfo`。

  功能使用有一定的限制，详情参见[支付宝小程序获取基础信息](https://opendocs.alipay.com/mini/api/ch8chh)。

<!-- @example: btn-get-user-info -> template no-wrap -->

- 打开授权设置页面（微信、支付宝）
<!-- @example: btn-open-setting -> template no-wrap -->

- 打开客服会话（微信）
<!-- @example: btn-contact -> template no-wrap -->

- 获取用户头像（微信）
<!-- @example: btn-choose-avatar -> template no-wrap -->

- 打开 APP（微信）
<!-- @example: btn-launch-app -> template no-wrap -->

- 关注生活号（支付宝）
<!-- @example: btn-follow-lifestyle -> template no-wrap -->

</card>

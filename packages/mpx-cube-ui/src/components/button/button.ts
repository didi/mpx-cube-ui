import { createComponent } from '../../common/helper/create-component'

const EVENT_CLICK = 'click' // 点击
const EVENT_DISABLED_CLICK = 'disabledClick' // 不可点击状态下的点击
const EVENT_GET_USER_INFO = 'getUserInfo' // 获取用户信息
const EVENT_GET_PHONE_NUMBER = 'getPhoneNumber' // 获取用户手机号
const EVENT_ERROR = 'error' // 错误回调
const EVENT_CONTACT = 'contact' // 客服会话（微信）
const EVENT_OPEN_SETTING = 'openSetting' // 打开授权设置页面（微信）
const EVENT_LAUNCH_APP = 'launchApp' // 打开 APP（微信）
const EVENT_CHOOSE_AVATAR = 'chooseAvatar' // 获取用户头像（微信）
const EVENT_FOLLOW_LIFE_STYLE = 'followLifestyle' // 关注生活号（支付宝）

enum OpenTypeScope {
  PHONE_NUMBER = 'phoneNumber',
  USER_INFO = 'userInfo'
}

createComponent({
  properties: {
    /**
     * @description 激活状态
     * @optional true/false
     */
    active: {
      type: Boolean,
      value: false
    },
    /**
     * @description 禁用状态
     * @optional true/false
     */
    disabled: {
      type: Boolean,
      value: false
    },
    /**
     * @description 加载状态
     * @optional true/false
     */
    loading: {
      type: Boolean,
      value: false
    },
    /**
     * @description 主要的
     * @optional true/false
     */
    primary: {
      type: Boolean,
      value: false
    },
    /**
     * @description 外边框
     * @optional true/false
     */
    outline: {
      type: Boolean,
      value: false
    },
    /**
     * @description 轻按钮
     * @optional true/false
     */
    light: {
      type: Boolean,
      value: false
    },
    /**
     * @description 是否内联
     * @optional true/false
     */
    inline: {
      type: Boolean,
      value: false
    },
    /**
     * @description 图标 Icon，参阅[内置 Icon](http://h5test.intra.xiaojukeji.com/driver-biz/mpx-cube-ui-demo_default/index.html#/pages/icon/index)
     */
    icon: {
      type: String,
      value: ''
    },
    /**
     * @description 辅助文案
     */
    tip: {
      type: String,
      value: ''
    },
    // 文本粗体
    bolder: {
      type: Boolean,
      value: false
    },
    // 微信相关的属性，具体参阅微信[Button文档](https://developers.weixin.qq.com/miniprogram/dev/component/button.html)和支付宝[Button文档](https://opendocs.alipay.com/mini/component/button)
    openType: {
      type: String,
      value: ''
    },
    // 打开 APP 时，向 APP 传递的参数，open-type=launchApp时有效
    appParameter: String,
    // 小程序语言
    lang: {
      type: String,
      value: 'zh_CN'
    },
    // 会话来源，open-type="contact"时有效
    sessionFrom: {
      type: String,
      value: ''
    },
    // 当前标题
    sendMessageTitle: {
      type: String,
      value: ''
    },
    // 当前分享路径
    sendMessagePath: {
      type: String,
      value: ''
    },
    // 截图
    sendMessageImg: {
      type: String,
      value: ''
    },
    // 微信小程序客服会话卡片
    showMessageCard: {
      type: Boolean,
      value: false
    },
    // 用于 form 组件
    formType: {
      type: String,
      value: ''
    },
    /**
     * @description 支付宝小程序中当 open-type 为 getAuthorize 时有效
     * @optional phoneNumber/userInfo
     */
    scope: String,
    // 支付宝生活号 id，必须是当前小程序同主体且已关联的生活号，open-type="lifestyle" 时有效
    publicId: String,
    styleConfig: {
      type: Object,
      value: {}
    }
  },
  computed: {
    btnClass() {
      const res = {
        'cube-btn': true,
        ['cube-btn-' + this.themeType]: this.themeType,
        'cube-btn-inline': this.inline,
        'cube-btn-primary': this.primary,
        'cube-btn-outline': this.outline,
        'cube-btn-outline-primary': this.outline && this.primary,
        'cube-btn-light': this.light,
        'cube-btn_active': this.active,
        'cube-btn_disabled': this.disabled,
        'cube-btn-with-tip': this.tip,
        'cube-btn_bolder': this.bolder,
        'cube-btn-loading': this.loading
      }
      // @ts-ignore
      if (__mpx_mode__ === 'ios' || __mpx_mode__ === 'android') {
        if (this.active) {
          res['cube-btn-primary_active'] = this.primary
          res['cube-btn-outline-primary_active'] = this.outline && this.primary
          res['cube-btn-light_active'] = this.light
          res['cube-btn-outline_active'] = this.outline
        }
      }
      return res
    }
  },
  methods: {
    // @vuese
    // 点击
    onClick(e: WechatMiniprogram.TouchEvent) {
      if (!this.disabled) {
        this.triggerEvent(EVENT_CLICK, e)
      } else {
        this.triggerEvent(EVENT_DISABLED_CLICK, e)
      }
    },
    // @vuese
    // 获取用户信息
    onGetUserInfo(e: WechatMiniprogram.CustomEvent) {
      this.triggerEvent(EVENT_GET_USER_INFO, e)
    },
    // @vuese
    // 获取用户手机号
    onGetPhoneNumber(e: WechatMiniprogram.CustomEvent) {
      this.triggerEvent(EVENT_GET_PHONE_NUMBER, e)
    },
    // @vuese
    // 失败回调
    onError(e) {
      this.triggerEvent(EVENT_ERROR, e)
    },
    // @vuese
    // 微信小程序打开客服会话
    onContact(e: WechatMiniprogram.CustomEvent) {
      this.triggerEvent(EVENT_CONTACT, e)
    },
    // @vuese
    // 微信小程序中在打开授权设置页后回调，open-type="openSetting" 时有效
    onOpenSetting(e: WechatMiniprogram.CustomEvent) {
      this.triggerEvent(EVENT_OPEN_SETTING, e)
    },
    // @vuese
    // 微信小程序打开 APP 成功的回调，open-type=launchApp时有效(参见[微信小程序打开 APP](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/launchApp.html))
    onLaunchApp(e: WechatMiniprogram.CustomEvent) {
      this.triggerEvent(EVENT_LAUNCH_APP, e)
    },
    // @vuese
    // 微信小程序获取用户头像回调，open-type=chooseAvatar时有效
    onChooseAvatar(e: WechatMiniprogram.CustomEvent) {
      this.triggerEvent(EVENT_CHOOSE_AVATAR, e)
    },
    // @vuese
    // 支付宝小程序中当 open-type 为 lifestyle 时有效。当点击按钮时触发。
    onFollowLifestyle(e: WechatMiniprogram.CustomEvent) {
      this.triggerEvent(EVENT_FOLLOW_LIFE_STYLE, e)
    },
    onGetAuthorize(e) {
      if (this.scope === OpenTypeScope.PHONE_NUMBER) {
        this.triggerEvent(EVENT_GET_PHONE_NUMBER, e)
      } else if (this.scope === OpenTypeScope.USER_INFO) {
        this.triggerEvent(EVENT_GET_USER_INFO, e)
      }
    }
  }
})

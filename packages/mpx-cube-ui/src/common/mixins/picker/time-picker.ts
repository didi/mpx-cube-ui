import { getMixin } from '@mpxjs/core'

const DEFAULT_STEP = 10

type NowConfig = {
  text?: string
}

export type MinuteStepConfig = {
  rule?: string
  step?: number
}

type DayConfig = {
  len?: number
  filter?: Array<string>
  format?: string
}

type HourSpan = Array<number>
export default getMixin({
  properties: {
    /**
     * @description 将当前时间向后推算的分钟数，决定了最小可选时间（注：仅当未设置 min 时有效）
     */
    delay: {
      type: Number,
      value: 15
    },
    /**
     * @description 日期配置
     */
    day: {
      type: Object,
      // { len: 3 }
      value: { len: 3 } as DayConfig
    },
    /**
     * @description 是否显示现在（需当前时间在可选范围内）；以及现在选项的文案
     */
    showNow: {
      // boolean,
      // { text: string }
      type: null,
      // true
      value: true as boolean|NowConfig
    },
    // @description 分钟数的步长
    // @optional rule 可选:floor/ceil/round, step 默认10
    minuteStep: {
      // number, { rule?: string, step?: number }
      type: null,
      // 10
      value: DEFAULT_STEP as number|MinuteStepConfig
    },
    /**
     * @description 时间格式
     */
    format: {
      type: String,
      value: 'YYYY/M/D hh:mm'
    },
    /**
     * @description 最小可选时间
     */
    min: {
      type: Number,
      // 根据 delay、minuteStep、hourSpan等计算
      // 默认为 当前时间 + 15 分钟
      value: 0
    },
    /**
     * @description 最大可选时间
     */
    max: {
      type: Number,
      // 根据 min、minuteStep、hourSpan、day 等计算
      // 默认为 min + 3天
      value: 0
    },
    /**
     * 小时范围 [0, 24]，右开区间
     * 最小值0，最大值24
     */
    hourSpan: {
      type: Array,
      value: [0, 24] as HourSpan
    },
    // 是否在手指松开时立即触发 change 事件。若不开启则会在滚动动画结束后触发 change 事件。
    // 微信 webview 特有属性，基础库 2.21.1 及以上； 支付宝需基础库 2.8.7 及以上
    immediateChange: {
      type: Boolean,
      value: false
    }
  },
  computed: {
    _hourSpan() {
      const hourSpan = this.hourSpan as unknown as [number, number]
      let min = hourSpan[0] || 0
      let max = hourSpan[1] || 24
      min = Math.min(Math.max(0, min), 23) // 确保 0 <= min <= 23
      max = Math.max(min + 1, Math.min(24, max)) // 确保 min+1 <= max <= 24
      return {
        min,
        max
      }
    }
  }
})

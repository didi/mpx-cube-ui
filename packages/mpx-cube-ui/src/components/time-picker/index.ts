import { createTimePickerComponent } from '../../common/helper/create-component'
import {
  pad,
  formatDate,
  getZeroStamp,
  getDayDiff,
  DAY_TIMESTAMP,
  HOUR_TIMESTAMP,
  MINUTE_TIMESTAMP
} from '../../common/lang/date'

import { isNumber, isObject } from '../../common/helper/utils'

import { warn } from '../../common/helper/debug'

export const DEFAULT_STEP = 10

const COMPONENT_NAME = 'cube-time-picker'
const EVENT_CHANGE = 'change'
const EVENT_COLUMN_CHANGE = 'columnChange'

const NOW = {
  value: 'now'
}

const INT_RULE = {
  floor: 'floor',
  ceil: 'ceil',
  round: 'round'
} as const

export interface DayConfig {
  len?: number
  filter?: Array<string>
  format?: string
}

interface MinutesColumnItem {
  value: number,
  text: string
}

interface HoursColumnItem {
  value: number | string, // string 是有NOW.now
  text: string,
  children: MinutesColumnItem[]
}

interface DaysColumnItem {
  value: number,
  text: string,
  children: HoursColumnItem[]
}

createTimePickerComponent({
  data: {
    now: new Date(),
    selectedIndex: [0, 0, 0] as number[],
    value: 0
  },
  computed: {
    _day (): Required<DayConfig> {
      const defaultDay: DayConfig = {
        filter: ['今日'],
        format: 'M月D日',
        len: 3
      }
      return Object.assign({}, defaultDay, this.day)
    },
    nowText() {
      const defaultText = '现在'
      const showNow = this.showNow
      return (showNow && isObject(showNow) && showNow.text) || defaultText
    },
    isShowNow() {
      return this.showNow && this.isNowInclude
    },
    isNowInclude() {
      const minTime = +this.minTime
      const maxTime = +this.maxTime
      const now = new Date()
      const nowTime = now.getTime()
      if (nowTime < minTime || nowTime > maxTime) return false
      const hourSpan = this._hourSpan
      const hour = now.getHours()
      if (hour < hourSpan.min || hour > hourSpan.max) return false

      return true
    },
    minuteStepRule() {
      const minuteStep = this.minuteStep || DEFAULT_STEP
      return (isObject(minuteStep) && Math[INT_RULE[minuteStep.rule + '']]) || Math[INT_RULE.floor]
    },
    minuteStepNumber() {
      const minuteStep = this.minuteStep || DEFAULT_STEP
      return isNumber(minuteStep) ? minuteStep : (minuteStep.step || DEFAULT_STEP)
    },
    minTime() {
      const minTimeDate = new Date(this.min || +this.now + this.delay * MINUTE_TIMESTAMP)
      const minHour = Math.max(minTimeDate.getHours(), this._hourSpan.min)
      minTimeDate.setHours(minHour)

      // Handle the minTime selectable change caused by minute step.
      const minute = minTimeDate.getMinutes()
      const intMinute = Math.min(this.minuteStepRule(minute / this.minuteStepNumber) * this.minuteStepNumber, 60)

      const minTimeStamp = +minTimeDate + (intMinute - minute) * MINUTE_TIMESTAMP
      return new Date(minTimeStamp)
    },
    maxTime() {
      let maxTimeStamp = this.max || (getZeroStamp(new Date(+this.minTime + this._day.len * DAY_TIMESTAMP)) - 1)
      const maxTimeDate = new Date(maxTimeStamp)
      const maxHour = Math.min(maxTimeDate.getHours(), this._hourSpan.max - 1)
      maxTimeDate.setHours(maxHour)

      const minute = maxTimeDate.getMinutes()
      const intMinute = Math.floor(minute / this.minuteStepNumber) * this.minuteStepNumber
      maxTimeStamp = +maxTimeDate - (minute - intMinute) * MINUTE_TIMESTAMP

      return new Date(maxTimeStamp)
    },
    days() {
      const days: DaysColumnItem[] = []
      const dayDiff = getDayDiff(this.minTime, this.now)
      const len = this.max ? getDayDiff(this.maxTime, this.minTime) + 1 : this._day.len

      for (let i = 0; i < len; i++) {
        const timestamp = +this.minTime + i * DAY_TIMESTAMP
        days.push({
          value: timestamp,
          text: (this._day.filter && this._day.filter[dayDiff + i]) || formatDate(new Date(timestamp), this._day.format),
          children: []
        })
      }
      return days
    },
    hours() {
      const hours: HoursColumnItem[] = []
      for (let i = this._hourSpan.min; i < this._hourSpan.max; i++) {
        hours.push({
          value: i,
          text: `${i}点`,
          children: this.minutes
        })
      }
      return hours
    },
    minutes() {
      const minutes: MinutesColumnItem[] = []
      for (let i = 0; i < 60; i += this.minuteStepNumber) {
        minutes.push({
          value: i,
          text: `${pad(i)}分`
        })
      }
      return minutes
    },
    cascadeData() {
      const days = this.days.slice()

      // When the maxTime is smaller than minTime by more than a minute step, there is no option could be chosen.
      if (+this.maxTime - +this.minTime <= -60000) {
        warn('The max is smaller than the min optional time.', COMPONENT_NAME)
        return []
      }

      days.forEach((day, index) => {
        const isMinDay = index === 0
        const isMaxDay = index === days.length - 1
        if (!isMinDay && !isMaxDay) {
          day.children = this.hours
          return
        }

        const partHours: HoursColumnItem[] = []
        const minHour = isMinDay ? this.minTime.getHours() : this._hourSpan.min
        const maxHour = isMaxDay ? this.maxTime.getHours() : this._hourSpan.max - 1

        for (let i = minHour; i <= maxHour; i++) {
          const isMinHour = isMinDay && i === minHour
          const isMaxHour = isMaxDay && i === maxHour

          if (!isMinHour && !isMaxHour) {
            partHours.push({
              value: i,
              text: `${i}点`,
              children: this.minutes
            })
            continue
          }

          // Math.round is use to avoid some weird float bug of multiplication and divisionluate in JavaScript. Because we have to ensure the arguments of Array.slice are int.
          const start = isMinHour ? Math.round(this.minTime.getMinutes() / this.minuteStepNumber) : 0
          const end = isMaxHour ? Math.round(this.maxTime.getMinutes() / this.minuteStepNumber) : Math.floor(59 / this.minuteStepNumber)

          const partMinutes = this.minutes.slice(start, end + 1)
          partHours.push({
            value: i,
            text: `${i}点`,
            children: partMinutes
          })
        }

        day.children = partHours
      })
      const dayDiff = Math.abs(getDayDiff(this.minTime, this.now))

      if (this.isShowNow && dayDiff <= 0) {
        const index = Math.abs(dayDiff)
        const daysData = days[index]
        if (daysData) {
          daysData.children = [...daysData.children]
          daysData.children.unshift({
            value: NOW.value,
            text: this.nowText,
            children: []
          })
        }
      }
      return days
    }
  },
  methods: {
    onChange(e) {
      if (this.pending) return
      // 滚动后触发
      // @arg event.detail = { selectedTime, selectedText, formatedTime, selectedIndex }。
      // @arg selectedTime: 当前选中的timestamp；
      // @arg selectedText: 当前选中的时间文案；
      // @arg formatedTime: 格式化日期；
      // @arg selectedIndex: 当前选中的索引。
      this.triggerEvent(EVENT_CHANGE, this.handlerSelectedInfos(e.detail))
    },
    onColumnChange(e) {
      if (this.pending) return
      // 列变化事件，某列选中的 value 及 index 任意一个变化后触发事件
      // @arg event.detail = { column, index, text, value }
      // @arg column 是发生变化的列；index, text, value 分别是变化后的索引、文案、值
      this.triggerEvent(EVENT_COLUMN_CHANGE, e.detail)
    },
    // @vuese
    // 手动设置time-picker组件显示的时间，数据格式为时间戳
    // @arg time：时间戳
    setTime(value: number) {
      // value is timestamp
      this.value = value

      this._updateSelectedIndex()
    },
    _updateSelectedIndex() {
      const value = this.value
      const minTime = this.minTime
      // fix the value last choose was changed when time-picker is opened again
      const comparativeTime = (this.min || this.min === 0)
        ? +minTime
        : Math.floor(+minTime / MINUTE_TIMESTAMP) * MINUTE_TIMESTAMP
      if (value < comparativeTime) {
        this.selectedIndex = [0, 0, 0]
      } else {
        // calculate dayIndex
        const valueDate = new Date(value)
        const dayIndex = getDayDiff(valueDate, minTime)

        if (dayIndex >= this.days.length) {
          warn('Use "setTime" to set a time exceeded to the option range do not actually work.', COMPONENT_NAME)
          return
        }

        // calculate hourIndex
        const hour = valueDate.getHours()
        const beginHour = dayIndex === 0
          ? this.isShowNow
            ? this.minTime.getHours() - 1
            : this.minTime.getHours()
          : 0
        const hourIndex = hour - beginHour

        // calculate minuteIndex
        const minute = this.minuteStepRule(valueDate.getMinutes() / this.minuteStepNumber)
        const beginMinute = !dayIndex && (this.isShowNow ? hourIndex === 1 : !hourIndex)
          ? this.minuteStepRule(this.minTime.getMinutes() / this.minuteStepNumber)
          : 0
        const minuteIndex = minute - beginMinute
        this.selectedIndex = [dayIndex, hourIndex, minuteIndex]
      }
      this.$forceUpdate({
        // setTime 方法在微信小程序中，多次调用不生效
        selectedIndex: this.selectedIndex
      })
    },
    _updateNow() {
      // TODO. 待添加给 show 时使用，用于 delay 字段
      this.now = new Date()
      this.pending = true
      this.$nextTick(() => {
        this.pending = false
      })
    },
    // @vuese
    // 获取当前所有列的选中信息
    // @return { selectedTime, selectedText, formatedTime, selectedIndex }。
    // @return selectedTime: 当前选中的timestamp；
    // @return selectedText: 当前选中的时间文案；
    // @return formatedTime: 格式化日期；
    // @return selectedIndex: 当前选中的索引。
    getSelectedInfo() {
      return this.handlerSelectedInfos(this.$refs.picker.getSelectedInfo())
    },
    handlerSelectedInfos(infos) {
      const { selectedVal, selectedText, selectedIndex } = infos
      let timestamp
      let text
      if (selectedVal[1] === NOW.value) {
        timestamp = +new Date()
        text = this.nowText
      } else {
        timestamp = getZeroStamp(new Date(selectedVal[0])) + selectedVal[1] * HOUR_TIMESTAMP + selectedVal[2] * MINUTE_TIMESTAMP
        text = selectedText[0] + ' ' + selectedText[1] + ':' + selectedText[2]
      }

      const formatedTime = formatDate(new Date(timestamp), this.format)
      return {
        selectedTime: timestamp,
        selectedText: text,
        formatedTime,
        selectedIndex: [...selectedIndex]
      }
    }
  }
})

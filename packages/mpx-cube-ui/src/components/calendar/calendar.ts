import { createComponent } from '@mpxjs/core'
import {
  getWeekInMonth,
  getWeeksCountInMonth,
  getRangeDaysCount,
  getDaysCountInMonth,
  getDayInWeek,
  getDateObj
} from './utils'

const EVENT_SELECT = 'select'

createComponent({
  options: {
    multipleSlots: true,
    styleIsolation: 'shared'
  },
  properties: {
    min: {
      type: Number,
      value: +new Date(2016, 2, 12)
    },
    // 可选日期的最大时间
    max: {
      type: Number,
      value: +new Date(2016, 4, 14)
    },
    // 可选的最大范围，0 为不限制
    maxRange: {
      type: Number,
      value: 30
    },
    // 选择开始、结束时间时展示tip
    showTip: {
      type: Boolean,
      value: true
    },
    // 日期默认值，区间选择Array格式
    defaultDate: {
      type: Array,
      value: []
    },
    height: {
      type: String,
      value: '300px'
    }
  },
  data: {
    scrollEvents: ['scroll'],
    days: ['日', '一', '二', '三', '四', '五', '六'],
    dateList: [],
    selectDateSet: [] as any[], // 记录已选起始和结束的时间
    dateClass: '',
    errTipTxt: '最多选择30天',
    angleOffset: {},
    agoClickIndex: {
      listIndex: null,
      weekInMonthIndex: null,
      index: null
    },
    toastText: ''
  },
  watch: {
    selectDateSet(v) {
      const startDate = v[0] && v[0].date
      const endDate = v.length > 1 ? v[v.length - 1].data : null
      this.triggerEvent('dateChange', {
        value: {
          len: v.length,
          startDate,
          endDate
        }
      })
    }
  },
  lifetimes: {
    ready() {
      this.getRangeDateArray()
      this.reset(this.defaultDate)
    }
  },
  methods: {
    itemClick(item, index) {
      // 点击某项时触发
      this.triggerEvent(EVENT_SELECT, { item, index })
    },
    selectDate(item, listIndex, weekInMonthIndex, index) {
      let selectDaysCount = 0
      if (item.disable || !item.date) return
      this.resetDateRender(item)
      // 选择开始时间
      if (!this.selectDateSet.length) {
        this.selectDateSet.push(item)
      } else {
        // 选择结束时间
        selectDaysCount = getRangeDaysCount(+(this.selectDateSet[0] as any).date, item.date)
        if (this.maxRange && selectDaysCount > this.maxRange) {
          this.toastText = `最多选择${this.maxRange}天`
          this.$refs.toast.show()
          return
        }
        if (selectDaysCount > 0) {
          this.renderSelectedRangeDate(this.selectDateSet[0], item)
        }
      }
      if (item.date) {
        // eslint-disable-next-line
        let currentDate = (this.dateList[listIndex] as any).dateArr[weekInMonthIndex][index]
        const { date: selectStartTime } = this.selectDateSet[0]
        const { date: selectEndTime } = this.selectDateSet[this.selectDateSet.length - 1]
        if (currentDate.date === selectStartTime || currentDate.date === selectEndTime) {
          // eslint-disable-next-line
          currentDate['active'] = true
        }
        this.agoClickIndex = { listIndex, weekInMonthIndex, index }
      }
    },
    reset(dateRange) {
      if (dateRange && dateRange.length === 2) {
        this.clear()
        const startDateObj = getDateObj(dateRange[0])
        const endDateObj = getDateObj(dateRange[1])
        this.selectDateSet.push(startDateObj)
        this.renderSelectedRangeDate(startDateObj, endDateObj)
        this.resetSelectDate()
        this.$set(this.selectDateSet[0], 'active', true)
        this.$set(this.selectDateSet[this.selectDateSet.length - 1], 'active', true)
      }
    },
    clear() {
      if (!this.selectDateSet || !this.selectDateSet.length) { return }
      this.selectDateSet.forEach((item, index) => {
        this.$set(item, 'dateClass', '')
        item.active && this.$set(item, 'active', false)
      })
      this.selectDateSet = []
    },
    resetSelectDate() {
      const { listIndex, weekInMonthIndex, index } = this.agoClickIndex
      if (listIndex !== null && weekInMonthIndex !== null && index !== null) {
        // eslint-disable-next-line
        (this.dateList[listIndex] as any).dateArr[weekInMonthIndex][index]['active'] = false
      }
    },
    resetDateRender(item) {
      if (this.selectDateSet.length && (this.selectDateSet.length >= 2 || item.date <= this.selectDateSet[0].date)) {
        this.resetSelectDate()
        for (let i = 0; i < this.selectDateSet.length; i++) {
          this.$set(this.selectDateSet[i], 'dateClass', '')
          this.$set(this.selectDateSet[i], 'active', false)
          // 遍历重置样式后，清空数组
          if (i === this.selectDateSet.length - 1) {
            this.selectDateSet.length = 0
          }
        }
      }
    },
    getMonthDateGroup(year, month) {
      let monthGroupIndex
      let monthGroupData = '' as any

      monthGroupData = this.dateList.find((item: any, index) => {
        if (item.year === year && item.month === month) {
          monthGroupIndex = index
          return item
        }
        return ''
      })
      return {
        data: monthGroupData,
        index: monthGroupIndex
      }
    },
    renderSelectedRangeDate(startDateObj, endDateObj) {
      let startDateWeekInMonth = startDateObj.weekInMonth
      let endDateWeekInMonth = endDateObj.weekInMonth
      let startDateInWeek = startDateObj.dayInWeek
      const startMonthIndex = this.getMonthDateGroup(startDateObj.year, startDateObj.month).index
      const endMonthIndex = this.getMonthDateGroup(endDateObj.year, endDateObj.month).index
      let monthDateGroup
      for (let currentMonthIndex = startMonthIndex; currentMonthIndex <= endMonthIndex; currentMonthIndex++) {
        monthDateGroup = this.dateList[currentMonthIndex]

        if (currentMonthIndex !== startMonthIndex) {
          startDateInWeek = 0
          startDateWeekInMonth = 0
        } else {
          startDateWeekInMonth = startDateObj.weekInMonth
          startDateInWeek = startDateObj.dayInWeek
        }
        endDateWeekInMonth = currentMonthIndex !== endMonthIndex
          ? monthDateGroup.dateArr.length - 1 // 取该月最后一周
          : endDateObj.weekInMonth
        this.renderDateInOneMonth(startDateInWeek, monthDateGroup, startDateWeekInMonth, endDateWeekInMonth, endDateObj.date)
      }
      this.selectDateSet.length && this.selectDateSet.shift()
    },
    renderDateInOneMonth(startDateInWeek, monthDateGroup, startDateWeekInMonth, endDateWeekInMonth, endDate) {
      let day = startDateInWeek
      const rangeArr = []
      let weekDateGroup
      let dateClass

      const endDateTimestamp = new Date(endDate).setHours(0, 0, 0, 0)
      for (let week = startDateWeekInMonth; week <= endDateWeekInMonth; week++) {
        weekDateGroup = monthDateGroup.dateArr[week]

        for (day; day <= 7; day++) {
          if (day === 7) {
            day = 0
            break
          }

          // 渲染开始日期样式
          const selectDateSetTime = new Date(this.selectDateSet[0].date).setHours(0, 0, 0, 0)

          if (weekDateGroup[day].date === +selectDateSetTime) {
            this.$set(weekDateGroup[day], 'dateClass', 'start-date')
          }
          dateClass = weekDateGroup[day].dateClass && weekDateGroup[day].date
            ? `${weekDateGroup[day].dateClass} transition-date`
            : 'transition-date'
          this.$set(weekDateGroup[day], 'dateClass', dateClass)
          rangeArr.push(weekDateGroup[day] as never)
          if (weekDateGroup[day].date >= +endDateTimestamp) {
            break
          }
        }
      }
      this.selectDateSet = [...this.selectDateSet, ...rangeArr]

      // 渲染结束日期样式
      if (this.selectDateSet.length >= 2 && +weekDateGroup[day].date === +(this.selectDateSet[this.selectDateSet.length - 1] as any).date) {
        this.$set(weekDateGroup[day], 'dateClass', weekDateGroup[day].dateClass ? `${weekDateGroup[day].dateClass} end-date` : 'end-date')
      }
    },
    getRangeDateArray() {
      // TODO: 校验传入的日期格式
      const minDate = new Date(this.min)
      const maxDate = new Date(this.max)
      const minYear = minDate.getFullYear()
      const maxYear = maxDate.getFullYear()
      const minMonth = minDate.getMonth() + 1
      const maxMonth = maxDate.getMonth() + 1

      if (this.min >= this.max) {
        this.toastText = '传入props错误：时间的max值应大于min值！'
        this.$refs.toast.show()
        // console.warn('传入props错误：时间的max值应大于min值！')
        return
      }

      for (let year = minYear; year <= maxYear; year++) {
        const monthLowerLimit = year === minYear ? minMonth : 1
        const monthUpperLimit = year === maxYear ? maxMonth : 12
        for (let month = monthLowerLimit; month <= monthUpperLimit; month++) {
          this.dateList.push(this.getCurrentMonthDaysArray(year, month) as never)
        }
      }
    },
    getCurrentMonthDaysArray(year, month) {
      const days = getDaysCountInMonth(year, month)
      const weeksCountInMonth = getWeeksCountInMonth(year, month)
      // 根据周数，初始化二维数组
      const daysArray = [] as any[]
      for (let i = 0; i < weeksCountInMonth; i++) {
        daysArray[i] = []
      }

      // 当月日历面板中的排列
      for (let day = 1; day <= days; day++) {
        const currentWeekInMonth = getWeekInMonth(year, month, day)
        const disable = +new Date(year, month - 1, day) < this.min || +new Date(year, month - 1, day) > this.max
        daysArray[currentWeekInMonth - 1].push({
          day,
          month,
          year,
          date: +new Date(year, month - 1, day),
          dayInWeek: getDayInWeek(year, month, day),
          weekInMonth: currentWeekInMonth - 1,
          active: false,
          disable
        })
      }
      this.fillDaysInMonth(year, month, days, weeksCountInMonth, daysArray)

      return {
        title: `${year}年${month}月`,
        dayCount: days,
        year,
        month,
        dateArr: [...daysArray]
      }
    },
    fillDaysInMonth(year, month, days, weeksCountInMonth, daysArray) {
      const firstDayInWeek = getDayInWeek(year, month, 1)
      const lastDayInWeek = getDayInWeek(year, month, days)
      if (firstDayInWeek !== 0) {
        const fillArr = [...new Array(firstDayInWeek).fill({ date: '' })]
        daysArray[0] = [...fillArr, ...daysArray[0]]
      }
      if (lastDayInWeek !== 6) {
        const fillArr = [...new Array(6 - lastDayInWeek).fill({ date: '' })]
        daysArray[weeksCountInMonth - 1] = [...daysArray[weeksCountInMonth - 1], ...fillArr]
      }
    },
    getSelectDate() {
      const startDateObj = this.selectDateSet[0] || {}
      const endDateObj = this.selectDateSet[this.selectDateSet.length - 1] || {}

      return [{
        date: startDateObj.date,
        year: startDateObj.year,
        month: startDateObj.month,
        day: startDateObj.day
      }, {
        date: endDateObj.date,
        year: endDateObj.year,
        month: endDateObj.month,
        day: endDateObj.day
      }]
    }
  }
})

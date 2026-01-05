/**
 * 获得某天在当月是第几周
 * @param a
 * @param b
 * @param c
 * @returns {number}
 */
function getWeekInMonth(a, b, c) {
  const date = new Date(a, parseInt(b) - 1, c)
  const w = date.getDay()
  const d = date.getDate()
  return Math.ceil((d + 6 - w) / 7)
}

/**
 * 获取本月有几周
 * @param year
 * @param month
 * @returns {number}
 */
function getWeeksCountInMonth(year, month) {
  const firstDayInWeek = getDayInWeek(year, month, 1)
  const daysCountInMonth = getDaysCountInMonth(year, month)
  let weekCount

  if (daysCountInMonth === 31 && (firstDayInWeek === 5 || firstDayInWeek === 6)) {
    weekCount = 6
  } else if (daysCountInMonth === 30 && firstDayInWeek === 6) {
    weekCount = 6
  } else if (daysCountInMonth === 28 && firstDayInWeek === 0) {
    weekCount = 4
  } else {
    weekCount = 5
  }
  return weekCount
}

/**
 * 计算时间差（天数）
 * @param startDate
 * @param endDate
 * @returns {number}
 */
function getRangeDaysCount(startDate, endDate) {
  // TODO:
  return Math.floor((endDate - startDate) / (24 * 3600 * 1000) + 1)
}

/**
 * 计算一个月有几天
 * @param year
 * @param month
 * @returns {number}
 */
function getDaysCountInMonth(year, month) {
  return new Date(year, month, 0).getDate()
}

/**
 * 计算某天是周几
 * @param year
 * @param month
 * @param day
 * @returns {number}
 */
function getDayInWeek(year, month, day) {
  return new Date(`${year}/${month}/${day}`).getDay()
}

/**
 * 获取日期对象
 * @param inpuDate
 * @returns {{date: *, month: number, year: number, day: number, dayInWeek: number, weekInMonth: number}}
 */
function getDateObj(inpuDate) {
  const date = new Date(inpuDate)
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  const day = date.getDate()

  return {
    date,
    month,
    year,
    day,
    dayInWeek: getDayInWeek(year, month, day),
    weekInMonth: getWeekInMonth(year, month, day) - 1
  }
}

export {
  getWeekInMonth,
  getWeeksCountInMonth,
  getRangeDaysCount,
  getDaysCountInMonth,
  getDayInWeek,
  getDateObj
}

import { createDatePickerComponent } from '../../common/helper/create-component'

import { computeNatureMaxDay, formatType } from '../../common/lang/date'
import {
  deepAssign,
  findIndex,
  isNumber,
  isArray,
  isDate
} from '../../common/helper/utils'

interface DatePickerColumnItem {
  text: string,
  value: number,
  order?: number,
  isMax? : boolean,
  isMin? : boolean,
  year? : number
}

type DatePickerColumn = DatePickerColumnItem[]

const EVENT_CHANGE = 'change'
const EVENT_COLUMN_CHANGE = 'columnChange'

const TYPE_LIST = ['year', 'month', 'date', 'hour', 'minute', 'second']

const NATURE_BOUNDARY_MAP = {
  month: {
    natureMin: 1,
    natureMax: 12
  },
  date: {
    natureMin: 1,
    natureMax: 31
  },
  hour: {
    natureMin: 0,
    natureMax: 23
  },
  minute: {
    natureMin: 0,
    natureMax: 59
  },
  second: {
    natureMin: 0,
    natureMax: 59
  }
}

const DEFAULT_FORMAT = {
  year: 'YYYY',
  month: 'M',
  date: 'D',
  hour: 'hh',
  minute: 'mm',
  second: 'ss'
}
function dateToArray(date: Date) {
  return [date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()] as const
}

createDatePickerComponent({
  data: {
    pickerSelectedIndex: [] as Array<number>,
    valueArray: [] as Array<number>,
    pickerList: [] as DatePickerColumn[]
  },
  computed: {
    _value() {
      const value = this.value || +new Date()
      if (isArray(value) && value.length === 0) {
        return value
      } else if (isNumber(value)) {
        return new Date(value)
      } else {
        return value
      }
    },
    _min() {
      const min = this.min || new Date(2010, 0, 1)
      if (isNumber(min)) {
        return new Date(min)
      }
      return this.min
    },
    _max() {
      const max = this.max || new Date(2020, 11, 31)
      if (isNumber(max)) {
        return new Date(max)
      }
      return this.max
    },
    formatConfig() {
      const formatConfig = Object.assign({}, DEFAULT_FORMAT)
      deepAssign(formatConfig, this.format)

      return formatConfig
    },
    natureRangeCache() {
      const natureRangeCache = {
        hour: [],
        minute: [],
        second: []
      }

      Object.keys(natureRangeCache).forEach((key) => {
        natureRangeCache[key] = this.range(key, NATURE_BOUNDARY_MAP[key].natureMin, NATURE_BOUNDARY_MAP[key].natureMax)
      })

      return natureRangeCache
    },
    startIndex() {
      // 0 表示第一列是年，1表示第一列是月
      const startIndex = TYPE_LIST.indexOf(this.startColumn)
      return startIndex < 0 ? 0 : startIndex
    },
    minArray() {
      return isDate(this._min)
        ? dateToArray(this._min).slice(this.startIndex, this.startIndex + this.columnCount)
        : this._min
    },
    maxArray() {
      return isDate(this._max)
        ? dateToArray(this._max).slice(this.startIndex, this.startIndex + this.columnCount)
        : this._max
    },
    merge() {
      return [this.minArray, this.maxArray, this._value, this.startIndex, this.columnCount, this.format]
    }
  },
  watch: {
    merge() {
      this.generateData(this.startIndex, 0)
    },
    _value() {
      this.initValue()
      this.generateData(this.startIndex, 0)
    }
  },
  lifetimes: {
    attached() {
      this.initValue()
      this.generateData(this.startIndex, 0)
    }
  },
  methods: {
    onColumnChange(e) {
      const { column } = e.detail
      let { index: newIndex } = e.detail
      newIndex = this.pickerList[column].length <= newIndex ? 0 : newIndex
      const oldSelected = this.pickerSelectedIndex.slice()
      const oldPickerList = this.pickerList.slice()
      if (newIndex === oldSelected[column]) return

      this.updateValueArray(column, newIndex)
      this.generateData(this.startIndex, 0)
      this._columnChangeTrigger(oldPickerList, oldSelected, column)
      // 滚动后触发
      // @arg event.detail = { date, selectedIndex, selectedText, selectedVal } date 表当前选中日期，Date 类型；其他每个属性都是数组，是当前所有列的选中信息； 分别表示被选中的索引、文案、值
      this.triggerEvent(EVENT_CHANGE, this.getSelectedInfo())
    },
    _columnChangeTrigger(oldList, oldIndex, start) {
      const newList = this.pickerList
      const newIndex = this.pickerSelectedIndex
      // 新列长度原因：若旧列长度不够时，直接触发。若旧列长度比新列长，消失的列派发啥事件？
      for (let i = start; i < newIndex.length && newList[i].length; i++) {
        const oldSelected = oldIndex[i]
        const newSelected = newIndex[i]
        if (
          oldIndex.length < i ||
          newIndex[i] !== oldIndex[i] ||
          !oldList[i][oldSelected] ||
          newList[i][newSelected].value !== oldList[i][oldSelected].value
        ) {
          // 列变化事件，某列选中的 value 及 index 任意一个变化后触发事件
          // @arg event.detail = { column, index, text, value } column 是发生变化的列；index, text, value 分别是变化后的索引、文案、值
          this.triggerEvent(EVENT_COLUMN_CHANGE, {
            column: i,
            index: newIndex[i],
            text: newList[i][newSelected].text,
            value: newList[i][newSelected].value
          })
        }
      }
    },
    initValue() {
      this.valueArray = isDate(this._value)
        ? dateToArray(this._value).slice(this.startIndex, this.startIndex + this.columnCount)
        : this._value
    },
    arrayToDate(selectedVal) {
      // see issues https://github.com/microsoft/TypeScript/issues/4130
      const args: [number, number, number, number, number, number] = [0, 0, 0, 0, 0, 0]
      const defaultDateArray = dateToArray(new Date(0))

      for (let i = 0; i < 6; i++) {
        if (i < this.startIndex) {
          args[i] = defaultDateArray[i]
        } else if (i >= this.startIndex + this.columnCount) {
          args[i] = NATURE_BOUNDARY_MAP[TYPE_LIST[i]].natureMin
        } else {
          args[i] = selectedVal[i - this.startIndex]
        }
      }
      // Month need to subtract 1.
      args[1]--
      return new Date(...args)
    },
    range(type, min, max, fatherIsMin?, fatherIsMax?, year?) {
      const arr: DatePickerColumnItem[] = []
      const format = this.formatConfig[type]
      for (let i = min; i <= max; i++) {
        const object: DatePickerColumnItem = {
          text: formatType(type, format, i, 'i'),
          value: i,
          order: this.columnOrder.indexOf(type)
        }

        if (fatherIsMin && i === min) object.isMin = true
        if (fatherIsMax && i === max) object.isMax = true
        if (year) object.year = year

        arr.push(object)
      }
      return arr
    },
    generateData(i, count) {
      const list: DatePickerColumn[] = []
      const selectedIndex: number[] = []
      const [valueArray, minArray, maxArray] = [this.valueArray, this.minArray, this.maxArray]
      while (count < this.columnCount && i < 6) {
        const preIndex = count - 1
        if (count === 0) {
          const min = i === 0 ? minArray[0] : Math.max(minArray[0], NATURE_BOUNDARY_MAP[TYPE_LIST[i]].natureMin)
          const max = i === 0 ? this.maxArray[0] : Math.min(maxArray[0], NATURE_BOUNDARY_MAP[TYPE_LIST[i]].natureMax)
          list.push(this.range(TYPE_LIST[i], min, max, true, true))
        } else {
          const preSelect = list[preIndex][selectedIndex[preIndex]]
          const [preIsMin, preIsMax] = [preSelect.isMin, preSelect.isMax]
          if (i < 3 || preIsMin || preIsMax) {
            const natureMax = i === 2 ? computeNatureMaxDay(preSelect.value, preSelect.year) : NATURE_BOUNDARY_MAP[TYPE_LIST[i]].natureMax
            const min = preIsMin ? Math.max(this.minArray[count], NATURE_BOUNDARY_MAP[TYPE_LIST[i]].natureMin) : NATURE_BOUNDARY_MAP[TYPE_LIST[i]].natureMin
            const max = preIsMax ? Math.min(this.maxArray[count], natureMax) : natureMax
            const storageYear = (i === 1 && this.startIndex === 0 && this.columnCount >= 3) ? preSelect.value : 0

            list.push(this.range(TYPE_LIST[i], min, max, preIsMin, preIsMax, storageYear))
          } else {
            list.push(this.natureRangeCache[TYPE_LIST[i]])
          }
        }
        const index = findIndex(list[count], (item: DatePickerColumnItem) => {
          return valueArray[count] >= 0 ? item.value === valueArray[count] : false
        })
        selectedIndex.push(Math.max(0, index))
        count++
        i++
      }
      this.pickerList = list
      this.pickerSelectedIndex = selectedIndex
    },
    updateValueArray(i, newIndex) {
      const [
        valArray, minArray, maxArray, startIndex
      ] = [this.valueArray, this.minArray, this.maxArray, +this.startIndex]

      const { value, isMin, isMax } = this.pickerList[i][newIndex]

      valArray.splice(i, 1, value) // 更新第 i 列的选中值
      let preIsMin = isMin
      let preIsMax = isMax
      // 从第 i+1 列开始。因第 i 列选中值变化，后续列的值可能会需要修正。
      while (++i < valArray.length) {
        const nowV = valArray[i]
        let value = -1
        if (preIsMin && nowV < minArray[i]) { // 前列选中最小值后，当前选择是否小于最小值
          value = minArray[i]
        } else if (preIsMax && nowV > maxArray[i]) { // 前列选中最大值后，当前选择是否大于最大值
          value = NATURE_BOUNDARY_MAP[TYPE_LIST[i + startIndex]].natureMin
        } else if (i === 2 && startIndex === 0) { // 从年开始，判断日
          const natureMin = NATURE_BOUNDARY_MAP[TYPE_LIST[i + startIndex]].natureMin
          const natureMax = computeNatureMaxDay(valArray[i - 1], valArray[i - 2])
          value = nowV > natureMax ? natureMin : value
        } else if (i === 1 && startIndex === 1) { // 从月开始，判断日
          const natureMin = NATURE_BOUNDARY_MAP[TYPE_LIST[i + startIndex]].natureMin
          const natureMax = computeNatureMaxDay(nowV)
          value = nowV > natureMax ? natureMin : value
        }
        if (value > -1) valArray.splice(i, 1, value)
        preIsMin = preIsMin && valArray[i] === minArray[i]
        preIsMax = preIsMax && valArray[i] === maxArray[i]
      }
    },
    // @vuese
    // 获取当前所有列的选中信息
    // @return { date, selectedIndex, selectedText, selectedVal }
    // @return date 表当前选中日期，Date 类型；其他每个属性都是数组，是当前所有列的选中信息；分别表示被选中的索引、文案、值
    getSelectedInfo(): {
      selectedIndex: Array<number>,
      selectedText: Array<number|string>,
      selectedVal: Array<number|string>,
      date?: Date
      } {
      const selectedText: (number|string)[] = []
      const selectedVal: (number|string)[] = []
      const list = this.pickerList
      this.pickerSelectedIndex.forEach((item, index) => {
        const node = list[index][item]
        selectedText[index] = node.text
        selectedVal[index] = node.value
      })
      return {
        date: this.arrayToDate(selectedVal),
        selectedIndex: [...this.pickerSelectedIndex],
        selectedText,
        selectedVal
      }
    }
  }
})

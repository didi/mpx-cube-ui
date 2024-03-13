import { createPickerComponent } from '../../common/helper/create-component'

import { PickerColumn } from '../picker/index'
import { isUndef } from '../../common/helper/utils'

/**
 *  @typedocFollow  { 有循环，不进行ts读取，直接读取注释内容 }
 *  {<br>&nbsp;&nbsp;text: string\|number;<br>&nbsp;&nbsp;value: any;<br>&nbsp;&nbsp;order?: number;<br>&nbsp;&nbsp;children?: CascadePickerSubTree[]<br>}
 * */
export interface CascadePickerSubTree {
  text: string | number,
  value: any,
  order?: number,
  children?: CascadePickerSubTree[]
}

const EVENT_CHANGE = 'change'
const EVENT_COLUMN_CHANGE = 'columnChange'
const EVENT_PENDING_CHANGE = 'pendingChange'

createPickerComponent({
  properties: {
    // 级联选择器的树形数据，用于初始化选项
    list: {
      type: Array,
      value: [] as CascadePickerSubTree[]
    },
    /**
     * @description 是否异步加载数据
     */
    async: {
      type: Boolean,
      value: false
    }
  },
  data: {
    pending: false,
    cascadeData: [] as CascadePickerSubTree[],
    pickerList: [] as PickerColumn[],
    pickerSelectedIndex: [] as number[],
    oldIndex: [] as number[]
  },
  watch: {
    pending(newV) {
      // async 为 true 时使用，组件等待数据及数据更新时触发
      // @arg e.detail = { pending }，pending 为 true/false。更新时为 false，等待时为 true
      this.triggerEvent(EVENT_PENDING_CHANGE, { pending: newV })
    }
  },
  lifetimes: {
    attached() {
      this.cascadeData = this.list.slice() as CascadePickerSubTree[]
      this.pickerSelectedIndex = this.selectedIndex.slice() as number[]
      this.oldIndex = this.selectedIndex.slice() as number[]
      this._updatePickerData()
      this._watchChangeEvent()
    }
  },
  methods: {
    _watchChangeEvent() {
      this.$watch(() => {
        const { selectedIndex, selectedVal } = this.getSelectedInfo()
        return [selectedIndex, selectedVal]
      }, () => {
        if (this.pending) return
        // 滚动后触发
        // @arg event.detail = { selectedIndex, selectedText, selectedVal }
        // @arg 每个属性都是数组，是当前所有列的选中信息；
        // @arg 分别表示被选中的索引、文案、值
        this.triggerEvent(EVENT_CHANGE, this.getSelectedInfo())
      })
    },
    // @vuese
    // 更新 picker 的数据及选中值
    // @arg list 为每一列的数据
    // @arg index 为每一列的数据选中的索引
    updateData(data: CascadePickerSubTree[], selectedIndex: number[]) {
      if (!data) data = this.cascadeData
      this.cascadeData = data.slice()
      this.oldIndex = this.pickerSelectedIndex.slice()
      this.pickerSelectedIndex = selectedIndex.slice()
      this._updatePickerData()
    },
    // @vuese
    // 更新 picker 的数据
    // @arg list 为每一列的数据
    updateList(data: CascadePickerSubTree[]) {
      this.oldIndex = this.pickerSelectedIndex.slice()
      this.cascadeData = data.slice()
      this._updatePickerData()
    },
    // @vuese
    // 更新 picker 的选中值
    // @arg index 为每一列的数据选中的索引
    updateIndex(selectedIndex: number[]) {
      this.oldIndex = this.pickerSelectedIndex.slice()
      this.pickerSelectedIndex = selectedIndex.slice()
      this._updatePickerData()
    },
    _updatePickerData(fromColumn = 0) {
      this.pending = false
      const originfromColumn = fromColumn

      const oldList = this.pickerList.slice()
      const oldIndex = this.oldIndex

      let data: CascadePickerSubTree[]|null = this.cascadeData
      let i = 0
      while (data) {
        if (i >= fromColumn) {
          const columnData: PickerColumn = data.map(item => {
            return {
              value: item.value,
              text: item.text,
              order: item.order
            }
          })
          this.pickerSelectedIndex[i] = fromColumn === 0
            ? (this.pickerSelectedIndex[i] < data.length ? this.pickerSelectedIndex[i] || 0 : 0)
            // 保证子列选中值不变。若新子列不存在旧的选中值，则为0；若存在则为在新列中的index
            : this.findSameIndex(i, columnData)
          this.pickerList[i] = columnData
        }
        const children = data[this.pickerSelectedIndex[i]] && data[this.pickerSelectedIndex[i]].children
        i++
        if (data.length && !isUndef(children)) {
          data = children
        } else {
          data = null
        }
      }

      if (i < this.pickerList.length) {
        this.pickerList.splice(i, this.pickerList.length - i)
      }
      this.pickerList = this.pickerList.slice()
      this._columnChangeTrigger(oldList, oldIndex, originfromColumn)
    },
    onColumnChange(e) {
      const { column, text, value, index } = e.detail
      if (index === this.pickerSelectedIndex[column]) return
      this.oldIndex = this.pickerSelectedIndex.slice()
      this.pickerSelectedIndex.splice(column, 1, index)

      // 列变化事件，某列选中的 value 及 index 任意一个变化后触发事件
      // @arg event.detail = { column, index, text, value }
      // @arg column 是发生变化的列；index, text, value 分别是变化后的索引、文案、值
      this.triggerEvent(EVENT_COLUMN_CHANGE, {
        column,
        index,
        text,
        value
      })

      if (this.async) {
        // 用于阻止更新数据时，用户点击 popup 中的确定而获取到错误的数据
        this.pending = column !== this.pickerList.length - 1
      } else {
        this._updatePickerData(column + 1)
      }
    },
    _columnChangeTrigger(oldList, oldIndex, start) {
      if (!oldList || !oldList.length) return
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
          this.triggerEvent(EVENT_COLUMN_CHANGE, {
            column: i,
            index: newIndex[i],
            text: newList[i][newSelected].text,
            value: newList[i][newSelected].value
          })
        }
      }
    },
    findSameIndex(
      index: number,
      data: PickerColumn
    ): number {
      let dist = 0
      const oldData = this.pickerList[index]
      const oldIndex = this.pickerSelectedIndex[index]
      if (oldData.length) {
        const oldValue = oldData[oldIndex].value
        for (let i = 0; i < data.length; i++) {
          if (data[i].value === oldValue) {
            dist = i
            break
          }
        }
      }
      return dist
    },
    // @vuese
    // 获取当前所有列的选中信息
    // @return { selectedIndex, selectedText, selectedVal }
    // @return 每个属性都是数组，是当前所有列的选中信息；
    // @return 分别表示被选中的索引、文案、值。
    getSelectedInfo() {
      const selectedText: (number|string)[] = []
      const selectedVal: any[] = []
      const pickerList = this.pickerList
      this.pickerSelectedIndex.forEach((item, index) => {
        const node = pickerList[index][item]
        if (node) {
          selectedText[index] = node.text
          selectedVal[index] = node.value
        }
      })
      return {
        selectedIndex: [...this.pickerSelectedIndex],
        selectedText,
        selectedVal
      }
    }
  }
})

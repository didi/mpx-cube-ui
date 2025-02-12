import { createPickerComponent } from '../../common/helper/create-component'
import { findIndex, isNumber, isWeb } from '../../common/helper/utils'

export interface PickerColumnItem {
  text: string | number,
  value: any,
  order?: number
  richText?: string // 用于富文本
  id?: string
}

export type PickerColumn = PickerColumnItem[] & { id?: string }

const EVENT_CHANGE = 'change'
const EVENT_COLUMN_CHANGE = 'columnChange'

createPickerComponent({
  options: {
    multipleSlots: true
  },
  properties: {
    /**
     * 选项超长时 numberOfLines 可以设置为 1，表示显示一行，超出部分显示省略号
     * @optional 0/1
     */
    numberOfLines: {
      type: Number,
      value: 0
    }
  },
  data: {
    finalList: [] as PickerColumn[],
    finalIndex: [] as number[],
    pickchange: 0,
    updateFinish: true
  },
  computed: {
    order() {
      return this.finalList.map((item, index) => {
        const _order = item[0] && item[0].order
        return isNumber(_order) ? _order : index
      })
    },
    rootClass() {
      return {
        'cube-picker': true,
        [`cube-picker-${this.themeType}`]: this.themeType,
        'cube-picker-ellipsis': this.numberOfLines
      }
    }
  },
  watch: {
    pickchange(newV, oldV) {
      if (newV - oldV >= 2) {
        // 2次以上在同一个 tick 里，说明是 props 改变导致派发了 scrollTo，不触发 change
        return
      }
      const e = this.changeEvent
      const eventValue = e.detail.value as number[]
      const index = this.finalIndex
      const list = this.finalList
      const column = findIndex(eventValue, (item, i) => {
        const indexChanged = item !== index[i]
        return indexChanged
      })
      if (column === -1) {
        // 只触发一次，且发现新、旧选中 index 无变化，不触发 change
        return
      }
      if (this.finalList[column].length === 0) {
        // 特殊情况，类似QA #11.12，但是在新列无数据时触发。
        // 比如 time-picker 选中在第三列未结束时，选中第二列的“现在”
        // 此时“现在”滚动结束，第三例设为空，第三列停止后无数据，不派发事件
        return
      }
      let newColumnIndex = eventValue[column]
      if (this.finalList[column].length <= newColumnIndex) {
        // see QA #11.12
        newColumnIndex = 0
        if (!isWeb) {
          this.$nextTick(() => {
            // QA #11.12。此时下方的 finalIndex.splice 失效
            this.$forceUpdate({
              finalList: this.finalList,
              finalIndex: this.finalIndex
            })
          })
        }
      }

      this.finalIndex.splice(column, 1, newColumnIndex)
      const node = list[column][newColumnIndex]
      this.$nextTick(() => {
        // 列变化事件，某列选中的 value 及 index 任意一个变化后触发事件
        // @arg event.detail = { column, index, text, value }
        // @arg column 是发生变化的列；index, text, value 分别是变化后的索引、文案、值
        this.triggerEvent(EVENT_COLUMN_CHANGE, {
          column,
          index: newColumnIndex,
          text: node.text,
          value: node.value
        })
      })
    }
  },
  lifetimes: {
    attached() {
      this.updateData(this.list, this.selectedIndex)
      this.$nextTick(() => {
        // nextTick 原因是 _watchChangeEvent 依赖 finalIndex
        // updateData 会在 nextTick 中更新 finalIndex
        // 所以这里需要 nextTick
        this._watchChangeEvent()
      })
    }
  },
  methods: {
    _watchChangeEvent() {
      this.$watch(() => {
        const { selectedIndex, selectedVal } = this.getSelectedInfo()
        return selectedIndex.join(',') + '|' + selectedVal.join(',') + '|' + this.updateFinish
      }, () => {
        if (!this.updateFinish) return
        // 滚动后触发
        // @arg event.detail = { selectedIndex, selectedText, selectedVal }
        // @arg 每个属性都是数组，是当前所有列的选中信息；
        // @arg 分别表示被选中的索引、文案、值
        this.triggerEvent(EVENT_CHANGE, this.getSelectedInfo())
      })
    },
    onPickchange(e: WechatMiniprogram.CustomEvent) {
      this.pickchange++
      this.changeEvent = e
    },
    normalizeSelectedIndex(index: number[], len: number): number[] {
      if (index.length >= len) {
        index.splice(len)
      } else {
        while (index.length < len) {
          index.push(0)
        }
      }
      return index
    },
    // @vuese
    // 更新 picker 的数据及选中值
    // @arg list 为每一列的数据
    // @arg index 为每一列的数据选中的索引
    updateData(
      list: PickerColumn[],
      index: number[]
    ) {
      this.updateFinish = false
      this.oldList = this.finalList.length ? this.finalList.slice() : list.slice()
      this.oldIndex = this.finalIndex.length ? this.finalIndex.slice() : index.slice()

      this.finalList = list.slice().map((column, k) => {
        column.id = 'column-' + k
        column.forEach((item, k) => {
          item.id = 'item-' + k + '-' + column.id
        })
        return column
      })

      const finalIndex = this.normalizeSelectedIndex(index.slice(), this.finalList.length)

      if (!isWeb) {
        this.updateFinish = true
        this.finalIndex = finalIndex
      }
      this.$nextTick(() => {
        this.updateFinish = true
        // 等待 dom 画完后，再更新选中值
        // mpx-picker-view 是监听 selectedIndex，如果一起更新，此时dom中还没有 mpx-picker-view-column，导致选中失败
        this.finalIndex = finalIndex
        this._forceUpdate()
      })
    },
    // @vuese
    // 更新 picker 的数据
    // @arg list 为每一列的数据
    updateList(list: PickerColumn[]) {
      this.updateData([...list], this.finalIndex)
    },
    // @vuese
    // 更新 picker 的选中值
    // @arg index 为每一列的数据选中的索引
    updateIndex(index: number[]) {
      this.updateData(this.finalList, index)
    },
    _forceUpdate() {
      const {
        oldList,
        oldIndex,
        finalList: newList,
        finalIndex: newIndex
      } = this
      // 新列长度原因：若旧列长度不够时，直接触发。若旧列长度比新列长，消失的列派发啥事件？
      for (let i = 0; i < newIndex.length && newList[i].length; i++) {
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
      if (isWeb) {
        this.$forceUpdate()
      } else {
      // magic code. see QA #11.11
        this.$forceUpdate({
          finalList: this.finalList
        }, () => {
          this.$forceUpdate({
            finalIndex: this.finalIndex
          })
        })
      }
    },
    // @vuese
    // 获取当前所有列的选中信息
    // @return { selectedIndex, selectedText, selectedVal }
    // @return 每个属性都是数组，是当前所有列的选中信息；
    // @return 分别表示被选中的索引、文案、值。
    getSelectedInfo() {
      const selectedText: (number|string)[] = []
      const selectedVal: (number|string)[] = []
      const finalList = this.finalList
      const selectedIndex: number[] = []
      this.finalIndex.forEach((item, index) => {
        const column = finalList[index]
        if (!column) return
        const node = column[item]
        if (node) {
          selectedIndex.push(item)
          selectedText.push(node.text)
          selectedVal.push(node.value)
        }
      })
      return {
        selectedIndex,
        selectedText,
        selectedVal
      }
    }
  }
})

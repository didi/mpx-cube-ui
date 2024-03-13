import { createComponent } from '../../common/helper/create-component'

enum DividerContentPosition {
  LEFT = 'left',
  CENTER = 'center',
  RIGHT = 'right'
}

createComponent({
  properties: {
    /**
     * @description 文本内容（会覆盖 slot）
     */
    text: String,
    /**
     * @description 文本/slot 的位置
     * @optional left/center/right
     */
    position: {
      type: String,
      value: DividerContentPosition.CENTER
    }
  }
})

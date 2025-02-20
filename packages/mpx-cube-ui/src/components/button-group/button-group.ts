import { createComponent } from '../../common/helper/create-component'

enum ButtonGroupDirection {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal'
}

createComponent({
  properties: {
    /**
     * @description 按钮方向
     * @optional vertical/horizontal
     */
    direction: {
      type: String,
      value: ButtonGroupDirection.VERTICAL
    }
  },
  computed: {
    btnGroupClass() {
      return {
        'cube-button-group': true,
        ['cube-button-group-' + this.themeType]: this.themeType,
        'cube-button-group_horizontal': this.direction === 'horizontal',
        'cube-button-group_vertical': this.direction === 'vertical',
        'cube-button-group_vertical_reverse': this.direction === 'vertical-reverse'
      }
    }
  }
})

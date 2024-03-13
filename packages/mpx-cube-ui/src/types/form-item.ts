export type Position = 'left' | 'right'

export type Value = string | number

export type Option = {
  /**
   * @description 表单类目的值
   * @optional String/Number
   * @ali true
   * @wx true
   * @web true
   */
  value: Value,
  /**
   * @description 表单类目显示的文字
   * @optional String
   * @ali true
   * @wx true
   * @web true
   */
  text?: string,
  /**
   * @description 表单类目显示的文字下方描述
   * @optional String
   * @ali true
   * @wx true
   * @web true
   */
  desc?: string,
  /**
   * @description 表单类目是否被禁用
   * @optional Boolean
   * @ali true
   * @wx true
   * @web true
   */
  disabled?: boolean,
  /**
   * @description 表单类目位置
   * @optional left/right
   * @ali true
   * @wx true
   * @web true
   */
  position?: Position
}

// CheckGroupModal、RadioGroupModal
export type ExtendOption = {
  text: string,
  desc?: string
} & Option

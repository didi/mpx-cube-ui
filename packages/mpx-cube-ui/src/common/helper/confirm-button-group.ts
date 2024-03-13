type FunctionOptions = Partial<{
  openType: string
  appParameter: string
  lang: string
  sessionFrom: string
  sendMessageTitle: string
  sendMessagePath: string
  sendMessageImg: string
  showMessageCard: boolean
  formType: string
  scope: string
}>

const functionBtn: FunctionOptions = {
  openType: '',
  appParameter: '',
  lang: 'zh_CN',
  sessionFrom: '',
  sendMessageTitle: '',
  sendMessagePath: '',
  sendMessageImg: '',
  showMessageCard: false,
  formType: '',
  scope: ''
}

type OptionBtn = {
  text: string,
  disabled?: boolean
  customStyle?: Record<string, any>
  type?: string

  [index: string]: any
}

export type BtnOptions = {
  text: string
  disabled?: boolean
} & FunctionOptions

export const defConfirmBtn = {
  text: '确定',
  disabled: false,
  ...functionBtn
}

export const defCancelBtn = {
  text: '取消',
  disabled: false,
  ...functionBtn
}

export function parseBtn(btn: string | OptionBtn, defBtn: OptionBtn): OptionBtn {
  if (typeof btn === 'string') {
    btn = {
      text: btn
    }
  }

  return Object.assign({}, defBtn, btn)
}

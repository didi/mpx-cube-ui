import { getMixin } from '@mpxjs/core'

export const optionsMixin = getMixin({
  options: {
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
})

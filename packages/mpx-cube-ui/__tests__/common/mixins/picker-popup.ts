import pickerMixins from './picker'
import { getMixin } from '@mpxjs/core'
export default getMixin({
  mixins: [pickerMixins],
  methods: {
    showPicker() {
      this.$refs.picker.show()
    },
    onColumnChange() {
      // const { column, index, value, text } = e.detail
    //   console.log(`columnChange event —-
    //     column（列）: ${column},
    //     index（索引）: ${index},
    //     value（值）: ${value},
    //     text（文案）: ${text}`
    //   )
    },
    onChange() {
      // const { selectedIndex, selectedVal, selectedText, date, selectedTime, formatedTime } = e.detail
      // if (!selectedTime) {
      //   const firstText = date ? `date（Date类型）: ${date}` : `selectedIndex（索引）: ${selectedIndex}`
      // console.log(`change event —-
      //   ${firstText},
      //   selectedValue（值）: ${selectedVal},
      //   selectedText（文案）: ${selectedText}`
      // )
      // } else {
      // console.log(`change event —-
      //   selectedTime: ${selectedTime},
      //   formatedTime: ${formatedTime},
      //   selectedText（文案）: ${selectedText}`
      // )
      // }
    },
    onCancel() {
      console.log('cancel event')
    },
    onConfirm() {
      // const { selectedIndex, selectedVal, selectedText, date, selectedTime, formatedTime } = e.detail
      // if (!selectedTime) {
      //   const firstText = date ? `date（Date类型）: ${date}` : `selectedIndex（索引）: ${selectedIndex}`
      // console.log(`confirm event —-
      //   ${firstText},
      //   selectedValue（值）: ${selectedVal},
      //   selectedText（文案）: ${selectedText}`
      // )
      // } else {
      // console.log(`confirm event —-
      //   selectedTime: ${selectedTime},
      //   formatedTime: ${formatedTime},
      //   selectedText（文案）: ${selectedText}`
      // )
      // }
    },
    onValueChange() {
      // const { selectedIndex, selectedVal, selectedText, date, selectedTime, formatedTime } = e.detail
      // if (!selectedTime) {
      // const firstText = date ? `date（Date类型）: ${date}` : `selectedIndex（索引）: ${selectedIndex}`
      // console.log(`value-change event —-
      //   ${firstText},
      //   selectedValue（值）: ${selectedVal},
      //   selectedText（文案）: ${selectedText}`
      // )
      // } else {
      // console.log(`value-change event —-
      //   selectedTime: ${selectedTime},
      //   formatedTime: ${formatedTime},
      //   selectedText（文案）: ${selectedText}`
      // )
      // }
    }

  }
})

import { getMixin } from '@mpxjs/core'

export default getMixin({
  methods: {
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
      // const { selectedIndex, date, selectedTime } = e.detail
      // if (!selectedTime) {
      // const firstText = date ? `date（Date类型）: ${date}` : `selectedIndex（索引）: ${selectedIndex}`
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
    }
  }
})

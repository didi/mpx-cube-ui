import { getMixin } from '@mpxjs/core'

export default getMixin({
  methods: {
    onColumnChange(e) {
      this.columnChangeParams = JSON.stringify(e.detail, function(key, value) {
        if (Array.isArray(value)) return JSON.stringify(value)
        else return value
      }, 2)
    },
    onChange(e) {
      this.changeParams = JSON.stringify(e.detail, function(key, value) {
        if (Array.isArray(value)) return JSON.stringify(value).replaceAll("\"", '\'')
        else return value
      }, 2).replaceAll('"[', '[').replaceAll(']"', ']')
      const { selectedIndex, selectedVal, selectedText, date, selectedTime, formatedTime } = e.detail
      if (!selectedTime) {
        const firstText = date ? `date（Date类型）: ${date}` : `selectedIndex（索引）: ${selectedIndex}`
        console.log(`change event —- 
          ${firstText},
          selectedValue（值）: ${selectedVal},
          selectedText（文案）: ${selectedText}`
        )
      } else {
        console.log(`change event —- 
          selectedTime: ${selectedTime},
          formatedTime: ${formatedTime},
          selectedText（文案）: ${selectedText}`
        )
      }
    }
  }
})

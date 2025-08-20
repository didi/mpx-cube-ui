import { onUnmounted, ref } from '@mpxjs/core'

// 节流hooks
export const useDebounceFn = (fn, delay) => {
  const timer = ref<NodeJS.Timeout>()

  onUnmounted(() => {
    clearTimeout(timer.value)
  })
  return {
    run: (...args) => {
      if (timer.value) {
        clearTimeout(timer.value)
      }
      timer.value = setTimeout(() => {
        fn(...args)
        timer.value = undefined
      }, delay)
    }
  }
}

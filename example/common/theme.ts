import { ref, computed, watch } from '@mpxjs/core'
import { isWeb } from './consts'

export const THEME_DEFAULT = 0
export const THEME_PASSENGER = 1
export const THEME_DRIVER = 2

export const themeList = [
  {
    text: '默认主题',
    value: THEME_DEFAULT
  },
  {
    text: '乘客主题',
    value: THEME_PASSENGER
  },
  {
    text: '司机主题',
    value: THEME_DRIVER
  }
]

const themeCacheKey = 'mpx-cube-ui-pc-theme-cache'
let cacheTheme: number | null = null
if (isWeb) {
  const cacheVal = localStorage.getItem(themeCacheKey)
  if (cacheVal) {
    cacheTheme = +cacheVal
  }
}

export const currentTheme = ref(typeof cacheTheme === 'number' ? cacheTheme : THEME_PASSENGER)

export function useTheme() {
  if (isWeb) {
    watch(currentTheme, () => {
      localStorage.setItem(themeCacheKey, currentTheme.value + '')
    })
  }
  const isDriver = computed(() => currentTheme.value === THEME_DRIVER)
  const isPassenger = computed(() => currentTheme.value === THEME_PASSENGER)
  const themeType = computed(() => {
    return isDriver.value
            ? 'driver'
            : isPassenger.value
              ? 'passenger'
              : ''
  })

  return {
    isDriver,
    isPassenger,
    themeType
  }
}

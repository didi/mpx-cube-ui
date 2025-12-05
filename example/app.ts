import mpx, { createApp } from '@mpxjs/core'
import apiProxy from '@mpxjs/api-proxy'
import { configProvider } from '../packages/mpx-cube-ui/src/common/helper/config-provider'
import { isIframe } from './common/consts'

mpx.use(apiProxy, { usePromise: true })

const globalProviderConfigMap = {
  passenger: {
    shape: 'square',
    maskClosable: true
  }
}

configProvider({
  // @ts-ignore
  global: globalProviderConfigMap[__themeMode__]
})

// app.js
// 触发 main 分支 docs 更新 4
createApp({})

if (isIframe) {
  let prevPath = ''
  const handleMessage = (e) => {
    const { to } = (typeof e.data === 'object' ? e.data : {}) as any
    if (to !== undefined && to !== prevPath) {
      mpx.redirectTo({
        url: `/pages/${to ? `${to}/` : ''}index`
      })
      prevPath = to
    }
  }
  window.addEventListener('message', handleMessage)
}

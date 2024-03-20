export const isWeb = __mpx_mode__ === 'web'
export const isIframe = isWeb && window.parent !== window

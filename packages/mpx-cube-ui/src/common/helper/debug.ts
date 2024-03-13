export const warn = function (msg: string, componentName: string): void {
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production') {
    const component = componentName ? `<${componentName}> ` : ''
    console.error(`[Cube warn]: ${component}${msg}`)
  }
}

export const tip = function (msg: string, componentName: string): void {
  if (process.env.NODE_ENV !== 'production') {
    const component = componentName ? `<${componentName}> ` : ''
    console.warn(`[Cube tip]: ${component}${msg}`)
  }
}

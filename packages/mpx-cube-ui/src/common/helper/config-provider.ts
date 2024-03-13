interface ConfigProviderConfig {
  global?: any
}

const transformProperties = {} as ConfigProviderConfig
// 暂只支持全局设置Boolean、String、Number三种基本类型
const transformPropTypes = ['Boolean', 'String', 'Number']
const typeMap = {
  Boolean,
  String,
  Number
}

const configProvider = function(config: ConfigProviderConfig): void {
  try {
    if (!Object.keys(config).length && !config.global) return

    const globalConfig = config.global

    for (const propKey in globalConfig) {
      const propVal = globalConfig[propKey]
      const propValType = Object.prototype.toString.call(propVal).slice(8, -1)

      if (transformPropTypes.indexOf(propValType) !== -1) {
        transformProperties[propKey] = {
          type: typeMap[propValType],
          value: propVal
        }
      } else {
        console.info(`setConfigError from ${[propKey]}: 暂不支持配置${typeMap[propValType]}类型`)
      }
    }
  } catch (e) {
    console.warn('configProvider error', e)
  }
}

export {
  transformProperties,
  configProvider
}

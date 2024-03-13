const RootComponent = require('j-component/src/render/component.js')

const Component = Object.getPrototypeOf(RootComponent)

const originQuerySelector = Component.prototype.querySelector

const originQuerySelectorAll = Component.prototype.querySelectorAll

const querySelector = 'querySelector'
const querySelectorAll = 'querySelectorAll'

Component.prototype.querySelector = function(selector) {
  return selectorFn.call(this, querySelector, selector)
}

Component.prototype.querySelectorAll = function(selector) {
  return selectorFn.call(this, querySelectorAll, selector)
}

function selectorFn(fnName, selector) {
  const fn = fnName === querySelector ? originQuerySelector : originQuerySelectorAll

  const originSelector = selector
  if (typeof selector !== 'string') return

  selector = selector.split(' ')
  const lastIndex = selector.length - 1
  let res = []
  if (/\.|#/.test(selector[lastIndex][0])) {
    return fn.call(this, originSelector)
  } else {
    if (selector.length === 1) {
      res = _getComponentsByTagName(this._exparserNode.shadowRoot.childNodes, selector[0])
    } else {
      const last = selector.pop()
      const pre = selector.join('')
      res = _getComponentsByTagName(this.querySelector(pre)._exparserNode.childNodes, last)
    }
    return fnName === querySelector ? res[0] : res
  }
}

function _getComponentsByTagName(childNodes, tagName, findOne) {
  if (!childNodes.length) return []
  const res = []
  loopGetComponets(res, childNodes, tagName, findOne)
  return res
}

function loopGetComponets(res, nodes, tagName, findOne) {
  if (findOne && res.length) return
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]
    if (node._vt.tagName === tagName) {
      res.push(new Component(node))
    } else if (node.childNodes && node.childNodes.length) {
      loopGetComponets(res, node.childNodes, tagName)
    } else if (node.shadowRoot && node.shadowRoot.childNodes && node.shadowRoot.childNodes.length) {
      loopGetComponets(res, node.shadowRoot.childNodes, tagName)
    }
  }
}

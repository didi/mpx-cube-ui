import CodeCopy from './CodeCopy.vue'
import Vue from 'vue'

export default {
  updated() {
    // 防止阻塞
    setTimeout(() => {
      document.querySelectorAll('div[class*="language-"]').forEach(el => {
        // 防止重复写入
        if (el.classList.contains('code-copy-added')) return
        let ComponentClass = Vue.extend(CodeCopy)
        let instance = new ComponentClass()
        const codeEl = el.querySelector('pre[class*="language-"]')
        instance.code = codeEl.innerText
        instance.$mount()
        el.classList.add('code-copy-added')
        el.appendChild(instance.$el)
      })
    }, 100)
  }
}
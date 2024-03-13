<template>
  <span class="code-copy-btn" @click="copyToClipboard">{{ buttonText }}</span>
</template>

<script>
export default {
  data () {
    return {
      buttonText: 'Copy'
    }
  },
  methods: {
    copyToClipboard (el) {
      this.setClipboard(this.code, this.setText);
    },
    setClipboard (code, cb) {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(code).then(
          cb,
          () => { }
        )
      } else {
        let copyelement = document.createElement('textarea')
        document.body.appendChild(copyelement)
        copyelement.value = code
        copyelement.select()
        document.execCommand('Copy')
        copyelement.remove()
        cb()
      }
    },
    setText () {
      this.buttonText = 'Copied!'

      setTimeout(() => {
        this.buttonText = 'Copy'
      }, 1000)
    }
  }
}
</script>

<style scoped>
.code-copy-btn {
  position: absolute;
  bottom: 10px;
  right: 7.5px;
  opacity: 0.75;
  cursor: pointer;
  font-size: 14px;
  z-index: 10;
}

.code-copy-btn:hover {
  opacity: 1;
}
</style>
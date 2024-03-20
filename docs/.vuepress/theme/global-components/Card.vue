<template>
  <div class="card">
    <slot></slot>
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="stylus">
.card
  padding 1px 24px 24px 24px
  margin-bottom 24px
  border-radius 20px
  box-shadow 0 8px 12px #ebedf0
  background-color #fff
  overflow auto
  *:last-child
    margin-bottom: 0
</style>
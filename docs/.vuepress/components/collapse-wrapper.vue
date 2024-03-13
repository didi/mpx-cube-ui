<template>
  <div class="collapse-wrap">
    <collapse-item name="sub" :control-text="['收起', '查看全部']">
      <slot></slot>
    </collapse-item>
  </div>
</template>

<script>
import CollapseItem from './collapse-item'
// TODO: ??
// copy 的 element-ui，删掉了不用的地方
export default {
  name: 'collapse',
  props: {
    // 是否只能展示一个节点
    accordion: {
      type: Boolean,
      default: false
    },
    // 在该文档中未使用此属性
    // 展开的节点 name 集合
    // value: {
    //   type: [String, Number, Array],
    //   default() {
    //     return []
    //   }
    // }
  },
  data() {
    return {
      activeNames: ['sub']
    }
  },
  // watch: {
  //   value(value) {
  //     this.activeNames = [].concat(value)
  //   }
  // },
  methods: {
    setActiveNames(activeNames) {
      activeNames = [].concat(activeNames)
      let value = this.accordion ? activeNames[0] : activeNames
      this.activeNames = activeNames
      this.$emit('input', value)
      this.$emit('change', value)
    },
    handleItemClick(name) {
      if (this.accordion) {
        this.setActiveNames(
          (this.activeNames[0] || this.activeNames[0] === 0) &&
          this.activeNames[0] === name
            ? '' : name
        )
      } else {
        let activeNames = this.activeNames.slice(0)
        let index = activeNames.indexOf(name)

        if (index > -1) {
          activeNames.splice(index, 1)
        } else {
          activeNames.push(name)
        }
        this.setActiveNames(activeNames)
      }
    }
  },
  provide() {
    return {
      collapse: this
    }
  },
  components: {
    CollapseItem
  }
}
</script>

<style>

</style>

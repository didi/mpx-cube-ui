import { createComponent, MOUNTED } from '@mpxjs/core'
import TabBar from '../tab-bar/index.mpx?resolve'

interface Parant {
  value: number | string
  cubeTabBar: boolean
  trigger(value?: number | string): void
}

createComponent({
  relations: {
    [TabBar]: {
      type: 'parent'
    }
  },
  options: {
    multipleSlots: true,
    styleIsolation: 'shared'
  },
  properties: {
    label: {
      type: String,
      optionalTypes: [Number]
    },
    value: {
      type: Number,
      optionalTypes: [String]
    },
    icon: {
      type: String,
      value: ''
    },
    /**
     * @description 是否需要自定义插槽（默认内容）
     * @optional true/false
     */
    customContent: {
      type: Boolean,
      value: false
    },
    /**
     * @description 是否需要自定义插槽（icon）
     * @optional true/false
     */
    customIcon: {
      type: Boolean,
      value: false
    }
  },
  data: {
    parent: undefined as unknown as Parant
  },
  [MOUNTED]() {
    this.parent = this.getParent()
  },
  computed: {
    isActive () {
      if (!this.parent) {
        return
      }
      return this.parent.value === this.value
    }
  },
  methods: {
    getParent() {
      if (__mpx_mode__ === 'web') {
        const parent = this.$parent
        if (parent.$data.cubeTabBar) {
          return parent
        }
        return null
      } else {
        let parent = this.selectOwnerComponent() as unknown as Parant
        if (parent?.cubeTabBar) {
          return parent
        }
        parent = this.getRelationNodes(TabBar) as unknown as Parant
        if (Array.isArray(parent)) {
          return parent[0]
        }
        return parent
      }
    },
    handleClick () {
      if (!this.parent) {
        return
      }
      this.parent.trigger(this.value)
    }
  }
})

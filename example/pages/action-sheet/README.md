## Cube-AcitionSheet

<card>

## 介绍

ActionSheet操作列表提供了两种常见的样式，灵活可控内容。


</card>

### 示例

<card>

### 基本用法

配置标题 title 和 data 数据项，data 中内容是 content，一段 HTML 字符串，额外还可以配置自定义 class：class 和方向：align（值可以是 left、right）。

<collapse-wrapper>

```vue
<template>
  <view>
    <cube-button bindtap="showActionSheet">action-sheet</cube-button>
    <cube-action-sheet
      wx:ref="actionSheet"
      title="{{title}}"
      inputData="{{inputData}}"
      bindselect="onSelect"
    />
  </view>
</template>

<script>
  import { createComponent } from '@mpxjs/core'
  createComponent({
    data() {
      return {
        inputData: [
          {
            content: 'align-center',
            class: 'cube-foo'
          },
          {
            content: 'align-left',
            align: 'left'
          },
          {
            content: 'align-right',
            align: 'right'
          }
        ],
        selectContent: '',
        title: '我是标题'
      }
    },
    methods: {
      onSelect(selectData) {
        const { item } = selectData.detail
        this.selectContent = `Clicked: ${item.content}`
        this.$refs.selectToast.show()
      },
      showActionSheet() {
        this.$refs.actionSheet.show()
      }
    }
  })
</script>
```
</collapse-wrapper>


</card>

<card>

### 高亮设置

通过设置 active 属性来控制高亮的是第几个。

<collapse-wrapper>

```vue
<template>
  <view>
    <cube-button bindtap="showActionSheet">action-sheet-active</cube-button>
    <cube-action-sheet
      wx:ref="actionSheet"
      title="{{title}}"
      inputData="{{inputData}}"
      active="{{active}}"
      bind:select="onSelect"
      bind:cancel="onCancel"
      bind:maskClose="onMaskClose"
    />
    <cube-toast
      txt="{{ selectContent }}"
      wx:ref="selectToast">
    </cube-toast>
  </view>
</template>

<script>
  import { createComponent } from '@mpxjs/core'
  createComponent({
    data: {
    inputData: [
      {
        content: '舒适型'
      },
      {
        content: '七座商务'
      },
      {
        content: '豪华型'
      }
    ],
    active: 0,
    selectContent: '',
    title: '我是标题'
  },
  methods: {
    onSelect(selectData) {
      const { item, index } = selectData.detail
      this.selectContent = `Clicked ${item.content}`
      this.active = index
      this.$refs.selectToast.show()
    },
    onCancel() {
      this.selectContent = 'Clicked canceled '
      this.$refs.selectToast.show()
    },
    onMaskClose() {
      this.selectContent = 'Clicked maskClose '
      this.$refs.selectToast.show()
    },
    showActionSheet() {
      this.$refs.actionSheet.show()
    },
  }
  })
</script>
```
</collapse-wrapper>


</card>

<card>

### Picker 样式设定

pickerStyle 属性决定是否使用 Picker 样式。


<collapse-wrapper>

```vue
<template>
  <view>
    <cube-button bindtap="showActionSheet">action-sheet-picker</cube-button>
    <cube-action-sheet
      wx:ref="actionSheet"
      title="{{ title }}"
      inputData="{{inputData}}"
      pickerStyle="{{true}}"
      bind:select="onSelect"
      bind:cancel="onCancel"
      bind:maskClose="onMaskClose"
    />
    <cube-toast
      txt="{{ selectContent }}"
      wx:ref="selectToast">
    </cube-toast>
  </view>
</template>

<script>
  import { createComponent } from '@mpxjs/core'
  createComponent({
    data: {
    inputData: [
      {
        content: '舒适型'
      },
      {
        content: '七座商务'
      },
      {
        content: '豪华型'
      }
    ],
    selectContent: '',
    title: '我是标题'
  },
  methods: {
    onSelect(selectData) {
      const { item } = selectData.detail
      this.selectContent = `Clicked ${item.content}`
      this.$refs.selectToast.show()
    },
    onCancel() {
      this.selectContent = 'Clicked canceled '
      this.$refs.selectToast.show()
    },
    onMaskClose() {
      this.selectContent = 'Clicked maskClose '
      this.$refs.selectToast.show()
    },
    showActionSheet() {
      this.$refs.actionSheet.show()
    }
  }
  })
</script>

<style lang="stylus">
.rate-item-demo
  width: 100%
  height: 100%
  background-size: 100%
  background-color: grey
.cube-rate-item_active
  .cube-rate-item-demo
    background-color: orange
.cube-rate-item_half_active
  .cube-rate-item-demo
    background-color: blue
</style>

```
</collapse-wrapper>

</card>


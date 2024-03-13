## Cube-Checkbox-Modal

<card>

### 介绍

内置复选框组的半浮层模态框。

</card>

## 示例

<card>

### 基础用法

渲染一个多选弹窗。

<!-- @example: checkbox-modal-default -->

</card>

<card>

### 自定义option

每一个多选项都可以进行单独配置，具体的配置内容见下文`ExtendOption`。我们可以通过`position`改变单选框的位置，通过`desc`配置每一项的描述。如果想将某一项单独设置为禁用状态，可以将`disabled`设置为`true`。

```vue
<script>
createComponent({
  data: {
    options: [
      {
        value: '1',
        position: 'right',
        disabled: true,
        text: '企业支付',
        desc: ''
      },
      {
        value: '2',
        text: '亲友代付',
        position: 'right',
        desc: '仅支持滴滴快车/优享/舒适型/豪华车型'
      },
      {
        value: '3',
        text: '个人支付',
        position: 'right',
        desc: '仅支持滴滴快车/优享/舒适型/豪华车型仅支持滴滴快车/优享/舒适型/豪华车型'
      }
    ]
  }
})
</script>
```

</card>

<card>

### 自定义关闭按钮

你可以通过设置`cancelText`来显示关闭文案，同时将`cancelBtnAlign`设置为`right`。

<!-- @example: checkbox-modal-cancel-btn -> template no-wrap -->

</card>

<card>

### 自定义插槽

你可以通过`title`插槽与`subtitle`插槽，自定义标题与副标题内容。

<!-- @example: checkbox-modal-slots -> template no-wrap -->
<!-- @example: checkbox-modal-slots -> style -->

</card>

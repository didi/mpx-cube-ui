## Cube-Checkbox-Group

<card>

### 介绍

复选框组是一组复选框，用来控制多个复选框状态，以及数据透传；有垂直和水平两种样式。

</card>

## 示例

<card>

### 基础用法

默认渲染为圆形。


<collapse-wrapper>

```vue
<template>
  <view class="checkbox-group-round-demo">
    <view class="cube-checkbox-group-example">
      <cube-checkbox-group
        options="{{ options }}"
        wx:model="{{ checkedValues }}"
        wx:model-prop="values"
        bind:checked="onChecked"
        bind:cancelChecked="onCancelChecked"
      ></cube-checkbox-group>
    </view>
    <view class="view-desc">checked values：{{ checkedValues }}</view>
  </view>
</template>
```

</collapse-wrapper>



<collapse-wrapper>

```vue
<script>
  import { createComponent } from '@mpxjs/core'

  createComponent({
    options: {
      styleIsolation: 'shared'
    },
    data: {
      options: [
        {
          value: '苹果',
          text: '苹果'
        },
        {
          value: '橘子',
          text: '橘子'
        },
        {
          value: '香蕉',
          text: '香蕉'
        },
        {
          value: '桃子',
          text: '桃子'
        }
      ],
      checkedValues: ['香蕉']
    },
    methods: {
      onChecked (e) {
        const { value } = e.detail
        console.log('选中操作：', value)
      },
      onCancelChecked (e) {
        const { value } = e.detail
        console.log('取消选中操作：', value)
      }
    }
  })
</script>
```

</collapse-wrapper>


`checkedValues` 是一个数组，代表的是选中的复选框 `value` 的值的集合。

勾选复选框组中的某一项时会触发 `checked` 事件，该事件会返回当前勾选的复选框值；同理，取消勾选复选框组中的某一项时触发会触发 `cancelChecked` 事件，该事件会返回当前取消勾选的复选框值。

</card>

<card>

### 使用插槽

除了使用内置的 `checkbox` 组件，您还可以使用插槽来自定义 `checkbox`。


<collapse-wrapper>

```vue
<template>
  <view class="checkbox-group-slot-demo">
    <view class="cube-checkbox-group-example">
      <cube-checkbox-group
        wx:model="{{ checkedValues }}"
        wx:model-prop="values"
        bind:checked="onChecked"
        bind:cancelChecked="onCancelChecked"
      >
        <cube-checkbox
          wx:for="{{ options }}"
          wx:for-item="option"
          wx:for-index="index"
          wx:key="index"
          option="{{ option }}"
        ></cube-checkbox>
      </cube-checkbox-group>
    </view>
    <view class="view-desc">选中 value 值：{{ checkedValues }}</view>
  </view>
</template>
```

</collapse-wrapper>


</card>

<card>

### 行内样式

默认情况下复选框是垂直排列的，如果设置 `inline` 属性值为 `true`，那么复选框将会水平均匀排列。

如果想控制一行排列的个数，那么还可以设置 `colNum` 属性值来指定一行需要排列的个数。


<collapse-wrapper>

```vue
<template>
  <view class="checkbox-group-round-inline-demo">
    <view class="cube-checkbox-group-example">
      <cube-checkbox-group
        class="inline-checkbox-group"
        options="{{ options }}"
        inline="{{ true }}"
        colNum="{{ 2 }}"
        wx:model="{{ checkedValues }}"
        wx:model-prop="values"
      ></cube-checkbox-group>
    </view>
    <view class="view-desc">checked values：{{ checkedValues }}</view>
  </view>
</template>
```

</collapse-wrapper>


</card>

<card>

### 禁用项

如果想禁用某几个复选框，那么可以在单个复选框的配置项里设置 `disabled` 属性值为 `true`。


<collapse-wrapper>

```vue
<template>
  <view class="checkbox-group-round-disabled-demo">
    <view class="cube-checkbox-group-example">
      <cube-checkbox-group
        class="inline-checkbox-group"
        options="{{ options }}"
        inline="{{ true }}"
        wx:model="{{ checkedValues }}"
        wx:model-prop="values"
      ></cube-checkbox-group>
    </view>
    <view class="view-desc">checked values：{{ checkedValues }}</view>
  </view>
</template>
```

</collapse-wrapper>



<collapse-wrapper>

```vue
<script>
  import { createComponent } from '@mpxjs/core'

  createComponent({
    options: {
      styleIsolation: 'shared'
    },
    data: {
      options: [
        {
          value: '苹果',
          text: '苹果'
        },
        {
          value: '橘子',
          text: '橘子'
        },
        {
          value: '香蕉',
          text: '香蕉',
          disabled: true
        },
        {
          value: '桃子',
          text: '桃子',
          disabled: true
        }
      ],
      checkedValues: []
    }
  })
</script>
```

</collapse-wrapper>


</card>

<card>

### 方形选择框

默认情况下复选框为圆形，如果想设置复选框的形状为方形，可以设置 `shape` 属性值为 `square`。


<collapse-wrapper>

```vue
<template>
  <view class="checkbox-group-square-demo">
    <view class="cube-checkbox-group-example">
      <cube-checkbox-group
        options="{{ options }}"
        shape="square"
        wx:model="{{ checkedValues }}"
        wx:model-prop="values"
      ></cube-checkbox-group>
    </view>
    <view class="view-desc">checked values：{{ checkedValues }}</view>
  </view>
</template>
```

</collapse-wrapper>


</card>

<card>

### 默认选中

如果想设置某个选项为默认选中，那么可以直接在 `checkedValues` 里添加对应复选框的 `value` 值。


<collapse-wrapper>

```vue
<template>
  <view class="checkbox-group-square-selected-demo">
    <view class="cube-checkbox-group-example">
      <cube-checkbox-group
        options="{{ options }}"
        shape="square"
        inline="{{ true }}"
        wx:model="{{ checkedValues }}"
        wx:model-prop="values"
      ></cube-checkbox-group>
    </view>
    <view class="view-desc">checked values：{{ checkedValues }}</view>
  </view>
</template>
```

</collapse-wrapper>



<collapse-wrapper>

```vue
<script>
  import { createComponent } from '@mpxjs/core'

  createComponent({
    options: {
      styleIsolation: 'shared'
    },
    data: {
      options: [
        {
          value: '苹果',
          text: '苹果',
          position: 'right'
        },
        {
          value: '橘子',
          text: '橘子',
          position: 'right'
        },
        {
          value: '香蕉',
          text: '香蕉',
          position: 'right'
        },
        {
          value: '桃子',
          text: '桃子',
          position: 'right'
        }
      ],
      checkedValues: ['苹果']
    }
  })
</script>
```

</collapse-wrapper>


</card>

<card>

### 设置一行显示个数

在开启 `inline` 为 `true` 的前提下，可以设置 `colNum` 的值来控制每行显示的个数。


<collapse-wrapper>

```vue
<template>
  <view class="checkbox-group-square-column-num-demo">
    <view class="cube-checkbox-group-example">
      <cube-checkbox-group
        options="{{ options }}"
        shape="square"
        colNum="{{ 3 }}"
        wx:model="{{ checkedValues }}"
        wx:model-prop="values"
      ></cube-checkbox-group>
    </view>
    <view class="view-desc">checked values：{{ checkedValues }}</view>
  </view>
</template>
```

</collapse-wrapper>


</card>

<card> 
 
 ### Props

<!-- @vuese:[name]:props:start -->
|参数|说明|类型|可选值|默认值|
|---|---|---|---|---|
|themeType|用于生成最外层类名 如原类名为 cube-component，添加 themeType = demo 后，类名变为 cube-component cube-component-demo|`String`|-|-|
|option|配置项|`Object`|Option|Option|
|value|双向绑定属性值|`String`|String/Number|-|
|options|配置项数组|`Array`|-|ExtendOption[]|
|values|选中值|`Array`||Value[]|
|shape|选择框形状|`String`|round/square|round|
|inline|是否表现为行内元素|`Boolean`|-|false|
|colNum|控制每行展示的个数|`Number`|-|1|

<!-- @vuese:[name]:props:end -->


  
</card> 
 
<card> 
 
 ### TsType

<!-- @vuese:[name]:tsType:start -->
|Name|Type|
|---|---|
|Option|<pre v-pre class="language-typescript inside-td"><code>{<br>  <span class="hljs-attr">desc?</span>: <span class="hljs-built_in">string</span>;<br>  <span class="hljs-attr">disabled?</span>: <span class="hljs-built_in">boolean</span>;<br>  <span class="hljs-attr">position?</span>: <span class="hljs-built_in">left</span>\|<span class="hljs-built_in">right</span>;<br>  <span class="hljs-attr">text?</span>: <span class="hljs-built_in">string</span>;<br>  <span class="hljs-attr">value</span>: <span class="hljs-built_in">string</span>\|<span class="hljs-built_in">number</span>;<br>}</code></pre>|
|ExtendOption|<pre v-pre class="language-typescript inside-td"><code>{<br>  <span class="hljs-attr">desc?</span>: <span class="hljs-built_in">string</span>;<br>  <span class="hljs-attr">text</span>: <span class="hljs-built_in">string</span>;<br>}&amp;{<br>  <span class="hljs-attr">desc?</span>: <span class="hljs-built_in">string</span>;<br>  <span class="hljs-attr">disabled?</span>: <span class="hljs-built_in">boolean</span>;<br>  <span class="hljs-attr">position?</span>: <span class="hljs-built_in">left</span>\|<span class="hljs-built_in">right</span>;<br>  <span class="hljs-attr">text?</span>: <span class="hljs-built_in">string</span>;<br>  <span class="hljs-attr">value</span>: <span class="hljs-built_in">string</span>\|<span class="hljs-built_in">number</span>;<br>}</code></pre>|
|Value|<pre v-pre class="language-typescript inside-td"><code><span class="hljs-built_in">string</span>\|<span class="hljs-built_in">number</span></code></pre>|

<!-- @vuese:[name]:tsType:end -->


  
</card> 
 
<card> 
 
 ### Events

<!-- @vuese:[name]:events:start -->
|事件名|说明|参数|
|---|---|---|
|checked|勾选复选框组中的某一项时触发|事件对象 e，包含当前勾选的复选框值|
|cancelChecked|取消勾选复选框组中的某一项时触发|事件对象 e，包含当前取消勾选的复选框值|
|input|当绑定值变化时触发|事件对象 e，包含当前选中的复选框值的集合|

<!-- @vuese:[name]:events:end -->


  
</card> 
 
<card> 
 
 ### Slots

<!-- @vuese:[name]:slots:start -->
|插槽名|说明|
|---|---|
|— (默认插槽)|自定义使用 checkbox|

<!-- @vuese:[name]:slots:end -->


  
</card> 
 
 
 
 
 

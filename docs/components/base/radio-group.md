## Cube-Radio-Group

<card>

### 介绍

单选框组，用来控制多个单选框状态，以及数据透传，可设置单选框组内容，样式等。

</card>

## 示例

</card>

<card>

### 基础用法

通过`wx:model`双向绑定选中的单选框的值，`options`是个数组，每个元素表示等同于单选框的`option`。

<collapse-wrapper>

```vue
<template>
  <view class="radio-group-demo">
    <view class="cube-radio-group-example">
      <cube-radio-group
        options="{{ options }}"
        wx:model="{{ checkedValue }}"
        wx:model-prop="value"
      ></cube-radio-group>
    </view>
    <view bindtap="test">click me</view>
    <view class="view-desc">selected value: {{ checkedValue }}</view>
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
          value: 'Option1',
          text: 'Option1'
        },
        {
          value: 'Option2',
          text: 'Option2'
        }
      ],
      checkedValue: 'Option2'
    },
    methods: {
      test() {
        this.checkedValue = 'Option1'
      }
    }
  })
</script>
```

</collapse-wrapper>


</card>

<card>

### 控制行数

使用`colNum`属性控制一行显示个数。

<collapse-wrapper>

```vue
<template>
  <view class="radio-group-column-num-demo">
    <view class="cube-radio-group-example">
      <cube-radio-group
        options="{{ options }}"
        colNum="{{ 3 }}"
        wx:model="{{ checkedValue }}"
        wx:model-prop="value"
      ></cube-radio-group>
    </view>
    <view class="view-desc">selected value: {{ checkedValue }}</view>
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
          value: 1,
          text: '1'
        },
        {
          value: 2,
          text: '2'
        },
        {
          value: 3,
          text: '3',
          disabled: true
        },
        {
          value: 4,
          text: '4'
        },
        {
          value: 5,
          text: '5'
        },
        {
          value: 6,
          text: '6'
        },
        {
          value: 7,
          text: '7'
        },
        {
          value: 8,
          text: '8'
        }
      ],
      checkedValue: ''
    }
  })
</script>
```

</collapse-wrapper>


</card>

<card>

### 禁用设置

使用`disabled`属性禁用单选框组。

<collapse-wrapper>

```vue
<template>
  <view class="radio-group-disabled-demo">
    <view class="cube-radio-group-example">
      <cube-radio-group
        options="{{ options }}"
        wx:model="{{ checkedValue }}"
        wx:model-prop="value"
        disabled="{{true}}"
      ></cube-radio-group>
    </view>
    <view class="view-desc">selected value: {{ checkedValue }}</view>
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
          value: 'Option1',
          text: 'Option1',
          position: 'right'
        },
        {
          value: 'Option2',
          text: 'Option2',
          position: 'right'
        },
        {
          value: 'Option3',
          text: 'Option3',
          disabled: true,
          position: 'right'
        }
      ],
      checkedValue: ''
    }
  })
</script>
```

</collapse-wrapper>


</card>

<card>

### 单行布局

使用`inline`将布局改为单行布局。

<collapse-wrapper>

```vue
<template>
  <view class="radio-group-inline-demo">
    <view class="cube-radio-group-example">
      <cube-radio-group
        options="{{ options }}"
        inline="{{ true }}"
        wx:model="{{ checkedValue }}"
        wx:model-prop="value"
      ></cube-radio-group>
    </view>
    <view class="view-desc">selected value: {{ checkedValue }}</view>
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
          value: 'Option1',
          text: 'Option1'
        },
        {
          value: 'Option2',
          text: 'Option2'
        },
        {
          value: 'Option3',
          text: 'Option3'
        }
      ],
      checkedValue: ''
    }
  })
</script>
```

</collapse-wrapper>


</card>

<card>

### 使用插槽

除了使用内置的 radio 组件，您还可以使用插槽来自定义 radio。


<collapse-wrapper>

```vue
<template>
  <view class="radio-group-slot-demo">
    <view class="cube-radio-group-example">
      <cube-radio-group>
        <cube-radio
          wx:for="{{ options }}"
          wx:for-index="index"
          wx:for-item="option"
          wx:key="index"
          option="{{ option }}"
          wx:model="{{ checkedValue }}"
          wx:model-prop="value"
          ></cube-radio>
      </cube-radio-group>
    </view>
    <view class="view-desc">selected value: {{ checkedValue }}</view>
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
    data () {
      return {
        options: [
          {
            value: 'Option1',
            text: 'Option1'
          },
          {
            value: 'Option2',
            text: 'Option2'
          }
        ],
        checkedValue: 'Option1'
      }
    }
  })
</script>
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
|options|选项数据|`Array`|-|ExtendOption[]|
|inline|是否行内展示|`Boolean`|-|false|
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

<!-- @vuese:[name]:tsType:end -->


  
</card> 
 
<card> 
 
 ### Events

<!-- @vuese:[name]:events:start -->
|事件名|说明|参数|
|---|---|---|
|input|绑定值变化时触发|事件对象 e，包含选中的单选框 value 值|

<!-- @vuese:[name]:events:end -->


  
</card> 
 
<card> 
 
 ### Slots

<!-- @vuese:[name]:slots:start -->
|插槽名|说明|
|---|---|
|— (默认插槽)|自定义使用 radio|

<!-- @vuese:[name]:slots:end -->


  
</card> 
 
 
 
 
 

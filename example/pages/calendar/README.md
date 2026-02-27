## cube-calendar

<card>

### 介绍

日历组件

</card>

### 示例

<card>

### 用法


<collapse-wrapper>

```vue
<template>
  <view class="calendar-page">
    <cube-calendar
      wx:ref="calendar"
      height="{{height}}"
      defaultDate="{{defaultDate}}"
      bind:dateChange="dateChange"
      maxRange="{{maxRange}}"
      max="{{max}}"
      min="{{min}}"
    />
    <view class="base-calendar-selected-date">
      <view class="date-title">起始时间</view>
      <view class="single-date">年份：{{currentStartDate.year || '暂未选择'}}</view>
      <view class="single-date">月份：{{currentStartDate.month || '暂未选择'}}</view>
      <view class="single-date">天份：{{currentStartDate.day || '暂未选择'}}</view>
      <view class="single-date">时间戳：{{currentStartDate.date || '暂未选择'}}</view>
    </view>
    <view class="base-calendar-selected-date">
      <view class="date-title">结束时间</view>
      <view class="single-date">年份：{{currentEndDate.year || '暂未选择'}}</view>
      <view class="single-date">月份：{{currentEndDate.month || '暂未选择'}}</view>
      <view class="single-date">天份：{{currentEndDate.day || '暂未选择'}}</view>
      <view class="single-date">时间戳：{{currentEndDate.date || '暂未选择'}}</view>
    </view>
  </view>
</template>
<script>
import { createComponent } from '@mpxjs/core'

createComponent({
   data: {
    min: +new Date(2026, 1, 1),
    max: +new Date(2027, 7, 25),
    height: '270px',
    maxRange: 100,
    defaultDate: [+new Date(2026, 3, 1), +new Date(2026, 3, 2)],
    currentStartDate: {},
    currentEndDate: {}
  },
  methods: {
    dateChange(selectDate) { 
      this.currentStartDate = selectDate.detail.startDate
      this.currentEndDate = selectDate.detail.endDate
    }
  }
})
</script>
```
</collapse-wrapper>

</card>

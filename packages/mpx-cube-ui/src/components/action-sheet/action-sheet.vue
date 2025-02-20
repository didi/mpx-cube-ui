<template>
  <view name="cube-action-sheet-fade">
    <cube-popup type="action-sheet" wx:class="{{ 'cube-action-sheet_picker': pickerStyle }}" center="{{false}}" mask="{{true}}"
      z-index="{{zIndex}}" wx:show="{{isVisible}}" @mask-click="maskClick">
      <view name="cube-action-sheet-move">
        <view class="cube-action-sheet-panel cube-safe-area-pb" wx:show="{{isVisible}}" @click.stop>
          <view class="cube-action-sheet-title border-bottom-1px" wx:show="{{pickerStyle || title}}">{{ title }}</view>
          <view class="cube-action-sheet-content">
            <view class="cube-action-sheet-list">
              <view class="cube-action-sheet-item border-bottom-1px" wx:for="{{data}}"  wx:key="item" data-align="{{item.align}}"
                wx:class="[
                  item.class || '',
                  index === active ? 'cube-action-sheet-item_active' : ''
                ]" wx:html="item.content" bind:tap="itemClick(item, index)"></view>
            </view>
          </view>
          <view class="cube-action-sheet-space"></view>
          <view class="cube-action-sheet-cancel" bind:tap="cancel"><rich-test>{{ _cancelTxt }}</rich-test></view>
        </view>
      </view>
    </cube-popup>
  </view>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="stylus">
@require "@mpxjs/mpx-cube-ui/src/common/stylus/helper.styl"
@require "@mpxjs/mpx-cube-ui/src/common/stylus/mixin.styl"
@require "@mpxjs/mpx-cube-ui/src/common/stylus/theme/components/action-sheet.styl"

.cube-action-sheet-fade-enter, .cube-action-sheet-fade-leave-active
  opacity: 0
.cube-action-sheet-fade-enter-active, .cube-action-sheet-fade-leave-active
  transition: all .3s ease-in-out

.cube-action-sheet-panel
  text-align: center
  font-size: $var(fontsize-medium)
  background-color: $var(action-sheet-bgc)
.cube-action-sheet-move-enter, .cube-action-sheet-move-leave-active
  transform: translate3d(0, 100%, 0)
.cube-action-sheet-move-enter-active, .cube-action-sheet-move-leave-active
  transition: all .3s ease-in-out
.cube-action-sheet-cancel
  background-color: $var(action-sheet-bgc)
.cube-action-sheet-cancel rich-text, .cube-action-sheet-title, .cube-action-sheet-item
  display: block
  padding: 17px 16px
  margin: 0
  text-align: center
  overflow: hidden
  white-space: nowrap
  font-size: $var(fontsize-large)
  font-weight: normal
  line-height: 1
  color: $var(action-sheet-color)
  background-color: $var(action-sheet-bgc)

.cube-action-sheet-cancel view, .cube-action-sheet-item
  &:active
    background-color: $var(action-sheet-active-bgc)

.cube-action-sheet-title
  padding-top: 16px
  padding-bottom: 16px
  color: $var(action-sheet-title-color)
  font-size: $var(fontsize-large-x)

.cube-action-sheet-content
  overflow: hidden
  background: $var(action-sheet-bgc)

.cube-action-sheet-list
  list-style: none

.cube-action-sheet-item
  list-style: none
  user-select: none
  &:last-of-type
    border-none()
  &[data-align="left"]
    text-align: left
  &[data-align="right"]
    text-align: right

.cube-action-sheet-space
  height: 6px
  background-color: $var(action-sheet-space-bgc)

.cube-action-sheet-item_active
  color: $var(action-sheet-active-color)

.cube-action-sheet_picker
  .cube-action-sheet-space
    height: 0
  .cube-action-sheet-title
    height: 1em
    padding-top: 21px
    padding-bottom: 21px

  .cube-action-sheet-cancel
    position: absolute
    top: 0
    background-color: transparent
    span
      padding-top: 23px
      padding-bottom: 23px
      color: $var(action-sheet-picker-cancel-color)
      font-size: $var(fontsize-medium)
      background-color: transparent
      &:active
        color: $action-sheet-picker-cancel-active-color
        background-color: transparent
</style>

<script type="application/json">
  {
    "styleIsolation": "shared",
    "component": true,
    "usingComponents": {
      "cube-popup": "../popup/index.mpx"
    }
  }
</script>

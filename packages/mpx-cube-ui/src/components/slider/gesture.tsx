import { View } from 'react-native'
import { runOnJS } from 'react-native-reanimated'
import { createElement, useMemo, Children } from 'react'
import { GestureDetector, Gesture } from 'react-native-gesture-handler'

const Slider = ({
  ontouchstart,
  ontouchmove,
  ontonouchend,
  children
}) => {

  const panGesture = useMemo(() => {
    return Gesture.Pan()
      .enabled(true) // 通过手势启用状态控制是否可拖拽
      .onBegin(() => {
        'worklet'
        runOnJS(ontouchstart)()
      })
      .onUpdate((event) => {
        'worklet'
        runOnJS(ontouchmove)({
          touches: [{
            clientX: event.absoluteX
          }]
        })
      })
      .onEnd(() => {
        'worklet'
        runOnJS(ontonouchend)()
      })
  })

  return createElement(
    GestureDetector,
    {
      gesture: panGesture
    },
    createElement(
      View,
      {},
      ...Children.toArray(children)
    )
  )
}

export default Slider

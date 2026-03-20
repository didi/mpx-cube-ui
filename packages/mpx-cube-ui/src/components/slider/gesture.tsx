import { View } from 'react-native'
import { createElement, useMemo, Children } from 'react'
import { GestureDetector, Gesture } from 'react-native-gesture-handler'
import { runOnJS } from 'react-native-reanimated';

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
    View,
    {}, 
    createElement(
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
  )
}

export default Slider

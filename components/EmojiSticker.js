import { View, Image } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'

export default function EmojiSticker({ imageSize, stickerSource }) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  const drag = Gesture.Pan()
  .onChange((event) => {
    translateX.value += event.changeX;
    translateY.value += event.changeY;
  });



  /*The code below adds a tap gesture. 
  1. Use the useSharedValue hook, so it can have the same value as the Imagesize.
  2. On double tap scale the value by 2 and pass the function into the imagestyle call back
  3. Most of the code is self explanatory*/

  const scaleImage = useSharedValue(imageSize)

  const doubleTap = Gesture.Tap()
  .numberOfTaps(2)
  .onStart(()=> {
    if(scaleImage.value !== imageSize * 2 ) {
      scaleImage.value = scaleImage.value*2;
    }
  })


  const imageStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(scaleImage.value),
      height: withSpring(scaleImage.value),
    };
  });

  return (
    <GestureDetector gesture={drag}>
      <Animated.View style={[containerStyle, { top: -350 }]}>
        <GestureDetector gesture={doubleTap}>
          <Animated.Image
            source={stickerSource}
            resizeMode="contain"
            style={[imageStyle, { width: imageSize, height: imageSize }]}
          />
        </GestureDetector>
      </Animated.View>
    </GestureDetector>
  );
}
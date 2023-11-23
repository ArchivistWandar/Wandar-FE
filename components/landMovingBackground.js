import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

const MovingBackground = () => {
  const moveAnim = useRef(new Animated.Value(0)).current; // 애니메이션 값

  useEffect(() => {
    Animated.loop(
      Animated.timing(moveAnim, {
        toValue: -900, // 이미지를 얼마나 움직일지 결정
        duration: 13000, // 애니메이션 지속 시간
        useNativeDriver: true,
      })
    ).start();
  }, [moveAnim]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../assets/images/Background.jpg')}
        style={[
          styles.backgroundImage,
          {
            transform: [{ translateX: moveAnim }] // 수평 이동
          }
        ]}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {

    zIndex: -1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backgroundImage: {
    width: '330%', // 이미지의 가로 길이를 컨테이너보다 길게 설정
    height: '100%',
  },
});

export default MovingBackground;

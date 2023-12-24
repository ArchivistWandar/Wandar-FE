import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

const MovingObjectButton = ({ selectedObject }) => {
  console.log(selectedObject)
  // selectedObject가 null이면 컴포넌트를 숨김

  
  const [buttonSize] = useState(50); // 버튼 크기
  const [buttonMargin] = useState(10); // 버튼 간격
  const [containerSize] = useState(200); // 컴포넌트 전체 크기
  const [isButtonVisible, setButtonVisible] = useState(false);

  useEffect(()=>{
    console.log(selectedObject)
    if (!selectedObject){
      setButtonVisible(false)
      console.log("buttonvisibilit", isButtonVisible)
    }
  }, [selectedObject])

  // 버튼이 눌렸을 때의 동작
  const handlePress = (direction) => {
    // 여기에 버튼이 눌렸을 때의 로직을 추가
    // 예: selectedObject의 위치를 조절하는 함수 호출
    switch (direction) {
      case 'UP':
        console.log("up")
        break;
      case 'DOWN':
        console.log("down")
        break;
      case 'LEFT':
        console.log("left")
        break;
      case 'RIGHT':
        console.log("right")
        break;
      default:
        break;
    }
  };
  const onTouchStart = (event) => {
    // 터치 이벤트의 전파를 중지하는 코드
    event.stopPropagation();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity isVisible={isButtonVisible}
        style={[styles.button, { top: buttonMargin, left: containerSize / 2 - buttonSize / 2 }]}
        onPress={() => handlePress('UP')}
        onTouchStart={onTouchStart}
      />
      <TouchableOpacity isVisible={isButtonVisible}
        style={[styles.button, { bottom: buttonMargin, left: containerSize / 2 - buttonSize / 2 }]}
        onPress={() => handlePress('DOWN')}
        onTouchStart={onTouchStart}
      />
      <TouchableOpacity isVisible={isButtonVisible}
        style={[styles.button, { top: containerSize / 2 - buttonSize / 2, left: buttonMargin }]}
        onPress={() => handlePress('LEFT')}
        onTouchStart={onTouchStart}
      />
      <TouchableOpacity isVisible={isButtonVisible}
        style={[styles.button, { top: containerSize / 2 - buttonSize / 2, right: buttonMargin }]}
        onPress={() => handlePress('RIGHT')}
        onTouchStart={onTouchStart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 50, // 조절 가능: 컴포넌트 전체 위치 조절
    left: '50%', // 중앙 정렬
    transform: [{ translateX: -100 }], // 중앙에서 살짝 왼쪽으로 이동
    width: 200,
    height: 200,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1, // zIndex 추가
  },
  button: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'blue', // 버튼 색상은 원하는 색으로 변경
  },
});

export default MovingObjectButton;


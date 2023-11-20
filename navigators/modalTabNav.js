import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import Land from './OriginalScreen'; // 원래 화면 컴포넌트
// import SlidedScreen from './SlidedScreen'; // 슬라이드된 화면 컴포넌트
import Land from '../screens/Land';
import ImageSlideUpPanel from '../components/SlideUpModal';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Original">
        <Stack.Screen name="Original" component={Land} />
        <Stack.Screen name="Slided" component={ImageSlideUpPanel} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

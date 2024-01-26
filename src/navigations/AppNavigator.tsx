import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import StackNames from './StackNames';
import HomeStack from './Stacks/HomeStack';

const MainStackNavigator = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <MainStackNavigator.Navigator
      initialRouteName={StackNames.homeStack}
      screenOptions={{ gestureEnabled: false, headerShown: false }}
    >
      <MainStackNavigator.Screen name={StackNames.homeStack} component={HomeStack} />
    </MainStackNavigator.Navigator>
  );
};

export default AppNavigator;

import React from 'react';
import { StatusBar } from 'react-native';

import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import AppNavigator from './src/navigations/AppNavigator';
import NavigationServices from './src/navigations/NavigationServices';

const App = () => {
  const navigationRef = useNavigationContainerRef();
  return (
    <>
      <StatusBar barStyle='dark-content' />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer
          ref={navigatorRef => {
            navigationRef.current = navigatorRef;
            NavigationServices.setTopLevelNavigator(navigatorRef);
          }}
        >
          <AppNavigator />
        </NavigationContainer>
      </GestureHandlerRootView>
    </>
  )
}

export default App;
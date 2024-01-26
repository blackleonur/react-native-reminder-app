import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Scenes from '../Scenes';
import Home from '../../scenes/Home/Home.component';
import AddTask from '../../scenes/AddTask/AddTask.component';
import AlarmScreen from '../../scenes/AlarmScreen/AlarmScreen.component';

const HomeStackNavigator = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <HomeStackNavigator.Navigator
      initialRouteName={Scenes.home}
      screenOptions={{
        gestureEnabled: false,
        headerShown: true,
        headerBackTitleVisible: false,
        headerTintColor: '#FFFFFF',
        headerStyle: {
          backgroundColor: '#242424',
        },
        headerTitleAlign: 'left',
        headerTitleStyle: {
          color: '#FFFFFF',
          fontSize: 16
        },
      }}>
      <HomeStackNavigator.Screen name={Scenes.home} component={Home} options={{ headerTitle: 'Görev Listesi' }} />
      <HomeStackNavigator.Screen name={Scenes.addTask} component={AddTask} options={{ headerTitle: 'Yeni Görev Ekle' }} />
      <HomeStackNavigator.Screen name={Scenes.alarmScreen} component={AlarmScreen} options={{ headerTitle: 'Hatırlatma' }} />
    </HomeStackNavigator.Navigator>
  );
};

export default HomeStack;

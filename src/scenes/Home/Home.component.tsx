import React, { useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native'

import { SwipeListView } from 'react-native-swipe-list-view';
import { Icon } from 'react-native-eva-icons';
import { useIsFocused } from '@react-navigation/native'; 

import AppWrapper from '../../components/AppWrapper/AppWrapper.component';
import CustomButton from '../../components/CustomButton/CustomButton.component';
import TaskCard from '../../components/TaskCard/TaskCard.component';

import { useHome } from './hooks/Home.hook';

import styles from './Home.style';

const Home = () => {
  const focused = useIsFocused();
  const { alarmsData, alarmsRef, setIsFocused, onAddTaskPress, onDeletePress } = useHome();

  const {
    container,
    addTaskButtonStyle,
    actionItemContainer,
    actionItemBoxStyle,
  } = styles();

  useEffect(() => {
    setIsFocused(focused);
  }, [focused])

  return (
    <AppWrapper overrideStyle={container}>
      <SwipeListView
        ref={alarmsRef}
        data={alarmsData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TaskCard
            key={item.id}
            title={item.title}
            description={item.description}
            remindDate={item.remindDate}
            remindBefore={item.remindBefore}
            remindBeforeType={item.remindBeforeType}
            onPress={() => onDeletePress(item.id)}
          />
        )}
        // renderHiddenItem={({ item }) => (
        //   <View style={actionItemContainer}>
        //     <TouchableOpacity style={actionItemBoxStyle} onPress={() => onDeletePress(item.id)}>
        //       <Icon name='trash-2-outline' width={32} height={32} fill='#FFFFFF' />
        //     </TouchableOpacity>
        //   </View>
        // )}
      />
      <CustomButton title='Görev Ekle' overrideStyle={addTaskButtonStyle} onPress={onAddTaskPress} />
    </AppWrapper>
  )
}

export default Home;
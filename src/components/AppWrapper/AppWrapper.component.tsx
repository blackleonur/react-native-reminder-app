import React, { useMemo } from 'react';
import { SafeAreaView, View } from 'react-native';

import styles from './AppWrapper.style';
import { AppWrapperProps } from './AppWrapper.types';

const AppWrapper: React.FC<AppWrapperProps> = ({
  children,
  overrideMainContainerStyle,
  overrideContainerStyle,
  overrideStyle,
  removeSafeAreaView = false,
}) => {
  const { mainContainerStyle, containerStyle, body } = useMemo(
    () => styles(),
    [],
  );

  const MainView = removeSafeAreaView ? View : SafeAreaView;

  return (
    <View style={[mainContainerStyle, overrideMainContainerStyle]}>
      <MainView style={[containerStyle, overrideContainerStyle]}>
        <View style={[body, overrideStyle]}>{children}</View>
      </MainView>
    </View>
  );
};

export default AppWrapper;

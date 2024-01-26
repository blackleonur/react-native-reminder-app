import { Platform, StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const styles = () =>
  StyleSheet.create({
    mainContainerStyle: {
      flex: 1,
      backgroundColor: '#FFFFFF'
    },
    containerStyle: {
      flex: 1,
      paddingBottom: 20,
    },
    body: {
      paddingHorizontal: 16,
      flex: 1,
      ...Platform.select({
        ios: {
          paddingTop: 0,
        },
        android: {
          paddingTop: getStatusBarHeight(),
        },
        default: {
          // other platforms, web for example
          paddingTop: 0,
        },
      }),
    },
  });

export default styles;

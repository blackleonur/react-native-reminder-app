import { StyleSheet } from 'react-native';

const homeStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 0,
      paddingHorizontal: 0,
    },
    addTaskButtonStyle: {
      position: 'absolute',
      bottom: 10,
      alignSelf: 'center',
      paddingHorizontal: 32,
    },
    actionItemContainer: {
      flex: 1,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'flex-end'
    },
    actionItemBoxStyle: {
      width: 75,
      height: '100%',
      backgroundColor: 'red',
      justifyContent: 'center',
      alignItems: 'center'
    }
  });

export default homeStyles;

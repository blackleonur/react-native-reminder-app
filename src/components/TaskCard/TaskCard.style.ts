import { StyleSheet } from 'react-native';

const styles = () =>
  StyleSheet.create({
    containerStyle: {
      backgroundColor: '#FFFFFF',
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 2,
      borderBottomColor: '#E0E0E0',
      paddingVertical: 10,
      paddingHorizontal: 16,
    },
    mainContainerStyle: {
      flex: 1,
      height: 50,
      backgroundColor: '#FFFFFF',
      justifyContent: 'center',
      alignItems: 'flex-start',
      marginStart: 16,
    },
    titleStyle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#242424',
    },
    descriptionStyle: {
      fontSize: 14,
      color: '#242424',
    },
  });

export default styles;

import { StyleSheet } from 'react-native';

const styles = () =>
  StyleSheet.create({
    containerStyle: {
      backgroundColor: '#242424',
      flexDirection: 'row',
      alignContent: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 100,
      borderWidth: 1,
      paddingHorizontal: 16,
      paddingVertical: 10,
    },
    textStyle: {
      fontSize: 16,
      color: '#FFFFFF',
    },
    imageStyle: {
      width: 18,
      height: 18,
    },
  });

export default styles;

import { StyleSheet } from 'react-native';

const alarmScreenStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 10,
    },
    buttonStyle: {
      position: 'absolute',
      bottom: 10,
      alignSelf: 'center',
      paddingHorizontal: 32,
    },
    alarmContainer: {
      width: '100%',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      top: -40,
    },
    iconContainer: {
      width: '100%',
      backgroundColor: '#E2E2E2',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 24,
      borderRadius: 10,
      marginVertical: 16,
    },
    titleStyle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#000',
    },
    subtitleStyle: {
      marginTop: 8,
      fontSize: 16,
      color: '#242424'
    },
    descriptionContainer: {
      fontSize: 14,
      color: '#242424'
    }
  });

export default alarmScreenStyles;

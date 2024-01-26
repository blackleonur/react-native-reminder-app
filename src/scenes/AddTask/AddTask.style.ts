import { StyleSheet } from 'react-native';

const addTaskStyles = () =>
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
    pickerContainerStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 10,
      borderWidth: 1,
      borderRadius: 10,
      padding: 16
    },
    pickerTextStyle: {
      fontSize: 16,
      color: '#242424',
    },
    titleInputStyle: {
      width: '100%',
      backgroundColor: '#FFFFFF',
      marginTop: 10,
      borderWidth: 1,
      borderRadius: 10,
      fontSize: 16,
      paddingHorizontal: 16,
      paddingVertical: 16,
    },
    descriptionInputStyle: {
      width: '100%',
      height: 100,
      backgroundColor: '#FFFFFF',
      marginTop: 10,
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 16,
      paddingTop: 8,
      fontSize: 16,
    },
    checkBoxContainerStyle: {
      marginTop: 10,
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 16,
      paddingVertical: 8,
    },
  });

export default addTaskStyles;

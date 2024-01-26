import { View, Text } from 'react-native'

import { Icon } from 'react-native-eva-icons';

import AppWrapper from '../../components/AppWrapper/AppWrapper.component';
import CustomButton from '../../components/CustomButton/CustomButton.component';

import { useAlarmScreen } from './hooks/AlarmScreen.hook';

import styles from './AlarmScreen.style';
import { useRoute } from '@react-navigation/native';
import moment from 'moment';

const AlarmScreen = () => {
  const { data } = (useRoute()?.params as any) || {};

  const {
    onOkPress,
  } = useAlarmScreen();

  const {
    container,
    buttonStyle,
    alarmContainer,
    titleStyle,
    subtitleStyle,
    iconContainer,
    descriptionContainer,
  } = styles();

  console.log('data', data);

  return (
    <AppWrapper overrideStyle={container}>
      <View style={alarmContainer}>
        <Text style={titleStyle}>{data?.title}</Text>
        <Text style={subtitleStyle}>{moment(data?.date).format('HH:mm').toString()}</Text>
        <View style={iconContainer}>
          <Icon name="bell-outline" width={144} height={144} color="#242424" />
        </View>
        <Text style={descriptionContainer}>{data?.message}</Text>
      </View>
      <CustomButton title='Tamam' overrideStyle={buttonStyle} onPress={() => onOkPress(data.id)} />
    </AppWrapper>
  )
}

export default AlarmScreen;
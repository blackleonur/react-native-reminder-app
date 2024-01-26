import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native'

import { Icon } from 'react-native-eva-icons';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

import AppWrapper from '../../components/AppWrapper/AppWrapper.component';
import CustomButton from '../../components/CustomButton/CustomButton.component';

import { useAddTask } from './hooks/AddTask.hook';

import styles from './AddTask.style';

const AddTask = () => {
  const {
    title,
    setTitle,
    reminderIntervals,
    remindBefore,
    setRemindBefore,
    description,
    setDescription,
    isDateTimePickerVisible,
    showDateTimePicker,
    hideDateTimePicker,
    handleDatePicker,
    handleFilePicker,
    selectedSoundFile,
    selectedDateTime,
    handleAddTask,
  } = useAddTask();

  const {
    container,
    buttonStyle,
    titleInputStyle,
    descriptionInputStyle,
    checkBoxContainerStyle,
    pickerContainerStyle,
    pickerTextStyle,
  } = styles();

  return (
    <AppWrapper overrideStyle={container}>
      <TextInput
        value={title}
        onChangeText={(text) => setTitle(text)}
        placeholder='Başlık'
        placeholderTextColor='#242424'
        style={titleInputStyle}
      />
      <TouchableOpacity style={pickerContainerStyle} onPress={showDateTimePicker}>
        <Text style={pickerTextStyle}>{selectedDateTime ? new Date(selectedDateTime).toUTCString() : 'Tarih ve Zaman Seçiniz'}</Text>
        <Icon name='calendar-outline' width={24} height={24} fill='#242424' />
      </TouchableOpacity>
      <TouchableOpacity style={pickerContainerStyle} onPress={handleFilePicker}>
        <Text style={pickerTextStyle}>{selectedSoundFile ? String(selectedSoundFile.name) : 'Zil Sesi Seçiniz'}</Text>
        <Icon name='music-outline' width={24} height={24} fill='#242424' />
      </TouchableOpacity>
      <TextInput
        value={description}
        onChangeText={(text) => setDescription(text)}
        placeholder='Açıklama'
        placeholderTextColor='#242424'
        style={descriptionInputStyle}
        multiline={true}
      />
      <Dropdown
        labelField='label'
        valueField='remindBefore'
        placeholder='Hatırlatma Zamanını Seçiniz'
        data={reminderIntervals}
        value={remindBefore}
        onChange={(item: any) => setRemindBefore(item)}
        style={checkBoxContainerStyle}
        renderRightIcon={() => <Icon name='clock-outline' width={24} height={24} fill='#242424' />}
      />
      <CustomButton title='Kaydet' overrideStyle={buttonStyle} onPress={handleAddTask} />
      <DateTimePickerModal
        is24Hour={true}
        mode='datetime'
        locale="tr_TR"
        timeZoneOffsetInMinutes={0}
        date={selectedDateTime}
        isVisible={isDateTimePickerVisible}
        onConfirm={handleDatePicker}
        onCancel={hideDateTimePicker}
      />
    </AppWrapper>
  )
}

export default AddTask;
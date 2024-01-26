import React, { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';

import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';
import moment from 'moment'; // Moment.js eklenmiş

import Scenes from '../../../navigations/Scenes';
import NavigationServices from '../../../navigations/NavigationServices';

type ReminderIntervalType = {
    remindBefore: number;
    label: string;
}

const useAddTask = () => {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState<boolean>(false);
    const [selectedDateTime, setSelectedDateTime] = useState<Date>(moment().add(3, 'hours').toDate());
    const [selectedSoundFile, setSelectedSoundFile] = useState<any>();
    const [remindBefore, setRemindBefore] = useState<ReminderIntervalType>();
    const reminderIntervals = [
        {
            remindBefore: 0,
            label: 'Anında',
        },
        {
            remindBefore: 10,
            label: '10 Dakika Önce',
        },
        {
            remindBefore: 20,
            label: '20 Dakika Önce',
        },
        {
            remindBefore: 30,
            label: '30 Dakika Önce',
        },
        {
            remindBefore: 40,
            label: '40 Dakika Önce',
        },
    ];

    useEffect(() => {
        createChannels();
    }, []);

    const showDateTimePicker = () => {
        setIsDateTimePickerVisible(true);
    };

    const hideDateTimePicker = () => {
        setIsDateTimePickerVisible(false);
    };

    const handleDatePicker = (date: Date) => {
        // const convertedDate = new Date(date.setMinutes(date.getMinutes() + 1));
        // convertedDate.setSeconds(0);
        const convertedDate = moment(date).set({ seconds: 0 }).toDate();
        setSelectedDateTime(convertedDate);
        hideDateTimePicker();
    };

    const handleFilePicker = useCallback(async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.audio],
            });

            const selectedFile = res[0];
            setSelectedSoundFile({
                uri: selectedFile.uri,
                name: selectedFile.name,
            });
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('User cancelled file picker');
            } else {
                throw err;
            }
        }
    }, []);

    const checkFormValidation = useCallback(async () => {
        if (!selectedDateTime) {
            return Alert.alert('Hata', 'Lütfen bir tarih/saat seçiniz.');
        }

        // if (!selectedSoundFile) {
        //     return Alert.alert('Hata', 'Lütfen bir zil sesi seçiniz.');
        // }

        if (!description) {
            return Alert.alert('Hata', 'Lütfen bir açıklama giriniz.');
        }

        if (!remindBefore) {
            return Alert.alert('Hata', 'Lütfen bir hatırlatma aralığı seçiniz.');
        }

        return true;
    }, [selectedDateTime, selectedSoundFile, description, remindBefore]);

    const createChannels = () => {
        PushNotification.createChannel({
            channelId: "alarm-channel",
            channelName: "Alarm Channel",
            channelDescription: "A channel to categorise your notifications",
            vibrate: true,
        },
            (created) => console.log(`createChannel returned '${created}'`)
        );
    };

    const handleAddTask = useCallback(async () => {
        try {
            const checkFormValidationResult = await checkFormValidation();

            if (!checkFormValidationResult) return;

            // minus remindBefore from selectedDateTime
            // const fireDate = new Date(selectedDateTime.getTime() - remindBefore!.remindBefore * 60 * 1000)
            const fireDate = moment(selectedDateTime).subtract(remindBefore!.remindBefore, 'minutes').toDate();

            const itemId = Math.floor(Math.random() * 1000000) + 1;
            const alarmsData = await AsyncStorage.getItem('alarmsData');
            const alarmsDataParsed = alarmsData ? JSON.parse(alarmsData) : [];

            const newAlarm = {
                id: itemId,
                title,
                description,
                remindDate: selectedDateTime,
                remindBefore: remindBefore?.remindBefore,
                selectedSoundFile,
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            alarmsDataParsed.push(newAlarm);

            const alarmNotifData = {
                channelId: "alarm-channel",
                ticker: "My Notification Message",
                id: itemId,
                title,
                message: description,
                autoCancel: true,
                vibrate: true,
                vibration: 100,
                smallIcon: "ic_launcher",
                largeIcon: "ic_launcher",
                playSound: true,
                soundName: "alarm_tone",
                color: 'red',
                tag: "some_tag",
                fire_date: fireDate,
                date: { value: selectedDateTime }
            }

            PushNotification.localNotificationSchedule({
                channelId: "alarm-channel",
                id: alarmNotifData.id,
                title: alarmNotifData.title,
                message: alarmNotifData.message,
                date: fireDate,
                soundName: "default",
                actions: ["Stop Alarm"],
                importance: "high",
                repeatTime: 1,
                playSound: true,
                allowWhileIdle: true,
                invokeApp: false,
            });

            PushNotification.configure({
                onAction: function (notification: any) {
                    if (notification.action === 'Snooze') {
                        console.log('Alarm ' + notification.id + ' Snoozed');
                        console.log('Alarm ID: ' + notification.id)

                        PushNotification.localNotificationSchedule({
                            channelId: "alarm-channel",
                            title: notification.title,
                            id: notification.id,
                            message: notification.message,
                            date: alarmNotifData.fire_date,
                            soundName: "default",
                            actions: ["Snooze", "Stop Alarm"],
                            importance: 'high',
                            playSound: true,
                            allowWhileIdle: true,
                            invokeApp: false,
                        });
                    }
                    else if (notification.action === 'Stop Alarm') {
                        console.log('Alarm ' + notification.id + ' Stopped');
                        PushNotification.cancelLocalNotification(notification.id);
                    }
                    else {
                        console.log('Notification opened');
                    }
                },
            });

            await AsyncStorage.setItem('alarmsData', JSON.stringify(alarmsDataParsed));
            Alert.alert('Başarılı', 'Yeni hatırlatma başarıyla eklendi.', [
                {
                    text: 'Tamam',
                    onPress: () => NavigationServices.navigate(Scenes.home),
                }
            ]);
        } catch (err) {
            console.log('ERROR>>>>', err);
        }
    }, [checkFormValidation, description, remindBefore, selectedDateTime]);

    return {
        title,
        setTitle,
        reminderIntervals,
        description,
        setDescription,
        remindBefore,
        setRemindBefore,
        isDateTimePickerVisible,
        showDateTimePicker,
        hideDateTimePicker,
        handleDatePicker,
        handleFilePicker,
        selectedSoundFile,
        selectedDateTime,
        handleAddTask,
    };
};

export type { ReminderIntervalType };
export { useAddTask };
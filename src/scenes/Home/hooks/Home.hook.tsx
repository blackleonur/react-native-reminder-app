import { useCallback, useEffect, useRef, useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import Scenes from '../../../navigations/Scenes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';
import { Alert } from 'react-native';

export const useHome = () => {
    const navigation = useNavigation();
    const [isFocused, setIsFocused]= useState<boolean>(false);
    const alarmsRef = useRef(null);
    const [alarmsData, setAlarmsData] = useState<any[]>([]);


    const getAlarms = useCallback(async () => {
        const alarms = await AsyncStorage.getItem('alarmsData');
        if (alarms) {
            const parsedAlarms = JSON.parse(alarms);

            // createdAt alanındaki string tarihleri Date objelerine dönüştür
            const alarmsWithDate = parsedAlarms.map((alarm: any) => ({
                ...alarm,
                createdAt: new Date(alarm.createdAt),
            }));

            // Date objelerine göre sırala (en yeni en üstte)
            const sortedAlarms = alarmsWithDate.sort((a: any, b: any) => b.createdAt - a.createdAt);

            setAlarmsData(sortedAlarms);
        }

    }, []);

    const onDeletePress = useCallback(async (alarmIdToDelete: string) => {
        try {
            const onDelete = async () => {
                // Mevcut alarm verilerini AsyncStorage'ten al
                const alarms = await AsyncStorage.getItem('alarmsData');

                if (alarms) {
                    // AsyncStorage'ten alınan string veriyi JSON'a çevir
                    const parsedAlarms = JSON.parse(alarms);

                    // Silmek istediğimiz alarmı bul
                    const updatedAlarms = parsedAlarms.filter((alarm: any) => alarm.id !== alarmIdToDelete);

                    // Güncellenmiş alarm listesini AsyncStorage'e geri kaydet
                    await AsyncStorage.setItem('alarmsData', JSON.stringify(updatedAlarms));

                    // State'i güncelle (güncellenmiş alarm listesiyle)
                    setAlarmsData(updatedAlarms);

                    // Planlanmış bildirimi iptal et
                    PushNotification.cancelLocalNotification(alarmIdToDelete)
                }
            }

            Alert.alert('Alarmı Sil', 'Alarmı silmek istiyor musunuz?', [
                { text: 'Sil', style: 'destructive', onPress: () => onDelete() },
                { text: 'Vazgeç', style: 'cancel', onPress: () => console.log('canceled'), }
            ]);

        } catch (error) {
            console.error('Error while deleting alarm:', error);
        }
    }, []);

    useEffect(() => {
        getAlarms();
    }, [isFocused, setIsFocused]);

    const onAddTaskPress = useCallback(() => {
        navigation.navigate(Scenes.addTask as never);
    }, []);

    return {
        alarmsRef,
        alarmsData,
        setIsFocused,
        onAddTaskPress,
        onDeletePress,
    };
};
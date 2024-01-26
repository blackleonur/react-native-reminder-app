import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from './TaskCard.style';// Stilleri içeren modülü içe aktar
import { TaskCardPropsTypes } from './TaskCard.types';// Bileşenin prop tiplerini içe aktar
import { Icon } from 'react-native-eva-icons';// Eva Icons kütüphanesinden Icon bileşeni
import moment from 'moment';// Tarih ve saat işlemleri için Moment.js kütüphanesi

// TaskCard bileşeni, bir görevin özelliklerini gösteren bir kart bileşenidir
const TaskCard: React.FC<TaskCardPropsTypes> = ({
    onPress = () => { },// Kartın üzerine tıklandığında çalışacak fonksiyon (varsayılan olarak boş bir fonksiyon)
    overrideStyle,// Bileşenin stilini geçersiz kılmak için kullanılan prop
    title = '', // Görevin başlığı
    description = '',// Görevin açıklaması
    remindDate,// Hatırlatma tarihi
    remindBefore,// Hatırlatma süresi
    remindBeforeType,// Hatırlatma süresi birimi (örneğin, dakika veya saat)
    icon = <Icon name="clock-outline" width={32} height={32} fill='#242424' />,// Görevin yanında görüntülenecek ikon (varsayılan olarak saat ikonu)
}) => {
    
    
    // Stilleri useMemo hook'u kullanarak bir kere hesapla ve daha sonra bu değerleri kullan
    const { containerStyle, mainContainerStyle, titleStyle, descriptionStyle } = useMemo(
        () => styles(),
        []
    );

    return (
        <TouchableOpacity
            style={[containerStyle, overrideStyle]}
            activeOpacity={1}
            onPress={onPress}
        >
             {/* Görevin yanında görüntülenecek ikon */}
            {icon}
            <View style={mainContainerStyle}>
                <Text style={titleStyle}>
                    {title} ({moment(remindDate).subtract(remindBefore!.remindBefore, 'minutes').format('lll')})
                </Text>
                <Text style={descriptionStyle}>
                    {description}
                </Text>
            </View>
        </TouchableOpacity >
    );
};

export default TaskCard;// Bileşeni dışa aktar

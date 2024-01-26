import React, { useCallback, useEffect, useState } from 'react';

import NavigationServices from '../../../navigations/NavigationServices';
import Scenes from '../../../navigations/Scenes';
import PushNotification from 'react-native-push-notification';

const useAlarmScreen = () => {

    const onOkPress = (id: string) => {
        NavigationServices.navigate(Scenes.home);
        PushNotification.cancelLocalNotification(id);
    };

    return {
        onOkPress,
    };
};

export { useAlarmScreen };
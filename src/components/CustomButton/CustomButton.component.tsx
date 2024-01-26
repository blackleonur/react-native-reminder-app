import React, { useMemo } from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';

import styles from './CustomButton.style';
import { CustomButtonPropsTypes } from './CustomButton.types';

const CustomButton: React.FC<CustomButtonPropsTypes> = ({
    onPress = () => { },
    overrideStyle,
    title = '',
    disabled = false,
    leftIcon,
    showLeftIcon = false,
}) => {

    const { containerStyle, textStyle, imageStyle } = useMemo(
        () => styles(),
        []
    );

    const renderLeftIcon = () => {
        return (
            leftIcon && (
                <Image
                    source={leftIcon}
                    style={imageStyle}
                    resizeMode='contain'
                />
            )
        );
    };

    return (
        <TouchableOpacity
            style={[containerStyle, overrideStyle]}
            activeOpacity={1}
            onPress={onPress}
            disabled={disabled}>
            {showLeftIcon && renderLeftIcon()}
            <Text style={textStyle}>
                {title}
            </Text>
        </TouchableOpacity >
    );
};

export default CustomButton;

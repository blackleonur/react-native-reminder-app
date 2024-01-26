import { StyleProp, ViewStyle, ImageSourcePropType } from 'react-native';

type CustomButtonPropsTypes = {
  overrideStyle?: StyleProp<ViewStyle>;
  onPress: () => void;
  title: string;
  disabled?: boolean;
  leftIcon?: ImageSourcePropType;
  showLeftIcon?: boolean;
};
export type { CustomButtonPropsTypes };

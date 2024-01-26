import { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

type TaskCardPropsTypes = {
  onPress: () => void;
  overrideStyle?: StyleProp<ViewStyle>;
  title: string;
  description: string;
  remindDate: any;
  remindBefore: any;
  remindBeforeType: string;
  icon?: ReactNode;
};
export type { TaskCardPropsTypes };

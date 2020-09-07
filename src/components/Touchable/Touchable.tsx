import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

type TouchableProps = TouchableOpacityProps & {};

export const Touchable: React.FC<TouchableProps> = (props) => {
  return <TouchableOpacity {...props} />;
};

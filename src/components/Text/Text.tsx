import React from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';

export const Text: React.FC<RNTextProps> = ({ style, ...props }) => {
  return <RNText {...props} style={[style]} />;
};

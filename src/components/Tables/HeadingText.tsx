import React from 'react';
import { TextStyle } from 'react-native';
import { Text } from 'src/components/Text';
import { StringOrComp } from './StringOrComp';
import { flatten } from './util';

type HeadingTextProps = {
  style?: TextStyle;
};

export const HeadingText: React.FC<HeadingTextProps> = ({ children, style }) => {
  return (
    <StringOrComp possibleComponent={children}>
      <Text style={flatten(style)}>{children}</Text>
    </StringOrComp>
  );
};

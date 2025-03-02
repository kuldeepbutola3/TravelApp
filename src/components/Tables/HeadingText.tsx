import React from 'react';
import { TextStyle } from 'react-native';
// import { Text } from 'src/components/Text';
import { StringOrComp } from './StringOrComp';
import { flatten } from './util';
import { ComponentProps } from '../../types/componentProps';
import { Text } from '../Text';

type HeadingTextProps = {
  style?: TextStyle;
} & ComponentProps;

export const HeadingText: React.FC<HeadingTextProps> = ({ children, style }) => {
  return (
    <StringOrComp possibleComponent={children}>
      <Text style={flatten(style)}>{children}</Text>
    </StringOrComp>
  );
};

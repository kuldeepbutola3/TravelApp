import React from 'react';
import {
  StyleSheet,
  TextStyle,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
  TextProps,
} from 'react-native';
import { Text } from './Text';

type HyperLinkProps = TextProps & {
  onPress: TouchableWithoutFeedbackProps['onPress'];
};

export const HyperLink: React.FC<HyperLinkProps> = ({ onPress, style, ...textProps }) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <Text style={[styles.underline, style]} {...textProps} />
  </TouchableWithoutFeedback>
);

const styles = StyleSheet.create({
  underline: {
    textDecorationLine: 'underline',
  } as TextStyle,
});

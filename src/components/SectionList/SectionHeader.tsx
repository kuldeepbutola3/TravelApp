import React from 'react';
import {View, ViewStyle, StyleSheet, StyleProp} from 'react-native';
import {Text} from 'src/components/Text';

/**
 * The visual difference between the first large section header
 * at the top of the screen and the subsequent kinda-large headers.
 * Default is `smallTitle`
 */
export type HeaderTypes = 'largeTitle' | 'smallTitle';
export type SectionHeaderProps = {
  styleVariant?: HeaderTypes;
  /**
   * The text, if different from the top screen dropdown, that is seen
   * in the scroll view
   */
  children?: string;
  containerStyle?: StyleProp<ViewStyle>;
};
export const SectionHeader: React.FC<SectionHeaderProps> = ({
  children,
  containerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 18,
    paddingBottom: 14,
  } as ViewStyle,
});

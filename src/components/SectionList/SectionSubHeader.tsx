import React from 'react';
import { ViewStyle, StyleSheet, TextStyle, StyleProp, View } from 'react-native';
import { Text } from 'src/components/Text';

type SectionSubHeaderProps = {
  children: React.ReactNode;
  textStyle?: StyleProp<TextStyle>;
  variant?: 'regular' | 'good' | 'bad';
  containerStyle?: StyleProp<ViewStyle>;
};

export const SectionSubHeader: React.FC<SectionSubHeaderProps> = ({
  textStyle,
  containerStyle,
  children,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={textStyle}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  } as ViewStyle,
});

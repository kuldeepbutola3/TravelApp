import React, { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient, { LinearGradientProps } from 'react-native-linear-gradient';

interface IGradienBackground extends LinearGradientProps {
  children?: ReactNode;
}

const GradientBackground = (props: IGradienBackground) => {
  const { children, colors, style } = props;
  return (
    <LinearGradient style={[styles.container, style]} colors={colors}>
      {children}
    </LinearGradient>
  );
};

export default GradientBackground;

const styles = StyleSheet.create({
  container: { flex: 1 },
});

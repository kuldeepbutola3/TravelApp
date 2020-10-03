import React, { ReactNode } from 'react';
import LinearGradient, { LinearGradientProps } from 'react-native-linear-gradient';

interface IGradienBackground extends LinearGradientProps {
  children?: ReactNode;
}

const GradientBackground = (props: IGradienBackground) => {
  const { children, colors, style } = props;
  return (
    <LinearGradient style={[{ flex: 1 }, style]} colors={colors}>
      {children}
    </LinearGradient>
  );
};

export default GradientBackground;

import React from 'react';
import HTML from 'react-native-render-html';

export type TextHtmlProps = HTML.ContainerProps & {
  // themeStyle?: ThemedTextStyle;
};

export const TextHtml: React.FC<TextHtmlProps> = (baseFontStyle, { ...props }) => {
  // const theme = useTheme();
  // const textStyle = themeStyle && theme.textStyles[themeStyle];
  return <HTML {...props} baseFontStyle={baseFontStyle} />;
};

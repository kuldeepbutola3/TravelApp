import {TextStyle} from 'react-native';

export const textStyleToSVG = (textStyle: TextStyle) => ({
  fontStyle: textStyle.fontStyle,
  letterSpacing: textStyle.letterSpacing,
  fontSize: textStyle.fontSize,
  fontWeight: textStyle.fontWeight,
  fontFamily: textStyle.fontFamily,
  fill: textStyle.color,
});

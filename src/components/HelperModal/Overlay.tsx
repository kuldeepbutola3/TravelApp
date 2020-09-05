import React from 'react';
import {
  Overlay as RNEOverlay,
  OverlayProps as RNEOverlayProps,
} from 'react-native-elements';

export type OverlayProps = RNEOverlayProps & {};

export const Overlay: React.FC<OverlayProps> = ({children, ...props}) => {
  return <RNEOverlay {...props}>{children}</RNEOverlay>;
};

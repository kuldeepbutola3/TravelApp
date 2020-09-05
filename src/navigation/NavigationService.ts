import React from 'react';
import {NavigationContainerRef} from '@react-navigation/native';

export const navigationRef = React.createRef<NavigationContainerRef>();

type RouteName = string;
type Params = object;

export const navigate = (routeName: RouteName, params?: Params) => {
  navigationRef.current?.navigate(routeName, {params});
};

import React from 'react';

import { Screen } from '../components/Screen';
import { Text } from '../components/Text';

export const createFakeScreen = (text: string, backgroundColor: string) => () => (
  <Screen style={{ backgroundColor }}>
    <Text>Tab {text}</Text>
  </Screen>
);

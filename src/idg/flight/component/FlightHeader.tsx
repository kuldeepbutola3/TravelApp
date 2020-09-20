import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-elements';

import { Header, HeaderProps } from 'src/components/Header';
import { Text } from 'src/components/Text';
import { FlightResponse } from '../FlightModel';
interface FlightHeaderProps {
  onPressBack: HeaderProps['onPressBack'];
  response?: FlightResponse;
}
export const FlightHeader: FC<FlightHeaderProps> = ({ onPressBack, response }) => {
  return (
    <Header onPressBack={onPressBack}>
      {response && (
        <View style={styles.headerContainer}>
          <Text style={styles.text}>{response.origin}</Text>
          <Icon name="arrow-forward" color="white" size={16} />
          <Text style={styles.text}>{response.destination}</Text>
        </View>
      )}
    </Header>
  );
};
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 15,
    color: 'white',
    marginHorizontal: 5,
  },
});

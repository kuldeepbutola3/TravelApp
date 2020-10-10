import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-elements';

import { Header, HeaderProps } from 'src/components/Header';
import { Text } from 'src/components/Text';
import { GetFlightParam } from '../flightApi';
interface FlightHeaderProps {
  onPressBack: HeaderProps['onPressBack'];
  response: GetFlightParam;
}
export const FlightHeader: FC<FlightHeaderProps> = ({ onPressBack, response }) => {
  return (
    <Header onPressBack={onPressBack}>
      {response && (
        <View style={styles.headerContainer}>
          <Text style={styles.text}>
            {response.originName}
            <Icon name="arrow-forward" color="white" size={16} />
            {response.destinationName}
          </Text>
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

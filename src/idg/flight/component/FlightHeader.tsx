import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-elements';

import { Header, HeaderProps } from 'src/components/Header';
import { Text } from 'src/components/Text';
import { useSliceSelector } from 'src/redux/hooks';
import { formatDate } from 'src/utils/date-formatter';
import { useAuraTranslation } from 'src/utils/i18n';
import { GetFlightParam } from '../flightApi';
interface FlightHeaderProps {
  onPressBack: HeaderProps['onPressBack'];
  response: GetFlightParam;
}
export const FlightHeader: FC<FlightHeaderProps> = ({ onPressBack, response }) => {
  const { t } = useAuraTranslation();
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
      <Text style={styles.text}>
        {`${formatDate(response.journeyDate1, 'DD MMM')} | ${
          response.adultCount + response.childCount + response.infantCount
        } ${t('traveller')} | ${response.class}`}
      </Text>
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

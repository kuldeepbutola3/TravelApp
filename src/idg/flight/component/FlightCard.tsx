import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Divider, Text } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

export interface FlightCardProps {
  isMultiple?: boolean;
  flightName: string;
  flightCode: string;
  startTime: string;
  startCity: string;
  endTime: string;
  endCity: string;
  fare: string;
  seatLeft: string;
  stop: string;
  onPress?: () => void;
}

export const FlightCard: FC<FlightCardProps> = ({
  flightName,
  flightCode,
  startTime,
  startCity,
  endTime,
  endCity,
  fare,
  seatLeft,
  stop,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.header}>
          {flightName} <Text style={styles.headerCont}>|{flightCode}</Text>
        </Text>
        <View style={styles.innnerContainer}>
          <View style={styles.dividedView} />
          <View style={styles.dividedView}>
            <Text style={styles.time}>{startTime}</Text>
            <Text style={styles.gryText}>{startCity}</Text>
          </View>
          <View style={styles.dividedView}>
            <Text style={styles.gryText}>duration</Text>
            <Divider style={styles.divider} />
            <Text style={styles.gryText}>{stop}</Text>
          </View>
          <View style={styles.dividedView}>
            <Text style={styles.time}>{endTime}</Text>
            <Text style={styles.gryText}>{endCity}</Text>
          </View>
          <View style={styles.dividedView}>
            <Text style={styles.fare}>{fare}</Text>
            <Text style={styles.seat}>{seatLeft}</Text>
          </View>
        </View>
        {/* <Divider /> */}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  innnerContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  dividedView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  header: {
    fontSize: 12,
  },
  headerCont: {
    fontSize: 12,
    color: 'grey',
  },
  time: {
    fontSize: 14,
  },
  gryText: {
    fontSize: 11,
    color: 'grey',
  },
  fare: {
    fontSize: 14,
  },
  seat: {
    fontSize: 9,
    color: 'red',
  },

  divider: { width: 50, height: 2 },
});

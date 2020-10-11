import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Divider, Text } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

export interface FlightCardProps {
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

interface FlightCardInnerProps extends FlightCardProps {
  isMultiple: boolean;
  isLast: boolean;
}

const FlightCard: FC<FlightCardInnerProps> = ({
  isLast,
  isMultiple,
  flightName,
  flightCode,
  startTime,
  startCity,
  endTime,
  endCity,
  fare,
  seatLeft,
  stop,
}) => {
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.header}>
          {flightName} <Text style={styles.headerCont}>|{flightCode}</Text>
        </Text>
        <View style={styles.innnerContainer}>
          <View style={styles.imageView} />
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
          {!isMultiple && (
            <View style={styles.dividedView}>
              <Text style={styles.fare}>{fare}</Text>
              <Text style={styles.seat}>{seatLeft}</Text>
            </View>
          )}
        </View>
        {/* <Divider /> */}
        {isMultiple && isLast && (
          <View style={styles.lastView}>
            <Text style={styles.fare}>{fare}</Text>
            <Text style={styles.seat}>{seatLeft}</Text>
          </View>
        )}
      </View>
    </View>
  );
};
export const FlightCardList: FC<{ data: Array<FlightCardProps>; isMultiple: boolean }> = ({
  data,
  isMultiple,
}) => {
  return (
    <TouchableOpacity style={card.container} onPress={data[0].onPress}>
      {data.map((item, index) => (
        <View style={card.innnerContainer}>
          <FlightCard
            {...item}
            isMultiple={isMultiple ? isMultiple : data.length > 0}
            isLast={isMultiple ? isMultiple : index === data.length - 1}
          />
        </View>
      ))}
    </TouchableOpacity>
  );
};
const card = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  innnerContainer: {
    flex: 1,
  },
});
const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  innnerContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  imageView: {
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dividedView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lastView: {
    alignItems: 'flex-end',
  },

  header: {
    fontSize: 12,
  },
  headerCont: {
    fontSize: 12,
    color: 'grey',
  },
  time: {
    fontSize: 12,
  },
  gryText: {
    fontSize: 9,
    color: 'grey',
  },
  fare: {
    fontSize: 12,
  },
  seat: {
    fontSize: 9,
    color: 'red',
  },

  divider: { width: 50, height: 2 },
});

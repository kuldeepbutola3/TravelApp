import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { Touchable } from 'src/components/Touchable';

interface IDateDateSelector {
  label: string;
  date: string;
  day: string;
  onPress?: () => void;
  disabled?: boolean;
  containerStyles: ViewStyle;
}

const DateSelector = ({
  label,
  date,
  day,
  onPress,
  disabled,
  containerStyles,
}: IDateDateSelector) => {
  const style = { borderWidth: disabled ? 0 : 1, zIndex: 0 };
  return (
    <Touchable
      activeOpacity={0.9}
      disabled={disabled === false || !onPress}
      style={[styles.container, containerStyles, style]}
      onPress={disabled ? undefined : onPress}
    >
      <Text style={styles.label}>{label}</Text>
      <View style={styles.containerInner}>
        {/* <Icon name="calendar" type="SimpleLineIcons" size={30} color="white" style={styles.icon} /> */}
        <Icon name="calendar" size={30} color="white" style={styles.icon} />
        {disabled ? (
          <Text style={styles.placeholder}>Book Round Trips for Extra Savings!</Text>
        ) : (
          <View>
            <Text style={styles.date}>{date}</Text>
            <Text style={styles.day}>{day}</Text>
          </View>
        )}
      </View>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 90,
    borderRadius: 10,
    borderColor: 'white',
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  containerInner: { flexDirection: 'row' },
  label: {
    color: '#b2bec3',
    opacity: 0.9,
    fontSize: 16,
    fontWeight: '500',
  },
  date: {
    fontSize: 18,
    color: 'white',
    fontWeight: '600',
  },
  day: {
    fontSize: 14,
    color: 'white',
    fontWeight: '200',
  },
  icon: {
    marginRight: 5,
  },
  placeholder: {
    fontSize: 14,
    color: 'white',
    fontWeight: '200',
    flexShrink: 1,
  },
});

export default DateSelector;

import React, { FC, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { appColors } from 'src/styles/appColors';
import { useAuraTranslation } from 'src/utils/i18n';
import { TimeSplit } from '../filterModel';

interface FlightDepartureFilterProp {
  city: string;
  close?: () => void;
  type?: TimeSplit;
  timeSelected: (type: TimeSplit) => void;
}

export const FlightDepartureFilter: FC<FlightDepartureFilterProp> = ({
  //   viewStyle,
  city,
  close,
  type,
  timeSelected,
}) => {
  const { t } = useAuraTranslation();

  const TimeButton: FC<{
    title: string;
    subTitle: string;
    innnerType: TimeSplit;
    onPress: (type: TimeSplit) => void;
  }> = ({ title, subTitle, innnerType, onPress }) => {
    const _onPress = useCallback(() => {
      onPress(innnerType);
    }, [innnerType, onPress]);
    return (
      <TouchableOpacity
        style={[
          styles.filterSegmentInnerView,
          type === innnerType ? styles.selected : styles.unSelected,
        ]}
        onPress={_onPress}
      >
        <Text
          style={[
            styles.titleStyle,
            type === innnerType ? styles.titleSelected : styles.titleUnSelected,
          ]}
        >
          {title}
        </Text>
        <Text
          style={[
            styles.subtitleStyle,
            type === innnerType ? styles.titleSelected : styles.titleUnSelected,
          ]}
        >
          {subTitle}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.filterContainer]}>
      {/* top bar */}
      <View style={styles.filterBar}>
        <Text style={styles.filterHeaderTitle}>{`${t('departureFrom')} ${city}`}</Text>
        {close && (
          <Button type="clear" icon={{ name: 'close', color: appColors.pink }} onPress={close} />
        )}
      </View>

      {/* 2 button  */}
      <View style={styles.filterSegment}>
        <TimeButton
          innnerType="12-6am"
          title={t('earlyMorning')}
          subTitle={t('12-6am')}
          onPress={timeSelected}
        />
        <TimeButton
          innnerType="6-12am"
          title={t('morning')}
          subTitle={t('6-12am')}
          onPress={timeSelected}
        />
      </View>

      {/* 1 button  */}
      <View style={styles.filterSegment}>
        <TimeButton
          innnerType="12-6pm"
          title={t('afternoon')}
          subTitle={t('12-6pm')}
          onPress={timeSelected}
        />
        <TimeButton
          innnerType="6-12pm"
          title={t('night')}
          subTitle={t('6-12pm')}
          onPress={timeSelected}
        />
      </View>

      {/* Apply button  */}
      {/* <View style={styles.filterSegment}>
          <View style={styles.filterSegmentInnerView} />
          <View style={styles.filterSegmentInnerView}></View>
        </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    // flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
  },
  filterBar: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterHeaderTitle: { fontSize: 15, color: appColors.pink },

  filterSegment: {
    flexDirection: 'row',
    marginTop: 10,
    // justifyContent: '',
  },
  filterSegmentInnerView: {
    flex: 1,
    marginHorizontal: 6,
    padding: 5,
    backgroundColor: 'red',
    alignItems: 'center',
  },

  selected: { backgroundColor: appColors.pink },
  unSelected: { backgroundColor: appColors.white },

  titleStyle: { fontSize: 15 },
  subtitleStyle: { fontSize: 11 },
  titleSelected: { color: 'white' },
  titleUnSelected: { color: 'black' },
  subTitleUnSelected: { color: 'black' },
});

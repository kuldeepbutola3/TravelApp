import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Divider } from 'react-native-elements';
import { Text } from 'src/components/Text';
import { appColors } from 'src/styles/appColors';
import { useAuraTranslation } from 'src/utils/i18n';

export interface ReviewCardProps {
  flightName: string;
  flightCode: string;
  depart: string;
  arrive: string;
  startDestination: string;
  endDestination: string;

  startCity: string;
  endCity: string;

  startTime: string;
  endTime: string;
  airportName1: string;
  airportName2: string;
  terminal1: string;
  terminal2: string;

  checkInBag: string;
  cabinBag: string;
  refundable: string;
}
export const ReviewCard: FC<ReviewCardProps> = ({
  flightName,
  flightCode,
  depart,
  arrive,
  startDestination,
  endDestination,
  startCity,
  endCity,

  startTime,
  endTime,
  airportName1,
  airportName2,
  terminal1,
  terminal2,

  cabinBag,
  checkInBag,
  refundable,
}) => {
  const { t } = useAuraTranslation();

  const RowElement: FC<{ title: string; subtitle: string; fontSize: number }> = ({
    title,
    subtitle,
    fontSize,
  }) => {
    const style = { fontSize };
    return (
      <View style={styles.rowElementContainer}>
        <View style={styles.rowElementView1}>
          <Text style={[styles.rowElemenText1, style]}>{title}</Text>
        </View>
        <View style={styles.rowElementView2}>
          <Text style={[styles.rowElemenText2, style]}>{subtitle}</Text>
        </View>
      </View>
    );
  };

  return (
    <View>
      <View style={styles.headerContainer}>
        <View style={styles.headerInner1}>
          <Text style={styles.headerInner1Text}>{t('depart').toUpperCase()}</Text>
          <Text style={styles.headerInner1SubText}>{depart}</Text>
        </View>
        <View style={styles.headerInner2}>
          <Text style={styles.headerInner2Text}>{`${startDestination}-${endDestination}`}</Text>
          <Text style={styles.headerInner2SubText}>{depart}</Text>
        </View>
      </View>
      <View style={styles.headerView}>
        <Text style={styles.header}>
          {flightName} <Text style={styles.headerCont}>|{flightCode}</Text>
        </Text>
      </View>
      <RowElement
        title={`${startCity} ${startDestination}`}
        subtitle={`${endDestination} ${endCity}`}
        fontSize={13}
      />
      <RowElement title={startTime} subtitle={endTime} fontSize={14} />
      <RowElement title={depart} subtitle={arrive} fontSize={12} />
      <RowElement title={airportName1} subtitle={airportName2} fontSize={11} />
      <RowElement
        title={`${t('treminal')} ${terminal1}`}
        subtitle={`${t('treminal')} ${terminal2}`}
        fontSize={12}
      />
      <Divider style={styles.divider} />
      <RowElement
        title={`${t('cabinBag')} ${cabinBag}`}
        subtitle={`${t('treminal')} ${refundable}`}
        fontSize={12}
      />
      <RowElement title={`${t('checkInBag')} ${checkInBag}`} subtitle="" fontSize={12} />
    </View>
  );
};

const styles = StyleSheet.create({
  containner: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
  },
  headerInner1: {
    padding: 10,
    backgroundColor: appColors.red,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerInner1Text: {
    color: appColors.white,
    fontSize: 14,
  },
  headerInner1SubText: {
    color: appColors.white,
    fontSize: 11,
  },

  headerInner2: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  headerInner2Text: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  headerInner2SubText: {
    fontSize: 12,
  },
  headerView: {
    padding: 20,
  },
  header: {
    fontSize: 14,
  },
  headerCont: {
    fontSize: 13,
    color: 'grey',
  },
  rowElementContainer: { flexDirection: 'row', paddingHorizontal: 20, marginBottom: 10 },
  rowElementView1: { flex: 1 },
  rowElementView2: { flex: 1, flexDirection: 'row-reverse' },
  rowElemenText1: { fontSize: 14 },
  rowElemenText2: { fontSize: 14, textAlign: 'right' },

  divider: { marginHorizontal: 20, marginVertical: 10 },
});

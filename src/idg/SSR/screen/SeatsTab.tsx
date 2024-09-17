import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SCREEN_WIDTH } from 'src/components/Tables/util';
import { Touchable } from 'src/components/Touchable';
import { appColors } from 'src/styles/appColors';
import { InfoLabel, SeatInfoLabel } from '../components/Labels';
import PriceFooter from '../components/PriceFooter';

const getBGColor = (availablityType: number) => {
  switch (availablityType) {
    case 1:
      return 'white';
    case 2:
    case 3:
      return '#EAEAEA';
    default:
      return 'grey';
  }
};

const Seprator = () => <View style={{ marginVertical: 10 }} />;

const RenderColumnHeader = ({ index }) => {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 16 }}>{index + 1}</Text>
    </View>
  );
};

const RenderRowHeader = ({ columns }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 25 + 10,
      }}
    >
      {columns?.map((_, index) => (
        <Text style={{ flex: 1, textAlign: 'center', fontSize: 18 }}>
          {String.fromCharCode(65 + index)}
        </Text>
      ))}
    </View>
  );
};

const SeatsTab = ({
  seats,
  selectedSeat,
  dispatchToFlightReducer,
  totalTravellers,
  totalSeatsPrice,
  allRoutes,
  selectedSeats,
  currency,
}) => {
  const data = seats.filter((_, i) => i !== 0);

  const renderSeatsColumn = ({ item, index }) => {
    const numberOfColumns = data[0].seats.length;
    const seatSize = (SCREEN_WIDTH - 25 - 25 - 80) / numberOfColumns;
    const { availablityType, code } = item;
    const isSelected = selectedSeat?.code === code;
    let bgColor = getBGColor(availablityType);
    if (isSelected) {
      bgColor = appColors.blue;
    }
    const isNotAvailable = availablityType !== 1;
    const handleSeatButtonPress = () =>
      isSelected
        ? dispatchToFlightReducer({ type: 'REMOVE_SEAT' })
        : dispatchToFlightReducer({ type: 'ADD_SEAT', payload: item });
    return (
      <Touchable
        onPress={handleSeatButtonPress}
        disabled={isNotAvailable}
        style={{
          height: seatSize,
          width: seatSize,
          borderRadius: seatSize / 2,
          backgroundColor: bgColor,
          borderWidth: 1,
          borderColor: availablityType === 1 && !isSelected ? appColors.black : bgColor,
          marginRight: index === 2 ? 10 : 0,
        }}
      />
    );
  };

  const renderSeatsRow = ({ item: { seats }, index }) => {
    return (
      <FlatList
        horizontal
        scrollEnabled={false}
        data={seats}
        contentContainerStyle={{ flex: 1, justifyContent: 'space-evenly', alignItems: 'center' }}
        renderItem={renderSeatsColumn}
        ListHeaderComponent={<RenderColumnHeader index={index} />}
        ListHeaderComponentStyle={{ width: 25 }}
        ListFooterComponentStyle={{ width: 25 }}
        ListFooterComponent={<RenderColumnHeader index={index} />}
      />
    );
  };

  const getSelectedSeatCodes = () => {
    return selectedSeats.map((seat) => seat?.code)?.join(', ');
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.infoContainer}>
        <InfoLabel color={appColors.white} label="Free" />
        <InfoLabel color={'#EAEAEA'} label="Occupied" />
        <InfoLabel color={appColors.blue} label="Assigned" />
      </View>

      <View
        style={{
          height: 0,
          borderWidth: 0.5,
          borderColor: appColors.lightGrey,
          width: '100%',
          marginVertical: 10,
        }}
      />

      <SeatInfoLabel />

      <FlatList
        data={data}
        renderItem={renderSeatsRow}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={Seprator}
        ListHeaderComponent={<RenderRowHeader columns={data?.[0]?.seats || []} />}
      />

      <PriceFooter
        headerLabel={`Seat(s) ${getSelectedSeatCodes()}`}
        subHeaderLabel={`${selectedSeats?.length} of ${
          totalTravellers?.length * allRoutes?.length || 0
        } Seat(s) Selected`}
        priceLabel={`${currency} ${totalSeatsPrice?.price}`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
});

export default React.memo(SeatsTab);

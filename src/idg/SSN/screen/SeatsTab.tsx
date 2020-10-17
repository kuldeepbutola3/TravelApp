import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { SCREEN_WIDTH } from 'src/components/Tables/util';
import { Touchable } from 'src/components/Touchable';

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

const Seprator = () => {
  return <View style={{ marginVertical: 10 }} />;
};

const RenderColumnHeader = ({ index }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
  renderRoutes,
  renderTravellers
}) => {
  const data = seats.filter((_, i) => i !== 0);

  const renderSeatsColumn = ({ item, index }) => {
    const numberOfColumns = data[0].seats.length;
    const seatSize = (SCREEN_WIDTH - 25 - 25 - 80) / numberOfColumns;
    const { availablityType, code } = item;
    const isSelected = selectedSeat?.code === code;
    let bgColor = getBGColor(availablityType);
    if (isSelected) {
      bgColor = '#00BFFF';
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
          borderColor: availablityType === 1 && !isSelected ? 'black' : bgColor,
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

  return (
    <View style={{ flex: 1 }}>
      <FlatList style={{}} data={seats[0]?.seats} renderItem={renderRoutes} horizontal ListEmptyComponent={() => null}/>
      <FlatList data={totalTravellers} renderItem={renderTravellers} horizontal ListEmptyComponent={() => null}/>

      <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 10,
          }}
        >
          <View
            style={{ height: 15, width: 15, backgroundColor: 'white', borderWidth: 1, margin: 5 }}
          />
          <Text>Free</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 10,
          }}
        >
          <View style={{ height: 15, width: 15, backgroundColor: '#EAEAEA', margin: 5 }} />
          <Text>Occupied</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 10,
          }}
        >
          <View style={{ height: 15, width: 15, backgroundColor: '#00BFFF', margin: 5 }} />
          <Text>Assigned</Text>
        </View>
      </View>

      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 10,
        }}
      >
        <Text style={{ marginVertical: 5 }}>Tap and Select Premium Seats of your choice</Text>
        <Text style={{ fontSize: 20, fontWeight: '700' }}>FRONT SIDE</Text>
      </View>

      <FlatList
        data={data}
        renderItem={renderSeatsRow}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={Seprator}
        ListHeaderComponent={<RenderRowHeader columns={data?.[0]?.seats || []} />}
      />

      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 10,
          borderTopWidth: 1,
          borderTopColor: 'grey',
        }}
      >
        <View>
          <Text>Seat(s) {selectedSeat?.code}</Text>
          <Text>
            {totalSeatsPrice?.seats} of {totalTravellers?.length} Selected
          </Text>
        </View>
        <View>
          <Text>{totalSeatsPrice?.price}</Text>
          <Text>Add to Fare</Text>
        </View>
      </View>
    </View>
  );
};

export default React.memo(SeatsTab);

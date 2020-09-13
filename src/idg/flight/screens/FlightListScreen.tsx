import React, { useEffect } from 'react';

import { AuraStackScreen } from 'src/types/navigationTypes';
import { Screen } from 'src/components/Screen';
import { Text } from 'src/components/Text';
import { useSliceSelector, useThunkDispatch } from 'src/redux/hooks';
import { doFetchRefreshToken } from 'src/idg/session/sessionSlice';
import { fetchFlight } from 'src/idg/flight/flightSlice';
// import {configureClient} from 'src/idg/IDGClient';

export const FlightListScreen: AuraStackScreen = () => {
  const dispatch = useThunkDispatch();
  const { flightDetail } = useSliceSelector('flight');
  console.log('enter useEffect--------1', flightDetail);
  useEffect(() => {
    dispatch(doFetchRefreshToken()).then((_) => {
      dispatch(fetchFlight());
    });
  }, [dispatch]);

  return (
    <Screen>
      <Text>FlightListScreen--</Text>
    </Screen>
  );
};

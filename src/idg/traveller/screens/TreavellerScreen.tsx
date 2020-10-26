import { useNavigation } from '@react-navigation/native';
import React, { ReactNode, useCallback, useState } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'src/components/Button';
import { Header } from 'src/components/Header';
import { Screen } from 'src/components/Screen';
import { Touchable } from 'src/components/Touchable';
import { AppRoutes } from 'src/navigation/RootNav';
import { appColors } from 'src/styles/appColors';
import { AuraStackScreen, useParams } from 'src/types/navigationTypes';
import { useAuraTranslation } from 'src/utils/i18n';
import { TravellerCount } from '../TravelerModel';

export interface TreavellerScreenProps {
  numberOfTraveller: TravellerCount;
  callBack: (numberOfTraveller: TravellerCount) => void;
}
export const TreavellerScreen: AuraStackScreen = () => {
  const navigation = useNavigation();
  const { t } = useAuraTranslation();
  const { numberOfTraveller, callBack } = useParams<AppRoutes, 'Traveller'>();

  const onPressBack = useCallback(() => navigation.canGoBack() && navigation.goBack(), [
    navigation,
  ]);
  const [adult, setAdult] = useState(numberOfTraveller.adult);
  const [children, setChildren] = useState(numberOfTraveller.children);
  const [infant, setInfant] = useState(numberOfTraveller.infant);

  const doneTapped = useCallback(() => {
    const dict: TravellerCount = {
      adult,
      children,
      infant,
    };
    callBack(dict);
    onPressBack();
  }, [adult, children, infant, onPressBack]);

  const Cell: React.FC<{
    children: ReactNode;
    title: string;
    subtitle: string;
    footer: string;
  }> = ({ children, title, subtitle, footer }) => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 24 }}>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{title}</Text>
            <Text style={{ marginLeft: 10 }}>{subtitle}</Text>
          </View>
          <Text style={{ color: appColors.gray }}>{footer}</Text>
        </View>
        {children}
      </View>
    );
  };

  return (
    <Screen>
      <SafeAreaView>
        <Header onPressBack={onPressBack} title={t('selectTraveller')} />
        <View style={{ padding: 24 }}>
          <Text style={{ color: appColors.gray, fontSize: 14, marginBottom: 24 }}>
            {t('addNumberOfTravellers').toUpperCase()}
          </Text>
          <Cell
            title={t('adult')}
            subtitle={t('adultSubtitle')}
            footer={t('addNumberOfTravellers')}
          >
            <AddingView maxNumber={9} newCount={setAdult} count={adult} />
          </Cell>
          <Cell
            title={t('children')}
            subtitle={t('childrenSubtitle')}
            footer={t('addNumberOfTravellers')}
          >
            <AddingView maxNumber={5} newCount={setChildren} count={children} />
          </Cell>
          <Cell
            title={t('infant')}
            subtitle={t('infantSubtitle')}
            footer={t('addNumberOfTravellers')}
          >
            <AddingView maxNumber={1} newCount={setInfant} count={infant} />
          </Cell>
          <Button bgColor={appColors.pink} title={t('done')} onPress={doneTapped} />
        </View>
      </SafeAreaView>
    </Screen>
  );
};
interface AddingViewProps {
  newCount: (count: number) => void;
  maxNumber: number;
  count: number;
}
const AddingView: React.FC<AddingViewProps> = ({ newCount, maxNumber, count }) => {
  const _addPress = useCallback(() => {
    if (maxNumber > count) {
      newCount(count + 1);
    }
  }, [count, maxNumber, newCount]);
  const _deletePress = useCallback(() => {
    if (count > 0) {
      newCount(count - 1);
    }
  }, [count, newCount]);
  return (
    <View
      style={{
        marginHorizontal: 20,
        marginVertical: 10,
        flexDirection: 'row',
        borderWidth: 1,
        width: 100,
        height: 30,
        borderRadius: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Touchable
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          borderRightWidth: 1,
          height: '100%',
        }}
        disabled={count === 0}
        onPress={_deletePress}
      >
        <Text style={{ fontSize: 20 }}>-</Text>
      </Touchable>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{count}</Text>
      </View>
      <Touchable
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          borderLeftWidth: 1,
          height: '100%',
        }}
        onPress={_addPress}
        disabled={maxNumber < count}
      >
        <Text style={{ fontSize: 20 }}>+</Text>
      </Touchable>
    </View>
  );
};

import { useNavigation } from '@react-navigation/native';
import React, { FC, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, ListItem, Text } from 'react-native-elements';
import { Button } from 'src/components/Button';
import { ApptNavigationProp } from 'src/navigation/RootNav';
import { useSliceSelector } from 'src/redux/hooks';
import { appColors } from 'src/styles/appColors';
import { useAuraTranslation } from 'src/utils/i18n';

export interface TravellerViewProps {
  isChild: boolean;
}
export const TravellerView: FC<TravellerViewProps> = ({ isChild }) => {
  const { t } = useAuraTranslation();
  const { travellerChild, travellerAdult } = useSliceSelector('flight');
  //   const totalCount = isChild ? 1 : 3;
  //   const selectedCount = isChild ? travellerChild.length : travellerAdult.length;
  const navigation = useNavigation<ApptNavigationProp>();
  const addTraveller = useCallback(() => navigation.navigate('AddTraveller', { isChild }), [
    navigation,
    isChild,
  ]);

  const listItem = isChild
    ? travellerChild.map((item, index) => {
        return (
          <ListItem key={`child-${index}`} title={item.fName + ' ' + item.lName}>
            <Text>{item.gender}</Text>
          </ListItem>
        );
      })
    : travellerAdult.map((item, index) => {
        return (
          <ListItem key={`adult-${index}`} title={item.fName + ' ' + item.lName}>
            <Text>{item.gender}</Text>
          </ListItem>
        );
      });
  return (
    <View style={styles.container}>
      <View style={styles.innnerContainer}>
        <Icon name="person-outline" />
        <View style={styles.header}>
          <Text style={styles.headerText}>{isChild ? t('childHeader') : t('adult')}</Text>
        </View>
      </View>
      {listItem}
      <Button
        type="clear"
        titleStyle={{ fontSize: 20, color: appColors.pink }}
        icon={{ name: 'add', color: appColors.pink }}
        title={t('addTravellers')}
        onPress={addTraveller}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  innnerContainer: {
    paddingVertical: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    flex: 1,
    marginLeft: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 15,
  },
});

import React, {useCallback} from 'react';
import {
  View,
  ViewStyle,
  StyleSheet,
  FlatListProps,
  FlatList,
  ActivityIndicator,
} from 'react-native';

export type InfiniteScrollListProps<Item> = FlatListProps<Item> & {
  loadMore: () => void;
  loading: boolean;
};

export const InfiniteScrollList = <Item,>(
  props: InfiniteScrollListProps<Item>,
) => {
  const {loadMore, loading, ...flatlistProps} = props;

  const _loadMore = useCallback(() => {
    !loading && loadMore();
  }, [loadMore, loading]);

  const Footer = useCallback(() => {
    return loading ? (
      <View style={styles.footerContainer}>
        <ActivityIndicator size="large" color={'red'} />
      </View>
    ) : null;
  }, [loading]);

  return (
    <FlatList
      {...flatlistProps}
      maxToRenderPerBatch={15}
      onEndReachedThreshold={0.5}
      onEndReached={_loadMore}
      ListFooterComponent={Footer}
    />
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flex: 1,
    alignItems: 'center',
  } as ViewStyle,
});

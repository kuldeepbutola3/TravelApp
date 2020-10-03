import React, { FC, useCallback } from 'react';
import { ListRenderItem, FlatList } from 'react-native';
import { FlightSet } from '../FlightModel';
import { makeReviewViewModel, ReviewViewModel } from '../ReviewViewModel';
import { ReviewCard } from './ReviewCard';

interface ReviewListProps {
  items: FlightSet;
}
interface Item {
  id: number;
  viewModel: ReviewViewModel;
}

export const ReviewList: FC<ReviewListProps> = ({ items }) => {
  const itemArray: Array<Item> = [];
  items.segments.map((i, indexI) =>
    i.map((j, indexJ) =>
      itemArray.push({ id: indexI * 1000 + indexJ, viewModel: makeReviewViewModel(j) })
    )
  );

  const renderItem = useCallback<ListRenderItem<Item>>(
    ({ item }) => <ReviewCard {...item.viewModel} />,
    []
  );

  return <FlatList data={itemArray} renderItem={renderItem} />;
};

import React from 'react';
import {View, ViewStyle, StyleSheet, StyleProp, Text} from 'react-native';

import {TableData} from './TableData';
import {HeadingText} from './HeadingText';
import {TableHeading} from './TableHeading';
import {TableCell} from './TableCell';
import {StringOrComp} from './StringOrComp';
import {DataValue} from './types';
import {flatten} from './util';

type AccessoryHeadingProps = {
  title: string;
  accessory: React.ReactElement;
};

/**
 * take a look at AccessoryHeading.png for explanation of these components
 * and their relation to one another
 */
const AccessoryHeading: React.FC<AccessoryHeadingProps> = ({
  title,
  accessory,
}) => (
  <TableHeading
    containerStyle={styles.accessoryContainer}
    key={`compare.rowHeading.${title}`}
    horizontalAlignment={'center'}>
    <View style={styles.accessory}>{accessory}</View>
    <HeadingText>{title}</HeadingText>
    <View style={styles.accessoryRightSpacer} />
  </TableHeading>
);

type ComparisonColumnTitleProps = {};

const ComparisonColumnTitle: React.FC<ComparisonColumnTitleProps> = ({
  children,
}) => {
  return (
    <TableCell
      containerStyle={[styles.title]}
      horizontalAlignment="center"
      borders={['left', 'right', 'bottom']}>
      <StringOrComp possibleComponent={children}>
        <Text>{children}</Text>
      </StringOrComp>
    </TableCell>
  );
};

export type ComparisonTitleRowProps = {
  titles: React.ReactNode[];
};

export const ComparisonTitleRow: React.FC<ComparisonTitleRowProps> = ({
  titles,
}) => {
  return (
    <View style={[styles.titleContainer]}>
      {titles.map((title, i) => (
        <ComparisonColumnTitle key={`columnTitle.${i}`}>
          {title}
        </ComparisonColumnTitle>
      ))}
    </View>
  );
};

export type ComparisonRow = {
  heading: string;
  headingLeft?: React.ReactElement;
  values: DataValue[];
};

const ComparisonRow: React.FC<{row: ComparisonRow}> = ({row}) => {
  const heading = row.heading;
  const headingLeft = row.headingLeft;
  return (
    <View style={[styles.rowWithHeading]}>
      {headingLeft ? (
        <AccessoryHeading title={heading} accessory={headingLeft} />
      ) : (
        <TableHeading
          key={`rowHeading.${heading}`}
          horizontalAlignment={'center'}>
          {heading}
        </TableHeading>
      )}
      <View key={`rowDataContainer.${row.heading}`} style={[styles.dataRow]}>
        {row.values.map((cell, i) => (
          <TableData key={`rowData.${i}`} horizontalAlignment="center">
            {cell.toString()}
          </TableData>
        ))}
      </View>
    </View>
  );
};

export type ComparisonTableProps = {
  titles?: ComparisonTitleRowProps['titles'];
  rows: ComparisonRow[];
  style?: StyleProp<ViewStyle>;
};

export const ComparisonTable: React.FC<ComparisonTableProps> = ({
  titles,
  rows,
  style,
}) => {
  return (
    <View style={flatten(styles.container, style)}>
      {titles && <ComparisonTitleRow titles={titles} />}
      {rows.map((row) => (
        <ComparisonRow key={`row.${row.heading}`} row={row} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {} as ViewStyle,
  rowWithHeading: {} as ViewStyle,
  dataRow: {
    flexDirection: 'row',
  } as ViewStyle,
  heading: {} as ViewStyle,
  titleContainer: {
    flexDirection: 'row',
  } as ViewStyle,
  title: {} as ViewStyle,
  accessoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  } as ViewStyle,
  accessoryHeading: {} as ViewStyle,
  accessoryRightSpacer: {
    flex: 1,
    height: 25,
  } as ViewStyle,
  accessory: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  } as ViewStyle,
});

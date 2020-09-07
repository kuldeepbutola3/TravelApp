import React from 'react';
import { Text } from 'src/components/Text';

import { flatten } from './util';
import { TableCell } from './TableCell';
import { StringOrComp } from './StringOrComp';
import { BaseTableCellProps } from './types';

type TableDataProps = BaseTableCellProps & {};

export const TableData: React.FC<TableDataProps> = (props) => {
  const { children } = props;

  return (
    <TableCell
      {...props}
      containerStyle={flatten(
        {
          // TODO: zeplin viewStyles
        },
        props.containerStyle
      )}
    >
      <StringOrComp possibleComponent={children}>
        <Text>{props.children}</Text>
      </StringOrComp>
    </TableCell>
  );
};

import React from 'react';
import { BaseTableCellProps } from './types';
import { TableCell } from './TableCell';
import { flatten } from './util';
import { HeadingText } from './HeadingText';

type TableHeadingProps = BaseTableCellProps & {};

export const TableHeading: React.FC<TableHeadingProps> = (props) => {
  const children = props.children;

  return (
    <TableCell
      {...props}
      containerStyle={flatten(
        {
          //TODO: zeplin viewStyles
          backgroundColor: 'white',
        },
        props.containerStyle
      )}
    >
      <HeadingText>{children}</HeadingText>
    </TableCell>
  );
};

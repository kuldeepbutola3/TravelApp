import React from 'react';
import { ComponentProps } from '../../types/componentProps';

type StringOrCompProps = {
  possibleComponent?: React.ReactNode;
} & ComponentProps;

export const StringOrComp: React.FC<StringOrCompProps> = ({
  children,
  possibleComponent: possibleString,
}) => {
  return <>{typeof possibleString === 'string' ? children : possibleString}</>;
};

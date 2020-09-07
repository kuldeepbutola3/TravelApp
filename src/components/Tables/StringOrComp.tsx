import React from 'react';

type StringOrCompProps = {
  possibleComponent?: React.ReactNode;
};

export const StringOrComp: React.FC<StringOrCompProps> = ({
  children,
  possibleComponent: possibleString,
}) => {
  return <>{typeof possibleString === 'string' ? children : possibleString}</>;
};

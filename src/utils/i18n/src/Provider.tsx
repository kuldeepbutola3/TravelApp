import React from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { ComponentProps } from 'src/types/componentProps';

const Provider: React.FC<ComponentProps> = props => {
  return <I18nextProvider i18n={i18n} {...props} />;
};

export default Provider;

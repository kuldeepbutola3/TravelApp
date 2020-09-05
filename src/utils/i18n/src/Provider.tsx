import React from 'react';
import {I18nextProvider} from 'react-i18next';
import i18n from './i18n';

const Provider: React.FC = (props) => {
  return <I18nextProvider i18n={i18n} {...props} />;
};

export default Provider;

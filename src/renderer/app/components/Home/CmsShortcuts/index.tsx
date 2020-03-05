import React from 'react';

import {
  ADD_ARTICLE_ICON,
  KEY_ICON,
  ACCOUNT_ICON,
  LOGOUT_ICON,
} from '~/renderer/constants/icons';
import { Item } from '../Shortcuts';

export default () => {
  return (
    <>
      <Item to="/add-article" icon={ADD_ARTICLE_ICON}>
        Dodaj artykuł
      </Item>
      <Item to="/change-password" icon={KEY_ICON}>
        Zmień hasło
      </Item>
      <Item to="/account" icon={ACCOUNT_ICON}>
        Konto
      </Item>
      <Item to="/logout" icon={LOGOUT_ICON} useDefaultLink>
        Wyloguj się
      </Item>
    </>
  );
};

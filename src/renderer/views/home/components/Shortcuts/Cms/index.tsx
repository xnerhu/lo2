import React from 'react';

import { Item } from '../../Shortcuts';
import {
  ICON_ADD_ARTICLE,
  ICON_KEY,
  ICON_ACCOUNT,
  ICON_LOGOUT,
} from '~/renderer/constants/icons';

export default () => {
  return (
    <>
      <Item to="/add-article" icon={ICON_ADD_ARTICLE}>
        Dodaj artykuł
      </Item>
      <Item to="/change-password" icon={ICON_KEY}>
        Zmień hasło
      </Item>
      <Item to="/account" icon={ICON_ACCOUNT}>
        Konto
      </Item>
      <Item to="/api/auth/logout" icon={ICON_LOGOUT} useDefaultLink>
        Wyloguj się
      </Item>
    </>
  );
};

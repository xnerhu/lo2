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
      <Item to="/cms/article" icon={ICON_ADD_ARTICLE}>
        Dodaj artykuł
      </Item>
      <Item to="/change-password" icon={ICON_KEY}>
        Zmień hasło
      </Item>
      <Item to="/account" icon={ICON_ACCOUNT}>
        Konto
      </Item>
      <Item to="/api/auth/sign-out" icon={ICON_LOGOUT} external>
        Wyloguj się
      </Item>
    </>
  );
};

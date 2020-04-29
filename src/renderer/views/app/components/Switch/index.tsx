import React from 'react';
import { Switch as RouteSwitch, Route } from 'react-router';

import { routerMap } from '../../constants/routes';

export const Switch = () => {
  return (
    <RouteSwitch>
      {routerMap.map((r) => (
        <Route
          key={r.path}
          path={r.path}
          component={r.component}
          exact={r.exact}
        />
      ))}
    </RouteSwitch>
  );
};

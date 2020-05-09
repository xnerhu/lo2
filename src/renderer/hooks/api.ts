import { useState } from 'react';

import { IAppStateItem } from '~/interfaces';

export const useApi = (item: IAppStateItem) => {
  const [state, setState] = useState<any>('test');

  return [state];
};

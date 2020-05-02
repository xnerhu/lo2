import { useState } from 'react';

import { IAppState } from '~/interfaces';

export const useApi = (name: keyof IAppState) => {
  const [state, setState] = useState<any>('test');

  return [state];
};

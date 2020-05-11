import { useState } from 'react';

import { IAppStateItem } from '~/interfaces';
import { useAppState } from './app-state';

interface ICacheItem {
  filter?: any;
  data?: any;
}

const cache = new Map<string, ICacheItem>();

interface IOptions {
  filter?: any;
}

const getInitialState = (item: IAppStateItem, filter: any) => {
  const appState = useAppState();

  const cachedItem = cache.get(item);

  if (cachedItem && cachedItem?.filter === filter) {
    return cachedItem;
  }

  const data = appState?.[item];

  if (data != null) {
    cache.set(item, { data, filter } as ICacheItem);
  }

  return data;
};

export const usePage = (item: IAppStateItem, options?: IOptions) => {
  const [state, setState] = useState(getInitialState(item, options?.filter));

  console.log(state);

  return [state];
};

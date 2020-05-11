import { useState, useEffect, DependencyList } from 'react';
import axios from 'axios';

import { IAppStateItem } from '~/interfaces';
import { useAppState } from './app-state';

interface ICacheItem {
  filter?: any;
  data?: any;
}

const cache = new Map<string, ICacheItem>();

interface IOptions {
  filter?: any;
  params?: any;
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

  const _setState = (data: any, filter: any) => {
    cache.set(item, { data, filter });
    setState(data);
  };

  useEffect(() => {
    let canceled = false;

    if (!state) {
      (async () => {
        console.log(`Fetch ${item}`);

        const res = await axios.get(`/api/bundle/${item}`, {
          params: options?.params,
        });

        if (!canceled) {
          _setState(res.data, options?.filter);
        }
      })();
    }

    return () => (canceled = true);
  }, [state]);

  return [state];
};

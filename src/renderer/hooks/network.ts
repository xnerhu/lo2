import { useState, useEffect } from 'react';
import axios from 'axios';

import { IAppStateItem } from '~/interfaces';
import { useAppState } from './app-state';
import { IS_BROWSER } from '../constants/config';

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

  const cachedItem = IS_BROWSER && cache.get(item);

  if (cachedItem && cachedItem?.filter === filter) {
    return cachedItem;
  }

  const data = appState?.[item];

  if (data != null) {
    cache.set(item, { data, filter } as ICacheItem);
  }

  return data;
};

export const usePage = <T>(item: IAppStateItem, options?: IOptions): [T] => {
  const [state, setState] = useState<T>(
    getInitialState(item, options?.filter) as any,
  );

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

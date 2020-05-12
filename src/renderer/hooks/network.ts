import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';

import { IAppStateItem } from '~/interfaces';
import { useAppState } from './app-state';
import { IS_BROWSER } from '../constants/config';

interface ICacheItem {
  params?: any;
  data?: any;
}

const cache = new Map<string, ICacheItem>();

interface IOptions {
  shouldFetch?: (params: any, lastParams: any) => boolean;
}

const getInitialState = (item: IAppStateItem, params: any) => {
  const appState = useAppState();
  const injected = appState?.[item];

  let cached = IS_BROWSER && cache.get(item);

  if (!cached && injected) {
    cached = { data: injected, params };
    cache.set(item, cached);

    IS_BROWSER && console.log(`Injected ${item}`);
  }

  return cached;
};

export const usePage = <T>(item: IAppStateItem, options?: IOptions): [T] => {
  const params = useParams();
  const [state, setState] = useState<ICacheItem>(
    getInitialState(item, params) as any,
  );

  const _setState = (data: any, params: any) => {
    const cached: ICacheItem = { data, params };

    cache.set(item, cached);

    setState(cached);
  };

  useEffect(() => {
    let canceled = false;

    const fn = options?.shouldFetch;

    if (!state?.data || (fn && fn(params, state.params))) {
      (async () => {
        console.log(`Fetch ${item}`);

        const res = await axios.get(`/api/bundle/${item}`, { params });

        if (!canceled) {
          _setState(res.data, params);
        }
      })();
    }

    return () => (canceled = true);
  }, [state, params]);

  return [state?.data];
};

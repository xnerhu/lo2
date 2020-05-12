import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';

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

  let cached = IS_BROWSER && cache.get(item);

  if (!cached || cached?.params !== params) {
    const data = appState?.[item];

    if (data != null) {
      cached = { data, params };
      cache.set(item, cached);
    }
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

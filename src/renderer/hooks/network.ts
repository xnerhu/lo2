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

  // if (cachedItem && cachedItem?.filter === filter) {
  //   return { data: cachedItem.data, filter: cachedItem.filter };
  // }

  // const data = appState?.[item];

  // if (data != null) {
  //   cache.set(item, { data, filter } as ICacheItem);
  // }

  // return { data, filter };
};

export const usePage = <T>(item: IAppStateItem, options?: IOptions) => {
  const [state, setState] = useState<ICacheItem>(
    getInitialState(item, {}) as any,
  );
  const params = useParams();
  const lastParams = useRef<any>();

  const _setState = (data: any, params: any) => {
    const cached: ICacheItem = { data, params };

    cache.set(item, cached);
    setState(cached);
  };

  useEffect(() => {
    let canceled = false;

    const fn = options?.shouldFetch;

    if (!state?.data || (fn && fn(params, lastParams.current))) {
      (async () => {
        console.log(`Fetch ${item}`);

        const res = await axios.get(`/api/bundle/${item}`, { params });

        if (!canceled) {
          _setState(res.data, params);
        }
      })();
    }

    lastParams.current = params;

    return () => (canceled = true);
  }, [params]);

  return [state?.data];
};

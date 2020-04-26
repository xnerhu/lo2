import { useState, useEffect } from 'react';
import axios from 'axios';

import { callApi } from './network';
import { useAppState } from '../store';
import { IAppStatePage } from '~/interfaces';

interface ICacheItem {
  filter?: any;
  data?: any;
}

const cache = new Map<string, ICacheItem>();

const getDefaultState = (name: keyof IAppStatePage, filter: any = {}) => {
  const appState = useAppState();

  const injected = (appState?.page ?? {})[name];
  const cached = cache.get(name);

  if (cached) {
    return cached;
  }

  const data: ICacheItem = {
    data: injected,
    filter,
  };

  cache.set(name, data);

  return data;
};

export const usePage = <T, K = any>(
  name?: keyof IAppStatePage,
  filter?: any,
): [T, (data: Partial<T>, filter: K) => void, K] => {
  const [state, setState] = useState(getDefaultState(name, filter));

  const _setState = (data: Partial<T>, filter: K) => {
    const value: ICacheItem = { data: { ...state.data, ...data }, filter };

    cache.set(name, value);
    setState(value);
  };

  useEffect(() => {
    let canceled = false;

    if (!state.data) {
      (async () => {
        console.log(`fetch ${name}`);

        const res = await axios.get<T>(`/api/page/${name}`, { params: filter });

        if (!canceled) {
          _setState(res.data, filter as K);
        }
      })();
    }

    return () => {
      canceled = true;
    };
  }, [name, state]);

  return [state.data || {}, _setState, state.filter || {}];
};

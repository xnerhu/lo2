import { useState, useEffect } from 'react';
import axios from 'axios';

import { callApi } from './network';
import { useAppState } from '../store';
import { IAppStatePage } from '~/interfaces';

const cache = new Map<string, any>();

export const usePage = <T>(name?: keyof IAppStatePage): Partial<T> => {
  const appState = useAppState();
  const injected = appState?.page[name];
  const cached = cache.get(name);

  const [state, setState] = useState<T>(injected || cached);

  if (injected && !cached) {
    cache.set(name, state);
  }

  useEffect(() => {
    let canceled = false;

    if (!state) {
      (async () => {
        const res = await axios.get<T>(`api/page/${name}`);

        cache.set(name, res.data);

        if (!canceled) {
          setState(res.data);
        }
      })();
    }

    return () => {
      canceled = true;
    };
  }, [name, state]);

  return state || {};
};

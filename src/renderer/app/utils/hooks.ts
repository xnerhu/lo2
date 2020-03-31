import { useState, useEffect } from 'react';

import { callApi } from './network';
import { useAppState } from '../store';
import { IAppStatePage } from '~/interfaces';

const cache = new Map<string, any>();

export const usePage = <T>(name: string, page?: keyof IAppStatePage) => {
  const appState = useAppState();
  const injected = appState?.page[page];
  const cached = cache.get(name);

  const [state, setState] = useState<T>(injected || cached);

  if (injected && !cached) {
    cache.set(name, state);
  }

  useEffect(() => {
    let canceled = false;

    if (!state) {
      (async () => {
        const data = await callApi(name);

        cache.set(name, data);

        if (!canceled) {
          setState(data as T);
        }
      })();
    }

    return () => {
      canceled = true;
    };
  }, [name, state]);

  return state;
};

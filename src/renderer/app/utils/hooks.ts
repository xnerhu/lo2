import { useState, useEffect } from 'react';

import { callApi } from './network';
import { useAppState } from '../store';
import { IAppState } from '~/interfaces';

const cache = new Map<string, any>();

export const usePage = <T>(
  name: string,
  appStateProperty?: keyof IAppState,
) => {
  const appState = useAppState();
  const cached = cache.get(name);
  const [state, setState] = useState(
    (appStateProperty && appState[appStateProperty]) || cached,
  );

  if (state && !cached) {
    cache.set(name, state);
  }

  useEffect(() => {
    let canceled = false;

    if (!state) {
      (async () => {
        const data = await callApi(name);
        console.log('fetch');

        cache.set(name, data);

        if (!canceled) setState(data);
      })();
    }

    return () => {
      canceled = true;
    };
  }, [name, state]);

  return state as T;
};

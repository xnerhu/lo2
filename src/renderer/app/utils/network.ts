import axios, { AxiosResponse } from 'axios';

import { IS_BROWSER } from '~/renderer/constants';

const fetched: string[] = [];

export const preFetchImage = (src: string, ext = 'webp', cache = false) => {
  if (!src) return null;

  src = src + `.${ext}`;

  if (!IS_BROWSER || (cache && fetched.indexOf(src) !== -1)) return null;

  return new Promise<void>((resolve, reject) => {
    const img = new Image();

    if (cache) fetched.push(src);

    img.onload = resolve as any;
    img.src = src;
    img.onerror = reject;
  });
};

export const callApi = async <T>(
  name: string,
  params?: any,
  method: 'get' | 'post' = 'get',
): Promise<T> => {
  const url = `/api/${name}`;

  const res: AxiosResponse =
    method === 'get'
      ? await axios.get(url, { params })
      : await axios.post(url, params);

  return res.data;
};

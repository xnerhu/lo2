import { IS_BROWSER } from '../constants/config';

const fetched: string[] = [];

export const preFetchImage = (src: string, ext = 'webp', cache = false) => {
  if (!src) return null;

  src = src + `.${ext}`;

  if (!IS_BROWSER || (cache && fetched.includes(src))) return null;

  return new Promise<void>((resolve, reject) => {
    const img = new Image();

    if (cache) fetched.push(src);

    img.onload = resolve as any;
    img.src = src;
    img.onerror = reject;
  });
};

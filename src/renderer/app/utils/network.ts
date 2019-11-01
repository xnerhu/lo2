import { IS_BROWSER } from '~/renderer/constants';

const fetched: string[] = [];

export const preFetchImage = (src: string): Promise<void> => {
  src = src + '.webp';

  if (!IS_BROWSER || fetched.indexOf(src) !== -1) return null;

  return new Promise((resolve, reject) => {
    const img = new Image();

    fetched.push(src);

    img.onload = resolve as any;
    img.src = src;
    img.onerror = reject;
  });
}

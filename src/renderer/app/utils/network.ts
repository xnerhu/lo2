import { IS_BROWSER } from '~/renderer/constants';

export const preFetchImage = (src: string): Promise<void> => {
  if (!IS_BROWSER) return null;

  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = resolve as any;

    img.src = src;

    img.onerror = (err) => {
      console.error(err);
      reject(err);
    }
  });
}

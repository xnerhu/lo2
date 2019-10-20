export const preFetchImage = (src: string): Promise<void> => {
  if (typeof window === 'undefined') return null;

  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = resolve as any;
    img.onerror = reject;
    img.src = src;
  });
}

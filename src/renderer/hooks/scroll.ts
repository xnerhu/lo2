import { useEffect, useCallback, useRef, useState } from 'react';

export const useScroll = (threshold = 25) => {
  const [visible, setVisible] = useState(true);
  const previousY = useRef<number>();

  const onWindowScroll = useCallback(() => {
    if (previousY.current == null) {
      previousY.current = window.scrollY;
      return;
    }

    if (previousY.current < window.scrollY) {
      previousY.current = window.scrollY;

      if (visible) setVisible(false);
      return;
    }

    if (!visible && previousY.current - window.scrollY >= threshold) {
      setVisible(true);
    } else if (visible) {
      previousY.current = window.scrollY;
    }
  }, [visible]);

  useEffect(() => {
    window.addEventListener('scroll', onWindowScroll);

    return () => window.removeEventListener('scroll', onWindowScroll);
  }, [visible]);

  return [visible];
};
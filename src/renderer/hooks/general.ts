import { useRef, useEffect } from 'react';

export const usePrevious = (value: any) => {
  const data = useRef();

  useEffect(() => {
    data.current = value;
  });

  return data.current;
};

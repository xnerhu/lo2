import * as React from 'react';

export const useDidMountEffect = (callback: React.EffectCallback, deps?: readonly any[]) => {
  const didMount = React.useRef(false);

  React.useEffect(() => {
    if (didMount.current) callback();
    else didMount.current = true;
  }, deps);
}

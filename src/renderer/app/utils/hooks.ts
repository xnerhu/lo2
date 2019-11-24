import * as React from 'react';

export const useDidMountEffect = (callback: React.EffectCallback, deps?: readonly any[], exception?: boolean) => {
  const didMount = React.useRef(false);

  React.useEffect(() => {
    if (didMount.current || exception) callback();
    else didMount.current = true;
  }, deps);
}

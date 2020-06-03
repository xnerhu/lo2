import { createContext } from 'react';

import { IAppState } from '~/interfaces';

export default createContext<IAppState>(null);

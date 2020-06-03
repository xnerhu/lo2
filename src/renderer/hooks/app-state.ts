import { useContext } from 'react';

import AppStateContext from '~/contextes/app-state';

export const useAppState = () => useContext(AppStateContext);

import React from 'react';

import { LinkPage } from '~/renderer/components/LinkPage';
import { successesPage } from '~/renderer/constants/navigation';

export default () => {
  return <LinkPage item={successesPage} />;
};

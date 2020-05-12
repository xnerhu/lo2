import React from 'react';

import { LinkPage } from '~/renderer/components/LinkPage';
import { branchesPage } from '~/renderer/constants/navigation';

export default () => {
  return <LinkPage item={branchesPage} />;
};

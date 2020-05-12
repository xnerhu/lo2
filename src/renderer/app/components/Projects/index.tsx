import React from 'react';

import { LinkPage } from '~/renderer/components/LinkPage';
import { projectsPage } from '~/renderer/constants/navigation';

export default () => {
  return <LinkPage item={projectsPage} />;
};

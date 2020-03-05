import React from 'react';

import { LinkPage } from '~/renderer/components/LinkPage';
import { studentsPage } from '~/renderer/constants/navigation';

export default () => {
  return <LinkPage item={studentsPage} />;
};

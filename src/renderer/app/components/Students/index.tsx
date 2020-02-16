import React from 'react';

import { LinkPage } from '~/renderer/components/LinkPage';
import { studentsPage } from '~/renderer/constants';

export default () => {
  return <LinkPage item={studentsPage} />;
};

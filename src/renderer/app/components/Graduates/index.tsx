import React from 'react';

import { LinkPage } from '~/renderer/components/LinkPage';
import { graduatesPage } from '~/renderer/constants/navigation';

export default () => {
  return <LinkPage item={graduatesPage} />;
};

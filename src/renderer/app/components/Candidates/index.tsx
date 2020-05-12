import React from 'react';

import { LinkPage } from '~/renderer/components/LinkPage';
import { candidatesPage } from '~/renderer/constants/navigation';

export default () => {
  return <LinkPage item={candidatesPage} />;
};

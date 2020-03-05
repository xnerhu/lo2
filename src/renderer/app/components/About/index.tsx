import React from 'react';

import { LinkPage } from '~/renderer/components/LinkPage';
import { aboutUsPage } from '~/renderer/constants/navigation';

export default () => {
  return <LinkPage item={aboutUsPage} />;
};

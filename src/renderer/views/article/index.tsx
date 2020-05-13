import React from 'react';

import { usePage } from '~/renderer/hooks/network';
import { IArticlePageData } from '~/interfaces';

export default () => {
  const [data] = usePage<IArticlePageData>('article', {
    shouldFetch: ({ label }, cached) => label !== cached?.label,
  });

  console.log(data);

  return <>test</>;
};

import React from 'react';

import { ArticleEditor } from '~/renderer/components/ArticleEditor';
import { usePage } from '~/renderer/hooks/network';
import { IAddArticlePageData } from '~/interfaces';

export default () => {
  const [data] = usePage<IAddArticlePageData>('addArticle');

  return <ArticleEditor data={data} />;
};

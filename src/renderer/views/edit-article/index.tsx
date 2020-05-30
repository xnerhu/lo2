import React from 'react';

import { ArticleEditor } from '~/renderer/components/ArticleEditor';
import { usePage } from '~/renderer/hooks/network';
import { IEditArticlePageData } from '~/interfaces';
import { ArticleNotFoundError } from '~/renderer/components/Error/ArticleNotFound';

export default () => {
  const [data] = usePage<IEditArticlePageData>('editArticle', {
    shouldFetch: ({ label }, cached) => label !== cached?.label,
  });

  if (data?.success === false) {
    return <ArticleNotFoundError />;
  }

  return <ArticleEditor data={data} edit />;
};

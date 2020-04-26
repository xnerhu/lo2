import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import loadable, { Options } from '@loadable/component';

import { usePage } from '../../utils/hooks';
import { IArticlePagePacket } from '~/interfaces';
import { ArticleList } from '~/renderer/components/ArticleList';
import { StyledArticles } from '../Articles/List/style';
import { Error } from '~/renderer/components/Error';

const LazyManager = loadable(() => import('./Manager'), {
  srr: true,
} as Options<any>);

interface Filter {
  label: string;
}

export default withRouter(({ match }) => {
  const { label } = match.params;

  const [data, setData, cachedFilter] = usePage<IArticlePagePacket, Filter>(
    'article',
    { label },
  );

  React.useEffect(() => {
    if (label !== cachedFilter.label) {
      (async () => {
        const res = await axios.get<IArticlePagePacket>(`/api/page/article`, {
          params: { label },
        });

        setData(res.data, label);
      })();
    }
  }, [label]);

  return (
    <StyledArticles>
      {data?.editable && <LazyManager />}
      {data?.error !== false && (
        <ArticleList
          data={data?.article}
          category={data?.category}
          user={data?.author}
          full
        />
      )}
      {data?.error === true && (
        <Error code="404" label="Oops! Nie znaleziono artykułu!">
          Mógł zostać usunięty.
        </Error>
      )}
    </StyledArticles>
  );
});

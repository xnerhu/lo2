import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import { usePage } from '../../utils/hooks';
import { Background } from '~/renderer/components/Section';
import { createArticleFilter } from '~/utils/article';
import { INewsPageData } from '~/interfaces';
import { IArticleFilter, IArticleListChunk } from '~/interfaces/article';
import { Categories } from './Categories';
import { Pagination } from './Pagination';
import { ArticleCard } from '~/renderer/components/ArticleCard';
import { StyledArticles } from './style';

const Articles = ({ data }: { data: INewsPageData }) => {
  const articles = data?.articles ?? [];

  return (
    <Background>
      <StyledArticles>
        {articles.map((r) => (
          <ArticleCard key={r.id} data={r} />
        ))}
        <Pagination nextPage={data.nextPage} />
      </StyledArticles>
    </Background>
  );
};

export default withRouter(({ match }) => {
  const filter = createArticleFilter(match.params);

  const [data, setData, cachedFilter] = usePage<INewsPageData, IArticleFilter>(
    'news',
    filter,
  );

  React.useEffect(() => {
    if (
      filter.page !== cachedFilter.page ||
      filter.category !== cachedFilter.category
    ) {
      (async () => {
        const res = await axios.get<IArticleListChunk>(`/api/article/list`, {
          params: filter,
        });

        setData(res.data, filter);
      })();
    }
  }, [filter]);

  const categories = React.useMemo(
    () => <Categories data={data.categories ?? []} />,
    [data?.categories],
  );

  return (
    <>
      {categories}
      <Articles data={data} />
    </>
  );
});

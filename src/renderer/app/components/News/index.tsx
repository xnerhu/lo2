import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import { usePage } from '../../utils/hooks';
import { Background } from '~/renderer/components/Section';
import { createArticleFilter } from '~/utils/article';
import { INewsPageData } from '~/interfaces';
import { Article } from '~/renderer/components/Article';
import {
  IArticle,
  IArticleFilter,
  IArticleListChunk,
} from '~/interfaces/article';
import { Categories } from './Categories';
import { PrimaryButton } from '~/renderer/components/Button';
import { CHEVRON_ICON } from '~/renderer/constants/icons';
import { IRouterProps } from '../../interfaces';
import { StyledArticles, Buttons } from './style';

interface Props {
  data: INewsPageData;
}

const Articles = withRouter(({ data, match }: IRouterProps<Props>) => {
  const category = match.params.category || 'all';
  const page = parseInt(match.params.page ?? 1);

  return (
    <Background>
      <StyledArticles>
        {data?.articles.map((r) => (
          <Article key={r.id} data={r} />
        ))}
        <Buttons>
          <PrimaryButton
            to={`/news/${category}/${page - 1}`}
            icon={CHEVRON_ICON}
            disabled={page <= 1}
            reversed
          >
            Starsze
          </PrimaryButton>
          <PrimaryButton
            to={`/news/${category}/${page + 1}`}
            icon={CHEVRON_ICON}
            iconOnRight
            disabled={!data.nextPage}
          >
            Nowsze
          </PrimaryButton>
        </Buttons>
      </StyledArticles>
    </Background>
  );
});

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

  return (
    <>
      <Categories data={data.categories ?? []} />
      <Articles data={data} />
    </>
  );
});

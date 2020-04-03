import React from 'react';
import { withRouter } from 'react-router-dom';

import { usePage } from '../../utils/hooks';
import {
  Background,
  Content,
  SectionTitle,
} from '~/renderer/components/Section';

import { Pagination } from './Pagination';
import { IRouterProps } from '../../interfaces';
import { createArticleFilter } from '~/utils/article';
import { Toolbar } from './Toolbar';
import { INewsPageData } from '~/interfaces';
import { Article } from '~/renderer/components/Article';
import { IArticle } from '~/interfaces/article';
import { Dropdown } from '~/renderer/components/Dropdown';
import { Categories } from './Categories';
import { Container, StyledArticles } from './style';

const Articles = ({ data }: { data: IArticle[] }) => {
  return (
    <StyledArticles>
      {data.map((r) => (
        <Article key={r.id} data={r} />
      ))}
    </StyledArticles>
  );
};

const Pinned = () => {
  return (
    <StyledPinned>
      <SectionTitle>Filtry</SectionTitle>
    </StyledPinned>
  );
};

//      <Dropdown items={[{ id: 'all', name: 'Wszystko' }]} value={'all'} />

export default withRouter((props) => {
  const data = usePage<INewsPageData>('news', 'news');
  const { match } = props;

  const filter = React.useMemo(() => {
    return createArticleFilter(match.params);
  }, [match.params]);

  return (
    <>
      <Categories data={data?.categories} />
      <Articles data={data?.articles} />
    </>
  );
});

/*        {data?.articles.map((r) => (
          <Article key={r.id} data={r} />
        ))}
        {/* <Toolbar filter={filter} /> */
{
  /* <NewsGrid items={store.news.items} /> */
}
// <Pagination filter={filter} />

import React from 'react';
import loadable from '@loadable/component';

import { Background } from '~/renderer/components/Section';
import { Pagination } from '../Pagination';
import { IArticlesPageData, IArticle } from '~/interfaces';
import { Article } from '~/renderer/components/Article';
import { LOADABLE_OPTIONS } from '~/renderer/constants/loadable';
import { useAppState } from '~/renderer/hooks/app-state';
import { StyledArticles } from './style';

const LazyCms = loadable(() => import('../Cms'), LOADABLE_OPTIONS);

interface Props {
  data: IArticlesPageData;
}

export const List = ({ data }: Props) => {
  const appState = useAppState();
  const { articles, categories, users } = data;

  if (!articles?.length) return null;

  const getInfo = (r: IArticle) => {
    return {
      user: users.find((x) => x._id.toString() === r.authorId.toString()),
      category: categories.find(
        (x) => x._id.toString() === r.categoryId.toString(),
      ),
    };
  };

  return (
    <Background>
      <StyledArticles>
        {appState?.signedIn && <LazyCms />}
        {articles.map((r) => (
          <Article key={r._id} data={r} {...getInfo(r)} />
        ))}
        <Pagination nextPage={data.nextPage} />
      </StyledArticles>
    </Background>
  );
};

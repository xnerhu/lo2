import React from 'react';
import loadable from '@loadable/component';

import { Background } from '~/renderer/components/Section';
import { Pagination } from '../Pagination';
import { IArticlesPageData, IArticle } from '~/interfaces';
import { Article } from '~/renderer/components/Article';
import { LOADABLE_OPTIONS } from '~/renderer/constants/loadable';
import { useAppState } from '~/renderer/hooks/app-state';
import { Error } from '~/renderer/components/Error';
import { ArticlesContainer } from '~/renderer/components/Article/style';

const LazyCms = loadable(() => import('../Cms'), LOADABLE_OPTIONS);

interface Props {
  data: IArticlesPageData;
}

export const List = ({ data }: Props) => {
  const appState = useAppState();

  const getInfo = (r: IArticle) => {
    return {
      user: data.users.find((x) => x._id.toString() === r.authorId.toString()),
      category: data.categories.find(
        (x) => x._id.toString() === r.categoryId.toString(),
      ),
    };
  };

  return (
    <ArticlesContainer>
      {appState?.signedIn && <LazyCms />}
      {data?.articles != null && (
        <>
          {data.articles.length ? (
            <>
              {data.articles.map((r) => (
                <Article key={r._id} data={r} {...getInfo(r)} />
              ))}
              <Pagination nextPage={data.nextPage} />
            </>
          ) : (
            <Error code="404" label="Nie znaleziono!">
              Artykuły mogły zostać usunięte.
            </Error>
          )}
        </>
      )}
    </ArticlesContainer>
  );
};

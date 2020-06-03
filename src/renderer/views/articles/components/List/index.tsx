import React from 'react';
import loadable from '@loadable/component';

import { Background } from '~/renderer/components/Section';
import { Pagination } from '../Pagination';
import {
  IArticlesPageData,
  IArticle,
  IArticleCategory,
  IUser,
} from '~/interfaces';
import { Article } from '~/renderer/components/Article';
import { LOADABLE_OPTIONS } from '~/renderer/constants/loadable';
import { useAppState } from '~/renderer/hooks/app-state';
import { Error } from '~/renderer/components/Error';
import { ArticlesContainer } from '~/renderer/components/Article/style';

const LazyCms = loadable(() => import('../Cms'), LOADABLE_OPTIONS);

interface Props {
  articles: IArticle[];
  users: IUser[];
  categories: IArticleCategory[];
  subcategories: IArticleCategory[];
  nextPage?: boolean;
}

export const List = ({
  articles,
  users,
  categories,
  subcategories,
  nextPage,
}: Props) => {
  const appState = useAppState();

  const getInfo = (r: IArticle) => {
    const authorId = r.authorId.toString();
    const categoryId = r.categoryId.toString();
    const subcategoryId = r.subcategoryId && r.subcategoryId.toString();

    return {
      user: users.find((x) => x._id.toString() === authorId),
      category: categories.find((x) => x._id.toString() === categoryId),
      subcategory: subcategories.find(
        (x) => x._id.toString() === subcategoryId,
      ),
    };
  };

  return (
    <ArticlesContainer>
      {appState?.signedIn && <LazyCms />}
      {articles != null && (
        <>
          {articles.length ? (
            <>
              {articles.map((r) => (
                <Article key={r._id.toString()} data={r} {...getInfo(r)} />
              ))}
              <Pagination nextPage={nextPage} />
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

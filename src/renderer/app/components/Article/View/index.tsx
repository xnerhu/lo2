import React from 'react';
import { observer } from 'mobx-react-lite';

import { formatArticleDate } from '~/renderer/app/utils';
import { Error } from '~/renderer/components/Error';
import { useStore } from '~/renderer/app/store';
import {
  StyledView,
  Info,
  StyledAvatar,
  Author,
  AuthorInfo,
  ArticleImage,
  Body,
  Category,
} from './style';

const Details = observer(() => {
  const store = useStore();
  const { title, _author, _category } = store.article.data;

  if (!_author) return null;

  return (
    <>
      <h4>{title}</h4>
      <Info>
        <StyledAvatar src={_author.image} ratio={1} skeletonBorder="100%" />
        <AuthorInfo>
          <Author>
            {_author.firstName} {_author.lastName}
          </Author>
          <span>
            {formatArticleDate(store.article.data)}
            <Category to={`/news/${_category.label}`}>
              {_category.name}
            </Category>
          </span>
        </AuthorInfo>
      </Info>
    </>
  );
});

export const View = observer(() => {
  const store = useStore();
  const data = store.article.data;

  if (!data) return null;

  const { image, content } = data;

  return (
    <StyledView>
      <Details />
      {image && (
        <ArticleImage src={image} ratio={16 / 9} skeletonBorder={16} shadow />
      )}
      <Body>
        <div dangerouslySetInnerHTML={{ __html: content }} />
        {store.article.error && (
          <Error code="404" label="Oops! Nie znaleziono artykułu!">
            Mógł zostać usunięty.
          </Error>
        )}
      </Body>
    </StyledView>
  );
});

import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { withRouter } from 'react-router-dom';

import { IRouterProps } from '~/renderer/app/interfaces';
import { formatArticleDate } from '~/renderer/app/utils';
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

export const View = withRouter(
  observer((props: IRouterProps) => {
    const store = useStore();
    const { match } = props;

    const data = store.article.data;

    React.useEffect(() => {
      store.article.load((match.params as any).id);
    }, [match.params]);

    if (!data) return null;

    const { image, content } = data;

    return (
      <StyledView>
        <Details />
        {image && (
          <ArticleImage src={image} ratio={16 / 9} skeletonBorder={16} shadow />
        )}
        <Body>{content}</Body>
      </StyledView>
    );
  }),
);

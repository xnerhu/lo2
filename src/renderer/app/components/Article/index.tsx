import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { withRouter } from 'react-router-dom';

import { useStore } from '../../store';
import { IWithRouterProps } from '~/renderer/app/interfaces';
import { formatArticleDate } from '~/renderer/app/utils';
import { Container, Info, StyledAvatar, Author, AuthorInfo, ArticleImage, Body, Category } from './style';

const Details = observer(() => {
  const store = useStore();
  const { title, author, category, _categoryId } = store.article.data;

  if (!author) return null;

  return (
    <>
      <h4>{title}</h4>
      <Info>
        <StyledAvatar src={author.image} ratio={1} skeletonBorder='100%' />
        <AuthorInfo>
          <Author>Mikołaj Palkiewicz</Author>
          <span>{formatArticleDate(store.article.data)} <Category to={`/news/1/${_categoryId}`}>{category}</Category></span>
        </AuthorInfo>
      </Info>
    </>
  );
});

export default withRouter(observer((props: IWithRouterProps) => {
  const store = useStore();
  const { match } = props;

  const data = store.article.data;

  React.useEffect(() => {
    store.article.load(match.params._id);
  }, [match.params]);

  React.useEffect(() => {
    return () => {
      store.article.data = {};
    };
  }, []);

  if (!data) return null;

  const { image, content } = data;

  return (
    <Container>
      <Details />
      {image && <ArticleImage src={image} ratio={16 / 9} skeletonBorder={16} shadow />}
      <Body>{content}</Body>
    </Container>
  );
}));


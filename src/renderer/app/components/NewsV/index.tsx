import React from 'react';

import { Scroller, ScrollerItemProps } from '~/renderer/components/Scroller';
import { Background } from '~/renderer/components/Section';
import { IArticle } from '~/interfaces/article';
import { ARTICLES } from './test';
import { Container, StyledItem } from './style';

const Item = ({ setRef, index }: ScrollerItemProps) => {
  const item = ARTICLES[index];

  return (
    <StyledItem ref={setRef}>{!item ? `XD ${index}` : item.content}</StyledItem>
  );
};

export default () => {
  return (
    <Background>
      <Container>
        <Scroller visible={6} max={ARTICLES.length}>
          {Item}
        </Scroller>
      </Container>
    </Background>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';

import {
  SectionTitle,
  Content,
  Background,
} from '~/renderer/components/Section';
import { PrimaryButton } from '~/renderer/components/Button';
import { INews } from '~/interfaces';
import { CHEVRON_ICON } from '~/renderer/constants/icons';
import { ArticleCard } from '~/renderer/components/ArticleCard';
import { IArticle } from '~/interfaces/article';
import { StyledArticleGrid } from './style';

const Grid = ({ items }: { items: IArticle[] }) => {
  return (
    <StyledArticleGrid>
      {items?.map((r) => (
        <ArticleCard key={r.id} data={r} />
      ))}
    </StyledArticleGrid>
  );
};

export const Articles = ({ items }: { items: INews[] }) => {
  return (
    <Background>
      <Content>
        <Link to="/news">
          <SectionTitle>Aktualności</SectionTitle>
        </Link>
        <Grid items={items} />
        <PrimaryButton
          to="/news"
          icon={CHEVRON_ICON}
          style={{ margin: '32px auto 0px auto' }}
          iconOnRight
          iconRotation={90}
        >
          Zobacz więcej
        </PrimaryButton>
      </Content>
    </Background>
  );
};

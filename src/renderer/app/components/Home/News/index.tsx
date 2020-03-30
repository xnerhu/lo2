import React from 'react';
import { Link } from 'react-router-dom';

import {
  SectionTitle,
  Content,
  Background,
} from '~/renderer/components/Section';
import { Button } from '~/renderer/components/Button';
import { NewsGrid } from '~/renderer/components/NewsGrid';
import { INews } from '~/interfaces';

export const ShortNews = ({ items }: { items: INews[] }) => {
  return (
    <Background style={{ marginTop: 56 }}>
      <Content>
        <Link to="/news">
          <SectionTitle>Aktualności</SectionTitle>
        </Link>
        <NewsGrid items={items} renderLast={false} />
        <Button to="/news" style={{ margin: '32px auto 16px auto' }}>
          Zobacz więcej
        </Button>
      </Content>
    </Background>
  );
};

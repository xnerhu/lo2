import React from 'react';
import { Link } from 'react-router-dom';

import {
  SectionTitle,
  Content,
  Background,
} from '~/renderer/components/Section';
import { PrimaryButton } from '~/renderer/components/Button';
import { ArticleGrid } from '~/renderer/components/ArticleGrid';
import { INews } from '~/interfaces';
import { CHEVRON_ICON } from '~/renderer/constants/icons';

export const ShortNews = ({ items }: { items: INews[] }) => {
  return (
    <Background>
      <Content>
        <Link to="/news">
          <SectionTitle>Aktualności</SectionTitle>
        </Link>
        <ArticleGrid items={items} renderLast={false} />
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

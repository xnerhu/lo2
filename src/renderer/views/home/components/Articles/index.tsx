import React from 'react';
import { Link } from 'react-router-dom';

import {
  SectionTitle,
  Content,
  Background,
} from '~/renderer/components/Section';
import { PrimaryButton } from '~/renderer/components/Button';
import { ICON_CHEVRON } from '~/renderer/constants/icons';
import { IArticle } from '~/interfaces';
import { ArticlesGrid } from './Grid';

export const Articles = ({ items }: { items: IArticle[] }) => {
  return (
    <Background>
      <Content>
        <Link to="/articles">
          <SectionTitle>Aktualności</SectionTitle>
        </Link>
        <ArticlesGrid items={items} />
        <PrimaryButton
          to="/articles"
          icon={ICON_CHEVRON}
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

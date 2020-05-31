import React from 'react';
import { Link } from 'react-router-dom';

import { SectionTitle, Content } from '~/renderer/components/Section';
import { PrimaryButton } from '~/renderer/components/Button';
import { ICON_CHEVRON } from '~/renderer/constants/icons';
import { IArticle } from '~/interfaces';
import { ArticlesGrid } from './Grid';

interface Props {
  items: IArticle[];
}

export const Articles = ({ items }: Props) => {
  return (
    <Content style={{ marginBottom: 32 }}>
      <Link to="/blog">
        <SectionTitle>Aktualności</SectionTitle>
      </Link>
      <ArticlesGrid items={items} />
      <PrimaryButton
        to="/blog"
        icon={ICON_CHEVRON}
        style={{ margin: '32px auto 0px auto' }}
        iconOnRight
        iconRotation={90}
      >
        Zobacz więcej
      </PrimaryButton>
    </Content>
  );
};

Articles.defaultProps = {
  items: [],
} as Props;

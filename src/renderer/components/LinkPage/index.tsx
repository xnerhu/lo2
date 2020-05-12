import React from 'react';

import { Background, SectionTitle, Content } from '../Section';
import { INavItem } from '~/renderer/app/interfaces';
import { Card } from './style';

interface Props {
  item: INavItem;
}

export const LinkPage = ({ item }: Props) => {
  const { label, subpages } = item;

  return (
    <Background style={{ paddingBottom: 64 }}>
      <Content>
        <SectionTitle>{label}</SectionTitle>
        <div>
          {subpages.map((r) => (
            <Card key={r.to} to={r.to}>
              {r.label}
            </Card>
          ))}
        </div>
      </Content>
    </Background>
  );
};

import React from 'react';

import { ISubPage } from '~/renderer/interfaces';
import { Content, SectionTitle } from '../Section';
import { Container, Item } from './style';

export const SubPage = (data: ISubPage) => () => {
  const { title, items } = data;

  return (
    <Content>
      <SectionTitle>{title}</SectionTitle>
      <Container>
        {items.map((r) => (
          <Item key={r.label} to={r.to} external={r.external}>
            {r.label}
          </Item>
        ))}
      </Container>
    </Content>
  );
};

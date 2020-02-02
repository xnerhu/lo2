import React from 'react';

import { RichEditor } from '~/renderer/components/RichEditor';
import {
  Content,
  SectionTitle,
  Background,
} from '~/renderer/components/Section';

export default () => {
  return (
    <Background>
      <Content>
        <SectionTitle>Dodaj nowy artykuł</SectionTitle>
        <RichEditor />
      </Content>
    </Background>
  );
};

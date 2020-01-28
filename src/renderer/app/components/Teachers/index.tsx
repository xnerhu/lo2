import * as React from 'react';
import { observer } from 'mobx-react-lite';

import { useStore } from '~/renderer/app/store';
import {
  SectionTitle,
  Content,
  Background,
} from '~/renderer/components/Section';
import { Carousel } from '~/renderer/components/Carousel';
import {} from './style';

export default observer(() => {
  const store = useStore();

  return (
    <>
      <Content>
        <Carousel items={['/static/slider/a0']} />
      </Content>
      <Background style={{ marginTop: 56 }}>
        <Content>
          <SectionTitle>Kadra</SectionTitle>
        </Content>
      </Background>
    </>
  );
});

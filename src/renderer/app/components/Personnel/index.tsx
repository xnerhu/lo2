import React from 'react';
import { observer } from 'mobx-react-lite';

import { useStore } from '~/renderer/app/store';
import {
  SectionTitle,
  Content,
  Background,
} from '~/renderer/components/Section';
import { Carousel } from '~/renderer/components/Carousel';
import { IPersonnelSection } from '~/interfaces';
import { Container, Label } from './style';

const Section = ({ data }: { data: IPersonnelSection }) => {
  const { title, items } = data;

  return (
    <div>
      <h6>{title}</h6>
      {items.map(r => (
        <Label key={r}>{r}</Label>
      ))}
    </div>
  );
};

export default observer(() => {
  const store = useStore();

  React.useEffect(() => {
    store.personnel.fetch();
  }, []);

  return (
    <>
      <Content>
        <Carousel items={store.personnel.sliderItems} />
      </Content>
      <Background style={{ marginTop: 56 }}>
        <Content>
          <SectionTitle>Kadra</SectionTitle>
          <Container>
            {store.personnel.sections.map(r => (
              <Section key={r.title} data={r} />
            ))}
          </Container>
        </Content>
      </Background>
    </>
  );
});

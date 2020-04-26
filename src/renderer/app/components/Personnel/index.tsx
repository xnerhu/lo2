import React from 'react';

import {
  SectionTitle,
  Content,
  Background,
} from '~/renderer/components/Section';
import { Carousel } from '~/renderer/components/Carousel';
import { IPersonnelSection, IPersonnelPacket } from '~/interfaces';
import { Container, Label } from './style';
import { usePage } from '../../utils/hooks';

const Section = ({ data }: { data: IPersonnelSection }) => {
  const { title, items } = data;

  return (
    <div>
      <h6>{title}</h6>
      {items.map((r) => (
        <Label key={r}>{r}</Label>
      ))}
    </div>
  );
};

export default () => {
  const [data] = usePage<IPersonnelPacket>('personnel');

  return (
    <>
      <Content>
        <Carousel items={data?.sliderItems} />
      </Content>
      <Background style={{ marginTop: 56 }}>
        <Content>
          <SectionTitle>Kadra</SectionTitle>
          <Container>
            {data?.sections?.map((r) => (
              <Section key={r.title} data={r} />
            ))}
          </Container>
        </Content>
      </Background>
    </>
  );
};

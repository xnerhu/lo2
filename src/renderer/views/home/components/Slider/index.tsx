import React from 'react';

import { Content } from '~/renderer/components/Section';
import { Carousel } from '~/renderer/components/Carousel';

export const Slider = ({ items }: { items: string[] }) => {
  return (
    <Content>
      <Carousel items={items} />
    </Content>
  );
};

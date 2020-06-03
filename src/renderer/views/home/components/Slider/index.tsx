import React from 'react';

import { Content } from '~/renderer/components/Section';
import { Carousel } from '~/renderer/components/Carousel';

interface Props {
  items: string[];
}

export const Slider = ({ items }: Props) => {
  return (
    <Content>
      <Carousel items={items} />
    </Content>
  );
};

Slider.defaultProps = {
  items: [],
} as Props;

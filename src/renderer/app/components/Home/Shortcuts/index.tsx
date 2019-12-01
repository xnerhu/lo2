import * as React from 'react';

import { icons, EDZIENNIK_URL, GOOGLE_MAPS_URL, LESSONS_PLAN_URL, REPLACEMENTS_URL } from '~/renderer/constants';
import { Section } from '~/renderer/components/Section';
import { StyledItem, Container, Circle, Title, Icon } from './style';

interface Props {
  icon: string;
  to?: string;
  children?: React.ReactNode;
}

const Item = ({ icon, to, children }: Props) => {
  return (
    <StyledItem href={to} target='_blank' rel='noopener'>
      <Circle className='shortcuts-circle' >
        <Icon src={icon} />
      </Circle>
      <Title>{children}</Title>
    </StyledItem>
  )
}

export const Shortcuts = () => {
  return (
    <Section>
      <Container>
        <Item to={EDZIENNIK_URL} icon={icons.register}>E-dziennik</Item>
        <Item to={LESSONS_PLAN_URL} icon={icons.plan}>Plan lekcji</Item>
        <Item to={REPLACEMENTS_URL} icon={icons.replacement}>Zastępstwa</Item>
        <Item to={GOOGLE_MAPS_URL} icon={icons.locationOutline}>Google maps</Item>
      </Container>
    </Section>
  );
};

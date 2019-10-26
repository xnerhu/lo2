import * as React from 'react';
import { observer } from 'mobx-react-lite';

import { useStore } from '../../store';
import { ITeachersSection, ITeacher } from '~/interfaces';
import { SectionTitle } from '~/renderer/components/Section';
import { Container, Title, StyledSection } from './style';

const Item = ({ data }: { data: ITeacher }) => {
  const name = data instanceof Array ? data[0] : data;
  const href = data instanceof Array ? data[1] : null;

  const Wrapper = (
    <li>
      <span style={{ color: href ? '#F61050' : 'inherit', fontSize: 16 }}>
        {name}
      </span>
    </li>
  );

  if (href) {
    return (<a href={href} target='_blank'>{Wrapper}</a>);
  }

  return Wrapper;
}

const Section = ({ data }: { data: ITeachersSection }) => {
  const { subject, teachers } = data;

  return (
    <div>
      <Title>{subject}</Title>
      <StyledSection>
        {teachers.map(r => (
          <Item data={r} />
        ))}
      </StyledSection>
    </div>
  )
}

export const Teachers = observer(() => {
  const store = useStore();

  return (
    <>
      <SectionTitle>Nauczyciele, dyrekcja i administracja</SectionTitle>
      <Container>
        {store.teachers.items.map(r => (
          <Section key={r.subject} data={r} />
        ))}
      </Container>
    </>
  );
});

import * as React from 'react';
import { observer } from 'mobx-react-lite';

import { useStore } from '~/renderer/app/store';
import { ITeachersSection, ITeacher } from '~/interfaces';
import { SectionTitle } from '~/renderer/components/Section';
import { Link } from '~/renderer/components/Link';
import { Container, Title, StyledSection } from './style';

const Item = ({ data }: { data: ITeacher }) => {
  const name = data instanceof Array ? data[0] : data;
  const href = data instanceof Array && data[1];

  return (
    <Link to={href} target='_blank' rel='noopener' list>
      <span style={{ color: href ? '#F61050' : 'inherit', fontSize: 16 }}>
        {name}
      </span>
    </Link>
  );
}

const Section = ({ data }: { data: ITeachersSection }) => {
  const { subject, teachers } = data;

  return (
    <div>
      <Title>{subject}</Title>
      <StyledSection>
        {teachers.map((r, index) => (
          <Item key={index} data={r} />
        ))}
      </StyledSection>
    </div>
  )
}

export default observer(() => {
  const store = useStore();

  const data = store.teachers.data;

  if (!data) return null;

  return (
    <>
      <SectionTitle>Kadra</SectionTitle>
      <Container>
        {data.map(r => (
          <Section key={r.subject} data={r} />
        ))}
      </Container>
    </>
  );
});

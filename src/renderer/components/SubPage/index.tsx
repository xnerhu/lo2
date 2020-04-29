import React from 'react';
import { Link } from 'react-router-dom';

import { ISubPage } from '~/renderer/interfaces';

export const SubPage = (data: ISubPage) => () => {
  const { title, items } = data;

  return (
    <div>
      <h1>{title}</h1>
      {items.map((r) => (
        <Link key={r.label} to={r.to}>
          {r.label}
        </Link>
      ))}
    </div>
  );

  // return (
  //   <Background style={{ paddingBottom: 64 }}>
  //     <Content>
  //       <SectionTitle>{label}</SectionTitle>
  //       <div>
  //         {subpages.map((r) => (
  //           <Card key={r.to} to={r.to}>
  //             {r.label}
  //           </Card>
  //         ))}
  //       </div>
  //     </Content>
  //   </Background>
  // );
};

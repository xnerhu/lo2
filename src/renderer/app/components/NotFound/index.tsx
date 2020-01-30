import * as React from 'react';

import { Background, Content } from '~/renderer/components/Section';
import { Error } from '~/renderer/components/Error';

export default () => {
  return (
    <Background>
      <Content>
        <Error code="404" label="Nie znaleziono strony!">
          xd
        </Error>
      </Content>
    </Background>
  );
};

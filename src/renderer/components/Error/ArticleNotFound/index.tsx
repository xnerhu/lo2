import React from 'react';

import { PrimaryButton } from '../../Button';
import { ICON_LINK } from '~/renderer/constants/icons';
import { Error, Container } from './style';

export const ArticleNotFoundError = () => {
  return (
    <>
      <Error code="404" label="Nie znaleziono!">
        Artykuły mogły zostać usunięte.
      </Error>
      <Container>
        <PrimaryButton to="/articles" icon={ICON_LINK} iconOnRight>
          Artykuły
        </PrimaryButton>
      </Container>
    </>
  );
};

import React from 'react';

import { StyledCms } from './style';
import { Button } from '~/renderer/components/Button';

export default () => {
  return (
    <StyledCms>
      <Button to="/cms/article">Utwórz nowy</Button>
    </StyledCms>
  );
};

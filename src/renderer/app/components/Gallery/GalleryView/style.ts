import styled from 'styled-components';

import { transparency } from '~/renderer/constants';
import { centerIcon } from '~/renderer/mixins';

export const Pathview = styled.div`
  width: 100%;
  height: 32px;
  display: flex;
  align-items: center;
  font-size: 20px;
`;

export const AlbumYear = styled.div`
  color: rgba(0, 0, 0, ${transparency.text.medium});
`;

export const Chevron = styled.div`
  width: 24px;
  height: 24px;
  background-image 
  ${centerIcon()};
`;

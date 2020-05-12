import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { transparency } from '~/renderer/constants/transparency';
import { PRIMARY_COLOR } from '~/renderer/constants/design';
import { Image } from '~/renderer/components/Image';

export const StyledDetails = styled.div`
  display: flex;
  align-items: center;
`;

export const Avatar = styled(Image)`
  width: 40px;
  height: 40px;
  border-radius: 100%;
`;

export const Container = styled.div`
  margin-left: 12px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  flex-wrap: wrap;
  flex: 1;

  & {
    color: rgba(0, 0, 0, ${transparency.text.medium});
  }
`;

export const Category = styled(Link)`
  font-size: 14px;
  margin-left: 8px;
  text-decoration: underline;
  color: ${PRIMARY_COLOR};
`;

export const Author = styled.div`
  color: #000;
  margin-bottom: 2px;
`;

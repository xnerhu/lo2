import styled from 'styled-components';

import { shadows, body2, noUserSelect, h6 } from '~/renderer/mixins';
import { transparency } from '~/renderer/constants';

export const StyledNews = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 64px;
`;

export const StyledCard = styled.article`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  flex: 1;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: ${shadows(4)};
  transition: 0.1s transform;

  &:not(:first-child) {
    margin-left: 48px;
  }

  &:hover {
    transform: scale(1.05);
  }
`;

export const Title = styled.div`
  padding: 16px 24px 8px;
  ${h6()}
`;

export const Content = styled.div`
  color: rgba(0, 0, 0, ${transparency.text.medium});
  padding: 0px 24px 16px;
  ${body2()};
`;

export const Date = styled(Content)`
  padding: 0px 24px 16px;
  margin-top: auto;
  ${noUserSelect()};
`;

import styled from 'styled-components';

import { shadows, body2, noUserSelect, h6, robotoMedium } from '~/renderer/mixins';
import { transparency, GRADIENT } from '~/renderer/constants';

export const CardsContainer = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 48px;
`;

export const StyledCard = styled.article`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  flex: 1;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: ${shadows(4)};
  box-shadow: 0px 6px 16px 0px rgba(0, 0, 0, 0.12);
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

export const MoreButton = styled.div`
  width: fit-content;
  padding: 0px 16px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 64px;
  background: ${GRADIENT};
  color: #fff;
  margin: 0 auto;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0px 8px 24px 0px rgba(246, 16, 80, 0.32);
  transition: 0.1s transform;
  ${noUserSelect()};
  ${robotoMedium()};

  &:hover {
    transform: scale(1.05);
  }
`;

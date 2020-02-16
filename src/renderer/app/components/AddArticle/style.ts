import styled from 'styled-components';

import { Input as GreyInput } from '~/renderer/components/Input';
import {
  transparency,
  STANDARD_RATIO,
  icons,
  PRIMARY_COLOR,
} from '~/renderer/constants';
import {
  aspectRatio,
  centerIcon,
  centerBoth,
  noUserSelect,
} from '~/renderer/mixins';
import { buttonBase, RaisedButton } from '~/renderer/components/Button';
import { ErrorLabel as StyledErrorLabel } from '~/renderer/components/Error';

export const Input = styled(GreyInput)`
  height: 64px;
  background-color: #fff;
  border-radius: 8px;
  font-size: 16px;
  padding: 0px 24px;
  will-change: box-shadow;
  transition: 0.1s box-shadow;

  &::placeholder {
    color: rgba(0, 0, 0, 0.333);
  }

  &:hover,
  &:focus {
    background-color: #fff;
    box-shadow: 0 0 0 2px ${PRIMARY_COLOR};
  }
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgba(0, 0, 0, ${transparency.dividers});
  margin: 24px auto;
`;

export const Button = styled(RaisedButton)`
  margin-top: 48px;
  margin-bottom: 16px;
`;

export const StyledUploadScreen = styled.div`
  width: 100%;
  max-width: 512px;
  margin: 0 auto;
`;

export const ErrorLabel = styled(StyledErrorLabel)`
  margin-left: 24px !important;
`;

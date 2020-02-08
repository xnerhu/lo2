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

export const StyledImagePick = styled.div`
  width: 344px;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.04);
  position: relative;
  cursor: pointer;
  margin-top: 32px;
  overflow: hidden;
  will-change: box-shadow;
  transition: 0.1s box-shadow;
  ${aspectRatio(STANDARD_RATIO, false)};

  &:hover {
    box-shadow: 0 0 0 2px ${PRIMARY_COLOR};
  }
`;

export const ImageIcon = styled.div`
  width: 96px;
  height: 96px;
  background-image: url(${icons.imageOutline});
  pointer-events: none;
  opacity: 0.12;
  position: absolute;
  ${centerIcon()};
  ${centerBoth()};
`;

export const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
  background-color: #fff;
  object-fit: cover;
  object-position: center;
  pointer-events: none;
  ${noUserSelect()};
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

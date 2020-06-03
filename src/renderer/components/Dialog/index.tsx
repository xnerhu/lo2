import React from 'react';

import { FlatButton, PrimaryButton } from '../Button';
import { StyledDialog, Container, Title, ButtonsContainer } from './style';

interface Props {
  visible: boolean;
  title: string;
  onSubmit?: (e: React.MouseEvent) => void;
  onCancel?: (e: React.MouseEvent) => void;
  submitBtnText?: string;
  children?: React.ReactNode;
}

export const Dialog = ({
  visible,
  title,
  onSubmit,
  onCancel,
  submitBtnText,
  children,
}: Props) => {
  return (
    <StyledDialog visible={visible}>
      <Container>
        <Title>{title}</Title>
        {children}
        <ButtonsContainer>
          <FlatButton onClick={onCancel}>Anuluj</FlatButton>
          <PrimaryButton onClick={onSubmit}>{submitBtnText}</PrimaryButton>
        </ButtonsContainer>
      </Container>
    </StyledDialog>
  );
};

Dialog.defaultProps = {
  submitBtnText: 'Ok',
} as Props;

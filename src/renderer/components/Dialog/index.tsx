import React from 'react';

import { FlatButton, PrimaryButton } from '../Button';
import { StyledDialog, Container, Title, ButtonsContainer } from './style';

interface Props {
  visible: boolean;
  title: string;
  saveBtnText?: string;
  onSave?: (e: React.MouseEvent) => void;
  onCancel?: (e: React.MouseEvent) => void;
  children?: React.ReactNode;
}

export const Dialog = ({
  visible,
  title,
  saveBtnText,
  onSave,
  onCancel,
  children,
}: Props) => {
  return (
    <StyledDialog visible={visible}>
      <Container>
        <Title>{title}</Title>
        {children}
        <ButtonsContainer>
          <FlatButton onClick={onCancel}>Anuluj</FlatButton>
          <PrimaryButton onClick={onSave}>{saveBtnText}</PrimaryButton>
        </ButtonsContainer>
      </Container>
    </StyledDialog>
  );
};

Dialog.defaultProps = {
  saveBtnText: 'Zapisz',
} as Props;

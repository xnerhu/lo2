import React from 'react';
import { IPosition } from 'spatium';

import { IMAGE_TEST } from './test';
import { FlatButton, PrimaryButton } from '../../Button';
import { DraggableImg } from '../DraggableImage';
import { editImage, saveBase64ToFile } from '~/renderer/utils/image';
import {
  StyledDialog,
  Container,
  Title,
  ButtonsContainer,
  Divider,
} from './style';

interface Props {}

interface State {
  visible?: boolean;
  src: string;
  scale: number;
}

export class ImageEditor extends React.PureComponent<Props, State> {
  public static defaultProps: Props = {};

  private imgRef = React.createRef<HTMLImageElement>();

  public state: State = {
    visible: true,
    src: IMAGE_TEST,
    scale: 5,
  };

  private offset: IPosition = [0, 0];

  public process(src: string) {
    this.setState({ src, visible: true });
  }

  public onCancel = () => {
    this.setState({ visible: false });
  };

  public onSave = (e: React.MouseEvent) => {
    const base64 = editImage(this.imgRef.current, {
      offset: this.offset,
      scale: this.state.scale,
    });

    if (e.shiftKey) {
      saveBase64ToFile(base64);
    } else {
      console.log('xd');
    }
  };

  private onChange = (offset: IPosition) => {
    this.offset = offset;
  };

  render() {
    const { visible, src, scale } = this.state;

    return (
      <StyledDialog visible={visible}>
        <Container>
          <Title>Edytuj obraz</Title>
          <img ref={this.imgRef} src={src} hidden />
          <DraggableImg src={src} onChange={this.onChange} scale={scale} />
          <Divider />
          <ButtonsContainer>
            <FlatButton onClick={this.onCancel}>Anuluj</FlatButton>
            <PrimaryButton onClick={this.onSave}>Zapisz</PrimaryButton>
          </ButtonsContainer>
        </Container>
      </StyledDialog>
    );
  }
}

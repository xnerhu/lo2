import React from 'react';
import { IPosition } from 'spatium';

import { IMAGE_TEST } from './test';
import { FlatButton, PrimaryButton } from '../../Button';
import { DraggableImg } from '../DraggableImage';
import { editImage, saveBase64ToFile } from '~/renderer/utils/image';
import { Range } from '../../Range';
import {
  StyledDialog,
  Container,
  Title,
  ButtonsContainer,
  ScaleContainer,
} from './style';

const MAX_SCALE = 5;

interface Props {}

interface State {
  visible?: boolean;
  src: string;
}

export class ImageEditor extends React.PureComponent<Props, State> {
  public static defaultProps: Props = {};

  private imgRef = React.createRef<HTMLImageElement>();

  private draggableImgRef = React.createRef<DraggableImg>();

  public state: State = {
    visible: true,
    src: IMAGE_TEST,
  };

  private offset: IPosition = [0, 0];

  private scale = 1;

  public process(src: string) {
    this.setState({ src, visible: true });
  }

  public onCancel = () => {
    this.setState({ visible: false });
  };

  public onSave = (e: React.MouseEvent) => {
    const base64 = editImage(this.imgRef.current, {
      offset: this.offset,
      scale: this.scale,
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

  private onScaleChange = (e: any) => {
    const ref: HTMLInputElement = e.target;
    const value = parseInt(ref.value);
    const scale = value / 100;

    this.draggableImgRef.current.setScale(scale);
    this.scale = scale;
  };

  render() {
    const { visible, src } = this.state;

    return (
      <StyledDialog visible={visible}>
        <Container>
          <Title>Edytuj obraz</Title>
          <img ref={this.imgRef} src={src} hidden />
          <DraggableImg
            ref={this.draggableImgRef}
            src={src}
            onChange={this.onChange}
          />
          <ScaleContainer>
            <Range
              onChange={this.onScaleChange}
              min={100}
              max={MAX_SCALE * 100}
              defaultValue={0}
            />
          </ScaleContainer>
          <ButtonsContainer>
            <FlatButton onClick={this.onCancel}>Anuluj</FlatButton>
            <PrimaryButton onClick={this.onSave}>Zapisz</PrimaryButton>
          </ButtonsContainer>
        </Container>
      </StyledDialog>
    );
  }
}

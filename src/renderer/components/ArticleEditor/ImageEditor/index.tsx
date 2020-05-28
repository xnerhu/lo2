import React from 'react';
import { IPosition } from 'spatium';

import { FlatButton, PrimaryButton } from '../../Button';
import { DraggableImg } from '../DraggableImage';
import { editImage, saveBase64ToFile } from '~/renderer/utils/image';
import { Range } from '../../Range';
import { IPostMessageArticleEditor } from '~/renderer/interfaces';
import {
  StyledDialog,
  Container,
  Title,
  ButtonsContainer,
  ScaleContainer,
  Canvas,
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

  private canvasRef = React.createRef<HTMLCanvasElement>();

  public state: State = {
    visible: false,
    src: '',
  };

  private offset: IPosition = [0, 0];

  private scale = 1;

  public process(src: string): Promise<string> {
    return new Promise((resolve) => {
      this.setState({ src, visible: true });

      const clear = () => {
        window.removeEventListener('message', onMessage);
      };

      const onMessage = (e: any) => {
        if (e.source === window) {
          const { type, action, data } = (e.data ||
            {}) as IPostMessageArticleEditor;

          if (type === 'article-editor') {
            clear();

            this.setState({ visible: false });

            if (action === 'save') resolve(data);
            if (action === 'cancel') resolve();
          }
          action;
        }
      };

      window.addEventListener('message', onMessage, false);
    });
  }

  private onCancel = () => {
    this.setState({ visible: false });

    window.postMessage(
      { type: 'article-editor', action: 'cancel' } as IPostMessageArticleEditor,
      window.location.href,
    );
  };

  private onSave = (e: React.MouseEvent) => {
    const base64 = editImage(
      this.imgRef.current,
      {
        offset: this.offset,
        scale: this.scale,
      },
      // 16 / 9,
      // this.canvasRef.current,
    );

    if (e.shiftKey) {
      saveBase64ToFile(base64);
    } else {
      window.postMessage(
        {
          type: 'article-editor',
          action: 'save',
          data: base64,
        } as IPostMessageArticleEditor,
        window.location.href,
      );
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
          {/* <Canvas ref={this.canvasRef} /> */}
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

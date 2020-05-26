import React from 'react';

import { IMAGE_TEST } from './test';
import { FlatButton, PrimaryButton } from '../../Button';
import { DraggableImg } from '../DraggableImage';
import { trimImage } from '~/renderer/utils/image';
// import { Canvas } from '../Canvas';
import { IS_BROWSER } from '~/renderer/constants/config';
import {
  StyledDialog,
  Container,
  Title,
  ButtonsContainer,
  Image,
  ImageContainer,
  Canvas,
  Divider,
} from './style';

interface Props {}

interface State {
  visible?: boolean;
  src?: string;
  trimmed?: string;
  scale?: number;
}

function drawImageCentered(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  img: HTMLImageElement,
  x: number,
  y: number,
  scale: number,
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const width = img.width * scale;
  const height = img.height * scale;

  ctx.drawImage(
    img,
    (canvas.width - width) / 2 + x * 4,
    (canvas.height - height) / 2 + y * 4,
    width,
    height,
  );
}

export class ImageEditor extends React.PureComponent<Props, State> {
  public static defaultProps: Props = {};

  private imgRef = React.createRef<HTMLImageElement>();

  private canvasRef = React.createRef<HTMLCanvasElement>();

  private dragImgRef = React.createRef<HTMLImageElement>();

  private _canvasCtx: CanvasRenderingContext2D;

  public state: State = {
    visible: true,
    src: IMAGE_TEST,
    scale: 5,
  };

  private get canvasCtx() {
    if (!this._canvasCtx) {
      this._canvasCtx = this.canvasRef.current.getContext('2d');
    }

    return this._canvasCtx;
  }

  componentDidMount() {
    if (IS_BROWSER) {
      const img = this.imgRef.current;
      const canvas = this.canvasRef.current;

      canvas.width = img.width;
      canvas.height = img.height;
    }
  }

  public process(src: string) {
    this.setState({ src, visible: true });
  }

  public onCancel = () => {
    this.setState({ visible: false });
  };

  public onSave = () => {};

  private onChange = (x: number, y: number) => {
    const { scale } = this.state;

    this.canvasCtx.clearRect(
      0,
      0,
      this.canvasRef.current.width,
      this.canvasRef.current.height,
    );

    const img = this.imgRef.current;

    drawImageCentered(this.canvasCtx, this.canvasRef.current, img, x, y, scale);
  };

  render() {
    const { visible, src, scale } = this.state;

    return (
      <StyledDialog visible={visible}>
        <Container>
          <Title>Edytuj obraz</Title>
          <Image ref={this.imgRef} src={src} draggable={false} hidden />
          <DraggableImg
            innerRef={(r) => (this.dragImgRef.current = r)}
            src={src}
            onChange={this.onChange}
            scale={scale}
          />
          <Divider />
          <Canvas ref={this.canvasRef} />
          <ButtonsContainer>
            <FlatButton onClick={this.onCancel}>Anuluj</FlatButton>
            <PrimaryButton onClick={this.onSave}>Zapisz</PrimaryButton>
          </ButtonsContainer>
        </Container>
      </StyledDialog>
    );
  }
}

import { IEditImageData, IEditImageOptions } from '../interfaces';

export const readFileAsImage = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      resolve(reader.result as string);
    });

    reader.addEventListener('error', (e) => {
      console.error(`Error occurred while reading file: ${file.name}`);
      resolve();
    });

    reader.readAsDataURL(file);
  });
};

// export const trimImage = (
//   img: HTMLImageElement,
//   x: number,
//   y: number,
//   width: number,
//   height: number,
// ): string => {
//   const canvas = document.createElement('canvas');

//   canvas.width = width;
//   canvas.height = height;

//   // var context = canvas.getContext('2d');
//   // context.drawImage(img, -posX, -posY);
//   // img.parentNode.replaceChild(canvas, img);
// };

export const editImage = (
  img: HTMLImageElement,
  options: IEditImageOptions,
  ratio = 16 / 9,
  canvas?: HTMLCanvasElement,
) => {
  const { scale, offset } = options;

  const _canvas = canvas || document.createElement('canvas');
  const ctx = _canvas.getContext('2d');

  const rect = _canvas.getBoundingClientRect();

  _canvas.width = img.width;
  _canvas.height = img.width * (1 / ratio);

  ctx.clearRect(0, 0, _canvas.width, _canvas.height);

  const width = img.width * scale;
  const height = img.height * scale;

  const scaleOffsetX = offset[0] * (_canvas.width / rect.width);
  const scaleOffsetY = offset[1] * (_canvas.height / rect.height);

  ctx.drawImage(
    img,
    (_canvas.width - width) / 2 + scaleOffsetX,
    (_canvas.height - height) / 2 + scaleOffsetY,
    width,
    height,
  );

  const base64 = _canvas.toDataURL();

  if (!canvas) _canvas.remove();

  return base64;
};

export const saveBase64ToFile = (base64: string) => {
  const ref = document.createElement('a');

  document.body.appendChild(ref);

  ref.setAttribute('href', base64);
  ref.setAttribute('download', '');
  ref.click();
  ref.remove();
};

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
) => {
  const { scale, offset } = options;

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = img.width;
  canvas.height = img.width * (1 / ratio);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const width = img.width * scale;
  const height = img.height * scale;

  ctx.drawImage(
    img,
    (canvas.width - width) / 2 + offset[0] * 4,
    (canvas.height - height) / 2 + offset[1] * 4,
    width,
    height,
  );

  const base64 = canvas.toDataURL();

  canvas.remove();

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

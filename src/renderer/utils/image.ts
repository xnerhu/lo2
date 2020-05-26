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

export const trimImage = (
  img: HTMLImageElement,
  x: number,
  y: number,
  width: number,
  height: number,
): string => {
  const canvas = document.createElement('canvas');

  canvas.width = width;
  canvas.height = height;

  // var context = canvas.getContext('2d');
  // context.drawImage(img, -posX, -posY);
  // img.parentNode.replaceChild(canvas, img);
};

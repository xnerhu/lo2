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

export const base64toFile = (base64: string) => {
  const arr = base64.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);

  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], 'file', { type: mime });
};

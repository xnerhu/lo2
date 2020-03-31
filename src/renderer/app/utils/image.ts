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

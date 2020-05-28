export const resetFileInput = (ref: HTMLInputElement) => {
  ref.value = null;
  ref.type = 'text';
  ref.type = 'file';
};

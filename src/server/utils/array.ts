export const getUniqueValues = <T>(arr: T[]): T[] => {
  return Array.from(new Set(arr));
};

export const getFirstArrayItem = <T = any>(arr: any[]): T => {
  if (arr instanceof Array) {
    return arr[0];
  }

  return null;
};

export const getUniqueValues = <T>(arr: T[]): T[] => {
  return Array.from(new Set(arr));
};

export const flattenArray = <T>(...arrays: any[]) => {
  const arr: T[] = [];

  arrays.forEach((r) => {
    if (r instanceof Array) {
      arr.push(...r);
    } else if (r != null) {
      arr.push(r);
    }
  });

  return arr;
};

export const getFirstArrayItem = <T>(arr: any[]): T => {
  if (arr instanceof Array) {
    return arr[0];
  }

  return null;
};

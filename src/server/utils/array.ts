export const getUniqueValues = <T>(arr: T[]): T[] => {
  return Array.from(new Set(arr));
};

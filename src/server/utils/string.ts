export const formatLabel = (str: string) => {
  return str
    .replace(/[\s]+/g, '-')
    .replace(
      /[\:|\/|?|\#|\[|\]|\@|\!|\$|\&|\'|\(|\)|\*|\+|\,|\;|\=|\%|\„|\”|\.|\,]+/g,
      '',
    )
    .toLowerCase()
    .slice(0, 255);
};

export const createRandLabel = (str: string) => {
  return `${str}-${makeId(64)}`;
};

export const makeId = (
  length: number,
  possible = 'abcdefghijklmnopqrstuvwxyz',
) => {
  let id = '';
  for (let i = 0; i < length; i++) {
    id += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return id;
};

export const truncate = (str: string, maxLength: number, pad = '...') => {
  if (str.length > maxLength) {
    str = `${str.slice(0, maxLength)}${pad}`;
  }

  return str;
}

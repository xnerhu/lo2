export const truncateString = (str: string, maxLength: number, pad = '...') => {
  if (str.length > maxLength) {
    if (str[maxLength - 1] === ' ') maxLength--
    str = `${str.slice(0, maxLength)}${pad}`;
  }

  return str;
}

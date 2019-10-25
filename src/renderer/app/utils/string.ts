export const formatDate = (date: Date | string) => {
  if (typeof date === 'string') {
    date = new Date(date);
  }

  return `${pad(date.getDate())}.${pad(date.getMonth())}.${date.getFullYear()}`;
}

const pad = (value: number) => {
  return value.toString().padStart(2, '0');
}

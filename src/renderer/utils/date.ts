import { MONTHS } from '~/renderer/constants/date';
import { IArticle } from '~/interfaces';

const getPrefix = (time: number, seconds: number) => {
  time = Math.floor(seconds / 2592000);

  if (time >= 1) {
    if (time === 1) return 'miesiąc';
    if (time <= 4) return `${time} miesiące`;
    return `${time} miesięcy`;
  }

  time = Math.floor(seconds / 86400);

  if (time >= 1) {
    if (time === 1) return 'dzień';
    return `${time} dni`;
  }

  time = Math.floor(time / 3600);

  if (time >= 1) {
    if (time === 1) return 'godzina';
    return `${time} godzin`;
  }

  time = Math.floor(seconds / 60);

  if (time > 1) {
    return `${time} minut`;
  }

  time = Math.floor(seconds);

  if (time >= 30) {
    return `${time} sekund`;
  }

  return 'teraz';
};

export const formatDate = (date: Date | string) => {
  const _date = typeof date === 'string' ? new Date(date) : date;

  const seconds = Math.floor((new Date().getTime() - _date.getTime()) / 1000);
  const time = Math.floor(seconds / 31536000);

  if (time > 1) {
    return `${_date.getDate()} ${
      MONTHS[_date.getMonth()]
    }, ${_date.getFullYear()}`;
  }

  return `${getPrefix(time, seconds)} temu`;
};

export const formatArticleDate = (data: IArticle) => {
  const { createdAt } = data;
  const date = new Date(createdAt);

  return `${date.getDate()} ${MONTHS[date.getMonth()]}, ${date.getFullYear()}`;
};

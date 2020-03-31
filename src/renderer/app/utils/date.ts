import { INews } from '~/interfaces';
import { SHORT_MONTHS } from '~/renderer/constants/date';

export const formatDate = (date: Date | string) => {
  const _date = typeof date === 'string' ? new Date(date) : date;

  const seconds = Math.floor((new Date().getTime() - _date.getTime()) / 1000);
  let time = Math.floor(seconds / 31536000);

  if (time > 1) {
    return `${pad(_date.getDate())}.${pad(
      _date.getMonth() + 1,
    )}.${_date.getFullYear()}`;
  }

  time = Math.floor(seconds / 2592000);

  if (time >= 1) {
    if (time === 1) {
      return 'miesiąc temu';
    }

    if (time <= 4) {
      return `${time} miesiące temu`;
    }

    return `${time} miesięcy temu`;
  }

  time = Math.floor(seconds / 86400);

  if (time > 1) {
    return `${time} dni temu`;
  }

  time = Math.floor(time / 3600);

  if (time > 1) {
    return `${time} godzin temu`;
  }

  time = Math.floor(seconds / 60);

  if (time > 1) {
    return time + ' minut temu';
  }

  return Math.floor(seconds) + ' sekund temu';
};

const pad = (value: number) => {
  return value.toString().padStart(2, '0');
};

export const formatArticleDate = (data: INews) => {
  const { createdAt } = data;
  const date = new Date(createdAt);

  const month = SHORT_MONTHS[date.getMonth()];

  return `${date.getDate()} ${month}, ${date.getFullYear()}`;
};

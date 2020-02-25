import { INews } from '~/interfaces';
import { SHORT_MONTHS } from '~/renderer/constants';

export const formatDate = (date: Date | string) => {
  const _date = typeof date === 'string' ? new Date(date) : date;

  return `${pad(_date.getDate())}.${pad(
    _date.getMonth() + 1,
  )}.${_date.getFullYear()}`;

  // const current = new Date();
  // const delta = new Date(current.getTime() - _date.getTime());
  // const months = delta.getMonth();
  // const yearsDelta = current.getFullYear() - _date.getFullYear();

  // if (yearsDelta > 1) {
  //   return `${pad(_date.getDate())}.${pad(
  //     _date.getMonth() + 1,
  //   )}.${_date.getFullYear()}`;
  // }

  // if (months === 1) {
  //   return `miesiąc temu`;
  // }

  // if (months > 1) {
  //   if (months <= 4) {
  //     return `${months} miesiące temu`;
  //   }

  //   return `${months} miesięcy temu`;
  // }

  // const days = delta.getDate();

  // if (days === 1) {
  //   return 'dzień temu';
  // }

  // if (days > 1) {
  //   return `${days} dni temu`;
  // }

  // return `${delta.getMinutes()} minut temu`;
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

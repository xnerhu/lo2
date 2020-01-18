export const formatDate = (date: Date | string) => {
  const _date = typeof date === 'string' ? new Date(date) : date;

  const delta = new Date(new Date().getTime() - _date.getTime());
  const months = delta.getMonth();

  if (months >= 12) {
    return `${pad(_date.getDate())}.${pad(
      _date.getMonth(),
    )}.${_date.getFullYear()}`;
  }

  if (months === 1) {
    return `miesiąc temu`;
  }

  if (months > 1) {
    if (months <= 4) {
      return `${months} miesiące temu`;
    }

    return `${months} miesięcy temu`;
  }

  const days = delta.getDate();

  if (days === 1) {
    return 'dzień temu';
  }

  if (days > 1) {
    return `${days} dni temu`;
  }

  return `${delta.getMinutes()} minut temu`;
};

const pad = (value: number) => {
  return value.toString().padStart(2, '0');
};

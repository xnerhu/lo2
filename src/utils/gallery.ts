export const formatGalleryAlbumYear = (date: Date | string) => {
  if (!date) return '';

  if (typeof date === 'string') date = new Date(date);

  const year = date.getFullYear();

  return `${year}-${year + 1}`;
}

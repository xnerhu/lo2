export const getCategoryOffset = (
  left: boolean,
  container: HTMLElement,
  list: HTMLElement[],
) => {
  const containerRect = container.getBoundingClientRect();
  let offset = 0;

  for (const item of list) {
    const rect = item.getBoundingClientRect();

    if (left) {
      if (rect.left <= 0) offset += rect.width;
      else return offset - containerRect.width;
    } else {
      if (rect.right < containerRect.right) offset += rect.width;
      else return offset;
    }
  }

  return container.scrollLeft;
};

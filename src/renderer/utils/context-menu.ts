export interface IPos {
  top: number;
  left: number;
}

export const getMenuPosition = (
  ref: HTMLElement,
  menuRef: HTMLElement,
): IPos => {
  const rect = ref.getBoundingClientRect();

  let top = rect.bottom + window.scrollY;
  let left = rect.left + window.scrollX;

  const screenWidth = document.body.clientWidth;
  const screenHeight = document.body.clientHeight;

  const width = menuRef.offsetWidth;
  const height = menuRef.offsetHeight;

  if (top + height > screenHeight && top - height > 0) {
    top -= height;
  }

  if (left + width > screenWidth) {
    left = rect.right - width;
  }

  if (left < 0) {
    left = (screenWidth - width) / 2;
  }

  return { top, left };
};

export const setMenuPos = (ref: HTMLElement, menuRef: HTMLElement) => {
  const { top, left } = getMenuPosition(ref, menuRef);

  menuRef.style.top = top + 'px';
  menuRef.style.left = left + 'px';
};

export const toggleMenu = (menuRef: HTMLElement, visible = false) => {
  if (!visible) menuRef.classList.remove('expanded');
  else menuRef.classList.add('expanded');
};

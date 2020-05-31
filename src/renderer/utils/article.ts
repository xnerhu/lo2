import { IArticleCategory } from '~/interfaces';

export const splitArticleCategories = (list: IArticleCategory[]) => {
  if (!list) return null;

  const categories: IArticleCategory[] = [];
  const subcategories: IArticleCategory[] = [];

  list.forEach((r) => {
    (r.subcategory ? subcategories : categories).push(r);
  });

  return { categories, subcategories };
};

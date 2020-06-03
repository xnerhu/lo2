import { IAddArticlePageData } from '~/interfaces';
import ArticleCategoryService from '../services/article-category';

export default async (): Promise<IAddArticlePageData> => {
  const categories = await ArticleCategoryService.getAll();

  return {
    categories,
  };
};

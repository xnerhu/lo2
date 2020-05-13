import { IAddArticlePageData } from '~/interfaces';
import ArticleCategoryModel from '../models/article-category';

export default async (): Promise<IAddArticlePageData> => {
  const categories = await ArticleCategoryModel.find().lean().exec();

  return {
    categories,
  };
};

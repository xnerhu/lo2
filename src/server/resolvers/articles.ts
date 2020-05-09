import { IArticlesPageData, IArticleFilter } from '~/interfaces';
import ArticleService from '../services/article';
import ArticleCategoryModel from '../models/article-category';

export default async (filter: IArticleFilter): Promise<IArticlesPageData> => {
  const [chunk, categories] = await Promise.all([
    ArticleService.chunk(filter),
    ArticleCategoryModel.find().lean().exec(),
  ]);

  return {
    ...chunk,
    categories,
  };
};

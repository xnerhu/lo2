import { IEditArticlePageData } from '~/interfaces';
import ArticleCategoryModel from '../models/article-category';
import ArticleModel from '../models/article';
import ArticleService from '../services/article';

export default async (label: string): Promise<IEditArticlePageData> => {
  const [categories, article] = await Promise.all([
    ArticleCategoryModel.find().lean().exec(),
    ArticleModel.findOne({ label }).lean().exec(),
  ]);

  return {
    categories,
    article: {
      ...article,
      image: ArticleService.formatImage(article, true),
    },
    success: !!article,
  };
};

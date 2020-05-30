import { IEditArticlePageData } from '~/interfaces';
import ArticleModel from '../models/article';
import ArticleService from '../services/article';
import addArticleResolver from './add-article';

export default async (label: string): Promise<IEditArticlePageData> => {
  const [data, article] = await Promise.all([
    addArticleResolver(),
    ArticleModel.findOne({ label }).lean().exec(),
  ]);

  return {
    ...data,
    article: {
      ...article,
      image: ArticleService.formatImage(article, true),
    },
    success: !!article,
  };
};

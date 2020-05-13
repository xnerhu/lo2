import { IArticlePageData } from '~/interfaces';
import ArticleService from '../services/article';
import ArticleCategoryModel from '../models/article-category';
import UserModel from '../models/user';

export default async (label: string): Promise<IArticlePageData> => {
  const article = await ArticleService.findOne(label);

  const [category, author] = await Promise.all([
    ArticleCategoryModel.findOne({ _id: article.categoryId }).lean().exec(),
    UserModel.findOne({ _id: article.authorId }).lean().exec(),
  ]);

  return { article, category, author };
};

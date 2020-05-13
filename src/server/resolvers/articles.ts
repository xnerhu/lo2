import {
  IArticlesPageData,
  IArticleFilter,
  IArticlesChunk,
  IArticle,
  IUser,
} from '~/interfaces';
import ArticleService from '../services/article';
import ArticleCategoryModel from '../models/article-category';
import { getUniqueValues } from '../utils';
import { config } from '../constants';
import UserModel from '../models/user';
import UserService from '../services/user';

const getChunk = async (filter: IArticleFilter): Promise<IArticlesChunk> => {
  let articles: IArticle[] = [];
  let users: IUser[] = [];

  try {
    articles = await ArticleService.find(filter, true);

    const ids = getUniqueValues(articles.map((r) => r.authorId));

    users = await UserModel.find({
      _id: {
        $in: ids,
      },
    })
      .lean()
      .exec();
  } catch (error) {}

  return {
    articles,
    users: users.map((r) => UserService.format(r)),
    nextPage: articles.length >= config.articlesPerPage,
  };
};

export default async (filter: IArticleFilter): Promise<IArticlesPageData> => {
  const [chunk, categories] = await Promise.all([
    getChunk(filter),
    ArticleCategoryModel.find().lean().exec(),
  ]);

  return {
    ...chunk,
    categories,
  };
};

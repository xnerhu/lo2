import { IHomePageData, IArticle } from '~/interfaces';
import ArticleModel from '../models/article';
import ArticleService from '../services/article';

const getArticles = async (): Promise<IArticle[]> => {
  const items: IArticle[] = await ArticleModel.find()
    .limit(9)
    .sort({ _id: 1 })
    .lean()
    .exec();

  return items.map((r) => ArticleService.format(r));
};

export default async (): Promise<IHomePageData> => {
  const articles = await getArticles();

  return {
    sliderItems: [],
    articles,
    categories: [],
  };
};

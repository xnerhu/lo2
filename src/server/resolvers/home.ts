import { IHomePageData, IArticle } from '~/interfaces';
import ArticleModel from '../models/article';
import ArticleService from '../services/article';
import { listFiles } from '../utils';

const getArticles = async (): Promise<IArticle[]> => {
  const items: IArticle[] = await ArticleModel.find()
    .limit(9)
    .sort({ _id: 1 })
    .lean()
    .exec();

  return items.map((r) => ArticleService.format(r));
};

export default async (): Promise<IHomePageData> => {
  const [sliderItems, articles] = await Promise.all([
    listFiles('home-slider'),
    getArticles(),
  ]);

  return {
    sliderItems,
    articles,
  };
};

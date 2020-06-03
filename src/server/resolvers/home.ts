import { IHomePageData } from '~/interfaces';
import ArticleService from '../services/article';
import { listFiles } from '../utils';

export default async (): Promise<IHomePageData> => {
  const [sliderItems, articles] = await Promise.all([
    listFiles('home-slider'),
    ArticleService.find({ limit: 9 }),
  ]);

  return {
    sliderItems,
    articles,
  };
};

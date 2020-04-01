import { listFiles } from '../utils';
import ArticleService from '../services/article';
import { IHomePageData, INewsPageData } from '~/interfaces';

class PageService {
  public async getHomeData(): Promise<IHomePageData> {
    const [sliderItems, articles] = await Promise.all([
      listFiles('home-slider'),
      ArticleService.findMany({ limit: 9 }),
    ]);

    return {
      sliderItems,
      articles,
    };
  }

  public async getNewsData(): Promise<INewsPageData> {
    const articles = await ArticleService.findMany({ limit: 50 });

    return {
      articles,
    };
  }
}

export default new PageService();

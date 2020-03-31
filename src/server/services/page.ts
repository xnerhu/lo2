import { listFiles } from '../utils';
import ArticleService from '../services/article';
import { IHomePageData } from '~/interfaces';

class PageService {
  public async getHomeData(): Promise<IHomePageData> {
    const [sliderItems, { articles, categories }] = await Promise.all([
      listFiles('home-slider'),
      ArticleService.bundleMany({ limit: 9 }),
    ]);

    return {
      sliderItems,
      articles,
      categories,
    };
  }
}

export default new PageService();

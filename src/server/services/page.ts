import { listFiles } from '../utils';
import ArticleService from '../services/article';
import { IHomePageData } from '~/interfaces';

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
}

export default new PageService();

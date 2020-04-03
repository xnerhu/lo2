import { listFiles } from '../utils';
import ArticleService from '../services/article';
import ArticleCategoryService from '../services/article-category';
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
    const [articles, categories] = await Promise.all([
      ArticleService.findMany(),
      ArticleCategoryService.findMany(),
    ]);

    return {
      articles,
      categories,
    };
  }
}

export default new PageService();

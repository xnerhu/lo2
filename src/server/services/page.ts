import { listFiles } from '../utils';
import ArticleService from '../services/article';
import ArticleCategoryService from '../services/article-category';
import { IHomePageData, INewsPageData } from '~/interfaces';
import { IArticleFilter } from '~/interfaces/article';

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

  public async getNewsData(filter?: IArticleFilter): Promise<INewsPageData> {
    const [chunk, categories] = await Promise.all([
      ArticleService.chunk(filter),
      ArticleCategoryService.findMany(),
    ]);

    return {
      ...chunk,
      categories,
    };
  }
}

export default new PageService();

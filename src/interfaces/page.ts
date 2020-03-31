import { IArticle, IArticleCategory } from './article';

export interface IHomePageData {
  sliderItems?: string[];
  articles?: IArticle[];
  categories?: IArticleCategory[];
}
import { IArticle, IArticleCategory, IArticleListChunk } from './article';

export interface IHomePageData {
  sliderItems?: string[];
  articles?: IArticle[];
  categories?: IArticleCategory[];
}

export interface INewsPageData extends IArticleListChunk {
  categories: IArticleCategory[];
}

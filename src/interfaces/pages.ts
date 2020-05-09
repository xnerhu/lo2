import { IArticle, IArticleCategory, IArticlesChunk } from './article';

export interface IHomePageData {
  sliderItems?: string[];
  articles?: IArticle[];
  categories?: IArticleCategory[];
}

export interface IArticlesPageData extends IArticlesChunk {
  nextPage?: boolean;
  categories?: IArticleCategory[];
}

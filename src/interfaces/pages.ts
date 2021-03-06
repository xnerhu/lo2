import { IArticle, IArticleCategory, IArticlesChunk } from './article';
import { IUser } from './user';

export interface IHomePageData {
  sliderItems?: string[];
  articles?: IArticle[];
  categories?: IArticleCategory[];
}

export interface IArticlesPageData extends IArticlesChunk {
  nextPage?: boolean;
  categories?: IArticleCategory[];
}

export interface IArticlePageData {
  article?: IArticle;
  category?: IArticleCategory;
  subcategory?: IArticleCategory;
  author?: IUser;
  success?: boolean;
  canEdit?: boolean;
}

export interface IAddArticlePageData {
  categories?: IArticleCategory[];
}

export interface IEditArticlePageData extends IAddArticlePageData {
  article?: IArticle;
  success?: boolean;
}

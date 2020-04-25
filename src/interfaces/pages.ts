import { INews, INewsChunk, INewsCategory, IEditArticleItem } from './news';
import { IPersonnelSection } from './personnel';
import { IArticle, IArticleCategory } from './article';
import { IUser } from './user';

export interface IHomePagePacket {
  sliderItems?: string[];
  news?: INews[];
}

export interface INewsPagePacket {
  news?: INewsChunk;
  categories?: INewsCategory[];
}

export interface IArticlePagePacket {
  article?: IArticle;
  category?: IArticleCategory;
  author?: IUser;
  error?: boolean;
  editable?: boolean;
}

export interface IPersonnelPacket {
  sections?: IPersonnelSection[];
  sliderItems?: string[];
}

export interface IAddArticlePacket {
  categories?: INewsCategory[];
}

export interface IEditArticlePacket {
  label?: string;
  categories?: INewsCategory[];
  item: IEditArticleItem;
  success?: boolean;
  error?: string;
}

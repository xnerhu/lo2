import { IUser } from './user';
import {
  IHomePagePacket,
  INewsPagePacket,
  IArticlePagePacket,
  IPersonnelPacket,
  IAddArticlePacket,
  IEditArticlePacket,
} from './pages';
import { IHomePageData, INewsPageData } from './page';

export interface IAppStatePage {
  home: IHomePageData;
  news: INewsPageData;
  article?: IArticlePagePacket;
  personnel?: IPersonnelPacket;
  addArticle?: IAddArticlePacket;
  editArticle?: IEditArticlePacket;
}

export interface IAppState {
  articles?: string;
  home?: number;
}

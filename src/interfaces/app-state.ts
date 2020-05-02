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

/*  page?: IAppStatePage;
  newsPage?: INewsPagePacket;
  articlePage?: IArticlePagePacket;
  personnelPage?: IPersonnelPacket;
  addArticlePage?: IAddArticlePacket;
  editArticlePage?: IEditArticlePacket;
  user?: IUser;
  signedIn?: boolean;*/

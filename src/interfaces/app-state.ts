import { IUser } from './user';
import {
  IHomePagePacket,
  INewsPagePacket,
  IArticlePagePacket,
  IPersonnelPacket,
  IAddArticlePacket,
  IEditArticlePacket,
} from './pages';
import { IHomePageData } from './page';

export interface IAppStatePage {
  home: IHomePageData;
  news: INewsPageData;
}

export interface IAppState {
  page?: IAppStatePage;
  newsPage?: INewsPagePacket;
  articlePage?: IArticlePagePacket;
  personnelPage?: IPersonnelPacket;
  addArticlePage?: IAddArticlePacket;
  editArticlePage?: IEditArticlePacket;
  user?: IUser;
  signedIn?: boolean;
}

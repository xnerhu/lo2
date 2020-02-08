import { IUser } from './user';
import {
  IHomePagePacket,
  INewsPagePacket,
  IArticlePagePacket,
  IPersonnelPacket,
  IAddArticlePacket,
} from './pages';

export interface IAppState {
  homePage?: IHomePagePacket;
  newsPage?: INewsPagePacket;
  articlePage?: IArticlePagePacket;
  personnelPage?: IPersonnelPacket;
  addArticlePage?: IAddArticlePacket;
  user?: IUser;
}

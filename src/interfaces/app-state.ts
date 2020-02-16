import { IUser } from './user';
import {
  IHomePagePacket,
  INewsPagePacket,
  IArticlePagePacket,
  IPersonnelPacket,
  IAddArticlePacket,
  IEditArticlePacket,
} from './pages';

export interface IAppState {
  homePage?: IHomePagePacket;
  newsPage?: INewsPagePacket;
  articlePage?: IArticlePagePacket;
  personnelPage?: IPersonnelPacket;
  addArticlePage?: IAddArticlePacket;
  editArticlePage?: IEditArticlePacket;
  user?: IUser;
}
